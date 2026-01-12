import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { BookOpen, MapPin, GraduationCap, DollarSign, Send, Layout } from 'lucide-react';
import LoadingSpin from '../../../componet/LoadingSpin';
import Swal from 'sweetalert2';

const PostNewTuition = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (payload) => await axiosSecure.post('/tuition', payload),
        onSuccess: () => {
            Swal.fire({
                title: 'Success!',
                text: 'Your tuition request has been posted.',
                icon: 'success',
                confirmButtonColor: '#10b981',
                customClass: { popup: 'rounded-[2rem]' }
            });
        },
        onError: (error) => {
            Swal.fire('Error!', error.message, 'error');
        }
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (formData) => {
        const tuitionData = {
            subject: formData.subject,
            class: formData.class,
            location: formData.location,
            budget: parseFloat(formData.budget),
            status: 'Pending',
            student: {
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL
            }
        };

        try {
            await mutateAsync(tuitionData);
            reset();
        } catch (err) {
            console.error(err);
        }
    };

    if (isPending) return <div className="min-h-screen flex items-center justify-center"><LoadingSpin /></div>;

    return (
        <div className="p-4 md:p-10 flex justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-full max-w-5xl  rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                
                {/* Header Decoration */}
                <div className="bg-gradient-to-r  p-10 text-center relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Layout size={120} />
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Post New Tuition</h2>
                    <p className=" font-medium mt-2">Find the perfect tutor for your needs</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Subject */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <BookOpen size={14} /> Subject Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Mathematics"
                                className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all font-bold text-slate-700 ${errors.subject ? 'border-red-300 focus:ring-red-50' : 'border-slate-100 focus:ring-emerald-50 focus:border-emerald-500'}`}
                                {...register('subject', { required: 'Subject is required' })}
                            />
                            {errors.subject && <p className="text-[10px] font-bold text-red-500 ml-2 italic">{errors.subject.message}</p>}
                        </div>

                        {/* Class */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <GraduationCap size={14} /> Student Class
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Class 10"
                                className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all font-bold text-slate-700 ${errors.class ? 'border-red-300 focus:ring-red-50' : 'border-slate-100 focus:ring-emerald-50 focus:border-emerald-500'}`}
                                {...register('class', { required: 'Class is required' })}
                            />
                            {errors.class && <p className="text-[10px] font-bold text-red-500 ml-2 italic">{errors.class.message}</p>}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <MapPin size={14} /> Tuition Location
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Dhanmondi, Dhaka"
                                className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all font-bold text-slate-700 ${errors.location ? 'border-red-300 focus:ring-red-50' : 'border-slate-100 focus:ring-emerald-50 focus:border-emerald-500'}`}
                                {...register('location', { required: 'Location is required' })}
                            />
                            {errors.location && <p className="text-[10px] font-bold text-red-500 ml-2 italic">{errors.location.message}</p>}
                        </div>

                        {/* Budget */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <DollarSign size={14} /> Monthly Budget ($)
                            </label>
                            <input
                                type="number"
                                placeholder="e.g. 5000"
                                className={`w-full px-5 py-4 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all font-bold text-slate-700 ${errors.budget ? 'border-red-300 focus:ring-red-50' : 'border-slate-100 focus:ring-emerald-50 focus:border-emerald-500'}`}
                                {...register('budget', { 
                                    required: 'Budget is required', 
                                    min: { value: 1, message: 'Budget must be positive' } 
                                })}
                            />
                            {errors.budget && <p className="text-[10px] font-bold text-red-500 ml-2 italic">{errors.budget.message}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow  active:scale-95 flex items-center justify-center gap-3 disabled:bg-slate-300"
                    >
                        <Send size={20} />
                        {isPending ? 'Publishing...' : 'Confirm & Post Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostNewTuition;