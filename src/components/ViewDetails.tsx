import { Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetResidentById from "../queries/resident/useGetResidentById";

type ViewDetailsPropType = {
  residentId: string | undefined;
  residentName: string | undefined;
};

const ViewDetails: React.FC<ViewDetailsPropType> = ({
  residentId,
  residentName,
}) => {
  const navigation = useNavigate();
  const { data: resident } = useGetResidentById(residentId);

  return (
    <Tooltip arrow title="View Resident Details">
      <Typography
        variant="body1"
        onClick={() => {
          if (resident?._id) {
            navigation(`/resident/view/${residentId}`);
          } else {
            alert("NON INHABITANT");
          }
        }}
        sx={{ cursor: "pointer" }}
      >
        {residentName}
      </Typography>
    </Tooltip>
  );
};

export default ViewDetails;
