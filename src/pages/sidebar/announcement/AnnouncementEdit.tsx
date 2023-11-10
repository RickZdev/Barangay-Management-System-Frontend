import React, { SetStateAction, useEffect, useState } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { announcementFormValidation } from "../../../utils/validation";
import { IconButton, Tooltip } from "@mui/material";
import { Close, FileUpload } from "@mui/icons-material";
import useDragAndDrop from "../../../hooks/useDragAndDrop";
import ModalFailed from "../../../components/modals/alert/ModalFailed";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import useFirebaseStorage from "../../../hooks/useFirebaseStorage";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";
import { COLORS } from "../../../constants/COLORS";

const AnnouncementEdit: React.FC = () => {
  const { _id: announcementId } = useParams();

  const { data: announcement, isLoading: isAnnouncementLoading } =
    useGetAnnouncementById(announcementId);
  const { mutate } = useUpdateAnnouncement(announcementId);

  const { handleUploadImage } = useFirebaseStorage();
  const {
    isDragActive,
    image,
    setImage,

    getRootProps,
    showImageErrorModal,

    handleCloseDragAndDropModal,
    handleRemoveImage,
  } = useDragAndDrop();

  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      announcementImage: announcement?.announcementImage ?? "",
      announcementMessage: announcement?.announcementMessage ?? "",
      announcementTitle: announcement?.announcementTitle ?? "",
    },
    resolver: yupResolver(announcementFormValidation),
  });

  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isLoading = isAnnouncementLoading || isProcessing;

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    let uploadedImage = "";
    if (announcement?.announcementImage !== image) {
      try {
        uploadedImage = await handleUploadImage(
          data.announcementImage,
          "announcements"
        );
      } catch (error) {
        throw error;
      }
    }

    if (uploadedImage) {
      mutate({
        announcementId,
        updatedData: { ...data, announcementImage: uploadedImage },
      });
    } else {
      mutate({ announcementId, updatedData: data });
    }
    setIsProcessing(false);

    setShowSuccessModal(true);
  };

  useEffect(() => {
    if (announcement?.announcementImage) {
      setImage(announcement?.announcementImage);
    }

    if (announcement?.datePosted) {
      const dateObj = dayjs(announcement?.datePosted);
      setDateValue(dateObj);
    }
  }, [announcement]);

  useEffect(() => {
    if (image) {
      setValue("announcementImage", image);
      clearErrors("announcementImage");
    } else {
      setValue("announcementImage", "");
    }
  }, [image]);

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <BackButton />
      <form
        className="grid md:grid-cols-2 gap-6 mt-5 pb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader title="Announcement Details" />
          <div className="space-y-4">
            <DatePickerField label="Date Posted" value={dateValue} />

            <TextField
              register={register("announcementTitle")}
              label="Announcement Title"
              isEdit
              error={errors?.announcementTitle?.message}
            />

            <TextAreaField
              register={register("announcementMessage")}
              label="Message"
              rows={8}
              isEdit
              error={errors?.announcementMessage?.message}
            />

            <div className="flex justify-end mt-6">
              <SubmitButton label="Save Changes" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-1 flex-col h-full">
            <CardHeader title="Announcement Image" />
            {image && (
              <Tooltip
                arrow
                title="Remove"
                sx={{ alignSelf: "flex-end", marginBottom: 1 }}
                color="error"
                onClick={handleRemoveImage}
              >
                <IconButton>
                  <Close color="error" />
                </IconButton>
              </Tooltip>
            )}

            <div className="flex flex-1 flex-col justify-center items-center">
              {image ? (
                <div className="bg-primary rounded-md">
                  <img src={image} style={{ width: "100%" }} />
                </div>
              ) : (
                <div
                  style={{
                    borderColor: errors.announcementImage?.message
                      ? "red"
                      : COLORS.primary,
                  }}
                  className="flex flex-1 p-24 items-center justify-center w-full rounded-3xl border-dashed border-2 cursor-pointer"
                  {...getRootProps()}
                >
                  {isDragActive ? (
                    <p className="font-poppins text-gray-500 text-sm text-center">
                      Drop the file here...
                    </p>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FileUpload
                        sx={{ height: 100, width: 100 }}
                        color="action"
                      />
                      <p className="font-poppins text-gray-500 text-sm text-center">
                        <span className="font-extrabold text-neutral-400">
                          Choose an image file{" "}
                        </span>
                        or drag and drop it here
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {errors.announcementImage?.message && (
              <div className="flex w-full justify-end mt-5">
                <p className="text-red-400 text-xs">
                  {errors.announcementImage?.message}
                </p>
              </div>
            )}
          </div>
        </Card>
      </form>

      <ModalSuccess
        open={showSuccessModal}
        title="Update Announcement Successfully"
        description="Your changes has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleCloseModal}
      />

      <ModalFailed
        open={showImageErrorModal}
        title="Uploading Image Failed"
        description="Please upload a single image in either JPEG or PNG format."
        buttonLabel="Try again"
        handleButtonPress={handleCloseDragAndDropModal}
      />
    </>
  );
};

export default AnnouncementEdit;
