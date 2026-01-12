import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { Camera, Mail, User, ShieldCheck, Fingerprint } from 'lucide-react';
import LoadingSpin from '../../../componet/LoadingSpin';


const ProfileSettings = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpin/></div>;

  return (
    <div className='min-h-[90vh] flex items-center justify-center p-6'>
      <div className=' shadow-xl  rounded-[3rem] overflow-hidden w-full max-w-4xl border border-slate-100'>
        
    

    
        <div className='px-1 pb-10'>
          <div className='relative flex flex-col items-center -mt-20'>
            
 
            <div className='relative group'>
              <img
                alt='profile'
                src={user?.photoURL || "https://i.ibb.co/v3978yP/default-avatar.jpg"}
                className=' object-cover rounded-full mt-20 border-8 border-white shadow-xl'
              />
            </div> 
            <div className='mt-6 flex items-center gap-2  text-emerald-600 px-6 py-2 rounded-full border border-emerald-100'>
              <ShieldCheck size={16} strokeWidth={3} />
              <span className='text-xs font-black uppercase tracking-widest'>{role}</span>
            </div>

            <h1 className='mt-4 text-3xl font-black '>{user?.displayName || "User Name"}</h1>
          </div>

          <hr className='my-10 border-slate-100' />


          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            
 
            <div className='space-y-2'>
              <label className='flex items-center gap-2 text-xs font-black  uppercase tracking-wider ml-2'>
                <User size={14} /> Full Name
              </label>
              <div className='relative'>
                <input
                  type='text'
                  value={user?.displayName}
                  readOnly
                  className='w-full bg-slate-50 border border-slate-100 text-slate-700 font-bold px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all'
                />
              </div>
            </div>

 
            <div className='space-y-2'>
              <label className='flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider ml-2'>
                <Mail size={14} /> Email Address
              </label>
              <input
                type='email'
                value={user?.email}
                readOnly
                className='w-full bg-slate-50 border border-slate-100 text-slate-500 font-bold px-6 py-4 rounded-2xl cursor-not-allowed opacity-70'
              />
            </div>


            <div className='md:col-span-2 space-y-2'>
              <label className='flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider ml-2'>
                <Fingerprint size={14} /> Unique User ID
              </label>
              <div className='bg-slate-900 p-4 rounded-2xl flex items-center justify-between'>
                <code className='text-indigo-300 font-mono text-sm'>{user?.uid}</code>
                <span className='text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-lg font-bold'>Verified</span>
              </div>
            </div>
          </div>     
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;