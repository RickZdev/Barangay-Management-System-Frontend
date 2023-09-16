import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextAreaField from "../../../components/TextAreaField";
import CustomButton from "../../../components/CustomButton";
import TextField from "../../../components/TextField";
import BackButton from "../../../components/BackButton";
import OfficialSearchableTextField from "../../../components/OfficialsSearchableTextField";
import { useState } from "react";
import { ResidentPropType } from "../../../utils/types";
import SearchableTextField from "../../../components/SearchableTextField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import DateTimePickerField from "../../../components/DateTimePickerField";
import dayjs, { Dayjs } from "dayjs";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import useCreateBlotter from "../../../queries/blotter/useCreateBlotter";

const BlotterAdd: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useCreateBlotter();

  const [resident, setResident] = useState<ResidentPropType>();
  const [official, setOfficial] = useState<ResidentPropType>();
  const [incidentTimeAndDate, setIncidentTimeAndDate] =
    useState<Dayjs | null>();
  const [incidentReported, setIncidentReported] = useState<Dayjs | null>();

  const onSubmit = (values: any) => {
    mutate({
      complainantId: resident?._id,
      complainantName: getResidentFullName({
        lastName: resident?.lastName,
        firstName: resident?.firstName,
        middleName: resident?.middleName,
        suffix: resident?.suffix,
      }),
      incidentTimeAndDate: incidentTimeAndDate?.format("MM/DD/YYYY - hh:mm A"),
      incidentReported: incidentReported?.format("MM/DD/YYYY - hh:mm A"),
      incidentRecorded: dayjs().format("MM/DD/YYYY - hh:mm A"),
      respondentId: official?._id,
      respondentName: getResidentFullName({
        lastName: official?.lastName,
        firstName: official?.firstName,
        middleName: official?.middleName,
        suffix: official?.suffix,
      }),
      status: "Ongoing",
      ...values,
    });
  };

  return (
    <div className="pb-10">
      <BackButton />
      <form
        className="mt-5 grid md:grid-cols-2 sm:grid-cols-1 min-[400px]:gap-y-6 gap-x-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader title="Create Blotter" isRequired />
          <div className="space-y-3">
            <SearchableTextField
              label={"Complainant Name"}
              isEdit
              handleChange={setResident}
            />

            <TextField
              label={"Incident Type"}
              isEdit
              register={register}
              name="incidentType"
            />
            <TextField
              label={"Incident Location"}
              isEdit
              register={register}
              name="incidentLocation"
            />
            <DateTimePickerField
              label={"Incident Time and Date"}
              isEdit
              onChange={setIncidentTimeAndDate}
              value={incidentTimeAndDate}
            />

            <DateTimePickerField
              label={"Incident Reported"}
              isEdit
              onChange={setIncidentReported}
              value={incidentReported}
            />
          </div>
          <div className="flex justify-end mt-6">
            <SubmitButton label="Submit" />
          </div>
        </Card>
        <Card>
          <div className="space-y-5">
            <CardHeader title="Narrative Report" isRequired />
            <OfficialSearchableTextField
              label={"Respondent Name"}
              isEdit
              handleChange={setOfficial}
            />
            <TextAreaField
              rows={8}
              isEdit
              register={register}
              name="narrativeReport"
            />
          </div>
        </Card>
      </form>
    </div>
  );
};

export default BlotterAdd;
