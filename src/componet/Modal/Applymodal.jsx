import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAuth from '../../hooks/useAuth'

const Applymodal = () => {
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
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = async data => {
        const tuitionData = {
            name: user?.name,
            email: user?.email,
            qualifications: data.qualifications,
            experince: data.experince,
            expectedSalary: data.expectedSalary,
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
        <div> <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>

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
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    <label>
                                        Name:
                                        <input
                                            type="text"
                                            value={user?.name}
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
                                            
                                            required
                                            className="w-full border px-2 py-1 rounded mt-1"
                                        />
                                    </label>
                                    <label>
                                        Experience (years):
                                        <input
                                            type="number"
                                       
                                            required
                                            className="w-full border px-2 py-1 rounded mt-1"
                                        />
                                    </label>
                                    <label>
                                        Expected Salary ($):
                                        <input
                                            type="number"
                                            id="number"
                                            placeholder="Enter budget"
                                            required
                                            className="w-full border px-2 py-1 rounded mt-1"
                                            {...register('budget', { required: 'Salary is required', min: { value: 0, message: 'Salary must be positive' } })}
                                        />
                                        {errors.budget && <p className="text-xs text-red-500">{errors.budget.message}</p>}
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
        </Transition></div>
    )
}

export default Applymodal