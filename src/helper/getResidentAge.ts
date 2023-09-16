import dayjs from "dayjs";

export const getResidentAge = (birthDate: string | undefined): number => {
  const birthdate = dayjs(birthDate, "MM/DD/YYYY");
  const currentAge = dayjs().diff(birthdate, "years");
  return currentAge;
};
