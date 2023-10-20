import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { firebaseStorage } from "../firebase/config";
import { StorageFolderPropType } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

const useFirebaseStorage = () => {
  const imageUrlToBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || mimeMatch.length < 2) {
      throw new Error("Invalid data URL");
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleUploadImage = async (
    image: string,
    folderName: StorageFolderPropType
  ) => {
    const blobImage = imageUrlToBlob(image);
    const imageRef = ref(firebaseStorage, `images/${folderName}/${uuidv4()}`);

    await uploadBytes(imageRef, blobImage);
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  };

  const handleDeleteImage = async (imageUrl: string) => {
    // Extract the filename from the image URL
    const parts = imageUrl.split("/");
    const encodedFilename = parts[parts.length - 1].split("?")[0]; // Get the last part and remove query parameters
    const decodedFilename = decodeURIComponent(encodedFilename); // Decode the URL-encoded filename

    if (decodedFilename) {
      const imageRef = ref(firebaseStorage, `${decodedFilename}`);
      try {
        await deleteObject(imageRef);
        return `Image ${decodedFilename} deleted successfully.`;
      } catch (error) {
        throw `Error deleting image ${decodedFilename}: ${error}`;
      }
    } else {
      throw new Error(`Invalid image URL ${imageUrl}`);
    }
  };

  return { handleUploadImage, handleDeleteImage };
};

export default useFirebaseStorage;
