import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

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
      <div className="flex flex-row items-center justify-between">
        <p className="flex-[0.5] text-[hsla(0,0%,100%,.6)] text-xs">
          {label}
          {!isOptional && <span className="text-red-800"> * </span>}
        </p>

        <div className="flex  flex-1 relative">
          <input
            type={isShowPassword ? "text" : "password"}
            disabled={!isEdit}
            defaultValue={initialValue}
            className="w-full hover:border-[1px] hover:border-[#50D5B7] focus:border-[#50D5B7] h-10 text-sm text-white bg-[#232537] pl-4 pr-14"
            style={{
              borderColor: error ? "red" : isEdit ? "white" : "#232537",
            }}
            {...register}
            {...props}
          />

          {showEyeIcon && (
            <div className="absolute z-50 right-2">
              <Tooltip
                arrow
                title={isShowPassword ? "Hide Password" : "Show Password"}
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <IconButton>
                    <VisibilityOffIcon
                      fontSize="small"
                      className="text-white"
                    />
                  </IconButton>
                ) : (
                  <IconButton>
                    <VisibilityIcon fontSize="small" className="text-white" />
                  </IconButton>
                )}
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="flex flex-1 w-full justify-end">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </>
  );
};

export default PasswordField;
