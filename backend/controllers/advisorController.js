import { getAIAdvice } from '../services/aiService.js';

export const askAdvisor = async (req, res) => {
  try {
    const { question, company_context, scan_score } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const advice = await getAIAdvice(question, company_context, scan_score);

    res.status(200).json(advice);
  } catch (error) {
    console.error('Advisor Controller Error:', error);
    res.status(500).json({ error: 'Failed to generate AI advice' });
  }
};
