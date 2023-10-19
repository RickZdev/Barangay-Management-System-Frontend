import Card from "../../../components/Card";
import Breadcrumbs from "../../../components/Breadcrumbs";
import CardHeader from "../../../components/CardHeader";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import BackButton from "../../../components/BackButton";
import SearchableTextField from "../../../components/SearchableTextField";
import { useState } from "react";
import { ResidentPropType } from "../../../utils/types";
import { getResidentFullAddress } from "../../../helper/getResidentFullAddres";
import DateTimePickerField from "../../../components/DateTimePickerField";
import { getResidentAge } from "../../../helper/getResidentAge";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import useCreateSulatReklamo from "../../../queries/sulatReklamo/useCreateSulatReklamo";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import SubmitButton from "../../../components/SubmitButton";
import useUpdateSulatReklamo from "../../../queries/sulatReklamo/useUpdateSulatReklamo";
import { useParams } from "react-router-dom";
import useGetSulatReklamoById from "../../../queries/sulatReklamo/useGetSulatReklamoById";
import SelectField from "../../../components/SelectField";
import SELECTION from "../../../constants/SELECTION";
import Loading from "../../errors/Loading";
import useGetResidentById from "../../../queries/resident/useGetResidentById";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";

const SulatReklamoEdit: React.FC = () => {
  const { _id } = useParams();
  const { register, handleSubmit } = useForm();

  const { data: sulatReklamo, isLoading: isGetSulatReklamoLoading } =
    useGetSulatReklamoById(_id);
  const { data: resident, isLoading: isResidentLoading } = useGetResidentById(
    sulatReklamo?.residentId ?? ""
  );
  const { mutateAsync } = useUpdateSulatReklamo(_id);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isLoading =
    isGetSulatReklamoLoading || isResidentLoading || isProcessing;

  const handleSuccess = () => {
    setShowSuccessModal(false);
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    await mutateAsync({
      sulatReklamoId: sulatReklamo?._id,
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
        {/* 1st column */}
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader title="Resident's Information" />
            <div className="flex space-y-5 flex-col">
              <TextField
                label="Resident's Name"
                value={sulatReklamo?.residentName}
              />
              <TextField
                label="Resident's Contact Number"
                value={resident?.contactNumber}
              />

              <TextField
                label="Resident's Address"
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

              <SelectField
                label="Status"
                isEdit
                initialValue={sulatReklamo?.status ?? ""}
                selections={SELECTION.statusSelection}
                register={register("status")}
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
                value={dayjs(
                  sulatReklamo?.dateAndTimeRecorded.replace(" - ", " ")
                )}
              />
              <TextAreaField
                label="Narrative Report"
                rows={8}
                value={sulatReklamo?.narrativeReport}
              />
            </div>
          </Card>
        </div>
      </form>

      <ModalSuccess
        open={showSuccessModal}
        title="Sulat Reklamo Report Update"
        description="Your status update has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />
    </>
  );
};

export default SulatReklamoEdit;
