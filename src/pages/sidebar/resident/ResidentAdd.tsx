import TextField from "../../../components/TextField";
import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextAreaField from "../../../components/TextAreaField";
import SelectField from "../../../components/SelectField";
import RadioButton from "../../../components/RadioButton";
import { useState } from "react";
import DatePickerField from "../../../components/DatePickerField";
import { Dayjs } from "dayjs";
import NumberField from "../../../components/NumberField";
import BackButton from "../../../components/BackButton";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import { getResidentAge } from "../../../helper/getResidentAge";
import SELECTION from "../../../constants/SELECTION";
import useCreateResident from "../../../queries/resident/useCreateResident";

const ResidentAdd: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useCreateResident();
  const [dateValue, setDateValue] = useState<Dayjs | null | undefined>(null);
  const [age, setAge] = useState<number | undefined>();
  const [citizenship, setCitizenship] = useState<string | number | undefined>();

  const handleOnChangeDate = (date: Dayjs | null) => {
    setDateValue(date);

    let birthDate = date?.format("MM/DD/YYYY");
    const currentAge = getResidentAge(birthDate);
    setAge(currentAge);
  };

  const onSubmit = (event: any) => {
    reset();
    mutate({ ...event, birthDate: dateValue?.format("MM/DD/YYYY") });
  };

  return (
    <div className="pb-10">
      <BackButton />
      <form
        className="mt-5 grid md:grid-cols-2 sm:grid-cols-1 min-[400px]:gap-y-6 gap-x-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader title="Contact Details" isRequired />
          <div className="space-y-3">
            <TextField
              label="Last Name"
              isEdit
              register={register}
              name={"lastName"}
            />

            <TextField
              label={"First Name"}
              isEdit
              register={register}
              name={"firstName"}
            />

            <TextField
              label={"Middle Name"}
              isEdit
              register={register}
              name={"middleName"}
            />

            <SelectField
              label={"Suffix"}
              selections={SELECTION.suffixSelection}
              register={register}
              name="suffix"
              isEdit
            />

            <RadioButton
              label="Sex"
              selections={SELECTION.sexSelection}
              isEdit
              register={register}
              name="sex"
            />

            <TextField
              label={"Email Address"}
              isEdit
              register={register}
              name={"emailAddress"}
            />

            <NumberField
              label="Contact Number"
              isEdit
              register={register}
              name={"contactNumber"}
            />

            <DatePickerField
              label="Date of Birth"
              isEdit
              onChange={handleOnChangeDate}
              value={dateValue}
            />

            <TextField
              label="Age"
              value={age?.toString() === "NaN" ? "" : age?.toString()}
            />

            <SelectField
              label={"Educational Attainment"}
              isEdit
              selections={SELECTION.educationalAttainmentSelection}
              register={register}
              name="educationalAttainment"
            />

            <TextField
              label="Occupation"
              isEdit
              register={register}
              name={"occupation"}
            />

            <SelectField
              label={"Civil Status"}
              isEdit
              selections={SELECTION.civilStatusSelection}
              register={register}
              name="civilStatus"
            />

            <TextField
              label={"Citizenship"}
              isEdit
              register={register}
              name="citizenship"
            />

            <SelectField
              label={"Category"}
              isEdit
              selections={SELECTION.categorySelection}
              register={register}
              name="category"
            />
          </div>
        </Card>
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader title="Address Details" isRequired />
            <div className="space-y-3">
              <NumberField
                label="House No."
                isEdit
                register={register}
                name={"houseNumber"}
              />

              <TextField
                label="Street Address"
                isEdit
                register={register}
                name={"streetAddress"}
              />

              <SelectField
                label={"Purok No."}
                isEdit
                selections={SELECTION.purokSelection}
                register={register}
                name={"purokNumber"}
              />
            </div>
          </Card>
          <Card>
            <TextAreaField
              label="Profile Notes"
              rows={8}
              isEdit
              register={register}
              name={"profileNotes"}
            />
          </Card>
          <div className="flex justify-end mt-6">
            <SubmitButton label="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResidentAdd;
