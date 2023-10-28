import TextField from "../../../components/TextField";
import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextAreaField from "../../../components/TextAreaField";
import SelectField from "../../../components/SelectField";
import RadioButton from "../../../components/RadioButton";
import { useMemo, useState } from "react";
import DatePickerField from "../../../components/DatePickerField";
import dayjs, { Dayjs } from "dayjs";
import NumberField from "../../../components/NumberField";
import BackButton from "../../../components/BackButton";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import { getResidentAge } from "../../../helper/getResidentAge";
import SELECTION from "../../../constants/SELECTION";
import useCreateResident from "../../../queries/resident/useCreateResident";
import { yupResolver } from "@hookform/resolvers/yup";
import { residentWithUserFormValidation } from "../../../utils/validation";

import { citizenship } from "../../../static/citizenship.json";
import _ from "lodash";
import CardPhoto from "../../../components/CardPhoto";
import PasswordField from "../../../components/PasswordField";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";
import ModalFailed from "../../../components/modals/alert/ModalFailed";
import Loading from "../../errors/Loading";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import DefaultUserAvatar from "../../../assets/images/default-user-avatar.png";
import CustomButton from "../../../components/CustomButton";
import useDragAndDrop from "../../../hooks/useDragAndDrop";
import useFirebaseStorage from "../../../hooks/useFirebaseStorage";
import useSignup from "../../../queries/auth/useSignup";
import useCreateUser from "../../../queries/user/useCreateUser";
import useDeleteAuth from "../../../queries/auth/useDeleteAuth";

