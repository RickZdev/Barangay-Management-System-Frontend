import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import TextField from "../../../components/TextField";
import TextAreaField from "../../../components/TextAreaField";
import BackButton from "../../../components/BackButton";
import dayjs from "dayjs";
import DatePickerField from "../../../components/DatePickerField";
import { useForm } from "react-hook-form";
import SubmitButton from "../../../components/SubmitButton";
import useCreateAnnouncement from "../../../queries/announcement/useCreateAnnouncement";
import useAuthContext from "../../../queries/auth/useAuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { announcementFormValidation } from "../../../utils/validation";
import LoaderModal from "../../../components/modals/loader/LoaderModal";

import { IconButton, Tooltip } from "@mui/material";
import { Close, FileUpload } from "@mui/icons-material";
import useDragAndDrop from "../../../hooks/useDragAndDrop";
import { useEffect, useState } from "react";
import ModalFailed from "../../../components/modals/alert/ModalFailed";
import useFirebaseStorage from "../../../hooks/useFirebaseStorage";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";

const AnnouncementAdd: React.FC = () => {
  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(announcementFormValidation),
  });

  const auth = useAuthContext();
  const { mutate, isLoading: isAnnouncementLoading } = useCreateAnnouncement();

  const { handleUploadImage } = useFirebaseStorage();
  const {
    isDragActive,
    image,

    getRootProps,
    showImageErrorModal,

    handleCloseDragAndDropModal,
    handleRemoveImage,
  } = useDragAndDrop();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isLoading = isAnnouncementLoading || isProcessing;

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    try {
      const uploadedImage = await handleUploadImage(
        data.announcementImage,
        "announcements"
      );

      const dateToday = dayjs().format("MM/DD/YYYY");

      mutate({
        ...data,
        announcementImage: uploadedImage,
        announcedBy: auth?.userRole,
        datePosted: dateToday,
      });

      setShowSuccessModal(true);
    } catch (error: any) {
      console.log(error, "Error uploading image to storage");
    }

    setIsProcessing(false);
  };

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
            <DatePickerField label="Date Posted" value={dayjs()} />

            <TextField
              register={register("announcementTitle")}
              label="Announcement Title"
              isEdit
              error={errors?.announcementTitle?.message}
            />

            <TextAreaField
              register={register("announcementMessage")}
              label="Message"
              isEdit
              rows={8}
              error={errors?.announcementMessage?.message}
            />
          </div>

          <div className="flex justify-end mt-6">
            <SubmitButton label="Submit" />
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
                <div className="bg-[#1e1e2f] rounded-md">
                  <img src={image} style={{ width: "100%" }} />
                </div>
              ) : (
                <div
                  style={{
                    borderColor: errors.announcementImage?.message
                      ? "red"
                      : "rgb(110 231 183)",
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
        title="Added Announcement Successfully"
        description="Your announcement has been saved."
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

export default AnnouncementAdd;
