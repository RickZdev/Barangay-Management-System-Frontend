import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import BackButton from "../../../components/BackButton";
import SearchableTextField from "../../../components/SearchableTextField";
import SubmitButton from "../../../components/SubmitButton";
import { useForm } from "react-hook-form";
import SelectField from "../../../components/SelectField";
import DateTimePickerField from "../../../components/DateTimePickerField";
import SELECTION from "../../../constants/SELECTION";
import { ResidentPropType } from "../../../utils/types";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import useCreateComplaint from "../../../queries/complaints/useCreateComplaint";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import { getResidentFullAddress } from "../../../helper/getResidentFullAddres";
import OfficialSearchableTextField from "../../../components/OfficialsSearchableTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { complaintFormValidation } from "../../../utils/validation";
import { DateTimeValidationError } from "@mui/x-date-pickers";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";
import LoaderModal from "../../../components/modals/loader/LoaderModal";

const ComplaintsAdd: React.FC = () => {
  const { mutateAsync } = useCreateComplaint();

  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(complaintFormValidation),
  });

  const [isResidentTextEmpty, setIsResidentTextEmpty] = useState<boolean>(true);
  const [isOfficialTextEmpty, setisOfficialTextEmpty] = useState<boolean>(true);
  const [resident, setResident] = useState<ResidentPropType | undefined>();
  const [official, setOfficial] = useState<ResidentPropType>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [incidentTimeAndDate, setIncidentTimeAndDate] =
    useState<Dayjs | null>();
  const [timeAndDateError, setTimeAndDateError] =
    useState<DateTimeValidationError | null>();

  const handleOnChangeTimeAndDate = (date: Dayjs | null) => {
    setIncidentTimeAndDate(date);
    let timeAndDate = date?.format("MM/DD/YYYY - hh:mm A");

    setValue("incidentTimeAndDate", timeAndDate ?? "");

    if (getValues().incidentTimeAndDate) {
      clearErrors("incidentTimeAndDate");
    }
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);

    window.location.reload();
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    const complainantsFullName = getResidentFullName({
      lastName: resident?.lastName,
      firstName: resident?.firstName,
      middleName: resident?.middleName,
      suffix: resident?.suffix,
    });

    const complainantsFullAddress = getResidentFullAddress({
      houseNumber: resident?.houseNumber,
      streetAddress: resident?.streetAddress,
      purokNumber: resident?.purokNumber,
    });

    const respondentsFullName = getResidentFullName({
      lastName: official?.lastName,
      firstName: official?.firstName,
      middleName: official?.middleName,
      suffix: official?.suffix,
    });

    await mutateAsync({
      complainantsId: resident?._id,
      complainantsName: complainantsFullName,
      complainantsAddress: complainantsFullAddress,
      complainantsContactNumber: resident?.contactNumber,
      respondentsId: official?._id,
      respondentsName: respondentsFullName,
      incidentDateAndTime: data?.incidentTimeAndDate,
      complainantsStatement: data?.narrativeReport,
      ...data,
    });

    setIsProcessing(false);
    setShowSuccessModal(true);
  };

  // searchable field errors
  useEffect(() => {
    if (isResidentTextEmpty) {
      setValue(
        "complainantName",
        getResidentFullName({
          lastName: resident?.lastName,
          firstName: resident?.firstName,
          middleName: resident?.middleName,
          suffix: resident?.suffix,
        })
      );

      clearErrors("complainantName");
    } else {
      setValue("complainantName", "");
      setError("complainantName", { message: "This is a required field." });
    }
  }, [isResidentTextEmpty]);

  useEffect(() => {
    if (isOfficialTextEmpty) {
      setValue(
        "respondentName",
        getResidentFullName({
          lastName: official?.lastName,
          firstName: official?.firstName,
          middleName: official?.middleName,
          suffix: official?.suffix,
        })
      );

      clearErrors("respondentName");
    } else {
      setValue("respondentName", "");
      setError("respondentName", { message: "This is a required field." });
    }
  }, [isOfficialTextEmpty]);

  useEffect(() => {
    setValue("complainantName", "");
    setValue("respondentName", "");
  }, []);

  // time and date validations
  useEffect(() => {
    if (timeAndDateError) {
      setValue("incidentTimeAndDate", "");
      setError("incidentTimeAndDate", { message: "Invalid date." });
    } else {
      setValue(
        "incidentTimeAndDate",
        incidentTimeAndDate?.format("MM/DD/YYYY - hh:mm A") ?? ""
      );
    }
  }, [timeAndDateError]);

  return (
    <>
      <LoaderModal isLoading={isProcessing} />

      <BackButton />
      <form
        className="grid md:grid-cols-2 gap-6 mt-5 pb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader title="Complainant's Information" />
            <div className="flex space-y-5 flex-col">
              <SearchableTextField
                label="Complainant's Name"
                isEdit
                handleChange={setResident}
                handleIsEmptyText={setIsResidentTextEmpty}
                error={errors?.complainantName?.message}
                autoFocus
              />

              <TextField
                label="Complainant's Contact Number"
                value={resident?.contactNumber}
              />

              <TextField
                label={"Complainant's Address"}
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
          </Card>
          <Card>
            <CardHeader title="Complaint Details" />
            <div className="flex space-y-5 flex-col">
              <DateTimePickerField
                label={"Incident Time and Date"}
                isEdit
                onChange={handleOnChangeTimeAndDate}
                value={incidentTimeAndDate}
                error={errors?.incidentTimeAndDate?.message}
                onError={(error) => setTimeAndDateError(error)}
                disableFuture
              />

              <TextField
                label="Complaint Type"
                isEdit
                register={register("complaintType")}
                error={errors?.complaintType?.message}
              />
            </div>
          </Card>
          <div className="flex justify-end mt-6">
            <SubmitButton label="Submit" />
          </div>
        </div>
        {/* 2nd column */}
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader title="Respondent's Information" />
            <div className="flex space-y-5 flex-col">
              <OfficialSearchableTextField
                label="Respondent's Name"
                isEdit
                handleChange={setOfficial}
                handleIsEmptyText={setisOfficialTextEmpty}
                error={errors?.respondentName?.message}
              />
            </div>
          </Card>
          <Card>
            <CardHeader title="Complainant's Statement" />
            <TextAreaField
              rows={8}
              isEdit
              register={register("narrativeReport")}
              error={errors?.narrativeReport?.message}
            />
          </Card>
        </div>
      </form>

      <ModalSuccess
        open={showSuccessModal}
        title="Complaint Report Complete"
        description="Your report has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />
    </>
  );
};

export default ComplaintsAdd;
