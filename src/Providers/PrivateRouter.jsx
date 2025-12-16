import { Navigate, useLocation } from 'react-router'
import useAuth from '../hooks/useAuth'
import LoadingSpin from '../componet/LoadingSpin'

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return (
            <div>
                <LoadingSpin/>
            </div>
        )
    }
    if (user) return children
    return <Navigate to="/login" state={location.pathname} replace />
}

export default PrivateRouter