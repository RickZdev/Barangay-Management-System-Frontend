import TextField from "../../../components/TextField";
import Card from "../../../components/Card";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import TextAreaField from "../../../components/TextAreaField";
import CustomButton from "../../../components/CustomButton";
import CardHeader from "../../../components/CardHeader";
import CardPhoto from "../../../components/CardPhoto";
import BackButton from "../../../components/BackButton";
import dayjs, { Dayjs } from "dayjs";
import { getResidentAge } from "../../../helper/getResidentAge";
import DatePickerField from "../../../components/DatePickerField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import SelectField from "../../../components/SelectField";
import RadioButton from "../../../components/RadioButton";
import NumberField from "../../../components/NumberField";
import SELECTION from "../../../constants/SELECTION";
import Loading from "../../errors/Loading";
import useGetResidentById from "../../../queries/resident/useGetResidentById";
import useUpdateResident from "../../../queries/resident/useUpdateResident";
import useGetUserById from "../../../queries/user/useGetUserById";
import { residentFormValidation } from "../../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { citizenship } from "../../../static/citizenship.json";
import _ from "lodash";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import ModalFailed from "../../../components/modals/alert/ModalFailed";
import DefaultUserAvatar from "../../../assets/images/default-user-avatar.png";
import useDragAndDrop from "../../../hooks/useDragAndDrop";
import useFirebaseStorage from "../../../hooks/useFirebaseStorage";
import useAuthContext from "../../../queries/auth/useAuthContext";

