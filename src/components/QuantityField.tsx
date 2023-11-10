import { Dispatch, SetStateAction, useEffect, useState } from "react";

type QuantityFieldPropType = {
  label?: string;
  isOptional?: boolean;
  isEdit?: boolean;
  limit?: number;
  quantity: number;
  setIsError?: (isError: boolean) => void;
  setQuantity: (newQuantity: number) => void;
};

const QuantityField: React.FC<QuantityFieldPropType> = ({
  label,
  isOptional,
  isEdit,
  setIsError,
  limit,
  quantity = 0,
  setQuantity,
}) => {
  const handleAddQuantity = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    } else {
      setIsError?.(true);
    }
  };

  const handleMinusQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (limit && quantity > limit) {
      setIsError?.(true);
    } else {
      setIsError?.(false);
    }
  }, [quantity]);

  return (
    <div className="flex flex-row items-center space-x-4">
      {label && (
        <p className="text-[hsla(0,0%,100%,.6)] text-xs w-[33%]">
          {label ?? "Quantity"}
          {!isOptional && <span className="text-red-800"> * </span>}
        </p>
      )}

      <div className="flex flex-row items-center space-x-2">
        {isEdit && <MinusQuantity handleClick={handleMinusQuantity} />}
        <input
          disabled={!isEdit}
          type="number"
          min="0"
          maxLength={100}
          max={limit ?? "100"}
          step="1"
          value={quantity ?? 0}
          style={{ appearance: "none" }}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="appearance-none border-white hover:border-[1px] text-center hover:border-[#50D5B7] focus:border-[#50D5B7] w-10 h-8 text-sm text-white bg-[#232537]"
        />

        {isEdit && <AddQuantity handleClick={handleAddQuantity} />}
      </div>
    </div>
  );
};

const AddQuantity = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      className="w-8 h-8 bg-[#067D68] rounded-md flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-white">+</p>
    </div>
  );
};

const MinusQuantity = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      className="w-8 h-8 bg-[#067D68] rounded-md flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-white">-</p>
    </div>
  );
};

export default QuantityField;
