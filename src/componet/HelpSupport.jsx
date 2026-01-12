import React from 'react';
import { HelpCircle, MessageSquare, PhoneCall, FileText } from 'lucide-react';

const HelpSupport = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-4">How Can We <span className="text-orange-500">Help You?</span></h1>
          <div className="max-w-xl mx-auto relative mt-8">
            <input type="text" placeholder="Search for help..." className="w-full py-5 px-8 rounded-full shadow-lg border-none focus:ring-2 focus:ring-orange-400 outline-none text-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: <HelpCircle />, title: 'FAQs', desc: 'Find quick answers' },
            { icon: <MessageSquare />, title: 'Live Chat', desc: 'Talk to our team' },
            { icon: <PhoneCall />, title: 'Call Us', desc: '24/7 Phone support' },
            { icon: <FileText />, title: 'Guides', desc: 'Tutorials for users' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] text-center border border-slate-100 hover:shadow-xl transition-all group">
              <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="font-black text-slate-800 mb-1">{item.title}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>

       
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 max-w-3xl mx-auto shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-8 text-center">Popular Questions</h2>
          <div className="space-y-4">
            <div className="p-6 bg-slate-50 rounded-2xl font-bold text-slate-700">How do I verify my tutor profile?</div>
            <div className="p-6 bg-slate-50 rounded-2xl font-bold text-slate-700">Is the payment system secure?</div>
            <div className="p-6 bg-slate-50 rounded-2xl font-bold text-slate-700">Can I request a refund for a booking?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;