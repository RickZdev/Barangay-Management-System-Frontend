type GetResidentFullNamePropType = {
  lastName: string | undefined;
  firstName: string | undefined;
  middleName?: string | undefined;
  suffix?: string | undefined;
};

// const getCapitalizeWords = (str: string) => {
//   return str.replace(/\b\w/g, (char) => char.toUpperCase());
// };

export const getResidentFullName = ({
  lastName,
  firstName,
  middleName,
  suffix,
}: GetResidentFullNamePropType): string => {
  let fullName;
  if (middleName && suffix) {
    fullName = `${lastName}, ${firstName} ${middleName} ${suffix}`;
  } else if (!middleName && suffix) {
    fullName = `${lastName}, ${firstName} ${suffix}`;
  } else if (middleName && !suffix) {
    fullName = `${lastName}, ${firstName} ${middleName}`;
  } else {
    fullName = `${lastName}, ${firstName}`;
  }

  return fullName;
};

// export const getResidentFullName = ({
//   lastName,
//   firstName,
//   middleName,
//   suffix,
// }: GetResidentFullNamePropType) => {
//   let fullName;
//   if (middleName && suffix) {
//     fullName = `${firstName} ${middleName} ${lastName} ${suffix}`;
//   } else if (!middleName && suffix) {
//     fullName = `${firstName} ${lastName} ${suffix}`;
//   } else if (middleName && !suffix) {
//     fullName = `${firstName} ${middleName} ${lastName}`;
//   } else {
//     fullName = `${firstName} ${lastName}`;
//   }

//   return getCapitalizeWords(fullName);
// };
