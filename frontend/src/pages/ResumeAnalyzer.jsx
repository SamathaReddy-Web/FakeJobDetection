import React, { useState } from 'react';
import api from '../services/api';
import { Upload, FileText, Briefcase, FileSignature, CheckCircle, Search, TrendingUp } from 'lucide-react';
import ScoreRing from '../components/ScoreRing';
import AlertBadge from '../components/AlertBadge';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please select a resume file');
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) formData.append('jobDescription', jobDescription);

    try {
      const { data } = await api.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error analyzing resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">Resume Intelligence</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Upload your resume and an optional job description to see how well you match, get missing skill suggestions, and score your profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Form */}
        <div className="glass-card p-8 rounded-2xl">
          <form onSubmit={handleAnalyze} className="space-y-6">
            
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <FileSignature className="w-5 h-5 text-primary-500" />
                Upload Resume (PDF/DOCX)
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                 <input 
                  type="file" 
                  accept=".pdf,.docx,.doc"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={(e) => setFile(e.target.files[0])} 
                 />
                 <Upload className="w-10 h-10 text-gray-400 group-hover:text-primary-500 transition-colors mb-3" />
                 <p className="text-sm text-gray-600 font-medium">
                   {file ? <span className="text-primary-600 font-bold">{file.name}</span> : 'Click to select or drag and drop'}
                 </p>
                 <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 5MB</p>
              </div>
            </div>

            <div className="space-y-3">
               <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Briefcase className="w-5 h-5 text-gray-500" />
                Target Job Description (Optional)
              </label>
              <textarea 
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none shadow-sm text-sm" 
                placeholder="Paste the job requirements here to see how well you match..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>

            {error && <AlertBadge type="danger" text={error} />}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all flex justify-center items-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Analyzing...</>
              ) : (
                <><Search className="w-5 h-5" /> Analyze Profile</>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="glass-card flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-xl border-t-[6px] border-t-primary-500 h-full min-h-[400px]">
          {!result && !loading && (
            <div className="p-10 flex flex-col items-center text-center opacity-70">
              <TrendingUp className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-500 mb-2">Awaiting Analysis</h3>
              <p className="text-sm text-gray-400">Upload your resume to see insights, scores, and missing skills here.</p>
            </div>
          )}

          {loading && (
             <div className="p-10 flex flex-col items-center flex-1 justify-center w-full">
               <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
               <p className="text-indigo-600 font-medium animate-pulse">Running AI models to extract features...</p>
             </div>
          )}

          {result && !loading && (
            <div className="w-full h-full flex flex-col">
               <div className="bg-slate-50 border-b border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between">
                 <div>
                   <h3 className="font-bold text-slate-800 text-lg">Overall Match Score</h3>
                   <p className="text-sm text-slate-500">Based on semantic relevance and skills</p>
                 </div>
                 <ScoreRing score={result.score} size={100} strokeWidth={8} type={jobDescription ? 'match' : 'general'} />
               </div>

               <div className="p-6 flex-1 overflow-y-auto">
                 <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-primary-600"/> extracted Skills</h4>
                 <div className="flex flex-wrap gap-2 mb-8">
                   {result.extractedSkills?.map((skill, i) => (
                     <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-medium">{skill}</span>
                   ))}
                   {!result.extractedSkills?.length && <span className="text-sm text-gray-500 italic">No hard skills explicitly extracted.</span>}
                 </div>

                 <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600"/> AI Suggestions</h4>
                 <div className="space-y-3">
                   {result.suggestions?.map((sugg, i) => (
                     <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-sm text-slate-700 flex items-start gap-3">
                       <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
                       {sugg}
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
