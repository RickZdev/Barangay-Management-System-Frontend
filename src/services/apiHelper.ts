import { axios, authApi } from "./axios-config";

import type {
  AdminAccountPropType,
  AllOfficialsPropType,
  AnnouncementPropType,
  BlotterPropType,
  BorrowedInventoryPropType,
  BorrowedRecordsPropType,
  ComplaintsPropType,
  IndigentBenefitsPropType,
  LoginAuditPropType,
  ResidentPropType,
  SulatReklamoPropType,
  TransactionPropType,
  UserPropType,
} from "../utils/types";
import { getResidentAge } from "../helper/getResidentAge";
import _ from "lodash";

// auth functions
export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await authApi.post("/api/auth/login", {
      username: username,
      password: password,
    });

    const pendingResidents = await authApi.get(
      "/api/residents/status/resident"
    );

    const isResidentStillPending = _.find(
      pendingResidents.data,
      (resident) => resident._id === response.data._id
    );
    if (!isResidentStillPending) {
      return { message: "success", data: response.data, error: "" };
    } else {
      return {
        message: "error",
        data: "",
        error: "Resident not verified yet.",
      };
    }
  } catch (error: any) {
    return { message: "error", data: "", error: error.response.data.error };
  }
};

export const signupUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await authApi.post(`/api/auth/signup`, {
      username: username,
      password: password,
    });
    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    return { message: "error", data: "", error: error.response.data.error };
  }
};

export const deleteAuthUser = async ({ userId }: { userId: string }) => {
  try {
    const response = await authApi.delete(`/api/auth/${userId}`);
    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    return { message: "error", data: "", error: error.response.data.error };
  }
};

export const forgotPassword = async ({
  emailAddress,
}: {
  emailAddress: string;
}) => {
  try {
    const response = await authApi.post(`/api/auth/forgot-password`, {
      emailAddress,
    });
    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    return { message: "error", data: "", error: error.response.data.error };
  }
};

export const resetPassword = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  try {
    const response = await authApi.get(
      `/api/auth/reset-password/${id}/${token}`
    );
    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    return { message: "error", data: "", error: error.response.data.error };
  }
};

export const changePassword = async ({
  userId,
  newPassword,
}: {
  userId: string | undefined;
  newPassword: string;
}) => {
  try {
    const response = await authApi.patch(`/api/auth/change-password`, {
      id: userId,
      newPassword: newPassword,
    });

    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    console.log(error.response.data.error);
    return { message: "error", data: "", error: error.response.data.error };
  }
};

// users function
export const createUser = async ({
  userId,
  username,
  residentName,
}: {
  userId: string;
  username: string;
  residentName: string;
}) => {
  const data = {
    _id: userId,
    username,
    residentName,
  };

  try {
    const response = await authApi.post(`/api/users/`, data);
    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    return { message: "error", data: "", error: error.response.data.error };
  }
};

export const getUserById = async (
  id: string | undefined
): Promise<{
  message: string;
  data: UserPropType | undefined;
  error: string;
}> => {
  try {
    const response = await authApi.get(`/api/users/${id}`);

    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    return {
      message: "error",
      data: undefined,
      error: error.response.data.error,
    };
  }
};

