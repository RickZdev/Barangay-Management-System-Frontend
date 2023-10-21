import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { adminFormValidation } from "../../utils/validation";
import { getResidentFullName } from "../../helper/getResidentFullName";

type ModalAddAdminAccountPropType = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddAdminAccount: React.FC<ModalAddAdminAccountPropType> = ({
  open,
  handleClose,
}) => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminFormValidation),
  });

  const { mutate } = useCreateAdmin();

  const [isOfficialTextEmpty, setisOfficialTextEmpty] = useState<boolean>(true);
  const [official, setOfficial] = useState<ResidentPropType | undefined>();

  const onSubmit = (data: any) => {
    const { adminRole } = data;

    mutate({ adminId: official?._id, adminRole: adminRole });

    setOfficial(undefined);
    setValue("adminName", "");
    setValue("adminRole", "");
    clearErrors();
    handleClose();
  };

  useEffect(() => {
    if (isOfficialTextEmpty) {
      setValue(
        "adminName",
        getResidentFullName({
          lastName: official?.lastName,
          firstName: official?.firstName,
          middleName: official?.middleName,
          suffix: official?.suffix,
        })
      );

      clearErrors("adminName");
    } else {
      setValue("adminName", "");
      setError("adminName", { message: "This is a required field." });
    }
  }, [isOfficialTextEmpty]);

  useEffect(() => {
    setValue("adminName", "");
    setValue("adminRole", "");
  }, []);

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
              onClick={() => {
                setOfficial(undefined);
                setValue("adminName", "");
                setValue("adminRole", "");
                clearErrors();
                handleClose();
              }}
            >
              <IconButton>
                <Close color="error" />
              </IconButton>
            </Tooltip>

            <CardHeader title="Add/Edit Admin Account" />

            <OfficialSearchableTextField
              label="Admin User"
              isEdit
              handleChange={setOfficial}
              handleIsEmptyText={setisOfficialTextEmpty}
              error={errors?.adminName?.message}
            />

            <SelectField
              label="Admin Role"
              selections={SELECTION.adminRoleTypeSelection}
              isEdit
              register={register("adminRole")}
              error={errors?.adminRole?.message}
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
