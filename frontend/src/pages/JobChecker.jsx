import React, { useState } from 'react';
import api from '../services/api';
import { Search, ShieldAlert, AlertTriangle, AlertOctagon, CheckCircle } from 'lucide-react';
import ScoreRing from '../components/ScoreRing';
import AlertBadge from '../components/AlertBadge';

const JobChecker = () => {
  const [formData, setFormData] = useState({ title: '', company: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return setError('Title and description are required');
    
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/job/check', formData);
      setResult(data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || 'Error analyzing job posting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">Is This Job Real?</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Paste a suspicious job description below, and our AI will analyze its language to detect scams, pyramid schemes, or unrealistic promises.</p>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl shadow-xl border-t-[8px] border-t-red-500">
        <form onSubmit={handleCheck} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" 
                placeholder="e.g. Data Entry Clerk"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-shadow" 
                placeholder="e.g. Global Tech LLC"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>
          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2 flex justify-between">
                <span>Job Description *</span>
                <span className="text-xs font-normal text-gray-500">Copy & Paste the full text</span>
             </label>
             <textarea 
               required
               rows="8"
               className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none shadow-sm" 
               placeholder="Responsibilities:
- Immediately earn $500/day
- Must pay initial processing fee..."
               value={formData.description}
               onChange={e => setFormData({ ...formData, description: e.target.value })}
             ></textarea>
          </div>

          {error && <AlertBadge type="danger" text={error} />}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all flex justify-center items-center gap-2 shadow-lg disabled:opacity-70"
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Scanning...</>
            ) : (
              <><ShieldAlert className="w-5 h-5" /> Run Safety Check</>
            )}
          </button>
        </form>

        {result && !loading && (
          <div className={`mt-10 p-6 rounded-2xl border ${result.riskScore > 60 ? 'bg-red-50 border-red-200' : result.riskScore > 30 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
               <ScoreRing score={result.riskScore} size={140} type="risk" />
               <div className="flex-1">
                 <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                   {result.riskScore > 60 && <><AlertOctagon className="text-red-500"/> Highly Suspicious</>}
                   {result.riskScore <= 60 && result.riskScore > 30 && <><AlertTriangle className="text-yellow-500"/> Proceed With Caution</>}
                   {result.riskScore <= 30 && <><CheckCircle className="text-green-500"/> Looks Safe</>}
                 </h3>
                 <p className="text-gray-700 mb-4">{result.label}: Our AI analyzed the text and found {result.flags.length} potential red flags.</p>
                 
                 {result.flags.length > 0 && (
                   <div className="space-y-2 mt-4">
                     {result.flags.map((flag, i) => (
                       <AlertBadge key={i} type="warning" text={flag} />
                     ))}
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobChecker;
