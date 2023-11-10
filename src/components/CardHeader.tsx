import React from "react";

type CardHeaderPropType = {
  title: string;
  titleSize?: number;
};

const CardHeader: React.FC<CardHeaderPropType> = ({ title, titleSize }) => {
  return (
    <>
      <h6
        className=" text-black text-[17px] uppercase font-bold"
        style={{ fontSize: titleSize }}
      >
        {title}
      </h6>
      <div className="w-full h-[1px] bg-[#232537] items-center my-5" />
    </>
  );
};

export default CardHeader;
