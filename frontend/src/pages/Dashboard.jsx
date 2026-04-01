import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Activity, Clock, FileText, CheckCircle } from 'lucide-react';
import AlertBadge from '../components/AlertBadge';

const Dashboard = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/job/history');
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center mt-20"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-500 mt-2">Here is your recent activity and analysis history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl"><Activity className="text-blue-600 w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Total Scans</p><p className="text-2xl font-bold text-gray-900">{history.length}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl"><CheckCircle className="text-green-600 w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Safe Jobs Found</p><p className="text-2xl font-bold text-gray-900">{history.filter(h => h.riskScore < 30 && h.reportReason === 'Job Scan').length}</p></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-xl"><FileText className="text-purple-600 w-6 h-6" /></div>
          <div><p className="text-sm text-gray-500 font-medium">Resumes Analyzed</p><p className="text-2xl font-bold text-gray-900">{history.filter(h => h.reportReason?.includes('Resume')).length}</p></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Clock className="w-5 h-5 text-gray-500" /> Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {history.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No activity found. Scan a job or analyze a resume to get started.</div>
          ) : (
             history.map((item) => (
              <div key={item._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded mb-2 inline-block uppercase tracking-wider">{item.reportReason}</span>
                    <h3 className="text-lg font-bold text-gray-900">{item.jobTitle}</h3>
                    <p className="text-sm text-gray-500">{item.company !== 'Unknown' && item.company}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${item.reportReason?.includes('Resume') ? 'text-primary-600' : (item.riskScore > 60 ? 'text-red-600' : item.riskScore > 30 ? 'text-yellow-600' : 'text-green-600')}`}>
                      {item.reportReason?.includes('Resume') ? `Score: ${item.riskScore}%` : `Risk: ${item.riskScore}%`}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {item.flags && item.flags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.flags.slice(0, 3).map((flag, idx) => (
                       <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {flag}</span>
                    ))}
                    {item.flags.length > 3 && <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">+{item.flags.length - 3} more</span>}
                  </div>
                )}
              </div>
             ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
