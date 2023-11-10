import { useNavigate } from "react-router-dom";
import { NavigateBefore } from "@mui/icons-material";

const BackButton = ({
  label,
  handleNavigate,
}: {
  label?: string;
  handleNavigate?: () => void;
}) => {
  const navigation = useNavigate();

  return (
    <div className="flex justify-start">
      <div className="cursor-pointer flex-row flex items-center space-x-1">
        <NavigateBefore
          fontSize="medium"
          className="text-black"
          color="inherit"
        />

        {handleNavigate ? (
          <p
            onClick={handleNavigate}
            className="text-sm text-secondary-gold font-bold"
          >
            {label ?? "Back"}
          </p>
        ) : (
          <p
            onClick={() => navigation(-1)}
            className="text-sm text-secondary-gold font-bold"
          >
            {label ?? "Back"}
          </p>
        )}
      </div>
    </div>
  );
};

export default BackButton;
