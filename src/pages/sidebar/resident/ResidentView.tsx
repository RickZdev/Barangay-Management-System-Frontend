import TextField from "../../../components/TextField";
import Card from "../../../components/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextAreaField from "../../../components/TextAreaField";
import CustomButton from "../../../components/CustomButton";
import CardHeader from "../../../components/CardHeader";
import CardPhoto from "../../../components/CardPhoto";
import BackButton from "../../../components/BackButton";
import dayjs, { Dayjs } from "dayjs";
import { getResidentAge } from "../../../helper/getResidentAge";
import DatePickerField from "../../../components/DatePickerField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import SelectField from "../../../components/SelectField";
import RadioButton from "../../../components/RadioButton";
import NumberField from "../../../components/NumberField";
import SELECTION from "../../../constants/SELECTION";
import Loading from "../../errors/Loading";
import useGetResidentById from "../../../queries/resident/useGetResidentById";
import useUpdateResident from "../../../queries/resident/useUpdateResident";
import useGetUserById from "../../../queries/user/useGetUserById";

const ResidentView: React.FC = () => {
  const { _id: residentId } = useParams();

  const { data: resident, isLoading: residentLoading } =
    useGetResidentById(residentId);
  const { data: userDetails, isLoading: userLoading } =
    useGetUserById(residentId);

  const { mutate } = useUpdateResident(residentId);
  const { register, handleSubmit } = useForm();
  const [isEdit, setIsEdit] = useState<boolean | undefined>(false ?? "");

  const [age, setAge] = useState<number | undefined>();
  const [dateValue, setDateValue] = useState<Dayjs | null | undefined>(null);

  const onSubmit = (event: any) => {
    setIsEdit(false);
    mutate({
      residentId,
      updatedData: { birthDate: dateValue?.format("MM/DD/YYYY"), ...event },
    });

    console.log(event);
  };

  const handleOnChangeDate = (date: Dayjs | null) => {
    setDateValue(date);

    let birthDate = date?.format("MM/DD/YYYY");
    const currentAge = getResidentAge(birthDate);
    setAge(currentAge);
  };

  useEffect(() => {
    setAge(resident?.age);

    if (resident?.birthDate) {
      const dateObj = dayjs(resident?.birthDate);
      setDateValue(dateObj);
    }
  }, [resident]);

  return (
    <>
      {residentLoading && userLoading ? (
        <Loading />
      ) : (
        <form className="pb-10" onSubmit={handleSubmit(onSubmit)}>
          <BackButton />

          <div className="mt-5 grid md:grid-cols-2 sm:grid-cols-1 min-[400px]:gap-y-6 gap-x-6">
            <div className="flex flex-col space-y-6">
              <Card>
                <CardHeader title="Contact Details" isRequired />
                <div className="space-y-3">
                  <TextField
                    label={"Last Name"}
                    initialValue={resident?.lastName}
                    isEdit={isEdit}
                    register={register}
                    name="lastName"
                  />
                  <TextField
                    label={"First Name"}
                    initialValue={resident?.firstName}
                    isEdit={isEdit}
                    register={register}
                    name="firstName"
                  />
                  <TextField
                    label={"Middle Name"}
                    initialValue={resident?.middleName}
                    isEdit={isEdit}
                    register={register}
                    name="middleName"
                  />

                  <SelectField
                    label={"Suffix"}
                    initialValue={resident?.suffix}
                    isEdit={isEdit}
                    selections={SELECTION.suffixSelection}
                    register={register}
                    name="suffix"
                  />

                  <RadioButton
                    label="Sex"
                    initialValue={resident?.sex}
                    selections={SELECTION.sexSelection}
                    isEdit={isEdit}
                    register={register}
                    name="sex"
                  />

                  <TextField
                    label={"Email Address"}
                    initialValue={resident?.emailAddress}
                    isEdit={isEdit}
                    register={register}
                    name="emailAddress"
                  />

                  <NumberField
                    label={"Contact Number"}
                    initialValue={resident?.contactNumber}
                    isEdit={isEdit}
                    register={register}
                    name="contactNumber"
                  />

                  <DatePickerField
                    label="Date of Birth"
                    isEdit={isEdit}
                    value={dateValue}
                    onChange={handleOnChangeDate}
                  />

                  <TextField
                    label={"Age"}
                    value={age?.toString() === "NaN" ? "" : age?.toString()}
                  />

                  <SelectField
                    label={"Educational Attainment"}
                    initialValue={resident?.educationalAttainment}
                    isEdit={isEdit}
                    selections={SELECTION.educationalAttainmentSelection}
                    register={register}
                    name="educationalAttainment"
                  />

                  <TextField
                    label={"Occupation"}
                    initialValue={resident?.occupation}
                    isEdit={isEdit}
                    register={register}
                    name="occupation"
                  />

                  <SelectField
                    label={"Civil Status"}
                    initialValue={resident?.civilStatus}
                    isEdit={isEdit}
                    selections={SELECTION.civilStatusSelection}
                    register={register}
                    name="civilStatus"
                  />

                  <TextField
                    label={"Citizenship"}
                    initialValue={resident?.citizenship}
                    isEdit={isEdit}
                    register={register}
                    name="citizenship"
                  />

                  <SelectField
                    label={"Category"}
                    isEdit={isEdit}
                    selections={SELECTION.categorySelection}
                    initialValue={resident?.category}
                    register={register}
                    name="category"
                  />
                </div>
              </Card>
              <Card>
                <CardHeader title="Address Details" isRequired />
                <div className="space-y-3">
                  <NumberField
                    label={"House No."}
                    initialValue={resident?.houseNumber}
                    isEdit={isEdit}
                    register={register}
                    name="houseNumber"
                  />

                  <TextField
                    label={"Street Address"}
                    initialValue={resident?.streetAddress}
                    isEdit={isEdit}
                    register={register}
                    name="streetAddress"
                  />

                  <SelectField
                    label={"Purok No."}
                    initialValue={resident?.purokNumber}
                    isEdit={isEdit}
                    selections={SELECTION.purokSelection}
                    register={register}
                    name="purokNumber"
                  />
                </div>
              </Card>
            </div>

            <div className="flex flex-col space-y-6">
              <Card>
                <div className="space-y-6">
                  <CardHeader title="Account Details" isRequired />
                  <CardPhoto />
                  <TextField
                    label={"Account Username"}
                    value={userDetails?.username}
                    disabled
                  />
                  <TextField
                    label={"Account Password"}
                    value="**********"
                    disabled
                  />
                </div>
              </Card>
              <Card>
                <TextAreaField
                  label="Profile Notes"
                  initialValue={resident?.profileNotes}
                  rows={8}
                  isEdit={isEdit}
                  register={register}
                  name={"profileNotes"}
                />
              </Card>
              <div className="flex justify-end space-x-3 mt-6">
                {!isEdit ? (
                  <CustomButton
                    label="Edit Details"
                    onClick={() => setIsEdit(true)}
                  />
                ) : (
                  <>
                    <CustomButton
                      label="Cancel"
                      backgroundColor="rgb(239, 68, 68)"
                      onClick={() => setIsEdit(false)}
                    />
                    <SubmitButton label="Save Changes" />
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ResidentView;