export const updateUser = async ({
  userId,
  updatedData,
}: {
  userId: string | undefined;
  updatedData: any;
}): Promise<string> => {
  try {
    const response = await authApi.patch(`/api/users/${userId}`, updatedData);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// resident functions
export const getAllResidents = async (): Promise<ResidentPropType[]> => {
  try {
    const residents = await axios.get(`/api/residents`);

    const residentStatus = await axios.get("api/residents/status/resident");

    const residentsData = residents.data;
    const residentStatusData = residentStatus.data;

    // Extract _id values from residentStatus array using _.map()
    const residentStatusIds = _.map(residentStatusData, "_id");

    // Filter out residents that are not in residentStatus using _.filter()
    const residentsWithoutStatus = _.filter(
      residentsData,
      (resident) => !residentStatusIds.includes(resident._id)
    );

    return residentsWithoutStatus;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const createResident = async (residentData: ResidentPropType) => {
  const {
    _id,
    lastName,
    firstName,
    middleName,
    suffix,
    sex,
    emailAddress,
    contactNumber,
    birthDate,
    educationalAttainment,
    occupation,
    civilStatus,
    citizenship,
    category,
    houseNumber,
    streetAddress,
    purokNumber,
    profileNotes,
    profilePhoto,
  } = residentData;

  try {
    const response = await axios.post(`/api/residents`, {
      _id,
      lastName,
      firstName,
      middleName,
      suffix,
      sex,
      emailAddress,
      contactNumber,
      birthDate,
      educationalAttainment,
      occupation,
      civilStatus,
      citizenship,
      category,
      houseNumber,
      streetAddress,
      purokNumber,
      profileNotes: profileNotes ?? "",
      profilePhoto: profilePhoto ?? "",
    });

    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    return { message: "error", data: "", error: error.response.data.error };
  }
};

export const getResidentById = async (
  id: string | undefined | null
): Promise<ResidentPropType> => {
  try {
    const response = await axios.get<ResidentPropType>(`/api/residents/${id}`);

    let { birthDate } = response.data;
    let { ...residentDetails } = response.data;

    const computedAge = getResidentAge(birthDate);
    return { age: computedAge, ...response.data };
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const deleteResident = async (residentId: string): Promise<string> => {
  try {
    const response = await axios.delete(`/api/residents/${residentId}`);

    const official = await getOfficialPosition(residentId);

    if (official) {
      updateOfficial({
        position: official.position,
        updatedData: { residentId: "" },
      });
    } else {
      console.log("NOT AN ADMIN!");
    }

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const updateResident = async ({
  residentId,
  updatedData,
}: {
  residentId: string | undefined;
  updatedData: any;
}) => {
  try {
    const response = await axios.patch(
      `/api/residents/${residentId}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const searchResidents = async (searchText: string) => {
  try {
    const residents = await axios.get(`/api/residents/search/${searchText}`);
    const residentStatus = await axios.get("api/residents/status/resident");
    const residentsData = residents.data;
    const residentStatusData = residentStatus.data;

    // Extract _id values from residentStatus array using _.map()
    const residentStatusIds = _.map(residentStatusData, "_id");

    // Filter out residents that are not in residentStatus using _.filter()
    const residentsWithoutStatus = _.filter(
      residentsData,
      (resident) => !residentStatusIds.includes(resident._id)
    );

    return residentsWithoutStatus;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getResidentStatuses = async (): Promise<ResidentPropType[]> => {
  try {
    const residents = await axios.get(`/api/residents`);

    const residentStatus = await axios.get("api/residents/status/resident");

    const residentsData = residents.data;
    const residentStatusData = residentStatus.data;

    // Extract _id values from residentStatus array using _.map()
    const residentStatusIds = _.map(residentStatusData, "_id");

    // Filter out residents that are not in residentStatus using _.filter()
    const residentsWithoutStatus = _.filter(residentsData, (resident) =>
      residentStatusIds.includes(resident._id)
    );

    return residentsWithoutStatus;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const deleteResidentStatus = async ({
  residentId,
  status = "Approved",
}: {
  residentId: string;
  status?: "Approved" | "Rejected";
}) => {
  try {
    const response = await axios.delete(
      `/api/residents/status/resident/${residentId}`,
      {
        params: {
          status: status,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// complaints function
export const getAllComplaints = async (): Promise<ComplaintsPropType[]> => {
  try {
    const response = await axios.get(`/api/complaints`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getComplaintById = async (
  id: string | undefined
): Promise<ComplaintsPropType> => {
  try {
    const response = await axios.get<ComplaintsPropType>(
      `/api/complaints/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createComplaint = async (
  complaintData: ComplaintsPropType
): Promise<ComplaintsPropType | null | undefined> => {
  const {
    complainantsId,
    complainantsName,
    complainantsAddress,
    complainantsContactNumber,
    complaintType,
    respondentsId,
    respondentsName,
    complainantsStatement,
    incidentDateAndTime,
  } = complaintData;
  try {
    const response = await axios.post(`/api/complaints`, {
      complainantsId,
      complainantsName,
      complainantsAddress,
      complainantsContactNumber,
      complaintType,
      respondentsId,
      respondentsName,
      complainantsStatement,
      incidentDateAndTime,
      status: "Pending",
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const deleteComplaint = async (complaintId: string): Promise<string> => {
  try {
    const response = await axios.delete(`/api/complaints/${complaintId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const updateComplaint = async ({
  complaintId,
  status,
}: {
  complaintId: string | undefined;
  status: string;
}): Promise<string> => {
  try {
    const response = await axios.patch(
      `/api/complaints/${complaintId}`,
      status
    );
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

// announcements function
export const getAllAnnouncements = async (): Promise<
  AnnouncementPropType[]
> => {
  try {
    const response = await axios.get(`/api/announcements`);
    return response.data;
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const getAnnouncementById = async (
  id: string | undefined
): Promise<AnnouncementPropType> => {
  try {
    const response = await axios.get<AnnouncementPropType>(
      `/api/announcements/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createAnnouncement = async (
  announcementData: AnnouncementPropType
): Promise<AnnouncementPropType | null | undefined> => {
  const {
    _id,
    announcementTitle,
    announcementMessage,
    announcementImage,
    announcedBy,
    datePosted,
  } = announcementData;
  try {
    const response = await axios.post(`/api/announcements`, {
      _id,
      announcementTitle,
      announcementMessage,
      announcementImage,
      datePosted,
      announcedBy: announcedBy,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const deleteAnnouncement = async (
  announcementId: string
): Promise<string> => {
  try {
    const response = await axios.delete(`/api/announcements/${announcementId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error.response.data.error;
  }
};

export const updateAnnouncement = async ({
  announcementId,
  updatedData,
}: {
  announcementId: string | undefined;
  updatedData: any;
}): Promise<string> => {
  try {
    const response = await axios.patch(
      `/api/announcements/${announcementId}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// transactions function
export const getAllTransactions = async (): Promise<TransactionPropType[]> => {
  try {
    const response = await axios.get(`/api/transactions`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getTransactionById = async (
  id: string | undefined
): Promise<TransactionPropType> => {
  try {
    const response = await axios.get<TransactionPropType>(
      `/api/transactions/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createTransaction = async (
  transactionData: TransactionPropType
): Promise<TransactionPropType | null | undefined> => {
  const {
    _id,
    residentId,
    residentName,
    transactionType,
    transactionDateAndTime,
    transactionReceiptNumber,
    amount,
    officialInCharge,
  } = transactionData;
  try {
    const response = await axios.post(`/api/transactions`, {
      _id,
      residentId,
      residentName,
      transactionType,
      transactionDateAndTime,
      transactionReceiptNumber,
      amount,
      officialInCharge,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const deleteTransaction = async (
  transactionId: string
): Promise<string> => {
  try {
    const response = await axios.delete(`/api/transactions/${transactionId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// admins function
export const getAllAdmins = async (): Promise<AdminAccountPropType[]> => {
  try {
    const response = await axios.get(`/api/admins`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getAdminById = async (
  id: string | undefined
): Promise<AdminAccountPropType> => {
  try {
    const response = await axios.get<AdminAccountPropType>(`/api/admins/${id}`);

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createAdmin = async ({
  adminId,
  adminRole,
}: {
  adminId: string | undefined;
  adminRole: string;
}): Promise<string> => {
  try {
    const response = await axios.post(`/api/admins/`, {
      adminId,
      adminRole,
    });

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const deleteAdmin = async (adminId: string): Promise<string> => {
  try {
    const response = await axios.delete(`/api/admins/${adminId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// login audits function
export const getAllLoginAudits = async (): Promise<LoginAuditPropType[]> => {
  try {
    const response = await axios.get(`/api/loginaudits`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getLoginAuditById = async (
  id: string | undefined
): Promise<LoginAuditPropType[]> => {
  try {
    const response = await axios.get<LoginAuditPropType[]>(
      `/api/loginaudits/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

// borrowed inventory function
export const getAllBorrowedInventory = async (): Promise<
  BorrowedInventoryPropType[]
> => {
  try {
    const response = await axios.get(`/api/borrowedinventory`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getBorrowedInventoryById = async (
  id: string | undefined
): Promise<BorrowedInventoryPropType> => {
  try {
    const response = await axios.get<BorrowedInventoryPropType>(
      `/api/borrowedinventory/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createBorrowedInventory = async (
  borrowedInventoryData: BorrowedInventoryPropType
): Promise<BorrowedInventoryPropType | null | undefined> => {
  const {
    borroweeId,
    borroweeName,
    borroweeContactNumber,
    borrowedItems,
    borrowedDateAndTime,
    purposeOfBorrowing,
    eventLocation,
    officialInCharge,
  } = borrowedInventoryData;
  try {
    const response = await axios.post(`/api/borrowedinventory`, {
      borroweeId,
      borroweeName,
      borroweeContactNumber,
      borrowedItems,
      borrowedDateAndTime,
      purposeOfBorrowing,
      eventLocation,
      officialInCharge,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const deleteBorrowedInventory = async (
  borrowedInventoryId: string
): Promise<string> => {
  try {
    const response = await axios.delete(
      `/api/borrowedinventory/${borrowedInventoryId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// borrowed records function
export const getAllBorrowedRecords = async (): Promise<
  BorrowedRecordsPropType[]
> => {
  try {
    const response = await axios.get(`/api/borrowedrecords`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createBorrowedRecord = async ({
  borrowedId,
  returnedDateAndTime,
}: {
  borrowedId: string;
  returnedDateAndTime: string;
}): Promise<BorrowedRecordsPropType | null | undefined> => {
  try {
    const {
      borroweeId,
      borroweeName,
      borroweeContactNumber,
      borrowedItems,
      borrowedDateAndTime,
      purposeOfBorrowing,
      eventLocation,
      officialInCharge,
    } = await getBorrowedInventoryById(borrowedId);

    const response = await axios.post(`/api/borrowedrecords`, {
      borroweeId,
      borroweeName,
      borroweeContactNumber,
      borrowedItems,
      borrowedDateAndTime,
      returnedDateAndTime: returnedDateAndTime,
      purposeOfBorrowing,
      eventLocation,
      officialInCharge,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const deleteBorrowedRecord = async (
  borrowedRecordId: string
): Promise<string> => {
  try {
    const response = await axios.delete(
      `/api/borrowedrecords/${borrowedRecordId}`
    );

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// officials function
export const getAllOfficials = async (): Promise<ResidentPropType[]> => {
  try {
    const officials = await axios.get<AllOfficialsPropType[]>(`/api/officials`);

    const officialWithPosition = officials?.data.filter(
      (official) => official.residentId !== ""
    );

    const officialsData = await Promise.all(
      officialWithPosition?.map((official) => {
        if (official.residentId !== "") {
          return getResidentById(official.residentId);
        }
      })
    );
    console.log("NICE", officialWithPosition);
    return officialsData as ResidentPropType[];
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getOfficialByPosition = async (position: string | undefined) => {
  try {
    const response = await axios.get(`/api/officials/${position}`);

    return { message: "success", data: response?.data, error: "" };
  } catch (error: any) {
    return { message: "error", data: "", error: error.response.data.error };
  }
};

export const deleteOfficial = async (officialId: string): Promise<string> => {
  try {
    const response = await axios.delete(`/api/officials/${officialId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const updateOfficial = async ({
  position,
  updatedData,
}: {
  position: string | undefined;
  updatedData: any;
}) => {
  try {
    const response = await axios.patch(
      `/api/officials/${position}`,
      updatedData
    );
    return { message: "success", data: response.data, error: "" };
  } catch (error: any) {
    return { message: "error", data: "", error: error.response?.data };
  }
};

export const getOfficialPosition = async (
  residentId: string | undefined
): Promise<AllOfficialsPropType | undefined> => {
  try {
    const officials = await axios.get<AllOfficialsPropType[]>(`api/officials`);

    const officialWithPosition = officials?.data.filter(
      (official) => official.residentId !== ""
    );

    const deletedOfficial = officialWithPosition.find(
      (official) => official.residentId === residentId
    );

    return deletedOfficial;
  } catch (error: any) {
    return error.response.data.error;
  }
};

// blotter function
export const getAllBlotters = async (): Promise<BlotterPropType[]> => {
  try {
    const response = await axios.get(`/api/blotters`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getBlotterById = async (
  id: string | undefined
): Promise<BlotterPropType> => {
  try {
    const response = await axios.get<BlotterPropType>(`/api/blotters/${id}`);

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createBlotter = async (
  blotterData: BlotterPropType
): Promise<BlotterPropType | null | undefined> => {
  try {
    const response = await axios.post(`/api/blotters`, {
      ...blotterData,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const deleteBlotter = async (blotterId: string): Promise<string> => {
  try {
    const response = await axios.delete(`/api/blotters/${blotterId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const updateBlotter = async ({
  blotterId,
  status,
}: {
  blotterId: string | undefined;
  status: string;
}): Promise<string> => {
  try {
    const response = await axios.patch(`/api/blotters/${blotterId}`, status);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// sulat reklamo function
export const getAllSulatReklamo = async (): Promise<SulatReklamoPropType[]> => {
  try {
    const response = await axios.get(`/api/sulatreklamo`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getSulatReklamoById = async (
  id: string | undefined
): Promise<SulatReklamoPropType> => {
  try {
    const response = await axios.get<SulatReklamoPropType>(
      `/api/sulatreklamo/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createSulatReklamo = async (
  sulatReklamoData: SulatReklamoPropType
): Promise<SulatReklamoPropType | null | undefined> => {
  try {
    const response = await axios.post(`/api/sulatreklamo`, {
      ...sulatReklamoData,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const deleteSulatReklamo = async (
  sulatReklamoId: string
): Promise<string> => {
  try {
    const response = await axios.delete(`/api/sulatreklamo/${sulatReklamoId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const updateSulatReklamo = async ({
  sulatReklamoId,
  status,
}: {
  sulatReklamoId: string | undefined;
  status: string;
}): Promise<string> => {
  try {
    const response = await axios.patch(
      `/api/sulatreklamo/${sulatReklamoId}`,
      status
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// indigent benefits function
export const getAllIndigentBenefit = async (): Promise<
  IndigentBenefitsPropType[]
> => {
  try {
    const response = await axios.get(`/api/indigentbenefits`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createIndigentBenefit = async ({
  residentId,
  residentName,
  pension,
  purok,
  status,
  receiver,
  relation,
  birthDate,
  monthAndYear,
}: IndigentBenefitsPropType): Promise<
  IndigentBenefitsPropType[] | null | undefined
> => {
  try {
    const response = await axios.post(`/api/indigentbenefits`, {
      residentId,
      residentName,
      pension,
      category: "Senior Citizen",
      purok,
      status,
      receiver,
      relation,
      birthDate,
      monthAndYear,
    });

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const updateIndigentBenefit = async ({
  indigentBenefitId,
  updatedData,
}: {
  indigentBenefitId: string | undefined;
  updatedData: any;
}): Promise<string> => {
  try {
    const response = await axios.patch(
      `/api/indigentbenefits/${indigentBenefitId}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};
