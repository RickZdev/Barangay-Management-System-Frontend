import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomButton from "../../../components/CustomButton";
import RadioButton from "../../../components/RadioButton";
import BackButton from "../../../components/BackButton";
import SELECTION from "../../../constants/SELECTION";
import dayjs from "dayjs";
import DatePickerField from "../../../components/DatePickerField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import useCreateAnnouncement from "../../../queries/announcement/useCreateAnnouncement";
import useAuthContext from "../../../queries/auth/useAuthContext";

const AnnouncementAdd: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useCreateAnnouncement();

  const auth = useAuthContext();

  const onSubmit = (event: any) => {
    const dateToday = dayjs().format("MM/DD/YYYY");
    mutate({ ...event, announcedBy: auth?.userRole, datePosted: dateToday });
  };

  return (
    <>
      <BackButton />
      <form
        className="grid md:grid-cols-2 gap-6 mt-5 pb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader title="Announcement Details" />
          <div className="space-y-4">
            <DatePickerField label="Date Posted" value={dayjs()} />

            <TextField
              label="Announcement Title"
              isEdit
              register={register}
              name={"announcementTitle"}
            />

            <TextAreaField
              label="Message"
              isEdit
              rows={8}
              register={register}
              name="announcementMessage"
            />
          </div>
          <div className="flex justify-end mt-6">
            <SubmitButton label="Submit" />
          </div>
        </Card>
        <Card>
          <CardHeader title="Announcement Image" />
          <div className="w-full h-[300px] bg-[#1e1e2f] rounded-md items-center flex justify-center cursor-pointer">
            <img
              src={"../../src/assets/images/upload-image-icon.webp"}
              width={"20%"}
              style={{ objectFit: "cover" }}
            />
          </div>
          <CustomButton
            label="Upload Image"
            className="mt-5"
            Icon={CloudUploadIcon}
          />
        </Card>
      </form>
    </>
  );
};

export default AnnouncementAdd;
