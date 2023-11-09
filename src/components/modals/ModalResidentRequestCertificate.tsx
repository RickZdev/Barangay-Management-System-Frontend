import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import SubmitButton from "../SubmitButton";

import { Close } from "@mui/icons-material";

import TextField from "../TextField";
import SelectField from "../SelectField";
import SELECTION from "../../constants/SELECTION";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { certificateFormValidation } from "../../utils/validation";
import { CertificationsPropType, ResidentPropType } from "../../utils/types";
import SelectFieldTemp from "../SelectFieldTemp";
import useCreateCertificate from "../../queries/certificates/useCreateCertificate";
import dayjs from "dayjs";
import { getResidentFullName } from "../../helper/getResidentFullName";
import LoaderModal from "./loader/LoaderModal";
import ModalSuccess from "./alert/ModalSuccess";
import useAuthContext from "../../queries/auth/useAuthContext";
import useGetResidentById from "../../queries/resident/useGetResidentById";
import { getResidentFullAddress } from "../../helper/getResidentFullAddres";

type ModalRequestCertificatePropType = {
  open: boolean;
  handleClose: () => void;
};

const ModalResidentRequestCertificate: React.FC<
  ModalRequestCertificatePropType
> = ({ open, handleClose }) => {
  const auth = useAuthContext();

  const {
    register,
    setValue,
    clearErrors,
    setError,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(certificateFormValidation),
  });

  const { data: resident, isLoading: isResidentLoading } = useGetResidentById(
    auth?.userId
  );
  const { mutateAsync: createCertificate } = useCreateCertificate();

  const [selectedCertificateType, setSelectedCertificateType] = useState<
    CertificationsPropType | undefined
  >();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [showWithPurpose, setShowWithPurpose] = useState<boolean>(false);
  const [showWithBusinessPermit, setShowWithBusinessPermit] =
    useState<boolean>(false);
  const [showWithJobseeker, setshowWithJobseeker] = useState<boolean>(false);

  const handleCloseModal = () => {
    setValue("typeOfCertificate", "");
    setSelectedCertificateType(undefined);
    handleClose();
    clearErrors();
  };

  const handleSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCreateCertificate = async (certificateData: any) => {
    const res = await createCertificate({
      residentId: resident?._id,
      residentName: getResidentFullName({
        lastName: resident?.lastName,
        firstName: resident?.firstName,
        middleName: resident?.middleName,
        suffix: resident?.suffix,
      }),
      dateRequested: dayjs().format("MM/DD/YYYY - hh:mm A"),
      dateOfReleased: "",
      typeOfCertificate: selectedCertificateType ?? "Barangay Clearance",
      certificateData: certificateData,
    });

    handleCloseModal();

    if (res?.data) {
      setShowSuccessModal(true);
    }
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    const { typeOfCertificate, residentName, ...moreData } = data;

    const certificateData = {
      fullName: resident?.fullName,
      address: {
        houseNumber: resident?.houseNumber,
        streetAddress: resident?.streetAddress,
      },
      ...moreData,
    };

    const certificationType = selectedCertificateType;

    if (
      certificationType === "Certificate of Indigency" ||
      certificationType === "Barangay Clearance" ||
      certificationType === "Certificate of Residency"
    ) {
      if (!data?.purpose) {
        setError("purpose", { message: "This is a required field." });
      } else {
        await handleCreateCertificate(certificateData);
        setValue("purpose", "");
      }
    } else if (certificationType === "First-time Jobseeker Certificate") {
      if (!data?.residency) {
        setError("residency", { message: "This is a required field." });
      } else {
        await handleCreateCertificate(certificateData);
        setValue("residency", "");
      }
    } else if (certificationType === "Business Permit") {
      if (!data?.businessOwner) {
        setError("businessOwner", { message: "This is a required field." });
      } else if (!data?.businessName) {
        setError("businessName", { message: "This is a required field." });
      } else if (!data?.businessAddress) {
        setError("businessAddress", { message: "This is a required field." });
      } else if (!data?.businessNature) {
        setError("businessNature", { message: "This is a required field." });
      } else if (!data?.ownership) {
        setError("ownership", { message: "This is a required field." });
      } else if (!data?.building) {
        setError("building", { message: "This is a required field." });
      } else {
        await handleCreateCertificate(certificateData);
        setValue("ownership", "");
        setValue("building", "");
        setValue("businessAddress", "");
        setValue("businessName", "");
        setValue("businessNature", "");
        setValue("businessOwner", "");
      }
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    setValue(
      "residentName",
      getResidentFullName({
        lastName: resident?.lastName,
        firstName: resident?.firstName,
        middleName: resident?.middleName,
        suffix: resident?.suffix,
      })
    );
    setValue("typeOfCertificate", "");
  }, []);

  useEffect(() => {
    const certificationType = selectedCertificateType;

    if (
      certificationType === "Certificate of Indigency" ||
      certificationType === "Barangay Clearance" ||
      certificationType === "Certificate of Residency"
    ) {
      setShowWithPurpose(true);
      setShowWithBusinessPermit(false);
      setshowWithJobseeker(false);
      setValue("ownership", "");
      setValue("building", "");
      setValue("businessAddress", "");
      setValue("businessName", "");
      setValue("businessNature", "");
      setValue("businessOwner", "");
      setValue("residency", "");
    } else if (certificationType === "Business Permit") {
      setShowWithBusinessPermit(true);
      setShowWithPurpose(false);
      setshowWithJobseeker(false);
      setValue("purpose", "");
      setValue("residency", "");
    } else if (certificationType === "First-time Jobseeker Certificate") {
      setshowWithJobseeker(true);
      setShowWithBusinessPermit(false);
      setShowWithPurpose(false);
      setValue("purpose", "");
      setValue("ownership", "");
      setValue("building", "");
      setValue("businessAddress", "");
      setValue("businessName", "");
      setValue("businessNature", "");
      setValue("businessOwner", "");
    } else {
      setShowWithBusinessPermit(false);
      setShowWithPurpose(false);
      setshowWithJobseeker(false);
      resetField("building");
      resetField("ownership");
      resetField("businessAddress");
      resetField("businessName");
      resetField("businessNature");
      resetField("businessOwner");
      resetField("purpose");
      resetField("residency");
      resetField("residentName");
      resetField("typeOfCertificate");
      setSelectedCertificateType(undefined);
    }

    clearErrors("typeOfCertificate");
  }, [selectedCertificateType]); // RE-RENDER HERE

  return (
    <>
      <LoaderModal isLoading={isProcessing || isResidentLoading} />
      <Dialog
        PaperProps={{ sx: { backgroundColor: "#29283d", borderRadius: 5 } }}
        onClose={handleCloseModal}
        open={open}
        maxWidth={"xs"}
        fullWidth
        sx={{ borderRadius: 20 }}
      >
        <Card>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col bg-[#29283d] p-4"
          >
            <Tooltip
              arrow
              title="Close"
              sx={{ alignSelf: "flex-end" }}
              color="error"
              onClick={handleCloseModal}
            >
              <IconButton>
                <Close color="error" />
              </IconButton>
            </Tooltip>

            <CardHeader title="Request Certification" />

            <TextField
              label="Resident's Name"
              initialValue={getResidentFullName({
                lastName: resident?.lastName,
                firstName: resident?.firstName,
                middleName: resident?.middleName,
                suffix: resident?.suffix,
              })}
              isCapitalize
            />

            <TextField
              label={"Resident's Address"}
              initialValue={getResidentFullAddress({
                houseNumber: resident?.houseNumber,
                streetAddress: resident?.streetAddress,
                purokNumber: resident?.purokNumber,
              })}
              isCapitalize
            />

            <SelectFieldTemp
              label={"Select Certification"}
              selections={SELECTION.certificateSelection}
              isEdit
              onChange={(e: any) => {
                setValue("typeOfCertificate", e.target.value);
                setSelectedCertificateType(e.target.value);
              }}
              error={errors?.typeOfCertificate?.message}
            />

            {showWithPurpose && (
              <TextField
                register={register("purpose")}
                label={"Purpose"}
                isEdit
                isCapitalize
                error={errors?.purpose?.message}
              />
            )}

            {showWithJobseeker && (
              <TextField
                register={register("residency")}
                label={"Residency"}
                isEdit
                isCapitalize
                error={errors?.residency?.message}
              />
            )}

            {showWithBusinessPermit && (
              <>
                <TextField
                  register={register("businessOwner")}
                  label={"Business Owner"}
                  isEdit
                  isCapitalize
                  error={errors?.businessOwner?.message}
                />

                <TextField
                  register={register("businessName")}
                  label={"Business Name"}
                  isEdit
                  isCapitalize
                  error={errors?.businessName?.message}
                />

                <TextField
                  register={register("businessAddress")}
                  label={"Business Address"}
                  isEdit
                  isCapitalize
                  error={errors?.businessAddress?.message}
                />

                <TextField
                  register={register("businessNature")}
                  label={"Nature of Business"}
                  isEdit
                  isCapitalize
                  error={errors?.businessNature?.message}
                />

                <SelectField
                  register={register("ownership")}
                  selections={SELECTION.certificateOwnershipSelection}
                  label={"Ownership"}
                  isEdit
                  error={errors?.ownership?.message}
                />

                <SelectField
                  register={register("building")}
                  selections={SELECTION.certificateBuildingSelection}
                  label={"Building"}
                  isEdit
                  error={errors?.building?.message}
                />
              </>
            )}

            <div className="flex justify-end">
              <SubmitButton label="Submit" />
            </div>
          </form>
        </Card>
      </Dialog>

      <ModalSuccess
        open={showSuccessModal}
        title="Certificate Request Completed"
        description="Please check your email after 1-3 days about the status of your request." // asked about what the instruction or what to do next
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccessModal}
      />
    </>
  );
};

export default ModalResidentRequestCertificate;