const ResidentAdd: React.FC = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(residentWithUserFormValidation),
    mode: "onChange",
  });

  const { mutateAsync: signupMutation, isLoading: isSignupLoading } =
    useSignup();
  const { mutate: deleteAuthMutation, isLoading: isDeleteAuthLoading } =
    useDeleteAuth();

  const { mutate: createMutation, isLoading: isCreateUserLoading } =
    useCreateUser();

  const {
    mutateAsync: createResidentMutation,
    isLoading: isCreateResidentLoading,
  } = useCreateResident();

  const { image, getRootProps } = useDragAndDrop();
  const { handleUploadImage } = useFirebaseStorage();

  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [age, setAge] = useState<string>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showEmailErrorModal, setShowEmailErrorModal] =
    useState<boolean>(false);
  const [showUsernameErrorModal, setShowUsernameErrorModal] =
    useState<boolean>(false);

  const isLoading =
    isSignupLoading ||
    isCreateResidentLoading ||
    isCreateUserLoading ||
    isDeleteAuthLoading ||
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

  const handleSuccess = () => {
    setShowSuccessModal(false);

    window.location.reload();
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    try {
      const user = await signupMutation({
        username: data?.username,
        password: data?.password,
      });

      if (user.data) {
        let uploadedImage = "";

        if (image) {
          uploadedImage = await handleUploadImage(image, "profile");
        }

        const resident = await createResidentMutation({
          ...data,
          _id: user?.data?.data?._id,
          profilePhoto: uploadedImage,
        });

        if (resident?.data) {
          createMutation({
            userId: user?.data?.data?._id,
            username: data?.username,
            residentName: resident?.data?.data?.fullName,
          });

          setShowSuccessModal(true);
        } else {
          if (resident.error === "Email address already in use.") {
            deleteAuthMutation({ userId: user?.data?.data?._id });
            setShowEmailErrorModal(true);
            console.log(resident.error);
          }
        }
      } else {
        if (user.error === "Username already in use!") {
          setShowUsernameErrorModal(true);
          console.log(user.error);
        }
      }

      setIsProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <div className="pb-10">
        <BackButton />
        <form
          className="mt-5 grid md:grid-cols-2 sm:grid-cols-1 min-[400px]:gap-y-6 gap-x-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card>
            <CardHeader title="Contact Details" />
            <div className="space-y-3">
              <TextField
                register={register("lastName")}
                label="Last Name"
                isEdit
                isCapitalize
                error={errors?.lastName?.message}
              />

              <TextField
                register={register("firstName")}
                label={"First Name"}
                isEdit
                isCapitalize
                error={errors?.firstName?.message}
              />

              <TextField
                register={register("middleName")}
                label={"Middle Name"}
                isOptional
                isEdit
                isCapitalize
                error={errors?.middleName?.message}
              />

              <SelectField
                register={register("suffix")}
                label={"Suffix"}
                selections={SELECTION.suffixSelection}
                isOptional
                isEdit
                error={errors?.suffix?.message}
              />

              <RadioButton
                register={register("sex")}
                label="Sex"
                selections={SELECTION.sexSelection}
                isEdit
                error={errors?.sex?.message}
              />

              <TextField
                register={register("emailAddress")}
                label={"Email Address"}
                isEdit
                error={errors?.emailAddress?.message}
              />

              <NumberField
                register={register("contactNumber")}
                label="Contact Number"
                isEdit
                error={errors?.contactNumber?.message}
              />

              <DatePickerField
                label="Date of Birth"
                value={dateValue}
                isEdit
                onChange={handleOnChangeDate}
                error={errors?.birthDate?.message}
                disableFuture
              />

              <TextField
                label="Age"
                value={age === "NaN" ? "" : age}
                error={
                  parseInt(age ?? "") < 0
                    ? "Age cannot be negative."
                    : parseInt(age ?? "") > 122
                    ? "There might be a problem in your age. Please try again."
                    : ""
                }
              />

              <SelectField
                register={register("educationalAttainment")}
                label={"Educational Attainment"}
                isEdit
                isOptional
                selections={SELECTION.educationalAttainmentSelection}
                error={errors?.educationalAttainment?.message}
              />

              <SelectField
                register={register("civilStatus")}
                label={"Civil Status"}
                isEdit
                selections={SELECTION.civilStatusSelection}
                error={errors?.civilStatus?.message}
              />

              <SelectField
                register={register("citizenship")}
                label={"Citizenship"}
                isEdit
                selections={citizenshipList}
                error={errors?.citizenship?.message}
              />

              <TextField
                register={register("occupation")}
                label={"Occupation"}
                isEdit
                error={errors?.occupation?.message}
              />

              <SelectField
                register={register("category")}
                label={"Category"}
                isEdit
                isOptional
                selections={SELECTION.categorySelection}
                error={errors?.category?.message}
              />
            </div>
          </Card>
          <div className="flex flex-col space-y-6">
            <Card>
              <div className="space-y-6">
                <CardHeader title="Account Details" />
                <div className="flex justify-center items-center">
                  <div
                    className="w-40 h-40 rounded-full cursor-pointer"
                    {...getRootProps()}
                  >
                    {image ? (
                      <CardPhoto image={image} />
                    ) : (
                      <CardPhoto image={DefaultUserAvatar} />
                    )}
                  </div>
                </div>

                <TextField
                  register={register("username")}
                  label={"Account Username"}
                  isEdit
                  error={errors?.username?.message}
                />
                <PasswordField
                  register={register("password")}
                  label={"Account Password"}
                  isEdit
                  error={errors?.password?.message}
                />
                <PasswordField
                  register={register("confirmPassword")}
                  label={"Confirm Password"}
                  isEdit
                  error={errors?.confirmPassword?.message}
                />
              </div>
            </Card>
            <Card>
              <CardHeader title="Address Details" />
              <div className="space-y-3">
                <NumberField
                  register={register("houseNumber")}
                  label="House No."
                  isEdit
                  isOptional
                  error={errors?.houseNumber?.message}
                />

                <TextField
                  register={register("streetAddress")}
                  label="Street Address"
                  isEdit
                  isCapitalize
                  error={errors?.streetAddress?.message}
                />

                <SelectField
                  register={register("purokNumber")}
                  label={"Purok No."}
                  isEdit
                  selections={SELECTION.purokSelection}
                  error={errors?.purokNumber?.message}
                />
              </div>
            </Card>

            <div className="flex justify-end mt-6">
              <SubmitButton label="Submit" />
            </div>
          </div>
        </form>
      </div>

      <ModalSuccess
        open={showSuccessModal}
        title="Registration Completed"
        description="Ask an official for further instructions"
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />

      <ModalFailed
        open={showUsernameErrorModal}
        title="Registration Failed"
        description="Username already taken"
        buttonLabel="Try Again"
        handleButtonPress={() => setShowUsernameErrorModal(false)}
      />

      <ModalFailed
        open={showEmailErrorModal}
        title="Registration Failed"
        description="Email address already taken"
        buttonLabel="Try Again"
        handleButtonPress={() => setShowEmailErrorModal(false)}
      />
    </>
  );
};

export default ResidentAdd;
