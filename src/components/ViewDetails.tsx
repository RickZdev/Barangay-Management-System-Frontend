import { Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetResidentById from "../queries/resident/useGetResidentById";
import { useState } from "react";
import ModalFailed from "./modals/alert/ModalFailed";
import useAuthContext from "../queries/auth/useAuthContext";

type ViewDetailsPropType = {
  residentId: string | undefined;
  residentName: string | undefined;
};

const ViewDetails: React.FC<ViewDetailsPropType> = ({
  residentId,
  residentName,
}) => {
  const navigation = useNavigate();
  const auth = useAuthContext();

  const { data: resident } = useGetResidentById(residentId ?? "");

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  return (
    <>
      {auth?.userRole !== "Resident" ? (
        <Tooltip arrow title="View Resident Details">
          <Typography
            variant="body1"
            onClick={() => {
              if (resident?._id) {
                navigation(`/resident/view/${residentId}`);
              } else {
                setShowErrorModal(true);
              }
            }}
            sx={{ cursor: "pointer" }}
          >
            {residentName}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="body1">{residentName}</Typography>
      )}

      <ModalFailed
        open={showErrorModal}
        title="Resident Not Found"
        description="This resident may have been deleted from the database or is not registered as a resident."
        buttonLabel="Okay"
        handleButtonPress={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default ViewDetails;
