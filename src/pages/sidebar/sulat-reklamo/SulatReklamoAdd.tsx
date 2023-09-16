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

const SulatReklamoAdd: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useCreateSulatReklamo();
  const [resident, setResident] = useState<ResidentPropType>();

  const onSubmit = (values: any) => {
    console.log({
      residentId: resident?._id,
      residentName: getResidentFullName({
        lastName: resident?.lastName,
        firstName: resident?.firstName,
        middleName: resident?.middleName,
        suffix: resident?.suffix,
      }),
      dateAndTimeRecorded: dayjs().format("MM/DD/YYYY - hh:mm A"),
      status: "Pending",
      ...values,
    });

    mutate({
      residentId: resident?._id,
      residentName: getResidentFullName({
        lastName: resident?.lastName,
        firstName: resident?.firstName,
        middleName: resident?.middleName,
        suffix: resident?.suffix,
      }),
      dateAndTimeRecorded: dayjs().format("MM/DD/YYYY - hh:mm A"),
      status: "Pending",
      ...values,
    });
  };

  return (
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
              <SearchableTextField
                label="Resident Name"
                isEdit
                handleChange={setResident}
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
                value={dayjs()}
              />

              <TextAreaField
                label="Narrative Report"
                name="narrativeReport"
                register={register}
                rows={8}
                isEdit
              />
            </div>
          </Card>
        </div>
      </form>
    </>
  );
};

export default SulatReklamoAdd;
