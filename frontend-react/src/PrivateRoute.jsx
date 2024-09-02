import React, { useContext } from 'react'
import { AuthContext } from './components/AuthProvider'
import { Navigate } from 'react-router-dom'




const PrivateRoute = ({children}) => {

    
    const {isLoggedIn} = useContext(AuthContext)

  return isLoggedIn ? (
    children
  ): (
     <Navigate to='/'/>
  )
}

export default PrivateRoute
