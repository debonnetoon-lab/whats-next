import { supabase } from '../utils/supabase.js';

export const getAdminStats = async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    const { data: scans } = await supabase.from('ai_sc_ans').select('*').order('created_at', { ascending: false });
    const { data: rois } = await supabase.from('roi_calculations').select('*').order('created_at', { ascending: false });
    const { data: reports } = await supabase.from('ai_reports').select('*').order('created_at', { ascending: false });

    const total_roi = rois?.reduce((acc, curr) => acc + Number(curr.roi_value), 0) || 0;
    const avg_roi = rois?.length > 0 ? total_roi / rois.length : 0;

    res.status(200).json({
      leads,
      scans,
      rois,
      reports,
      total_leads: leads?.length || 0,
      total_scans: scans?.length || 0,
      total_rois: rois?.length || 0,
      total_reports: reports?.length || 0,
      avg_roi
    });
  } catch (error) {
    console.error('Admin Error:', error);
    res.status(500).json({ error: 'Failed to fetch admin data' });
  }
};
