import React, { useContext } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Main = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <div className="container ">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className="text-light">Abdul Stock Prediction Portal</h1>
          <p className="text-light  lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit veritatis libero fugiat debitis rem nesciunt maxime
            tenetur. Distinctio nisi officia, explicabo neque, blanditiis maxime
            perferendis nam voluptatem temporibus vitae impedit.
          </p>

          <Button
            text="Expolore Now"
            class="btn-outline-info"
            url="/dashboard"
          />
        </div>
      </div>
    </>
  );
};

export default Main;
