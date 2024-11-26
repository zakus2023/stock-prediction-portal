import React, { createContext, useState } from 'react'

// create the context

const AuthContext = createContext()


const AuthProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem('accessToken')
    )

  return (
    <>
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    </>
  )
}

export default AuthProvider

export {AuthContext}
