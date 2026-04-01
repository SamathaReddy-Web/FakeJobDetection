import { analyzeJobPosting } from '../utils/ai.js';
import Report from '../models/Report.js';

export const checkJob = async (req, res) => {
  try {
    const { title, description, company } = req.body;

    if (!title || !description) {
       return res.status(400).json({ message: 'Title and description required' });
    }

    const aiResult = await analyzeJobPosting(title + " " + description);
    
    // Save history check if user authenticated
    if (req.user) {
      await Report.create({
        user: req.user.id,
        jobTitle: title,
        company: company || 'Unknown',
        riskScore: aiResult.riskScore,
        flags: aiResult.flags,
        reportReason: 'Job Scan'
      });
    }

    res.json({
      success: true,
      analysis: aiResult
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reportJob = async (req, res) => {
  try {
    const { title, company, reason } = req.body;
    
    const report = await Report.create({
      user: req.user.id, // requires auth middleware
      jobTitle: title,
      company: company,
      riskScore: 100, // Explicit report implies high risk
      flags: [reason],
      reportReason: 'User Reported'
    });

    res.status(201).json({ success: true, report });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserHistory = async (req, res) => {
  try {
    const history = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
