import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextAreaField from "../../../components/TextAreaField";
import TextField from "../../../components/TextField";
import BackButton from "../../../components/BackButton";
import OfficialSearchableTextField from "../../../components/OfficialsSearchableTextField";
import { useState } from "react";
import { ResidentPropType } from "../../../utils/types";
import SearchableTextField from "../../../components/SearchableTextField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import DateTimePickerField from "../../../components/DateTimePickerField";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useGetBlotterById from "../../../queries/blotter/useGetBlotterById";
import SelectField from "../../../components/SelectField";
import SELECTION from "../../../constants/SELECTION";
import useUpdateBlotter from "../../../queries/blotter/useUpdateBlotter";
import Loading from "../../errors/Loading";

const BlotterEdit: React.FC = () => {
  const { _id } = useParams();
  const { register, handleSubmit } = useForm();
  const { data: blotter, isLoading } = useGetBlotterById(_id);
  const { mutate } = useUpdateBlotter(_id);

  const [resident, setResident] = useState<ResidentPropType>();
  const [official, setOfficial] = useState<ResidentPropType>();

  const onSubmit = (values: any) => {
    mutate({
      blotterId: _id,
      status: values,
    });
  };

  return (
    <div className="pb-10">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <BackButton />
          <form
            className="mt-5 grid md:grid-cols-2 sm:grid-cols-1 min-[400px]:gap-y-6 gap-x-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card>
              <CardHeader title="Edit Blotter" isRequired />
              <div className="space-y-3">
                <SearchableTextField
                  label={"Complainant Name"}
                  handleChange={setResident}
                  value={blotter?.complainantName}
                />

                <TextField
                  label={"Incident Type"}
                  defaultValue={blotter?.incidentType}
                />
                <TextField
                  label={"Incident Location"}
                  defaultValue={blotter?.incidentLocation}
                />
                <DateTimePickerField
                  label={"Incident Time and Date"}
                  value={dayjs(
                    blotter?.incidentTimeAndDate.replace(" - ", " ")
                  )}
                />

                <DateTimePickerField
                  label={"Incident Reported"}
                  value={dayjs(blotter?.incidentReported.replace(" - ", " "))}
                />

                <SelectField
                  label="Status"
                  isEdit
                  selections={SELECTION?.blotterSelection}
                  initialValue={blotter?.status}
                  register={register}
                  name="status"
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
                  handleChange={setOfficial}
                  value={blotter?.respondentName}
                />
                <TextAreaField rows={8} value={blotter?.narrativeReport} />
              </div>
            </Card>
          </form>
        </>
      )}
    </div>
  );
};

export default BlotterEdit;
