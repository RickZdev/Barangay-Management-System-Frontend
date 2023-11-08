const getCapitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getResidentFullNameAsc = ({
  lastName,
  firstName,
  middleName,
  suffix,
}: {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  suffix?: string;
}) => {
  let fullName;
  if (middleName && suffix) {
    fullName = `${firstName} ${middleName} ${lastName} ${suffix}`;
  } else if (!middleName && suffix) {
    fullName = `${firstName} ${lastName} ${suffix}`;
  } else if (middleName && !suffix) {
    fullName = `${firstName} ${middleName} ${lastName}`;
  } else {
    fullName = `${firstName} ${lastName}`;
  }

  return getCapitalizeWords(fullName);
};
