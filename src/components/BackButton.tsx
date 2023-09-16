import { useNavigate } from "react-router-dom";
import { NavigateBefore } from "@mui/icons-material";

const BackButton: React.FC = () => {
  const navigation = useNavigate();
  return (
    <div className="flex justify-start">
      <div className="cursor-pointer flex-row flex items-center space-x-1">
        <NavigateBefore fontSize="medium" className="text-white" />
        <p onClick={() => navigation(-1)} className="text-sm text-[#50D5B7]">
          Back
        </p>
      </div>
    </div>
  );
};

export default BackButton;
