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

  return <div></div>;
};

export default Dashboard;
