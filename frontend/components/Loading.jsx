import React from 'react';
import { MessageSquare } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
      <div className="relative flex flex-col items-center">
        {/* Animated Brand Icon */}
        <div className="relative mb-8">
          {/* Outer Pulse Rings */}
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping duration-[2000ms]"></div>
          <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 animate-pulse duration-[1500ms] scale-150"></div>
          
          {/* Main Logo Box */}
          <div className="relative bg-indigo-600 p-4 rounded-2xl shadow-xl shadow-indigo-200 z-10">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Text and Progress State */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Chit-Chat
          </h2>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-400 text-sm font-medium animate-pulse">
              Securing connection...
            </p>
            
            {/* Minimal Progress Bar */}
            <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full w-1/3 animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding (Optional/Minimal) */}
      <div className="absolute bottom-10 flex items-center gap-2 opacity-30">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          End-to-End Encrypted
        </span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}} />
    </div>
  );
};

export default Loading;