import React, { useState } from "react";

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // create the user data object

    const userData = {
      username,
      email,
      password,
    };

    try {
        setLoading(true)
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData
      );
      setErrors("");
      setLoading(false)
      setSuccess(true);
      
    } catch (error) {
        
      setErrors(error.response.data);
      
    }finally{
        setLoading(false)
    }
  };

  return (
    <>
      <div className="container text-light">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-3">Create an Account</h3>
            <form onSubmit={handleSubmitForm}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                <small className="">
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <small className="mb-2">
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </small>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  autoComplete="current-password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small className="mb-2">
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </small>
              </div>
              {success && (
                <div className="alert alert-success">
                  Registration Successfull
                </div>
              )}
              {
                loading ? (
                    <button type="submit" className="btn btn-info d-block mx-auto" disabled ><FontAwesomeIcon icon={faSpinner} spin/>
                Please wait
              </button>
                ):<button type="submit" className="btn btn-info d-block mx-auto">
                Register
              </button>
              }
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
