import React, { useState } from "react";
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
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";

const ComplaintsEdit: React.FC = () => {
  const { _id: complaintId } = useParams();
  const { data: complaints, isLoading: isGetComplaintByIdLoading } =
    useGetComplaintById(complaintId);
  const { mutateAsync } = useUpdateComplaint(complaintId);
  const { register, handleSubmit } = useForm();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isLoading = isGetComplaintByIdLoading || isProcessing;

  const handleSuccess = () => {
    setShowSuccessModal(false);
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    await mutateAsync({
      complaintId,
      status: data,
    });

    setIsProcessing(false);
    setShowSuccessModal(true);
  };
  return (
    <>
      <LoaderModal isLoading={isLoading} />
      <BackButton />
      <form
        className="grid md:grid-cols-2 gap-6 mt-5 pb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader title="Complainant's Information" />
            <div className="flex space-y-5 flex-col">
              <TextField
                label="Complainant's Name"
                value={complaints?.complainantsName}
              />
              <TextField
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
            <CardHeader title="Complaint Details" />
            <div className="flex space-y-5 flex-col">
              <DateTimePickerField
                label="Incident Date and Time"
                value={dayjs(
                  complaints?.incidentDateAndTime.replace(" - ", " ")
                )}
              />

              <TextField
                label="Complaint Type"
                initialValue={complaints?.complaintType}
              />

              <SelectField
                label="Complaint Status"
                selections={SELECTION.statusSelection}
                register={register("status")}
                initialValue={complaints?.status}
                isEdit
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
            <CardHeader title="Respondent's Information" />
            <div className="flex space-y-5 flex-col">
              <TextField
                label="Respondent's Name"
                value={complaints?.respondentsName}
              />
            </div>
          </Card>
          <Card>
            <CardHeader title="Complainant's Statement" />
            <TextAreaField rows={8} value={complaints?.complainantsStatement} />
          </Card>
        </div>
      </form>

      <ModalSuccess
        open={showSuccessModal}
        title="Blotter Report Update"
        description="Your status update has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />
    </>
  );
};

export default ComplaintsEdit;
