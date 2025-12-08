import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { data } from 'react-router'
import { FaIceCream } from 'react-icons/fa6'

const PostNewTuition = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { isPending, mutateAsync, reset: mutationReset } = useMutation({
        mutationFn: async load => await axiosSecure.post('/tuition', load),
        onSuccess: () => {
            mutationReset()
        },
        onError: error => console.log(error),
        retry: 3,
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async data => {
        const tuitionData = {
            subject: data.subject,
            class: data.class,
            location: data.location,
            budget: data.budget,
            status: 'Pending',
            student: {
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL
            }
        }
        try{
            await mutateAsync (tuitionData)
            reset()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center bg-gray-50 rounded-xl p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6">
                {/* Subject */}
                <div className="space-y-1">
                    <label htmlFor="subject" className="block text-gray-600">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        placeholder="Enter subject"
                        className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                        {...register('subject', { required: 'Subject is required' })}
                    />
                    {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                </div>

                {/* Class */}
                <div className="space-y-1">
                    <label htmlFor="class" className="block text-gray-600">Class</label>
                    <input
                        type="text"
                        id="class"
                        placeholder="Enter class"
                        className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                        {...register('class', { required: 'Class is required' })}
                    />
                    {errors.class && <p className="text-xs text-red-500">{errors.class.message}</p>}
                </div>

                {/* Location */}
                <div className="space-y-1">
                    <label htmlFor="location" className="block text-gray-600">Location</label>
                    <input
                        type="text"
                        id="location"
                        placeholder="Enter location"
                        className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                        {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                </div>

                {/* Budget */}
                <div className="space-y-1">
                    <label htmlFor="budget" className="block text-gray-600">Budget ($)</label>
                    <input
                        type="number"
                        id="budget"
                        placeholder="Enter budget"
                        className="w-full px-4 py-3 border border-lime-300 rounded-md focus:outline-lime-500"
                        {...register('budget', { required: 'Budget is required', min: { value: 0, message: 'Budget must be positive' } })}
                    />
                    {errors.budget && <p className="text-xs text-red-500">{errors.budget.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full p-3 text-white bg-lime-500 rounded-md font-medium flex justify-center items-center"
                >
                    {isPending ? <FaIceCream className="animate-spin" /> : 'Post Tuition'}
                </button>
            </form>
        </div>
    )
}

export default PostNewTuition