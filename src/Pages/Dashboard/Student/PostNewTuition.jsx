import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { BookOpen, MapPin, GraduationCap, DollarSign, Send } from "lucide-react";

const PostNewTuition = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/tuition", data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Tuition Posted Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const onSubmit = async (data) => {
    const tuitionData = {
      subject: data.subject,
      level: data.level,
      salary: parseFloat(data.salary),
      salaryType: "per month",
      location: data.location,
      mode: data.mode,
      daysPerWeek: parseInt(data.daysPerWeek),
      time: data.time,
      posted: new Date().toISOString(),
      status: "Pending",
      student: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
    };

    await mutateAsync(tuitionData);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Post New Tuition
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">

          {/* Subject */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <BookOpen size={16} /> Subject
            </label>
            <input
              {...register("subject", { required: true })}
              placeholder="Chemistry"
              className="input input-bordered w-full"
            />
          </div>

          {/* Level */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <GraduationCap size={16} /> Level
            </label>
            <input
              {...register("level", { required: true })}
              placeholder="Intermediate"
              className="input input-bordered w-full"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <DollarSign size={16} /> Salary
            </label>
            <input
              type="number"
              {...register("salary", { required: true })}
              placeholder="2000"
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <MapPin size={16} /> Location
            </label>
            <input
              {...register("location", { required: true })}
              placeholder="Kishoreganj"
              className="input input-bordered w-full"
            />
          </div>

          {/* Mode */}
          <div>
            <label className="mb-2 block">Mode</label>
            <select {...register("mode")} className="select select-bordered w-full">
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Days */}
          <div>
            <label className="mb-2 block">Days Per Week</label>
            <input
              type="number"
              {...register("daysPerWeek")}
              placeholder="3"
              className="input input-bordered w-full"
            />
          </div>

          {/* Time */}
          <div>
            <label className="mb-2 block">Time</label>
            <select {...register("time")} className="select select-bordered w-full">
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {isPending ? "Posting..." : "Post Tuition"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewTuition;