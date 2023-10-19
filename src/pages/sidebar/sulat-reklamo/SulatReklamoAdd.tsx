import Card from "../../../components/Card";
import Breadcrumbs from "../../../components/Breadcrumbs";
import CardHeader from "../../../components/CardHeader";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import BackButton from "../../../components/BackButton";
import SearchableTextField from "../../../components/SearchableTextField";
import { useEffect, useState } from "react";
import { ResidentPropType } from "../../../utils/types";
import { getResidentFullAddress } from "../../../helper/getResidentFullAddres";
import DateTimePickerField from "../../../components/DateTimePickerField";
import { getResidentAge } from "../../../helper/getResidentAge";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import useCreateSulatReklamo from "../../../queries/sulatReklamo/useCreateSulatReklamo";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import SubmitButton from "../../../components/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { sulatReklamoFormValidation } from "../../../utils/validation";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";
import LoaderModal from "../../../components/modals/loader/LoaderModal";

const SulatReklamoAdd: React.FC = () => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sulatReklamoFormValidation),
  });
  const { mutateAsync } = useCreateSulatReklamo();

  const [isResidentTextEmpty, setIsResidentTextEmpty] = useState<boolean>(true);
  const [resident, setResident] = useState<ResidentPropType>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleSuccess = () => {
    setShowSuccessModal(false);

    window.location.reload();
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    await mutateAsync({
      residentId: resident?._id,
      residentName: getResidentFullName({
        lastName: resident?.lastName,
        firstName: resident?.firstName,
        middleName: resident?.middleName,
        suffix: resident?.suffix,
      }),
      dateAndTimeRecorded: dayjs().format("MM/DD/YYYY - hh:mm A"),
      status: "Pending",
      ...data,
    });

    setIsProcessing(false);
    setShowSuccessModal(true);
  };

  // searchable field errors
  useEffect(() => {
    if (isResidentTextEmpty) {
      setValue(
        "residentName",
        getResidentFullName({
          lastName: resident?.lastName,
          firstName: resident?.firstName,
          middleName: resident?.middleName,
          suffix: resident?.suffix,
        })
      );

      clearErrors("residentName");
    } else {
      setValue("residentName", "");
      setError("residentName", { message: "This is a required field." });
    }
  }, [isResidentTextEmpty]);

  useEffect(() => {
    setValue("residentName", "");
  }, []);

  return (
    <>
      <LoaderModal isLoading={isProcessing} />

      <BackButton />
      <form
        className="grid md:grid-cols-2 gap-6 mt-5 pb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 1st column */}
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader title="Resident's Information" />
            <div className="flex space-y-5 flex-col">
              <SearchableTextField
                label="Resident's Name"
                isEdit
                handleChange={setResident}
                handleIsEmptyText={setIsResidentTextEmpty}
                error={errors?.residentName?.message}
                autoFocus
              />

              <TextField
                label="Resident's Contact Number"
                value={resident?.contactNumber}
              />

              <TextField
                label={"Resident's Address"}
                value={
                  resident?._id
                    ? getResidentFullAddress({
                        houseNumber: resident?.houseNumber,
                        streetAddress: resident?.streetAddress,
                        purokNumber: resident?.purokNumber,
                      })
                    : ""
                }
              />
            </div>
            <div className="flex justify-end mt-6">
              <SubmitButton label="Submit" />
            </div>
          </Card>
        </div>
        {/* 2nd column */}
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader title="Sulat-Reklamo Details" />
            <div className="flex space-y-5 flex-col">
              <DateTimePickerField
                label="Date And Time Recorded"
                value={dayjs()}
              />

              <TextAreaField
                rows={8}
                isEdit
                register={register("narrativeReport")}
                error={errors?.narrativeReport?.message}
              />
            </div>
          </Card>
        </div>
      </form>

      <ModalSuccess
        open={showSuccessModal}
        title="Sulat Reklamo Report Complete"
        description="Your report has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />
    </>
  );
};

export default SulatReklamoAdd;
