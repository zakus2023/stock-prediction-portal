import React, { useEffect } from "react";
import axiosInstance from "../../axiosinstance";

const Dashboard = () => {
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view");
        
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchProtectedData();
  }, []);

  return <div className="container text-center"><h2 className="text-light">Dashboard</h2></div>;
};

export default Dashboard;
