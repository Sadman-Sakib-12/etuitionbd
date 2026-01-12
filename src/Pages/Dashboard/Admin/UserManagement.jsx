import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaUserShield, FaUsers } from 'react-icons/fa';
import { Mail, Phone, ShieldCheck, UserCircle } from 'lucide-react';
import UserEditModal from '../../../componet/Modal/UserEditModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import LoadingSpin from '../../../componet/LoadingSpin';

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [editingUser, setEditingUser] = useState(null);

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const handleDelete = async (userToDelete) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `This action will permanently remove ${userToDelete.name}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete user',
            customClass: { popup: 'rounded-[2rem]' }
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/user/${userToDelete._id}`);
                queryClient.invalidateQueries(['users']);
                Swal.fire('Deleted!', 'User has been removed.', 'success');
            } catch (err) {
                Swal.fire('Error', 'Failed to delete user.', 'error');
            }
        }
    };

    if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpin /></div>;

    return (
        <div className="p-4 md:p-15 ">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-4xl font-black  tracking-tight">User Management</h2>
                    <p className=" font-medium mt-2 flex items-center gap-2">
                        <FaUserShield className="text-indigo-500" /> Administrative control over all registered users
                    </p>
                </div>
                
                {/* Stats Card */}
                <div className=" border border-slate-100 p-5 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center gap-4">
                    <div className="h-12 w-12  rounded-2xl flex items-center justify-center text-indigo-600">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black  uppercase tracking-widest">Total Users</p>
                        <p className="text-xl font-black  leading-none">{users.length}</p>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className=" rounded-[2.5rem] border border-slate-100 shadow-2xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className=" border-b border-slate-100">
                                <th className="px-8 py-6 text-[11px] font-black  uppercase tracking-widest">User Profile</th>
                                <th className="px-6 py-6 text-[11px] font-black  uppercase tracking-widest">Contact Info</th>
                                <th className="px-6 py-6 text-[11px] font-black  uppercase tracking-widest text-center">Role</th>
                                <th className="px-6 py-6 text-[11px] font-black  uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((u) => (
                                <tr key={u._id} className="group ">
                                    {/* User Image & Name */}
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img 
                                                    src={u.image || '/default-profile.png'} 
                                                    alt={u.name} 
                                                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
                                                />
                                                {u.verified && (
                                                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                                        <ShieldCheck size={14} className="text-indigo-600 fill-indigo-50" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold  text-sm">{u.name}</p>
                                                <p className="text-[10px]  font-bold uppercase tracking-tighter">ID: {u._id.slice(-8)}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Contact Details */}
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold  flex items-center gap-2">
                                                <Mail size={12} className="" /> {u.email}
                                            </p>
                                            <p className="text-xs font-medium  flex items-center gap-2">
                                                <Phone size={12} /> {u.phone || 'No phone'}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Role Badge */}
                                    <td className="px-6 py-5 text-center">
                                        <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                                            u.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                            u.role === 'tutor' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            'bg-slate-50 text-slate-500 border-slate-100'
                                        }`}>
                                            {u.role}
                                        </span>
                                    </td>

                                    {/* Verification Status */}
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center">
                                            {u.verified ? (
                                                <div className="flex flex-col items-center gap-1">
                                                    <FaCheckCircle className="text-emerald-500" size={18} />
                                                    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Verified</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-1">
                                                    <FaTimesCircle className="text-slate-300" size={18} />
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pending</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="px-8 py-5">
                                        <div className="flex justify-end items-center gap-2 ">
                                            <button 
                                                onClick={() => setEditingUser(u)} 
                                                className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm"
                                                title="Edit User"
                                            >
                                                <FaEdit size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(u)} 
                                                className="p-3 bg-white border border-slate-200 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all shadow-sm"
                                                title="Delete User"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserEditModal editingUser={editingUser} setEditingUser={setEditingUser} />
        </div>
    );
};

export default UserManagement;