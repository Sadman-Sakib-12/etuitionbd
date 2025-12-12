import React from 'react'
import useRole from '../hooks/useRole'
import { Navigate } from 'react-router'

const Adminroute = ({children}) => {
 const [role,isRoleLoading]=useRole()
 if(role === 'admin') return children
 return <Navigate to='/' replace='true'/>
}

export default Adminroute