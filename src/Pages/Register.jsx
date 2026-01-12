import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { saveOrUpdateUser } from '../utils';
import toast from 'react-hot-toast';
import { Eye, EyeOff, User, Mail, Lock, Phone, GraduationCap, Users, ArrowRight } from 'lucide-react';

const Register = () => {
  const { creatUserWithEamil, signInWithGoogle, updateUsserProfile } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const [selectedRole, setSelectedRole] = useState('student');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, phone } = data;
    try {
      const result = await creatUserWithEamil(email, password);
      await updateUsserProfile(name);
      await saveOrUpdateUser({ name, email, role: selectedRole, phone });
      toast.success('Registration Successful!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Registration Failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: selectedRole
      });
      toast.success('Google Sign-In Successful!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Google Sign-In Failed');
    }
  };

  return (
    <div className="flex items-center justify-center  p-4 md:p-10 font-sans">
      <div className=" shadow-2xl rounded-[32px] overflow-hidden w-full max-w-6xl flex flex-col md:flex-row ">
        

        <div className=" md:flex w-full md:w-1/2  items-center justify-center p-12 relative overflow-hidden border-r ">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center max-w-sm">
            <img 
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg" 
              alt="Register Illustration" 
              className="w-full  h-auto rounded-3xl mix-blend-multiply"
            />
            <div className="mt-8">
              <h3 className="text-2xl font-semibold">Start Your Journey!</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed font-medium">
                Join thousands of students and tutors. Find your perfect match and start learning today.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center ">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-black tracking-tight">
              Create <span className="text-indigo-600">Account</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
              Join <span className="font-bold ">Tuitionbd</span> family today.
            </p>
          </div>


          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`flex-1 py-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest ${
                selectedRole === 'student' 
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' 
                : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'
              }`}
            >
              <GraduationCap size={18} /> Student
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('tutor')}
              className={`flex-1 py-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest ${
                selectedRole === 'tutor' 
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' 
                : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'
              }`}
            >
              <Users size={18} /> Tutor
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Sakib"
                  className="w-full pl-11 pr-4 py-3 text-gray-500  border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all"
                  {...register('name', { required: 'Name is required' })}
                />
              </div>
            </div>


            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full pl-11 pr-4 py-3 text-gray-500  border-none rounded-2xl focus:ring-2 outline-none transition-all "
                  {...register('email', { required: 'Email is required' })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={17} />
                  <input
                    type="text"
                    placeholder="017..."
                    className="w-full pl-10 pr-4 py-3 text-gray-500  border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all "
                    {...register('phone', { required: 'Required', maxLength: 11 })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={17} />
                  <input
                    type={show ? 'text' : 'password'}
                    placeholder="••••••"
                    className="w-full pl-10 pr-10 py-3 text-gray-500  border-none rounded-2xl focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all "
                    {...register('password', { required: 'Required', minLength: 6 })}
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 
                              text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none mt-2 disabled:opacity-70 flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? 'Creating Account...' : 'Regiter'}
              {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>


            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black"><span className="bg-white dark:bg-slate-900 px-4 text-slate-300">OR</span></div>
            </div>


            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-slate-700 dark:text-slate-300"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
              Sign up with Google
            </button>

            <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-4 font-medium">
              Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-bold">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;