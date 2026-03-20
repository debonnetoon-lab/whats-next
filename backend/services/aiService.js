import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export const getAIAdvice = async (question, context = '', scanScore = null) => {
  if (!openai) {
    return {
      answer: "Deze functie vereist een OpenAI API Key. (Mocked response)",
      recommended_tools: [],
      next_step: "Plan een strategiegesprek in."
    };
  }
  try {
    const systemPrompt = "You are an AI strategy consultant helping European SMEs adopt AI tools and automation. Be professional, strategic, and concise.";
    
    let userPrompt = `Question: ${question}\n`;
    if (context) userPrompt += `Context: ${context}\n`;
    if (scanScore) userPrompt += `AI Maturity Score: ${scanScore}/100\n`;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Simple parsing for tools (this can be improved)
    const answer = response.choices[0].message.content;
    
    return {
      answer,
      recommended_tools: [], // Logic to extract tools can be added later
      next_step: "Plan een strategiegesprek in voor een diepere analyse."
    };
  } catch (error) {
    console.error('AI Advisor Error:', error);
    throw new Error('Failed to generate AI advice');
  }
};

export const generateScanRecommendations = async (data) => {
    if (!openai) {
        return ["AI audit starten", "Prompt engineering basis", "Administratie automatisatie"];
    }
};

export const generateAIReportData = async (company, sector, employees, scanScore, roiEstimate) => {
    if (!openai) {
        return {
            summary: "Mock Strategie Rapport: Focus op automatisatie van administratieve processen.",
            top_opportunities: ["E-mail AI", "Data Dashboards", "Kennis Assistent"],
            recommended_tools: ["GPT-4o", "Make.com", "Pinecone"],
            implementation_roadmap: {
                "Maand 1": "AI Audit",
                "Maand 2": "E-mail setup",
                "Maand 3": "Reporting setup",
                "Maand 4": "Opleiding"
            }
        };
    }
    try {
        const prompt = `Create a short practical AI adoption report for:
        Company: ${company}
        Sector: ${sector}
        Employees: ${employees}
        AI Maturity Score: ${scanScore}/100
        Estimated ROI: €${roiEstimate}/year
        
        Return a JSON object with keys: summary, top_opportunities (array), recommended_tools (array), implementation_roadmap (object).`;

        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('AI Report Gen Error:', error);
        throw error;
    }
};
