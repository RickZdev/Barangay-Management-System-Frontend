type GetResidentFullNamePropType = {
  lastName: string | undefined;
  firstName: string | undefined;
  middleName?: string | undefined;
  suffix?: string | undefined;
};

export const getResidentFullNameWithInitial = ({
  lastName,
  firstName,
  middleName,
  suffix,
}: GetResidentFullNamePropType): string => {
  let fullName;
  if (middleName && suffix) {
    fullName = `${firstName} ${middleName
      .charAt(0)
      .toUpperCase()}. ${lastName}  ${suffix}`;
  } else if (!middleName && suffix) {
    fullName = `${firstName} ${lastName} ${suffix}`;
  } else if (middleName && !suffix) {
    fullName = `${firstName} ${middleName
      .charAt(0)
      .toUpperCase()}. ${lastName} `;
  } else {
    fullName = `${firstName} ${lastName}`;
  }

  return fullName;
};
