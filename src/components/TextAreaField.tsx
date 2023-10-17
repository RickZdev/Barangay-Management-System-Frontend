import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

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
        <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">
          {label}
          {!isOptional && <span className="text-red-800"> * </span>}
        </p>
      )}

      <textarea
        disabled={!isEdit}
        defaultValue={initialValue}
        style={{
          borderColor: error ? "red" : isEdit ? "white" : "#232537",
        }}
        className={`w-full px-5 pb-10 pt-5 text-justify rounded-md bg-[#232537] resize-none text-white border-[1px] focus:border-white`}
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
