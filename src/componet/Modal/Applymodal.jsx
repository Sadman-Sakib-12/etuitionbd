import React, { Fragment } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const Applymodal = ({ setIsOpen, tuition }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (applyData) => {
      const res = await axiosSecure.post("/tutor", applyData);
      return res.data;
    },
    onSuccess: () => {
      reset();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log("Apply error:", error);
    },
  });

  const onSubmit = async (data) => {
    const applyData = {
      name: user?.displayName,
      email: user?.email,
      tutorId: user?._id,
      tuitionId: tuition?._id,
      location: data.tutorLocation, // Tutor নিজেই location দেয়
      salary: tuition?.salary,
      qualifications: data.qualifications,
      experience: Number(data.experience),
      expectedSalary: Number(data.expectedSalary),
      status: "Pending",
    };

    try {
      await mutateAsync(applyData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
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
          <div className="fixed inset-0 bg-black/30" />
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
              <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <Dialog.Title className="text-xl font-bold mb-4">
                  Apply for Tuition
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                  {/* Name */}
                  <label>
                    Name
                    <input
                      type="text"
                      value={user?.displayName || ""}
                      readOnly
                      className="w-full border px-3 py-2 rounded mt-1 bg-gray-100"
                    />
                  </label>

                  {/* Email */}
                  <label>
                    Email
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full border px-3 py-2 rounded mt-1 bg-gray-100"
                    />
                  </label>

                  {/* Tutor Location */}
                  <label>
                    Your Location
                    <input
                      type="text"
                      placeholder="Enter your location"
                      className="w-full border px-3 py-2 rounded mt-1"
                      {...register("tutorLocation", { required: "Location is required" })}
                    />
                    {errors.tutorLocation && (
                      <p className="text-red-500 text-sm">{errors.tutorLocation.message}</p>
                    )}
                  </label>

                  {/* Qualifications */}
                  <label>
                    Qualifications
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded mt-1"
                      {...register("qualifications", { required: "Qualifications is required" })}
                    />
                    {errors.qualifications && (
                      <p className="text-red-500 text-sm">{errors.qualifications.message}</p>
                    )}
                  </label>

                  {/* Experience */}
                  <label>
                    Experience (Years)
                    <input
                      type="number"
                      className="w-full border px-3 py-2 rounded mt-1"
                      {...register("experience", { required: "Experience is required" })}
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-sm">{errors.experience.message}</p>
                    )}
                  </label>

                  {/* Expected Salary */}
                  <label>
                    Expected Salary
                    <input
                      type="number"
                      className="w-full border px-3 py-2 rounded mt-1"
                      {...register("expectedSalary", { required: "Expected salary is required" })}
                    />
                    {errors.expectedSalary && (
                      <p className="text-red-500 text-sm">{errors.expectedSalary.message}</p>
                    )}
                  </label>

                  {/* Tuition Info */}
                  

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      {isPending ? "Applying..." : "Apply"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Applymodal;