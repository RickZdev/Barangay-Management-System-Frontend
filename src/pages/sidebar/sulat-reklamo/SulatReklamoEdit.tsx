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

const SulatReklamoEdit: React.FC = () => {
  const { _id } = useParams();
  const { data: sulatReklamo, isLoading } = useGetSulatReklamoById(_id);
  const { data: resident } = useGetResidentById(sulatReklamo?.residentId);
  const { mutate } = useUpdateSulatReklamo(_id);
  const { register, handleSubmit } = useForm();

  const onSubmit = (values: any) => {
    mutate({
      sulatReklamoId: sulatReklamo?._id,
      status: values,
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
            {/* 1st column */}
            <div className="flex flex-col space-y-6">
              <Card>
                <CardHeader title="Resident's Information" isRequired />
                <div className="flex space-y-5 flex-col">
                  <TextField
                    label="Resident Name"
                    value={sulatReklamo?.residentName}
                  />
                  <TextField
                    label="Age"
                    value={
                      getResidentAge(resident?.birthDate).toString() === "NaN"
                        ? ""
                        : getResidentAge(resident?.birthDate).toString()
                    }
                  />

                  <TextField
                    label="Address"
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
                    initialValue={sulatReklamo?.status}
                    selections={SELECTION.statusSelection}
                    register={register}
                    name="status"
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
                <CardHeader title="Sulat-Reklamo Details" isRequired />
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
                    defaultValue={sulatReklamo?.narrativeReport}
                  />
                </div>
              </Card>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default SulatReklamoEdit;
