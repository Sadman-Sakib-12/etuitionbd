import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { getAuth } from 'firebase/auth';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});
const useAxiosSecure = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        if (!loading && user) {
            // Request interceptor
            const requestInterceptor = axiosInstance.interceptors.request.use(
                async (config) => {
                    if (auth.currentUser) {
                        const token = await auth.currentUser.getIdToken();
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => Promise.reject(error)
            );

            // Response interceptor
            const responseInterceptor = axiosInstance.interceptors.response.use(
                (res) => res,
                async (err) => {
                    if (err?.response?.status === 401 || err?.response?.status === 403) {
                        try {
                            await logout();
                            navigate('/login');
                        } catch (logoutError) {
                            console.error(logoutError);
                        }
                    }
                    return Promise.reject(err);
                }
            );

            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor);
                axiosInstance.interceptors.response.eject(responseInterceptor);
            };
        }
    }, [user, loading, logout, navigate, auth]);

    return axiosInstance;
};

export default useAxiosSecure;
