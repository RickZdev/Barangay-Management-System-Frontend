import axios from "axios";
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
  LoginPropType,
  ResidentPropType,
  SulatReklamoPropType,
  TransactionPropType,
  UserPropType,
} from "../utils/types";
import { getResidentAge } from "../helper/getResidentAge";
import dayjs from "dayjs";

const BASE_URL = "http://localhost:4000";

// auth functions
export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<LoginPropType> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// resident functions
export const getAllResidents = async (): Promise<ResidentPropType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/residents`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createResident = async (
  residentData: ResidentPropType
): Promise<ResidentPropType | null | undefined> => {
  const {
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
  } = residentData;
  try {
    let residentSuffix;
    let residentCategory;
    let residentEducationalAttainment;

    if (suffix !== "N/A") {
      residentSuffix = suffix;
    } else {
      residentSuffix = "";
    }

    if (category !== "N/A") {
      residentCategory = category;
    } else {
      residentCategory = "";
    }

    if (residentEducationalAttainment !== "N/A") {
      residentEducationalAttainment = educationalAttainment;
    } else {
      residentEducationalAttainment = "";
    }

    const response = await axios.post(`${BASE_URL}/api/residents`, {
      lastName,
      firstName,
      middleName,
      suffix: residentSuffix,
      sex,
      emailAddress,
      contactNumber,
      birthDate,
      educationalAttainment: residentEducationalAttainment,
      occupation,
      civilStatus,
      citizenship,
      category: residentCategory,
      houseNumber,
      streetAddress,
      purokNumber,
      profileNotes,
      profilePhoto: "",
    });
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const getResidentById = async (
  id: string | undefined | null
): Promise<ResidentPropType> => {
  try {
    const response = await axios.get<ResidentPropType>(
      `${BASE_URL}/api/residents/${id}`
    );

    let { birthDate } = response.data;
    let { ...residentDetails } = response.data;

    const computedAge = getResidentAge(birthDate);
    return { age: computedAge, ...residentDetails };
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const deleteResident = async (residentId: string): Promise<string> => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/residents/${residentId}`
    );

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
}): Promise<string> => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/residents/${residentId}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const searchResidents = async (searchText: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/residents/search/${searchText}`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
}

// complaints function
export const getAllComplaints = async (): Promise<ComplaintsPropType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/complaints`);
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
      `${BASE_URL}/api/complaints/${id}`
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
    const response = await axios.post(`${BASE_URL}/api/complaints`, {
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
    const response = await axios.delete(
      `${BASE_URL}/api/complaints/${complaintId}`
    );
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
      `${BASE_URL}/api/complaints/${complaintId}`,
      status
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// announcements function
export const getAllAnnouncements = async (): Promise<
  AnnouncementPropType[]
> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/announcements`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getAnnouncementById = async (
  id: string | undefined
): Promise<AnnouncementPropType> => {
  try {
    const response = await axios.get<AnnouncementPropType>(
      `${BASE_URL}/api/announcements/${id}`
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
    const response = await axios.post(`${BASE_URL}/api/announcements`, {
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
    const response = await axios.delete(
      `${BASE_URL}/api/announcements/${announcementId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
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
      `${BASE_URL}/api/announcements/${announcementId}`,
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
    const response = await axios.get(`${BASE_URL}/api/transactions`);
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
      `${BASE_URL}/api/transactions/${id}`
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
    const response = await axios.post(`${BASE_URL}/api/transactions`, {
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
    const response = await axios.delete(
      `${BASE_URL}/api/transactions/${transactionId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// users function
export const getUserById = async (
  id: string | undefined
): Promise<UserPropType> => {
  try {
    const response = await axios.get<UserPropType>(
      `${BASE_URL}/api/users/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
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
    const response = await axios.patch(
      `${BASE_URL}/api/users/${userId}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// admins function
export const getAllAdmins = async (): Promise<AdminAccountPropType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/admins`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getAdminById = async (
  id: string | undefined
): Promise<AdminAccountPropType> => {
  try {
    const response = await axios.get<AdminAccountPropType>(
      `${BASE_URL}/api/admins/${id}`
    );

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
    const response = await axios.post(`${BASE_URL}/api/admins/`, {
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
    const response = await axios.delete(`${BASE_URL}/api/admins/${adminId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// login audits function
export const getAllLoginAudits = async (): Promise<LoginAuditPropType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/loginaudits`);
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
      `${BASE_URL}/api/loginaudits/${id}`
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
    const response = await axios.get(`${BASE_URL}/api/borrowedinventory`);
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
      `${BASE_URL}/api/borrowedinventory/${id}`
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
    const response = await axios.post(`${BASE_URL}/api/borrowedinventory`, {
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
      `${BASE_URL}/api/borrowedinventory/${borrowedInventoryId}`
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
    const response = await axios.get(`${BASE_URL}/api/borrowedrecords`);
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

    const response = await axios.post(`${BASE_URL}/api/borrowedrecords`, {
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

// officials function
export const getAllOfficials = async (): Promise<ResidentPropType[]> => {
  try {
    const officials = await axios.get<AllOfficialsPropType[]>(
      `${BASE_URL}/api/officials`
    );

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

export const getOfficialByPosition = async (
  position: string | undefined
): Promise<AllOfficialsPropType> => {
  try {
    const response = await axios.get<AllOfficialsPropType>(
      `${BASE_URL}/api/officials/${position}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const deleteOfficial = async (officialId: string): Promise<string> => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/officials/${officialId}`
    );
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
}): Promise<string> => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/officials/${position}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const getOfficialPosition = async (
  residentId: string | undefined
): Promise<AllOfficialsPropType | undefined> => {
  try {
    const officials = await axios.get<AllOfficialsPropType[]>(
      `${BASE_URL}/api/officials`
    );

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
    const response = await axios.get(`${BASE_URL}/api/blotters`);
    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const getBlotterById = async (
  id: string | undefined
): Promise<BlotterPropType> => {
  try {
    const response = await axios.get<BlotterPropType>(
      `${BASE_URL}/api/blotters/${id}`
    );

    return response.data;
  } catch (error: any) {
    return error.response.data.error;
  }
};

export const createBlotter = async (
  blotterData: BlotterPropType
): Promise<BlotterPropType | null | undefined> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/blotters`, {
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
    const response = await axios.delete(
      `${BASE_URL}/api/blotters/${blotterId}`
    );
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
    const response = await axios.patch(
      `${BASE_URL}/api/blotters/${blotterId}`,
      status
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

// sulat reklamo function
export const getAllSulatReklamo = async (): Promise<SulatReklamoPropType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/sulatreklamo`);
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
      `${BASE_URL}/api/sulatreklamo/${id}`
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
    const response = await axios.post(`${BASE_URL}/api/sulatreklamo`, {
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
    const response = await axios.delete(
      `${BASE_URL}/api/sulatreklamo/${sulatReklamoId}`
    );
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
      `${BASE_URL}/api/sulatreklamo/${sulatReklamoId}`,
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
    const response = await axios.get(`${BASE_URL}/api/indigentbenefits`);
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
  monthAndYear,
}: IndigentBenefitsPropType): Promise<
  IndigentBenefitsPropType[] | null | undefined
> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/indigentbenefits`, {
      residentId,
      residentName,
      pension,
      category: "Senior Citizen",
      purok,
      status,
      receiver,
      relation,
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
      `${BASE_URL}/api/indigentbenefits/${indigentBenefitId}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return error.response.data.error;
  }
};

export const getIndigentBenefitAge = async (
  indigentId: string | undefined
): Promise<number | undefined> => {
  try {
    const age = await getResidentById(indigentId);

    return age.age;
  } catch (error: any) {
    return error.response.data.error;
  }
};
