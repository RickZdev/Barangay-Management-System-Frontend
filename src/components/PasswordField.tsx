import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Tooltip } from "@mui/material";
import { TextInput } from "flowbite-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { COLORS } from "../constants/COLORS";

type PasswordFieldPropType = {
  label: string;
  isEdit?: boolean;
  initialValue?: string;
  isOptional?: boolean;
  showEyeIcon?: boolean;
  register?: UseFormRegisterReturn<string>;
  error?: string;
};

const PasswordField: React.FC<
  PasswordFieldPropType & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label,
  isEdit,
  initialValue,
  isOptional = false,
  showEyeIcon = true,
  error,
  register,
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>();

  return (
    <>
      <div className="flex flex-row items-center space-x-6 relative">
        <p className="flex-1 text-black text-sm font-semibold">{label}</p>

        <TextInput
          type={isShowPassword ? "text" : "password"}
          disabled={!isEdit}
          defaultValue={initialValue}
          className="w-[80%] text-sm text-white"
          style={{
            backgroundColor: error ? COLORS.lightRed : "",
            borderColor: error ? COLORS.secondary : "",
            height: 45,
            borderWidth: 2,
            paddingRight: 40,
          }}
          {...register}
          {...props}
        />

        {showEyeIcon && (
          <div className="absolute z-50 right-1">
            <Tooltip
              arrow
              title={isShowPassword ? "Hide Password" : "Show Password"}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <IconButton>
                  <VisibilityOffIcon fontSize="small" className="text-black" />
                </IconButton>
              ) : (
                <IconButton>
                  <VisibilityIcon fontSize="small" className="text-black" />
                </IconButton>
              )}
            </Tooltip>
          </div>
        )}
      </div>

      {error && (
        <div className="flex flex-1 w-full justify-end mt-4">
          <p className="text-secondary text-xs font-semibold">{error}</p>
        </div>
      )}
    </>
  );
};

export default PasswordField;
