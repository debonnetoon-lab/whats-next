import { supabase } from '../utils/supabase.js';
import { generateAIReportData } from '../services/aiService.js';

export const generateStrategyReport = async (req, res) => {
  try {
    const { company, sector, employees, scan_score, roi_estimate } = req.body;

    const reportData = await generateAIReportData(company, sector, employees, scan_score, roi_estimate);

    // Store in DB
    const { error: dbError } = await supabase
      .from('ai_reports')
      .insert([{
        company,
        scan_score,
        roi_estimate,
        summary: reportData.summary,
        top_opportunities: reportData.top_opportunities,
        recommended_tools: reportData.recommended_tools,
        implementation_roadmap: reportData.implementation_roadmap
      }]);

    if (dbError) console.error('Report DB Error:', dbError);

    res.status(200).json(reportData);
  } catch (error) {
    console.error('Report Controller Error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};
