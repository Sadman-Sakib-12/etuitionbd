import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { saveOrUpdateUser } from '../utils';

const Register = () => {
    const {  creatUserWithEamil, signInWithGoogle,  updateUsserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const [selectedRole, setSelectedRole] = useState('student');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { name, email, password, phone } = data;
        try {
            const result = await  creatUserWithEamil(email, password);
            await  updateUsserProfile(name);

            // Save to DB
            await saveOrUpdateUser({
                name,
                email,
                role: selectedRole,
                phone
            });

            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
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

            navigate(from, { replace: true });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="hero-content mx-auto p-5 flex-col lg:flex-row-reverse">
            <div className="card bg-base-100 w-[300px] md:w-[400px] shadow-2xl">
                <div className="card-body w-[300px] md:w-96">
                    <h1 className="text-center font-bold text-2xl">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Name</label>
                        <input
                            type="text"
                            className="input"
                            {...register('name', { required: 'Name is required', maxLength: 20 })}
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

                        <label>Email</label>
                        <input
                            type="email"
                            className="input"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

                        <label>Password</label>
                        <input
                            type="password"
                            className="input"
                            {...register('password', { required: 'Password required', minLength: 6 })}
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

                        <label>Role</label>
                        <select
                            className="input"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                        </select>

                        <label>Phone</label>
                        <input
                            type="text"
                            className="input"
                            {...register('phone', { required: 'Phone is required', maxLength: 11 })}
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}

                        <button type="submit" className="btn btn-neutral mt-4">Register</button>
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="btn flex items-center justify-center gap-2 mt-2"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
                            Continue with Google
                        </button>

                        <p className="mt-2">
                            Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