const ResidentView = ({ isEditable = true }: { isEditable?: boolean }) => {
  const auth = useAuthContext();
  const { _id: residentId } = useParams();

  const { data: resident, isLoading: isResidentLoading } =
    useGetResidentById(residentId);
  const { data: userDetails, isLoading: isUserLoading } =
    useGetUserById(residentId);

  const { mutateAsync, isLoading: isUpdateResidentLoading } =
    useUpdateResident(residentId);

  const { image, setImage, getRootProps } = useDragAndDrop();
  const { handleUploadImage } = useFirebaseStorage();

  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    values: {
      lastName: resident?.lastName ?? "",
      firstName: resident?.firstName ?? "",
      middleName: resident?.middleName ?? "",
      suffix: resident?.suffix ?? "",
      sex: resident?.sex ?? "",
      emailAddress: resident?.emailAddress ?? "",
      contactNumber: resident?.contactNumber ?? "",
      birthDate: resident?.birthDate ?? "",
      age: resident?.age,
      educationalAttainment: resident?.educationalAttainment ?? "",
      civilStatus: resident?.civilStatus ?? "",
      citizenship: resident?.citizenship ?? "",
      occupation: resident?.occupation ?? "",
      category: resident?.category ?? "",
      houseNumber: resident?.houseNumber?.toString() ?? "",
      streetAddress: resident?.streetAddress ?? "",
      purokNumber: resident?.purokNumber?.toString() ?? "",
    },
    resolver: yupResolver(residentFormValidation),
    mode: "onChange",
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showEmailErrorModal, setShowEmailErrorModal] =
    useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [age, setAge] = useState<string>();

  const isLoading =
    isResidentLoading ||
    isUserLoading ||
    isUpdateResidentLoading ||
    isProcessing;

  const citizenshipList = useMemo(() => {
    const dropdownCitizenships = _.map(
      citizenship,
      (item: { id: number; value: string }) => {
        return {
          id: item.id,
          label: item.value,
          value: item.value,
        };
      }
    );

    const filipinoIndex = dropdownCitizenships.findIndex(
      (nationality: { id: number; value: string }) =>
        nationality.value === "Filipino"
    );

    if (filipinoIndex !== -1) {
      const filipino = dropdownCitizenships.splice(filipinoIndex, 1)[0];
      dropdownCitizenships.unshift(filipino);
    }

    return dropdownCitizenships;
  }, [citizenship]);

  const handleOnChangeDate = (date: Dayjs | null) => {
    setDateValue(date);
    let birthDate = date?.format("MM/DD/YYYY");

    const currentAge = getResidentAge(birthDate);
    setAge(currentAge.toString());

    setValue("birthDate", birthDate ?? "");
    setValue("age", currentAge);

    if (getValues().birthDate) {
      clearErrors("birthDate");
    }
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    let uploadedImage = "";
    let updatedData;

    if (resident?.profilePhoto !== image) {
      uploadedImage = await handleUploadImage(image ?? "", "profile");

      updatedData = {
        birthDate: dateValue?.format("MM/DD/YYYY"),
        profilePhoto: uploadedImage,
        ...data,
      };
    } else {
      updatedData = {
        birthDate: dateValue?.format("MM/DD/YYYY"),
        ...data,
      };
    }

    const response = await mutateAsync({
      residentId,
      updatedData: updatedData,
    });

    if (response?.data?.error === "Email address already in use.") {
      setIsProcessing(false);
      setShowEmailErrorModal(true);
    } else if (response?.message === "Resident Updated Successfully.") {
      setIsProcessing(false);
      setShowSuccessModal(true);
      setIsEdit(false);
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    setImage(resident?.profilePhoto);
    setAge(resident?.age?.toString());

    if (resident?.birthDate) {
      const dateObj = dayjs(resident?.birthDate);
      setDateValue(dateObj);
    }
  }, [resident]);

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <form className="pb-10" onSubmit={handleSubmit(onSubmit)}>
        <BackButton />

        <div className="mt-5 grid md:grid-cols-2 sm:grid-cols-1 min-[400px]:gap-y-6 gap-x-6">
          <div className="flex flex-col space-y-6">
            <Card>
              <CardHeader title="Contact Details" />
              <div className="space-y-3">
                <TextField
                  register={register("lastName")}
                  label={"Last Name"}
                  isEdit={isEdit}
                  isCapitalize
                  error={errors?.lastName?.message}
                />
                <TextField
                  register={register("firstName")}
                  label={"First Name"}
                  isEdit={isEdit}
                  isCapitalize
                  error={errors?.firstName?.message}
                />
                <TextField
                  register={register("middleName")}
                  label={"Middle Name"}
                  isOptional
                  isEdit={isEdit}
                  isCapitalize
                  error={errors?.middleName?.message}
                />

                <SelectField
                  register={register("suffix")}
                  label={"Suffix"}
                  initialValue={resident?.suffix}
                  selections={SELECTION.suffixSelection}
                  isEdit={isEdit}
                  isOptional
                  error={errors?.suffix?.message}
                />

                <RadioButton
                  label="Sex"
                  initialValue={resident?.sex}
                  selections={SELECTION.sexSelection}
                  isEdit={isEdit}
                />

                <TextField
                  register={register("emailAddress")}
                  label={"Email Address"}
                  isEdit={isEdit}
                  error={errors?.emailAddress?.message}
                />

                <NumberField
                  register={register("contactNumber")}
                  label={"Contact Number"}
                  isEdit={isEdit}
                  error={errors?.contactNumber?.message}
                />

                <DatePickerField
                  label="Date of Birth"
                  value={dateValue}
                  isEdit={isEdit}
                  onChange={handleOnChangeDate}
                  error={errors?.birthDate?.message}
                />

                <TextField
                  label="Age"
                  value={age === "NaN" ? "" : age}
                  error={
                    parseInt(age ?? "") < 0 ? "Age cannot be negative." : ""
                  }
                />

                <SelectField
                  register={register("educationalAttainment")}
                  label={"Educational Attainment"}
                  initialValue={resident?.educationalAttainment ?? ""}
                  isEdit={isEdit}
                  isOptional
                  selections={SELECTION.educationalAttainmentSelection}
                  error={errors?.educationalAttainment?.message}
                />

                <SelectField
                  register={register("civilStatus")}
                  label={"Civil Status"}
                  initialValue={resident?.civilStatus ?? ""}
                  isEdit={isEdit}
                  selections={SELECTION.civilStatusSelection}
                  error={errors?.civilStatus?.message}
                />

                <SelectField
                  register={register("citizenship")}
                  label={"Citizenship"}
                  initialValue={resident?.citizenship ?? ""}
                  isEdit={isEdit}
                  selections={citizenshipList}
                  error={errors?.citizenship?.message}
                />

                <TextField
                  register={register("occupation")}
                  label={"Occupation"}
                  isEdit={isEdit}
                  error={errors?.occupation?.message}
                />

                <SelectField
                  register={register("category")}
                  label={"Category"}
                  initialValue={resident?.category ?? ""}
                  selections={SELECTION.categorySelection}
                  isEdit={isEdit}
                  isOptional
                  error={errors?.category?.message}
                />
              </div>
            </Card>
          </div>

          <div className="flex flex-col space-y-6">
            <Card>
              <div className="space-y-6">
                <CardHeader title="Account Details" />
                <div className="flex justify-center items-center">
                  <div
                    className="w-40 h-40 rounded-full cursor-pointer"
                    style={{ cursor: isEdit ? "pointer" : "default" }}
                    {...(isEdit ? getRootProps() : {})}
                  >
                    {image ? (
                      <CardPhoto
                        image={image}
                        tooltip={isEdit ? "Upload Picture" : ""}
                      />
                    ) : (
                      <CardPhoto
                        image={DefaultUserAvatar}
                        tooltip={isEdit ? "Upload Picture" : ""}
                      />
                    )}
                  </div>
                </div>

                <TextField
                  label={"Account Username"}
                  initialValue={userDetails?.data?.username}
                  isOptional
                />
              </div>
            </Card>
            <Card>
              <CardHeader title="Address Details" />
              <div className="space-y-3">
                <NumberField
                  register={register("houseNumber")}
                  label={"House No."}
                  isEdit={isEdit}
                  isOptional
                  error={errors?.houseNumber?.message}
                />

                <TextField
                  register={register("streetAddress")}
                  label={"Street Address"}
                  isEdit={isEdit}
                  isCapitalize
                  error={errors?.streetAddress?.message}
                />

                <SelectField
                  register={register("purokNumber")}
                  label={"Purok No."}
                  initialValue={resident?.purokNumber.toString() ?? ""}
                  selections={SELECTION.purokSelection}
                  isEdit={isEdit}
                  error={errors?.purokNumber?.message}
                />
              </div>
            </Card>

            {isEditable && auth?.userRole !== "Moderator" && (
              <div className="flex justify-end space-x-3 mt-6">
                {!isEdit ? (
                  <CustomButton
                    label="Edit Details"
                    onClick={() => setIsEdit(true)}
                  />
                ) : (
                  <>
                    <CustomButton
                      label="Cancel"
                      backgroundColor="rgb(239, 68, 68)"
                      onClick={() => setIsEdit(false)}
                    />

                    <SubmitButton label="Save Changes" />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </form>

      <ModalSuccess
        open={showSuccessModal}
        title="Update Successfully"
        description="Your changes has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={() => setShowSuccessModal(false)}
      />

      <ModalFailed
        open={showEmailErrorModal}
        title="Update Failed"
        description="Email address already taken"
        buttonLabel="Try Again"
        handleButtonPress={() => setShowEmailErrorModal(false)}
      />
    </>
  );
};

export default ResidentView;
