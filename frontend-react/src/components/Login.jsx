import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "./AuthProvider";
import axiosInstance from "../axiosinstance";

const Login = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')

  // using the AuthContext
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/token/",
        userData
      );
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      setIsLoggedIn(true)
      navigate('/dashboard')
    } catch (error) {
      setError("Invalid credentials")
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container text-light">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-3">Login</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  autoComplete="current-password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <div className="text-danger">{error}</div>}

              {loading ? (
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto"
                  disabled
                >
                  <FontAwesomeIcon icon={faSpinner} spin />
                   Please wait
                </button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
