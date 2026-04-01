import React, { useState } from 'react';
import api from '../services/api';
import { Search, Building, Globe, ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';
import ScoreRing from '../components/ScoreRing';
import AlertBadge from '../components/AlertBadge';

const CompanyChecker = () => {
  const [formData, setFormData] = useState({ name: '', website: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.website) return setError('Company Name and Website are required');
    
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/company/verify', formData);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error verifying company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">Verify Company Legitimacy</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Don't fall for ghost companies. Let our AI check domain trust, SSL certificates, and common scam indicators before you apply or interview.</p>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl shadow-xl border-t-[8px] border-t-green-500">
        <form onSubmit={handleCheck} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow" 
                  placeholder="e.g. Acme Corp"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Website *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="url" 
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow" 
                  placeholder="https://acmecorp.com"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </div>
          </div>

          {error && <AlertBadge type="danger" text={error} />}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all flex justify-center items-center gap-2 shadow-lg disabled:opacity-70"
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Checking Registries...</>
            ) : (
              <><ShieldCheck className="w-5 h-5" /> Verify Legitimacy</>
            )}
          </button>
        </form>

        {result && !loading && (
          <div className={`mt-10 p-6 rounded-2xl border ${result.trustScore < 50 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
               <ScoreRing score={result.trustScore} size={140} type="match" />
               <div className="flex-1">
                 <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                   {result.label}
                 </h3>
                 <p className="text-gray-700 mb-4">We've generated a trust score based on domain reputation and heuristic indicators.</p>
                 
                 <div className="space-y-2 mt-4">
                     {result.flags.length > 0 ? result.flags.map((flag, i) => (
                       <AlertBadge key={i} type="warning" text={flag} />
                     )) : (
                       <AlertBadge type="success" text="Domain and name combination passes heuristic trust checks." />
                     )}
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyChecker;
