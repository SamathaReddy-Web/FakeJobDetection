import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Globe, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ShieldAlert className="h-8 w-8 text-primary-600" />
              <span className="font-extrabold text-2xl tracking-tight text-gray-900">
                JobShield<span className="text-primary-600">.</span>
              </span>
            </Link>
            <p className="text-gray-500 max-w-sm">
              Protecting your career journey with advanced AI tools. Detect fake listings, analyze your resume, and verify companies in seconds.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-3">
              <li><Link to="/job-checker" className="text-gray-500 hover:text-primary-600 transition-colors">Job Checker</Link></li>
              <li><Link to="/resume" className="text-gray-500 hover:text-primary-600 transition-colors">Resume Analyzer</Link></li>
              <li><Link to="/company-checker" className="text-gray-500 hover:text-primary-600 transition-colors">Company Verification</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} JobShield. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
