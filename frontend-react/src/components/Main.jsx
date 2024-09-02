import React, { useContext } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { AuthContext } from './AuthProvider'


const Main = () => {

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const handleLogout = () =>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
  }


  return (
    <>
    
    <div className="container ">
        <div className="p-5 text-center bg-light-dark rounded">
            <h1 className='text-light'>Abdul Stock Prediction Portal</h1>
            <p className="text-light  lead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit veritatis 
                libero fugiat debitis rem nesciunt maxime tenetur. Distinctio nisi officia, 
                explicabo neque, blanditiis maxime perferendis nam voluptatem temporibus vitae impedit.
            </p>
            {isLoggedIn ? (
              <button className="btn btn-outline-info" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Button text="Login" class="btn-outline-info" url="/login" />
             
            </>
          )}
        </div>
    </div>
   
    </>
  )
}

export default Main
