import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type TextAreaFieldPropType = {
  label?: string;
  initialValue?: string;
  isEdit?: boolean;
  name?: string | undefined;
  register?: UseFormRegister<FieldValues>;
};

const TextAreaField: React.FC<
  TextAreaFieldPropType & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ label, initialValue, isEdit, register, name, ...props }) => {
  return (
    <div className="flex flex-col justify-between items-start space-y-4">
      {label && (
        <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">{label}</p>
      )}

      <textarea
        disabled={!isEdit}
        defaultValue={initialValue}
        className={`${
          isEdit ? "border-white " : "border-[#232537]"
        } w-full px-5 pb-10 pt-5 rounded-md bg-[#232537] resize-none text-white border-[1px]  focus:border-white`}
        {...(register && register(name ?? ""))}
        {...props}
      />
    </div>
  );
};

export default TextAreaField;
