import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-6">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6 shadow-sm border border-primary-200">
          <ShieldAlert className="w-4 h-4" /> Ensure Safe Job Hunting
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Trust The Job, <span className="text-primary-600 drop-shadow-sm">Not The Scam.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          JobShield uses advanced AI to detect fake listings, verify company authenticity, and analyze your resume for the perfect match. Protect your career today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/register" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-all bg-primary-600 border border-transparent rounded-xl hover:bg-primary-700 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            <div className="absolute inset-0 h-full w-0 bg-white/20 transition-[width] group-hover:w-full ease-out duration-300"></div>
          </Link>
          <Link to="/job-checker" className="px-8 py-4 text-base font-bold text-gray-700 transition-all bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 w-full sm:w-auto shadow-sm">
            Try Job Checker
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-primary-200 hover:shadow-primary-500/10"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <ShieldAlert className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Fake Job Detection</h3>
          <p className="text-gray-600 leading-relaxed">Instantly analyze job descriptions to detect subtle red flags, unrealistic salary claims, and common scam patterns.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-accent-200 hover:shadow-accent-500/10"
        >
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Resume Intelligence</h3>
          <p className="text-gray-600 leading-relaxed">Score your resume against real job descriptions to identify missing skills and optimize your chances of landing the interview.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-green-200 hover:shadow-green-500/10"
        >
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Company Verification</h3>
          <p className="text-gray-600 leading-relaxed">Verify unfamiliar companies. We'll cross-reference domain ages and email servers to ensure they're legitimate entities.</p>
        </motion.div>
      </div>
      
      <div className="w-full mt-20">
        <Footer />
      </div>

    </div>
  );
};

export default Home;
