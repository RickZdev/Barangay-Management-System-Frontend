import * as Yup from "yup";

export const loginFormValidation = Yup.object().shape({
  username: Yup.string().required("This is a required field."),
  password: Yup.string().required("This is a required field."),
});

export const userFormValidation = Yup.object().shape({
  username: Yup.string()
    .required("This is a required field.")
    .min(8, "Username must be at least 8 characters"),
  password: Yup.string()
    .required("This is a required field.")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]+/, "Password should have at least 1 uppercase character")
    .matches(/[0-9]+/, "Password should have at least 1 numeric character")
    .matches(
      /[@$!%*#?&]+/,
      "Password should have at least 1 special character"
    ),
  confirmPassword: Yup.string()
    .required("This is a required field")
    .oneOf([Yup.ref("password"), ""], "Password did not match."),
});

export const resetPasswordFormValidation = Yup.object().shape({
  newPassword: Yup.string()
    .required("This is a required field.")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]+/, "Password should have at least 1 uppercase character")
    .matches(/[0-9]+/, "Password should have at least 1 numeric character")
    .matches(
      /[@$!%*#?&]+/,
      "Password should have at least 1 special character"
    ),
  confirmPassword: Yup.string()
    .required("This is a required field")
    .oneOf([Yup.ref("newPassword"), ""], "Password did not match."),
});

export const changePasswordFormValidation = Yup.object().shape({
  currentPassword: Yup.string().required("This is a required field."),
  newPassword: Yup.string()
    .required("This is a required field.")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]+/, "Password should have at least 1 uppercase character")
    .matches(/[0-9]+/, "Password should have at least 1 numeric character")
    .matches(
      /[@$!%*#?&]+/,
      "Password should have at least 1 special character"
    ),
  confirmPassword: Yup.string()
    .required("This is a required field")
    .oneOf([Yup.ref("newPassword"), ""], "Password did not match."),
});

