import { supabase } from '../utils/supabase.js';
import Joi from 'joi';

const roiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company_name: Joi.string().required(),
  sector: Joi.string().allow(''),
  employees: Joi.string().allow(''),
  avg_salary: Joi.number().default(50000),
  hours_spent_email: Joi.number().default(0),
  hours_spent_reporting: Joi.number().default(0),
  hours_spent_admin: Joi.number().default(0),
  hours_spent_research: Joi.number().default(0)
});

export const calculateROI = async (req, res) => {
  try {
    const { error, value } = roiSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const {
      name,
      email,
      company_name,
      sector,
      employees,
      avg_salary,
      hours_spent_email,
      hours_spent_reporting,
      hours_spent_admin,
      hours_spent_research
    } = value;

    // Logic: Automation potential
    const emailRate = 0.30;
    const reportingRate = 0.40;
    const adminRate = 0.35;
    const researchRate = 0.50;

    const weekly_hours_saved = 
      (hours_spent_email * emailRate) +
      (hours_spent_reporting * reportingRate) +
      (hours_spent_admin * adminRate) +
      (hours_spent_research * researchRate);

    const yearly_hours_saved = weekly_hours_saved * 48; // 48 weeks
    const hourly_rate = avg_salary / (160 * 12); // Based on 160h/month
    const estimated_roi = yearly_hours_saved * hourly_rate;

    const ai_opportunities = [
      "AI Email Assistent (30% tijdsbesparing)",
      "Geautomatiseerde Rapportage Dashboards",
      "Interne AI Knowledge Base"
    ];

    // Store in DB
    const { data, error: dbError } = await supabase
      .from('roi_calculations')
      .insert([{
        company: company_name,
        sector,
        employees,
        avg_salary,
        hours_spent_email,
        hours_spent_reporting,
        hours_spent_admin,
        hours_spent_research,
        weekly_hours_saved,
        yearly_hours_saved,
        roi_value: estimated_roi,
        ai_opportunities
      }])
      .select();

    if (dbError) throw dbError;

    // Sync to Leads table
    await supabase
      .from('leads')
      .insert([{
        name,
        email,
        company: company_name,
        sector,
        company_size: employees,
        lead_source: 'roi_calculator',
        message: `ROI Estimate: €${Math.round(estimated_roi).toLocaleString('nl-BE')} per jaar.`
      }]);

    res.status(200).json({
      weekly_hours_saved,
      yearly_hours_saved,
      estimated_roi,
      ai_opportunities
    });
  } catch (error) {
    console.error('ROI Controller Error:', error);
    res.status(500).json({ error: 'Failed to calculate ROI' });
  }
};
