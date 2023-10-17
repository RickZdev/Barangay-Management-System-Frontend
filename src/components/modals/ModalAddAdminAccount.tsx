import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import { ResidentPropType } from "../../utils/types";
import SelectField from "../SelectField";
import SELECTION from "../../constants/SELECTION";
import SubmitButton from "../SubmitButton";
import { useForm } from "react-hook-form";
import useCreateAdmin from "../../queries/admin/useCreateAdmin";
import OfficialSearchableTextField from "../OfficialsSearchableTextField";
import { Close } from "@mui/icons-material";

type ModalAddAdminAccountPropType = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddAdminAccount: React.FC<ModalAddAdminAccountPropType> = ({
  open,
  handleClose,
}) => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useCreateAdmin();
  const [adminDetails, setAdminDetails] = useState<ResidentPropType>();
  const handleChange = (resident: ResidentPropType | undefined) => {
    setAdminDetails(resident);
  };

  const onSubmit = (event: any) => {
    handleClose();
    const { adminRole } = event;
    mutate({ adminId: adminDetails?._id, adminRole: adminRole });
    console.log({
      adminId: adminDetails?._id,
    });
  };

  return (
    <Dialog
      PaperProps={{ sx: { backgroundColor: "#29283d", borderRadius: 5 } }}
      onClose={handleClose}
      open={open}
      maxWidth={"xs"}
      fullWidth
      sx={{ borderRadius: 20 }}
    >
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 flex flex-col bg-[#29283d] p-4">
            <Tooltip
              arrow
              title="Close"
              sx={{ alignSelf: "flex-end" }}
              color="error"
              onClick={handleClose}
            >
              <IconButton>
                <Close color="error" />
              </IconButton>
            </Tooltip>
            <CardHeader title="Add Admin Account" />
            <OfficialSearchableTextField
              label="Admin User"
              handleChange={handleChange}
              isEdit
            />
            <SelectField
              label="Admin Role"
              selections={SELECTION.adminRoleTypeSelection}
              isEdit
              register={register("adminRole")}
            />

            <div className="flex justify-end">
              <SubmitButton label="Submit" />
            </div>
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default ModalAddAdminAccount;