export const residentFormValidation = Yup.object().shape({
  lastName: Yup.string()
    .required("This is a required field.")
    .matches(/^[A-Za-z‘’' ,.ñÑ-]*$/, "Please enter valid last name")
    .max(45, "Last name must be no longer than 45 characters"),
  firstName: Yup.string()
    .required("This is a required field.")
    .matches(/^[A-Za-z‘’' ,.ñÑ-]*$/, "Please enter valid first name")
    .max(45, "First name must be no longer than 45 characters"),
  middleName: Yup.string()
    .matches(/^[A-Za-z‘’' ,.ñÑ-]*$/, "Please enter valid middle name")
    .max(45, "Middle name must be no longer than 45 characters"),
  suffix: Yup.string(),
  sex: Yup.string().required("This is a required field."),
  emailAddress: Yup.string()
    .required("This is a required field.")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "This field should be an email format."
    ),
  contactNumber: Yup.string()
    .required("This is a required field.")
    .length(11, "Invalid contact number."),
  birthDate: Yup.string().required("This is a required field."),
  age: Yup.number()
    .min(0, "Age cannot be negative.")
    .max(130, "There might be a problem in your age. Please try again."),
  educationalAttainment: Yup.string(),
  occupation: Yup.string()
    .required("This is a required field")
    .matches(/^[A-Za-z‘’' ,.ñÑ-]*$/, "Please enter valid occupation")
    .max(45, "Occupation must be no longer than 45 characters"),
  civilStatus: Yup.string().required("This is a required field"),
  citizenship: Yup.string().required("This is a required field"),
  category: Yup.string(),
  houseNumber: Yup.string().required("This is a required field"),
  streetAddress: Yup.string().required("This is a required field"),
  purokNumber: Yup.string().required("This is a required field"),
  profileNotes: Yup.string(),
});

export const residentWithUserFormValidation = Yup.object().shape({
  username: Yup.string()
    .required("This is a required field.")
    .min(8, "Username must be at least 8 characters"),
  password: Yup.string()
    .required("This is a required field.")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]+/, "Password should have at least 1 uppercase character")
    .matches(/[0-9]+/, "Password should have at least 1 numeric character")
    .matches(
      /[@$!%*#?&]+/,
      "Password should have at least 1 special character"
    ),
  confirmPassword: Yup.string()
    .required("This is a required field")
    .oneOf([Yup.ref("password"), ""], "Password didn't match."),
  lastName: Yup.string()
    .required("This is a required field.")
    .matches(/^[A-Za-z‘’' ,.ñÑ-]*$/, "Please enter valid last name")
    .max(45, "Last name must be no longer than 45 characters"),
  firstName: Yup.string()
    .required("This is a required field.")
    .matches(/^[A-Za-z‘’' ,.ñÑ-]*$/, "Please enter valid first name")
    .max(45, "First name must be no longer than 45 characters"),
  middleName: Yup.string()
    .matches(/^[A-Za-z‘’' ,.ñÑ-]*$/, "Please enter valid middle name")
    .max(45, "Middle name must be no longer than 45 characters"),
  suffix: Yup.string(),
  sex: Yup.string().required("This is a required field."),
  emailAddress: Yup.string()
    .required("This is a required field.")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "This field should be an email format."
    ),
  contactNumber: Yup.string()
    .required("This is a required field.")
    .length(11, "Contact number must be 11 digit long.")
    .matches(/^09\d{9}$/, "Invalid contact number."),
  birthDate: Yup.string().required("This is a required field."),
  age: Yup.number()
    .min(0, "Age cannot be negative.")
    .max(130, "There might be a problem in your age. Please try again."),
  educationalAttainment: Yup.string(),
  occupation: Yup.string()
    .required("This is a required field")
    .matches(/^[A-Za-z‘’' ,.ñÑ-]*$/, "Please enter valid occupation")
    .max(45, "Occupation must be no longer than 45 characters"),
  civilStatus: Yup.string().required("This is a required field"),
  citizenship: Yup.string().required("This is a required field"),
  category: Yup.string(),
  houseNumber: Yup.string().required("This is a required field"),
  streetAddress: Yup.string().required("This is a required field"),
  purokNumber: Yup.string().required("This is a required field"),
  profileNotes: Yup.string(),
  profilePhoto: Yup.string(),
});

export const announcementFormValidation = Yup.object().shape({
  announcementTitle: Yup.string().required("This is a required field."),
  announcementMessage: Yup.string().required("This is a required field."),
  announcementImage: Yup.string().required("Please upload an image."),
});

export const blotterFormValidation = Yup.object().shape({
  complainantName: Yup.string().required("This is a required field."),
  complainantAddress: Yup.string().required("This is a required field."),
  incidentTimeAndDate: Yup.string().required("Invalid date."),
  incidentType: Yup.string().required("This is a required field."),
  incidentLocation: Yup.string().required("This is a required field."),
  respondentName: Yup.string().required("This is a required field."),
  narrativeReport: Yup.string().required("This is a required field."),
});

export const complaintFormValidation = Yup.object().shape({
  complainantName: Yup.string().required("This is a required field."),
  complaintType: Yup.string().required("This is a required field."),
  incidentTimeAndDate: Yup.string().required("Invalid date."),
  respondentName: Yup.string().required("This is a required field."),
  narrativeReport: Yup.string().required("This is a required field."),
});

export const sulatReklamoFormValidation = Yup.object().shape({
  residentName: Yup.string().required("This is a required field."),
  narrativeReport: Yup.string().required("This is a required field."),
});

export const inventoryFormValidation = Yup.object().shape({
  borroweeName: Yup.string().required("This is a required field."),
  purposeOfBorrowing: Yup.string().required("This is a required field."),
  eventLocation: Yup.string().required("This is a required field."),
});

export const transactionFormValidation = Yup.object().shape({
  residentName: Yup.string().required("This is a required field."),
  transactionType: Yup.string().required("This is a required field."),
  paymentAmount: Yup.string().required("This is a required field."),
  contactNumber: Yup.string(),
});

export const indigentBenefitFormValidation = Yup.object().shape({
  receiverName: Yup.string().required("This is a required field."),
  relationName: Yup.string().required("This is a required field."),
});

export const adminFormValidation = Yup.object().shape({
  adminName: Yup.string().required("This is a required field."),
  adminRole: Yup.string().required("This is a required field."),
});

export const certificateFormValidation = Yup.object().shape({
  residentName: Yup.string().required("This is a required field."),
  typeOfCertificate: Yup.string().required("This is a required field."),
  purpose: Yup.string(),
  indigent: Yup.string(),
  residency: Yup.string(),
  businessOwner: Yup.string(),
  businessName: Yup.string(),
  businessNature: Yup.string(),
  businessAddress: Yup.string(),
  building: Yup.string(),
  ownership: Yup.string(),
});
