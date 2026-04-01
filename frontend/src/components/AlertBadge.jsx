import React from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const AlertBadge = ({ type = 'warning', text }) => {
  let styles = '';
  let Icon = Info;

  switch (type) {
    case 'danger':
      styles = 'bg-red-50 text-red-800 border-red-200';
      Icon = AlertTriangle;
      break;
    case 'warning':
      styles = 'bg-yellow-50 text-yellow-800 border-yellow-200';
      Icon = AlertTriangle;
      break;
    case 'success':
      styles = 'bg-green-50 text-green-800 border-green-200';
      Icon = CheckCircle;
      break;
    case 'info':
    default:
      styles = 'bg-blue-50 text-blue-800 border-blue-200';
      Icon = Info;
      break;
  }

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${styles} my-2 shadow-sm`}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default AlertBadge;
