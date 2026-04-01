import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();

const hf = new HfInference(process.env.HF_TOKEN);

/**
 * Checks for fake job patterns manually (heuristic)
 */
export const heuristicJobCheck = (text) => {
  const flags = [];
  const textLower = text.toLowerCase();
  
  if (textLower.match(/\$?\d+[,.]?\d*\s*(per day|daily|a day)/) || textLower.includes('earn fast')) {
    flags.push('Unrealistic salary formulation');
  }
  if (textLower.includes('immediate joining') || textLower.includes('act now') || textLower.includes('urgent hiring')) {
    flags.push('High urgency language');
  }
  if (textLower.includes('payment') && (textLower.includes('fee') || textLower.includes('initial') || textLower.includes('refundable'))) {
    flags.push('Mentions payment or upfront fees');
  }
  if (textLower.includes('telegram') || textLower.includes('whatsapp')) {
    flags.push('Unprofessional communication channels');
  }

  return flags;
};

/**
 * Classifies job description as real or fake via Hugging Face
 */
export const analyzeJobPosting = async (text) => {
  try {
    // Truncate text to fit typical limits (~512 tokens usually max for small models)
    const truncatedText = text.substring(0, 500);
    
    // We use a general sentiment/classification model on the free tier
    const classification = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english',
      inputs: truncatedText
    });
    
    // Example: Negative sentiment mapping loosely to "Fake/Suspicious", Positive to "Real".
    // Or just generating a mock 'risk score' from confidence if specialized model isn't active
    const heuristicFlags = heuristicJobCheck(text);
    
    // As SST-2 isn't strictly fake-job, we augment with our heuristics
    let riskScore = (heuristicFlags.length / 4) * 100;
    
    const negativeScore = classification.find(c => c.label === 'NEGATIVE')?.score || 0;
    if (negativeScore > 0.6) {
      riskScore += 20;
    }
    
    riskScore = Math.min(riskScore, 100);
    
    return {
      riskScore: Math.round(riskScore),
      flags: heuristicFlags,
      label: riskScore > 60 ? 'Fake/Scam' : riskScore > 30 ? 'Suspicious' : 'Real'
    };

  } catch (error) {
    console.error('AI Job check error (fallback to heuristic):', error.message);
    const fallbackFlags = heuristicJobCheck(text);
    const score = Math.min((fallbackFlags.length / 4) * 100, 100);
    return {
      riskScore: score,
      flags: fallbackFlags,
      label: score > 60 ? 'Fake/Scam' : score > 30 ? 'Suspicious' : 'Real',
      note: 'API Error: Using heuristic fallback'
    };
  }
};

/**
 * Calculates match percentage between resume and job description using sentence transformers
 */
export const calculateMatch = async (resumeText, jobText) => {
  try {
    // We can use feature extraction to compare cosine similarity, or zero-shot for skill matching
    // For free API, sometimes simple text generation matching is easiest if sentence-transformers are busy.
    // Let's try sentence similarity model:
    try {
      const similarity = await hf.sentenceSimilarity({
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        inputs: {
          source_sentence: truncate(jobText, 400),
          sentences: [truncate(resumeText, 400)]
        }
      });
      return { matchPercentage: Math.round(similarity[0] * 100) };
    } catch {
       // fallback mock
       const commonWords = jobText.toLowerCase().split(' ').filter(w => resumeText.toLowerCase().includes(w));
       const mockScore = Math.min(Math.round((commonWords.length / 50) * 100), 100);
       return { matchPercentage: mockScore, note: 'Using fallback heuristic comparison due to API limit' };
    }
  } catch (error) {
     return { matchPercentage: 50, note: 'Error matching' };
  }
};

function truncate(text, words) {
  return text.split(' ').slice(0, words).join(' ');
}
