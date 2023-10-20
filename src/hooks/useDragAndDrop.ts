import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const useDragAndDrop = () => {
  const [image, setImage] = useState<string | undefined>(undefined);

  const [showImageErrorModal, setShowImageErrorModal] =
    useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file && acceptedFiles.length === 0) {
      setShowImageErrorModal(true);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  const handleCloseDragAndDropModal = () => {
    setShowImageErrorModal(false);
  };

  const handleRemoveImage = () => {
    setImage("");
  };

  return {
    image,
    setImage,
    isDragActive,
    getRootProps,
    getInputProps,

    showImageErrorModal,

    handleCloseDragAndDropModal,
    handleRemoveImage,
  };
};

export default useDragAndDrop;
