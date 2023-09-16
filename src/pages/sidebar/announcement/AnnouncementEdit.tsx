import React, { SetStateAction, useState } from "react";
import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CustomButton from "../../../components/CustomButton";
import RadioButton from "../../../components/RadioButton";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/BackButton";
import { AnnouncementPropType } from "../../../utils/types";
import useGetAnnouncementById from "../../../queries/announcement/useGetAnnouncementById";
import SELECTION from "../../../constants/SELECTION";
import Loading from "../../errors/Loading";
import { useForm } from "react-hook-form";
import DatePickerField from "../../../components/DatePickerField";
import dayjs, { Dayjs } from "dayjs";
import useUpdateAnnouncement from "../../../queries/announcement/useUpdateAnnouncement";
import SubmitButton from "../../../components/SubmitButton";

const AnnouncementEdit: React.FC = () => {
  const { _id: announcementId } = useParams();
  const { register, handleSubmit } = useForm();
  const { data: announcement, isLoading } =
    useGetAnnouncementById(announcementId);
  const { mutate } = useUpdateAnnouncement(announcementId);

  const onSubmit = (event: any) => {
    mutate({ announcementId, updatedData: event });
    console.log(event);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <BackButton />
          <form
            className="grid md:grid-cols-2 gap-6 mt-5 pb-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Card>
              <CardHeader title="Announcement Details" />
              <div className="space-y-4">
                <DatePickerField
                  label="Date Posted"
                  value={dayjs(announcement?.datePosted, "MM/DD/YYYY")}
                />

                <TextField
                  label="Announcement Title"
                  initialValue={announcement?.announcementTitle}
                  isEdit
                  register={register}
                  name="announcementTitle"
                />

                <TextAreaField
                  label="Message"
                  initialValue={announcement?.announcementMessage}
                  rows={8}
                  isEdit
                  register={register}
                  name={"announcementMessage"}
                />

                <div className="flex justify-end mt-6">
                  <SubmitButton label="Save Changes" />
                </div>
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
      )}
    </>
  );
};

export default AnnouncementEdit;
