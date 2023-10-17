import React from "react";

type CardHeaderPropType = {
  title: string;
  titleSize?: number;
};

const CardHeader: React.FC<CardHeaderPropType> = ({ title, titleSize }) => {
  return (
    <>
      <h6
        className="font-poppins text-[#ffffffcc] text-[17px]"
        style={{ fontSize: titleSize }}
      >
        {title}
      </h6>
      <div className="w-full h-[1px] bg-[#232537] items-center my-5" />
    </>
  );
};

export default CardHeader;
