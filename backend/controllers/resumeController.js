import { extractTextFromFile } from '../utils/textExtractor.js';
import { calculateMatch } from '../utils/ai.js';
import Report from '../models/Report.js';

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const { jobDescription } = req.body;
    
    // 1. Extract text from uploaded resume
    const resumeText = await extractTextFromFile(req.file.buffer, req.file.mimetype);
    
    // 2. Mock Basic analysis metrics if no job is provided
    let score = 50; 
    let suggestions = ['Add more quantifiable achievements', 'Ensure contact info is clear'];
    let extractedSkills = ['JavaScript', 'Node.js', 'React']; // Mock extraction for speed
    let aiMatchResult = null;

    if (resumeText.length > 500) score += 20;
    if (resumeText.toLowerCase().includes('developed') || resumeText.toLowerCase().includes('created')) {
      score += 15;
    }

    // 3. Match against Job Description if provided
    if (jobDescription) {
      aiMatchResult = await calculateMatch(resumeText, jobDescription);
      score = aiMatchResult.matchPercentage ? aiMatchResult.matchPercentage : score;
      if (score < 50) {
        suggestions.push("Your resume doesn't seem to heavily align with this job. Consider using terminology from the posting.");
      } else {
        suggestions.push("Good match! Tailor a cover letter to highlight this overlap.");
      }
    }

    score = Math.min(score, 100);

    // Save to history
    await Report.create({
      user: req.user.id,
      jobTitle: jobDescription ? "Resume vs Job Analysis" : "Resume General Analysis",
      riskScore: score, // representing resume score instead of risk
      flags: suggestions,
      reportReason: "Resume Scan"
    });

    res.json({
      success: true,
      score,
      extractedSkills,
      suggestions,
      resumePreview: resumeText.substring(0, 200) + '...'
    });

  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.status(500).json({ message: error.message });
  }
};
