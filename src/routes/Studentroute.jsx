import React from 'react'
import useRole from '../hooks/useRole'

const Studentroute = () => {
  const [role,isRoleLoading]=useRole()
 if(role === 'student') return children
 return <Navigate to='/' replace='true'/>
}

export default Studentroute