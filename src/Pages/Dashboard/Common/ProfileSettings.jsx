import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { Mail, User, ShieldCheck, Fingerprint, BadgeCheck, Globe, Activity } from 'lucide-react';
import LoadingSpin from '../../../componet/LoadingSpin';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <div className="min-h-screen flex items-center justify-center bg-base-100"><LoadingSpin /></div>;

  return (
    <div className="min-h-[90vh] bg-base-100 p-4 md:p-10 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 border-b border-base-300 pb-8">
          <h1 className="text-4xl font-black tracking-tight text-base-content">
            Profile <span className="text-emerald-500">Settings</span>
          </h1>
          <p className="text-sm opacity-50 font-semibold mt-2 uppercase tracking-widest">
            Manage your personal information and account security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Side: Profile Summary */}
          <div className="lg:col-span-4">
            <div className="bg-base-200 border border-base-300 rounded-[2.5rem] p-10 text-center shadow-sm">
              <div className="relative inline-block">
                <div className="w-36 h-36 rounded-[2.5rem] overflow-hidden ring-4 ring-emerald-500/10 shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-500">
                  <img
                    alt="profile"
                    src={user?.photoURL || "https://i.ibb.co/v3978yP/default-avatar.jpg"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl border-4 border-base-200 shadow-lg">
                  <BadgeCheck size={20} />
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <h2 className="text-2xl font-black text-base-content leading-none">
                  {user?.displayName || "Anonymous User"}
                </h2>
                <div className="inline-flex items-center gap-2 py-1.5 px-5 bg-emerald-500/10 text-emerald-600 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border border-emerald-500/10">
                  <ShieldCheck size={14} strokeWidth={3} />
                  {role || "Student"}
                </div>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-4 pt-8 border-t border-base-300/50">
                 <div className="space-y-1">
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-widest">Status</p>
                    <div className="flex items-center justify-center gap-1.5 text-emerald-500 font-bold text-sm">
                        <Activity size={14} /> Active
                    </div>
                 </div>
                 <div className="space-y-1 border-l border-base-300/50">
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-widest">Region</p>
                    <div className="flex items-center justify-center gap-1.5 opacity-70 font-bold text-sm">
                        <Globe size={14} /> Global
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Side: Account Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-base-200 border border-base-300 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
              <h3 className="text-xl font-black mb-10 flex items-center gap-3 text-base-content">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                   <User size={20} />
                </div>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Full Name */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                      type="text"
                      value={user?.displayName || ""}
                      readOnly
                      className="w-full bg-base-100 border border-base-300 text-base-content font-bold px-12 py-4.5 rounded-2xl focus:outline-none focus:border-emerald-500/40 transition-all text-sm shadow-inner"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full bg-base-300/30 border border-base-300 opacity-60 font-bold px-12 py-4.5 rounded-2xl cursor-not-allowed text-sm"
                    />
                  </div>
                </div>

                {/* Unique Identification */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Unique User Identifier</label>
                  <div className="flex items-center justify-between bg-slate-900 dark:bg-black p-6 rounded-[1.5rem] border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/10 rounded-xl">
                        <Fingerprint size={24} className="text-emerald-500" />
                      </div>
                      <div className="space-y-1">
                        <code className="text-emerald-400 font-mono text-xs md:text-sm font-bold tracking-tight">
                            {user?.uid}
                        </code>
                        <p className="text-[9px] text-emerald-500/50 uppercase font-black tracking-widest">System Verified ID</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-base-300/50 flex items-center gap-3 justify-center">
                 <ShieldCheck size={16} className="text-emerald-500" />
                 <p className="text-[11px] opacity-40 font-bold uppercase tracking-widest">
                    Secure Data Encryption Active
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;