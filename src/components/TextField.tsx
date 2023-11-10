import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import { COLORS } from "../constants/COLORS";

type TextFieldPropType = {
  label?: string;
  isEdit?: boolean;
  initialValue?: string;
  isOptional?: boolean;
  isCapitalize?: boolean;
  register?: UseFormRegisterReturn<string>;
  error?: string;
};

const TextField: React.FC<
  TextFieldPropType & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label,
  isEdit,
  initialValue,
  isOptional = false,
  isCapitalize,
  error,
  register,
  ...props
}) => {
  return (
    <>
      <div className="flex flex-row items-center space-x-6">
        <p className="flex-1 text-black text-sm font-semibold">{label}</p>

        <TextInput
          type={"text"}
          color={"error"}
          disabled={!isEdit}
          defaultValue={initialValue}
          className="w-[80%] text-sm text-white font-medium"
          style={{
            backgroundColor: error ? COLORS.lightRed : "rgb(247,248,249)",
            borderColor: error
              ? COLORS.secondary
              : isEdit
              ? "rgb(97, 106, 113)"
              : "rgb(247,248,249)",
            height: 45,
            borderWidth: isEdit ? 2 : 0,
            textTransform: isCapitalize ? "capitalize" : "none",
          }}
          {...register}
          {...props}
        />
      </div>

      {error && (
        <div className="flex flex-1 w-full justify-end">
          <p className="text-secondary text-xs font-semibold">{error}</p>
        </div>
      )}
    </>
  );
};

export default TextField;

// if(isPasswordField) {
//     "password";
//     if(isShowPassword) {
//        "text"
//     } else {
//        "password"
//     }
// } else {
//     "text"
// }
