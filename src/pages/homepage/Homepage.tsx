import React from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-center">HOMEPAGE</h1>

      <div className="flex flex-1 flex-col justify-center items-center h-screen">
        <div className="space-y-2">
          <h1 className="text-center">PORTAL</h1>
          <CustomButton
            label="Resident Portal"
            onClick={() => navigate("/portal/resident")}
          />
          <CustomButton
            label="Admin Portal"
            onClick={() => navigate("/portal/admin")}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
