import React from 'react';

const PrivacyTerms = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-2 underline decoration-orange-500 decoration-4 underline-offset-8">Privacy Policy & Terms</h1>
        <p className="text-slate-400 font-bold text-sm mb-10 tracking-widest uppercase">Last Updated: January 2026</p>

        <div className="space-y-10 text-slate-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-black text-slate-800 mb-4">1. Information We Collect</h2>
            <p>We collect personal information such as your name, email address, and profile data when you register on TuitionHub. This data is used to provide better tutoring matches and secure transactions.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-800 mb-4">2. Use of Services</h2>
            <p>Users must provide accurate information. Any fraudulent activity, including fake profiles or payment scams, will result in permanent account suspension without prior notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-800 mb-4">3. Payment & Fees</h2>
            <p>TuitionHub may charge a service fee for successful matches. Payments made through Stripe are subject to Stripe's own terms and conditions. We do not store your credit card information.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-800 mb-4">4. Content Ownership</h2>
            <p>All content shared on this platform (blog posts, profiles) remains the property of TuitionHub or its respective owners. Unauthorized reproduction is strictly prohibited.</p>
          </section>
        </div>
        
        <div className="mt-12 p-8 bg-orange-50 rounded-3xl border border-orange-100">
          <p className="text-orange-700 text-sm font-bold">By using TuitionHub, you agree to comply with our guidelines and ethics. If you have any questions, please contact our legal team at legal@tuitionhub.com</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTerms;