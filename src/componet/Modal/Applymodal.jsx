import React, { Fragment, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAuth from '../../hooks/useAuth'
import {  Dialog, Transition, TransitionChild } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const Applymodal = ({setIsOpen}) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { isPending, mutateAsync, reset: mutationReset } = useMutation({
        mutationFn: async apply => await axiosSecure.post('/tutor', apply),
        onSuccess: () => {
            mutationReset()
        },
        onError: error => console.log(error),
        retry: 3,
    })
    // const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async data => {
        const tuitionData = {
            name: user?.displayName,
            email: user?.email,
            qualifications: data.qualifications,
            experience: data.experience,
            expectedSalary:data.ExpectedSalary,
            tutorId:user?._id,
            status: 'Pending',
        }
        try {
            await mutateAsync(tuitionData)
            reset()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div> <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md bg-white rounded p-6 shadow-lg">
                                <Dialog.Title className="text-xl font-bold mb-4">Apply for Tuition</Dialog.Title>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                    <label>
                                        Name:
                                        <input
                                            type="text"
                                            value={user?.displayName}
                                            readOnly
                                            className="w-full border px-2 py-1 rounded mt-1 bg-gray-100"
                                        />
                                    </label>
                                    <label>
                                        Email:
                                        <input
                                            type="email"
                                            value={user?.email}
                                            readOnly
                                            className="w-full border px-2 py-1 rounded mt-1 bg-gray-100"
                                        />
                                    </label>
                                    <label>
                                        Qualifications:
                                        <input
                                            type="text"
                                            id='text'
                                            required
                                            className="w-full border px-2 py-1 rounded mt-1"
                                            {...register('qualifications', { required: 'Qualifications is required', min: { value: 0, message: ' Qualificationsmust be positive' } })}
                                        />
                                        {errors.qualifications && <p className="text-xs text-red-500">{errors.qualifications.message}</p>}
                                    </label>
                                    <label>
                                        Experience (years):
                                        <input
                                            type="number"
                                            id='number'
                                            required
                                            className="w-full border px-2 py-1 rounded mt-1"
                                            {...register('experience', { required: 'Experience is required', min: { value: 0, message: ' Experience must be positive' } })}
                                        />
                                        {errors.experience && <p className="text-xs text-red-500">{errors.experience.message}</p>}
                                    </label>
                                    <label>
                                        Expected Salary ($):
                                        <input
                                            type="number"
                                            id="number"
                                            // placeholder="Enter budget"
                                            required
                                            className="w-full border px-2 py-1 rounded mt-1"
                                            {...register('ExpectedSalary', { required: 'Expected Salary is required', min: { value: 0, message: 'Salary must be positive' } })}
                                        />
                                        {errors.salary && <p className="text-xs text-red-500">{errors.salary.message}</p>}
                                    </label>

                                    <div className="flex justify-end gap-3 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition></div >
    )
}

export default Applymodal