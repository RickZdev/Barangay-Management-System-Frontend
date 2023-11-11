import { To } from "react-router-dom";

export type LoginPropType = {
  _id?: string;
  username: string;
  token: string;
  userRole: UserRolePropType;
};

export type SignupPropType = {
  _id?: string;
  username: string;
  password: string;
};

export type ResidentPropType = {
  _id?: string;
  fullName: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  suffix?: "Jr." | "Sr." | "III" | "IV" | "V" | "VI";
  birthDate?: string;
  age?: number;
  sex?: "Male" | "Female";
  emailAddress: string;
  contactNumber: string;
  educationalAttainment?: "Elementary" | "High School" | "College";
  occupation?: string;
  civilStatus?: "Single" | "Married" | "Divorced" | "Separated" | "Widowed";
  citizenship?: string;
  category: "PWD" | "Single Parent";
  houseNumber: number;
  streetAddress: string;
  purokNumber: number;
  profileNotes?: string;
  profilePhoto?: string;
};

export type ComplaintsPropType = {
  _id: string;
  complainantsId: string;
  complainantsName: string;
  complainantsAddress: string;
  complainantsContactNumber: number;
  complaintType: string;
  respondentsId: string;
  respondentsName?: string | undefined;
  complainantsStatement: string;
  status: "Pending" | "Reviewed" | "Resolved" | "Rejected";
  incidentDateAndTime: string;
};

export type DashboardPropType = {
  _id: string;
  label: string;
  total: number | undefined;
  Icon?: React.ReactNode;
  backgroundColor: string;
  navigationPath: To;
};

export type AnnouncementPropType = {
  _id: string;
  announcementTitle: string;
  announcementMessage: string;
  announcementImage: string;
  datePosted: string;
  announcedBy: string;
};

export type TransactionPropType = {
  _id: string;
  residentId: string;
  residentName: string;
  transactionType:
    | "Barangay ID"
    | "Business Permit"
    | "Barangay Clearance"
    | "Barangay Indigency"
    | "Certificate";
  transactionDateAndTime: string;
  transactionReceiptNumber: string;
  amount: number;
  officialInCharge: string;
};

export type UserPropType = {
  _id: string;
  username: string;
  residentName: string;
};

export type AdminAccountPropType = {
  _id: string;
  adminUsername: string;
  adminUser: string;
  adminRole: AdminRolePropType;
  loggedIns: string;
};

export type LoginAuditPropType = {
  _id: string;
  adminUser: string;
  adminRole: AdminRolePropType;
  loginTime: string;
};

export type InventoriesPropType = {
  _id?: string;
  item: string;
  quantity: number;
};

export type BorrowedInventoryPropType = {
  _id: string;
  borroweeId: string;
  borroweeName: string;
  borroweeContactNumber: string;
  borrowedItems: { itemName: string; quantity: number }[];
  borrowedDateAndTime: string;
  purposeOfBorrowing: string;
  eventLocation: string;
  officialInCharge: string;
};

export type BorrowedRecordsPropType = BorrowedInventoryPropType & {
  returnedDateAndTime: string;
};

export type OfficialPropType = {
  _id?: string | undefined;
  position: string | undefined;
  officialDetails: ResidentPropType | undefined;
};

export type OfficialWithPositionPropType = ResidentPropType & {
  position: string;
};

export type AllOfficialsPropType = {
  _id: string;
  position: string;
  residentId: string;
};

export type BlotterPropType = {
  _id: string;
  complainantId?: string;
  complainantName: string;
  complainantType: "Resident" | "Non-Resident";
  complainantAddress: string;
  incidentType: string;
  incidentLocation: string;
  respondentId: string;
  respondentName: string;
  incidentTimeAndDate: string;
  incidentRecorded: string;
  narrativeReport: string;
  status: "Ongoing" | "Resolved" | "Unresolved";
};

export type SulatReklamoPropType = {
  _id: string;
  residentId: string;
  residentName: string;
  dateAndTimeRecorded: string;
  narrativeReport: string;
  status: "Pending" | "Reviewed" | "Resolved" | "Rejected";
};

export type IndigentBenefitsPropType = {
  _id?: string;
  residentId?: string;
  residentName?: string;
  category?: string;
  purok?: number;
  pension?: number;
  status?: string;
  receiver?: string;
  relation?: string;
  birthDate: string;
  monthAndYear?: string;
};

export type CertificateFormTemplatePropType = {
  officials: { officialName: string; position: string }[];
  certificationTitle: string;
  certificationSubtitle?: string;
  validity?: string;
  showSecretary?: boolean;
};

export type CertificationsPropType =
  | "Business Permit"
  | "Certificate of Indigency"
  | "Barangay Clearance"
  | "First-time Jobseeker Certificate"
  | "Certificate of Residency";

export type CertificateRecordsPropType = {
  _id?: string;
  residentId?: string;
  residentName: string;
  typeOfCertificate: CertificationsPropType;
  dateRequested: string;
  dateOfReleased?: string;
  certificateData: any;
  status?: string;
};

export type StorageFolderPropType = "announcements" | "profile";

export type AdminRolePropType = "Captain" | "Administrator" | "Moderator";
export type UserRolePropType = "Resident" | AdminRolePropType;
