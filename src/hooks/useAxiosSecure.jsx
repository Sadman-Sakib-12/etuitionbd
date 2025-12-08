import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
const useAxiosSecure = () => {
    const { user, logout, loading } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!loading && user?.accessToken) {
            // const requestIn = axiosInstance.interceptors.request.use(
            //     config => {
            //         config.headers.Authorization = `Bearer ${user.accessToken}`
            //         return config
            //     }
            // )

            const responseInterceptor = axiosInstance.interceptors.response.use(
                res => res,
                err => {
                    if (err?.response?.status === 401 || err?.response?.status == 403) {
                        logout()
                            .then(() => {
                                console.log('Successfully')
                            })
                            .catch(console.error)
                        navigate('/login')
                    }
                    return Promise.reject(err)
                }
            )
            return () => {
                // axiosInstance.interceptors.request.eject(requestIn)
                axiosInstance.interceptors.response.eject(responseInterceptor)
            }
        }
    }, [user, loading, logout, navigate])
    return axiosInstance
}

export default useAxiosSecure