type GetResidentFullAddressPropType = {
  houseNumber: number | undefined;
  streetAddress: string | undefined;
  purokNumber: number | undefined;
};

export const getResidentFullAddress = ({
  houseNumber,
  streetAddress,
  purokNumber,
}: GetResidentFullAddressPropType): string => {
  let fullAddress = `${houseNumber} ${streetAddress}, Purok ${purokNumber} `;
  return fullAddress;
};
