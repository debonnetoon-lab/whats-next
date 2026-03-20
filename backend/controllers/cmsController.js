import { supabase } from '../utils/supabase.js';

const getContent = async (table, req, res) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error(`CMS Error (${table}):`, error);
    // Fallback if DB is empty/not setup: return empty array or sample data
    res.status(200).json([]);
  }
};

export const getArticles = (req, res) => getContent('articles', req, res);
export const getTools = (req, res) => getContent('tools', req, res);
export const getCases = (req, res) => getContent('cases', req, res);
export const getPrompts = (req, res) => getContent('prompts', req, res);
