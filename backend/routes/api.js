import express from 'express';
import { createLead } from '../controllers/leadController.js';
import { processScan } from '../controllers/scanController.js';
import { askAdvisor } from '../controllers/advisorController.js';
import { getArticles, getTools, getCases, getPrompts } from '../controllers/cmsController.js';
import { getAdminStats } from '../controllers/adminController.js';
import { calculateROI } from '../controllers/roiController.js';
import { generateStrategyReport } from '../controllers/reportController.js';

const router = express.Router();

router.post('/leads', createLead);
router.post('/scan', processScan);
router.post('/ai-advisor', askAdvisor);

// ROI & Reports
router.post('/roi-calculator', calculateROI);
router.post('/ai-report', generateStrategyReport);

// Admin
router.get('/admin/stats', getAdminStats);

// CMS Endpoints
router.get('/articles', getArticles);
router.get('/tools', getTools);
router.get('/cases', getCases);
router.get('/prompts', getPrompts);

export default router;
