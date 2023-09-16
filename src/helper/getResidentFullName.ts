type GetResidentFullNamePropType = {
  lastName: string | undefined;
  firstName: string | undefined;
  middleName?: string | undefined;
  suffix?: string | undefined;
};

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
