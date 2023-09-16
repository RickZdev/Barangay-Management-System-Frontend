import React from "react";
import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import useGetComplaintById from "../../../queries/complaints/useGetComplaintById";
import Loading from "../../errors/Loading";
import NumberField from "../../../components/NumberField";
import DateTimePickerField from "../../../components/DateTimePickerField";
import dayjs from "dayjs";
import SelectField from "../../../components/SelectField";
import SELECTION from "../../../constants/SELECTION";
import SubmitButton from "../../../components/SubmitButton";
import { useForm } from "react-hook-form";
import useUpdateComplaint from "../../../queries/complaints/useUpdateComplaint";

const ComplaintsView: React.FC = () => {
  const { _id: complaintId } = useParams();
  const { data: complaints, isLoading } = useGetComplaintById(complaintId);
  const { mutate } = useUpdateComplaint(complaintId);
  const { register, handleSubmit } = useForm();

  const onSubmit = (event: any) => {
    mutate({
      complaintId,
      status: event,
    });
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <BackButton />
          <form
            className="grid md:grid-cols-2 gap-6 mt-5 pb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-6">
              <Card>
                <CardHeader title="Complainant's Information" isRequired />
                <div className="flex space-y-5 flex-col">
                  <TextField
                    label="Complainant's Name"
                    value={complaints?.complainantsName}
                  />
                  <NumberField
                    label="Complainant's Contact Number"
                    value={complaints?.complainantsContactNumber}
                  />
                  <TextField
                    label="Complainant's Address"
                    value={complaints?.complainantsAddress}
                  />
                </div>
              </Card>
              <Card>
                <CardHeader title="Complaint Details" isRequired />
                <div className="flex space-y-5 flex-col">
                  <DateTimePickerField
                    label="Incident Date and Time"
                    defaultValue={dayjs(
                      complaints?.incidentDateAndTime,
                      "MM/DD/YYYY - HH:mm A"
                    )}
                  />
                  <TextField
                    label="Complaint Type"
                    initialValue={complaints?.complaintType}
                  />
                  <SelectField
                    label="Complaint Status"
                    selections={SELECTION.statusSelection}
                    initialValue={complaints?.status}
                    isEdit
                    register={register}
                    name="status"
                  />
                </div>
              </Card>
              <div className="flex justify-end mt-6 ">
                <SubmitButton label="Save Changes" />
              </div>
            </div>
            {/* 2nd column */}
            <div className="flex flex-col space-y-6">
              <Card>
                <CardHeader title="Respondent's Information" isRequired />
                <div className="flex space-y-5 flex-col">
                  <TextField
                    label="Respondent's Name"
                    value={complaints?.respondentsName}
                  />
                </div>
              </Card>
              <Card>
                <CardHeader title="Complainant's Statement" isRequired />
                <TextAreaField
                  rows={8}
                  value={complaints?.complainantsStatement}
                />
              </Card>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ComplaintsView;
