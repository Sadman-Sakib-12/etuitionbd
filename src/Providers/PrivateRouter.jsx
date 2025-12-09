import { Navigate, useLocation } from 'react-router'
import useAuth from '../hooks/useAuth'

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    // if (loading) {
    //     return (
    //         <div>
    //             <Loading />
    //         </div>
    //     )
    // }
    if (user) return children
    return <Navigate to="/login" state={location.pathname} replace />
}

export default PrivateRouter