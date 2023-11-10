import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import Logo from "../../assets/images/navotas-background.jpeg";
import BarangayLogo from "../../assets/logo/barangay-logo.png";
import AdminLogo from "../../assets/logo/administrator-logo.png";
import ResidentLogo from "../../assets/logo/resident-logo.png";
import CardPhoto from "../../components/CardPhoto";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className=" loginForm-background">
      <div className="flex flex-1 flex-col justify-center items-center h-screen">
        <div className="space-y-2">
          <CardPhoto image={BarangayLogo} showTooltip={false} size={150} />
          <p className="text-center text-white uppercase font-bold text-5xl font-poppins">
            BARANGAY NAVOTAS EAST
          </p>
          <p className="text-center text-white font-bold text-md">
            Barangay Information Management System
          </p>

          <div className="flex flex-row space-x-10 pt-10">
            <Card
              className="w-[75%] cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={AdminLogo}
              onClick={() => navigate("/portal/admin")}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                ADMIN PORTAL
              </h5>
            </Card>

            <Card
              className="w-[75%] cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={ResidentLogo}
              onClick={() => navigate("/portal/resident")}
            >
              <h5 className="text-2xl font-bold tracking-tight dark:text-white text-center uppercase text-black">
                Resident Portal
              </h5>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
