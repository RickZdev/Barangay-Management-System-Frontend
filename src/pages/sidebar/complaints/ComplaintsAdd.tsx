import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import BackButton from "../../../components/BackButton";
import SearchableTextField from "../../../components/SearchableTextField";
import SubmitButton from "../../../components/SubmitButton";
import { useForm } from "react-hook-form";
import SelectField from "../../../components/SelectField";
import DateTimePickerField from "../../../components/DateTimePickerField";
import SELECTION from "../../../constants/SELECTION";
import { ResidentPropType } from "../../../utils/types";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import useCreateComplaint from "../../../queries/complaints/useCreateComplaint";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import { getResidentFullAddress } from "../../../helper/getResidentFullAddres";
import OfficialSearchableTextField from "../../../components/OfficialsSearchableTextField";

const ComplaintsAdd: React.FC = () => {
  const { mutate } = useCreateComplaint();
  const { register, handleSubmit } = useForm();

  const [residentDetails, setResidentDetails] = useState<
    ResidentPropType | undefined
  >();
  const [officialDetails, setOfficialDetails] = useState<
    ResidentPropType | undefined
  >();
  const [dateValue, setDateValue] = useState<Dayjs | null | undefined>(null);
  const [fullAddress, setFullAddress] = useState<string | undefined>();

  const handleChange = (resident: ResidentPropType | undefined) => {
    setResidentDetails(resident);
  };

  const handleOnChangeDate = (date: Dayjs | null) => {
    setDateValue(date);
  };

  const complainantsFullAddress = getResidentFullAddress({
    houseNumber: residentDetails?.houseNumber,
    streetAddress: residentDetails?.streetAddress,
    purokNumber: residentDetails?.purokNumber,
  });

  useEffect(() => {
    if (residentDetails) {
      const complainantsFullAddress = getResidentFullAddress({
        houseNumber: residentDetails?.houseNumber,
        streetAddress: residentDetails?.streetAddress,
        purokNumber: residentDetails?.purokNumber,
      });

      setFullAddress(complainantsFullAddress);
    }
  }, [residentDetails]);

  const onSubmit = (event: any) => {
    const complainantsFullName = getResidentFullName({
      lastName: residentDetails?.lastName,
      firstName: residentDetails?.firstName,
      middleName: residentDetails?.middleName,
      suffix: residentDetails?.suffix,
    });

    mutate({
      ...event,
      complainantsId: residentDetails?._id,
      complainantsName: complainantsFullName,
      complainantsAddress: complainantsFullAddress,
      complainantsContactNumber: residentDetails?.contactNumber,
      respondentsId: officialDetails?._id,
      respondentsName: getResidentFullName({
        lastName: officialDetails?.lastName,
        firstName: officialDetails?.firstName,
        middleName: officialDetails?.middleName,
        suffix: officialDetails?.suffix,
      }),
      incidentDateAndTime: dateValue?.format("MM/DD/YYYY - HH:mm A"),
    });
  };

  return (
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
              <SearchableTextField
                label="Complainant's Name"
                isEdit
                defaultValue={
                  residentDetails?.firstName + " " + residentDetails?.lastName
                }
                handleChange={handleChange}
              />
              <TextField
                label="Complainant's Contact Number"
                register={register}
                name="complainantsContactNumber"
                defaultValue={residentDetails?.contactNumber}
              />
              <TextField
                label="Complainant's Address"
                register={register}
                name="complainantsAddress"
                defaultValue={fullAddress}
              />
            </div>
          </Card>
          <Card>
            <CardHeader title="Complaint Details" isRequired />
            <div className="flex space-y-5 flex-col">
              <DateTimePickerField
                label="Incident Date and Time"
                isEdit
                onChange={handleOnChangeDate}
                value={dateValue}
              />

              <TextField
                label="Complaint Type"
                isEdit
                register={register}
                name="complaintType"
              />
            </div>
          </Card>
          <div className="flex justify-end mt-6">
            <SubmitButton label="Submit" />
          </div>
        </div>
        {/* 2nd column */}
        <div className="flex flex-col space-y-6">
          <Card>
            <CardHeader title="Respondent's Information" isRequired />
            <div className="flex space-y-5 flex-col">
              <OfficialSearchableTextField
                label="Respondent's Name"
                isEdit
                handleChange={setOfficialDetails}
              />
            </div>
          </Card>
          <Card>
            <CardHeader title="Complainant's Statement" isRequired />
            <TextAreaField
              rows={8}
              isEdit
              register={register}
              name="complainantsStatement"
            />
          </Card>
        </div>
      </form>
    </>
  );
};

export default ComplaintsAdd;
