import { supabase } from '../utils/supabase.js';
import { sendLeadNotification } from '../services/emailService.js';
import Joi from 'joi';

const leadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  company: Joi.string().allow(''),
  company_size: Joi.string().allow(''),
  sector: Joi.string().allow(''),
  message: Joi.string().allow(''),
  lead_source: Joi.string().default('web_form')
});

export const createLead = async (req, res) => {
  try {
    const { error, value } = leadSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { data, error: dbError } = await supabase
      .from('leads')
      .insert([value])
      .select();

    if (dbError) throw dbError;

    // Async notification (don't block client)
    sendLeadNotification(value);

    res.status(201).json({ message: 'Lead captured successfully', data });
  } catch (error) {
    console.error('Lead Controller Error:', error);
    res.status(500).json({ error: 'Failed to store lead' });
  }
};
