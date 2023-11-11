import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextAreaField from "../../../components/TextAreaField";
import CustomButton from "../../../components/CustomButton";
import TextField from "../../../components/TextField";
import BackButton from "../../../components/BackButton";
import OfficialSearchableTextField from "../../../components/OfficialsSearchableTextField";
import { useEffect, useMemo, useState } from "react";
import { ResidentPropType } from "../../../utils/types";
import SearchableTextField from "../../../components/SearchableTextField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import DateTimePickerField from "../../../components/DateTimePickerField";
import dayjs, { Dayjs } from "dayjs";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import useCreateBlotter from "../../../queries/blotter/useCreateBlotter";
import { yupResolver } from "@hookform/resolvers/yup";
import { blotterFormValidation } from "../../../utils/validation";
import { DateTimeValidationError } from "@mui/x-date-pickers";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";

const BlotterAddNonResident: React.FC = () => {
  const { mutateAsync } = useCreateBlotter();

  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(blotterFormValidation),
  });

  const [isOfficialTextEmpty, setisOfficialTextEmpty] = useState<boolean>(true);
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

    await mutateAsync({
      complainantType: "Non-Resident",
      incidentTimeAndDate: data?.incidentTimeAndDate,
      incidentRecorded: dayjs().format("MM/DD/YYYY - hh:mm A"),
      respondentId: official?._id,
      respondentName: getResidentFullName({
        lastName: official?.lastName,
        firstName: official?.firstName,
        middleName: official?.middleName,
        suffix: official?.suffix,
      }),
      status: "Ongoing",
      ...data,
    });

    setIsProcessing(false);
    setShowSuccessModal(true);
  };

  // searchable field errors
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
      <div className="pb-10">
        <BackButton />

        <form
          className="mt-5 grid md:grid-cols-2 sm:grid-cols-1 min-[400px]:gap-y-6 gap-x-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card>
            <CardHeader title="Create Non-Resident Blotter" />
            <div className="space-y-3">
              <TextField
                label={"Complainant's Name"}
                isEdit
                register={register("complainantName")}
                error={errors?.complainantName?.message}
              />

              <TextField
                label={"Complainant's Address"}
                isEdit
                register={register("complainantAddress")}
                error={errors?.complainantAddress?.message}
              />

              <TextField
                label={"Incident Type"}
                isEdit
                register={register("incidentType")}
                error={errors?.incidentType?.message}
              />
              <TextField
                label={"Incident Location"}
                isEdit
                register={register("incidentLocation")}
                error={errors?.incidentLocation?.message}
              />

              <DateTimePickerField
                label={"Incident Time and Date"}
                isEdit
                isBlotterMinDate
                onChange={handleOnChangeTimeAndDate}
                value={incidentTimeAndDate}
                error={errors?.incidentTimeAndDate?.message}
                onError={(error) => setTimeAndDateError(error)}
                disableFuture
              />

            </div>
            <div className="flex justify-end mt-6">
              <SubmitButton label="Submit" />
            </div>
          </Card>
          <Card>
            <div className="space-y-5">
              <CardHeader title="Narrative Report" />
              <OfficialSearchableTextField
                label={"Respondent's Name"}
                isEdit
                handleChange={setOfficial}
                handleIsEmptyText={setisOfficialTextEmpty}
                error={errors?.respondentName?.message}
              />
              <TextAreaField
                rows={8}
                isEdit
                register={register("narrativeReport")}
                error={errors?.narrativeReport?.message}
              />
            </div>
          </Card>
        </form>
      </div>

      <ModalSuccess
        open={showSuccessModal}
        title="Blotter Report Complete"
        description="Your report has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />
    </>
  );
};

export default BlotterAddNonResident;
