import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const PrivateRouter = ({children}) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()
    // if (loading) {
    //     return (
    //         <div>
    //             <Loading />
    //         </div>
    //     )
    // }
    if (!user) {
        return <Navigate to="/login" state={location.pathname} />
    }
    return children;
}

export default PrivateRouter