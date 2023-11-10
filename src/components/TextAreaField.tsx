import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { COLORS } from "../constants/COLORS";
import { Textarea } from "flowbite-react";

type TextAreaFieldPropType = {
  label?: string;
  initialValue?: string;
  isOptional?: boolean;
  isEdit?: boolean;
  register?: UseFormRegisterReturn<string>;
  error?: string;
};

const TextAreaField: React.FC<
  TextAreaFieldPropType & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({
  label,
  initialValue,
  isOptional = false,
  isEdit,
  register,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col justify-between items-start space-y-4">
      {label && (
        <p className="flex-1 text-black text-sm font-semibold">{label}</p>
      )}

      <Textarea
        disabled={!isEdit}
        defaultValue={initialValue}
        style={{
          borderWidth: 2,
          borderColor: error
            ? COLORS.secondary
            : isEdit
            ? "rgb(97, 106, 113)"
            : "rgb(247,248,249)",
        }}
        className={`w-full px-5 pb-10 pt-5 text-justify rounded-md bg-[rgb(247,248,249)] resize-none text-black border-[1px]`}
        {...register}
        {...props}
      />

      {error && (
        <div className="flex flex-1 w-full justify-end mt-5">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TextAreaField;
