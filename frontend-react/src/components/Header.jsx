import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/Logo.png'

const Header = () => {
  return (
    <>
    <nav className='navbar container pt-3 pb-3 align-items-start'>
    <Link to='/' className='navbar-brand text-light'><img src={Logo} alt="Logo" width='200px'/></Link>

    <div className="">
        <Button text="Login" class="btn-outline-info" url='/login'/>
        &nbsp;
        <Button text= "Register" class='btn-info'url='/register'/>
    </div>
    </nav>

    </>
  )
}

export default Header
