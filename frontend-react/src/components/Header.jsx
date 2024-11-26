import React, { useContext } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { AuthContext } from "./AuthProvider";

const Header = () => {
  const navigate = useNavigate()
  // using the AuthContext
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () =>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/login')
  }


  return (
    <>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <Link to="/" className="navbar-brand text-light">
          <img src={Logo} alt="Logo" width="200px" />
        </Link>

        <div>
          {isLoggedIn ? (
           
             <>
              <Button text="Dashboard" class="btn-info" url="/dashboard" />
              &nbsp;
               <button className="btn btn-outline-info" onClick={handleLogout}>Logout</button>
             </>
          ) : (
            <>
             
              <Button text="Login" class="btn-outline-info" url="/login" />
              &nbsp;
              <Button text="Register" class="btn-info" url="/register" />
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
