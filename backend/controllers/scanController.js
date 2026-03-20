import { supabase } from '../utils/supabase.js';
import { generateScanRecommendations } from '../services/aiService.js';
import { sendScanResults } from '../services/emailService.js';

export const processScan = async (req, res) => {
  try {
    const data = req.body;
    
    // 1. Calculate Score
    let score = 0;
    const weights = { none: 10, basic: 30, regular: 60, advanced: 85 };
    score += weights[data.ai_usage_level] || 0;
    
    const interestWeights = { low: 5, medium: 10, high: 20 };
    score += interestWeights[data.automation_interest] || 0;
    
    const sizeWeights = { '1-10': 5, '10-50': 10, '50+': 20 };
    score += sizeWeights[data.employees] || 0;

    // Cap at 100
    score = Math.min(score, 100);

    // 2. Determine Level
    let level = "Emerging AI Company";
    if (score > 80) level = "AI Leader";
    else if (score > 50) level = "AI Explorer";

    // 3. Generate AI Recommendations
    const recommendations = await generateScanRecommendations(data);

    // 4. Store in DB
    const { error: dbError } = await supabase
      .from('ai_scans')
      .insert([{
        ...data,
        score,
        level,
        recommendations
      }]);

    if (dbError) console.error('Scan DB Error:', dbError);

    // Sync to Leads table
    await supabase
      .from('leads')
      .insert([{
        name: data.company, // Using company as name since name isn't in scan form yet, or we can use email
        email: data.email,
        company: data.company,
        sector: data.sector,
        company_size: data.employees,
        lead_source: 'maturity_scan',
        message: `Maturity Score: ${score}/100. Level: ${level}.`
      }]);

    // 5. Send Results Email
    if (data.email) {
        sendScanResults(data.email, score, level, recommendations);
    }

    res.status(200).json({
      score,
      level,
      recommendations
    });
  } catch (error) {
    console.error('Scan Controller Error:', error);
    res.status(500).json({ error: 'Failed to process scan' });
  }
};
