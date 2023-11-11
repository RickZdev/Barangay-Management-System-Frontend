import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextAreaField from "../../../components/TextAreaField";
import TextField from "../../../components/TextField";
import BackButton from "../../../components/BackButton";
import OfficialSearchableTextField from "../../../components/OfficialsSearchableTextField";
import { useEffect, useState } from "react";
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
import { getResidentFullAddress } from "../../../helper/getResidentFullAddres";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";
import useGetResidentById from "../../../queries/resident/useGetResidentById";

const BlotterEdit: React.FC = () => {
  const { _id } = useParams();
  const { register, setValue, handleSubmit } = useForm();
  const { data: blotter, isLoading: isGetBlotterLoading } =
    useGetBlotterById(_id);

  const { mutateAsync } = useUpdateBlotter(_id);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isLoading = isGetBlotterLoading || isProcessing;

  const handleSuccess = () => {
    setShowSuccessModal(false);
  };

  const onSubmit = async (values: any) => {
    setIsProcessing(true);
    await mutateAsync({
      blotterId: _id,
      status: values,
    });

    setIsProcessing(false);

    setShowSuccessModal(true);
  };

  useEffect(() => {
    setValue("status", blotter?.status);
  }, [blotter]);

  return (
    <div className="pb-10">
      <LoaderModal isLoading={isLoading} />
      <BackButton />
      <form
        className="mt-5 grid md:grid-cols-2 sm:grid-cols-1 min-[400px]:gap-y-6 gap-x-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader title="Edit Blotter" />
          <div className="space-y-3">
            <TextField
              label={"Complainant's Name"}
              value={blotter?.complainantName}
            />

            <TextField
              label={"Complainant's Address"}
              value={blotter?.complainantAddress}
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
              value={dayjs(blotter?.incidentTimeAndDate.replace(" - ", " "))}
            />

            <SelectField
              label="Status"
              isEdit
              selections={SELECTION?.blotterSelection}
              initialValue={blotter?.status ?? ""}
              register={register("status")}
            />
          </div>
          <div className="flex justify-end mt-6">
            <SubmitButton label="Submit" />
          </div>
        </Card>
        <Card>
          <div className="space-y-5">
            <CardHeader title="Narrative Report" />
            <TextField
              label={"Respondent's Name"}
              value={blotter?.respondentName}
            />
            <TextAreaField rows={8} value={blotter?.narrativeReport} />
          </div>
        </Card>
      </form>

      <ModalSuccess
        open={showSuccessModal}
        title="Blotter Report Update"
        description="Your status update has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />
    </div>
  );
};

export default BlotterEdit;
