import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type TextFieldPropType = {
  label: string;
  isEdit?: boolean;
  initialValue?: string;
  isPasswordField?: boolean;
  name?: string | undefined;
  register?: UseFormRegister<FieldValues>;
};

const TextField: React.FC<
  TextFieldPropType & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label,
  isEdit,
  initialValue,
  isPasswordField,
  register,
  name,
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>();

  return (
    <div className="flex flex-row items-center relative">
      <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">{label}</p>
      <input
        type={isPasswordField ? (isShowPassword ? "text" : "password") : "text"}
        disabled={!isEdit}
        defaultValue={initialValue}
        className="hover:border-[1px] hover:border-[#50D5B7] focus:border-[#50D5B7] w-2/3 h-10 text-sm text-white bg-[#232537] pl-4 pr-10"
        style={{
          borderColor: isEdit ? "white" : "#232537",
        }}
        {...(register && register(name ?? ""))}
        {...props}
      />
      {isPasswordField && (
        <div className="absolute right-2 bottom-1">
          <Tooltip
            arrow
            title="Show Password"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            <IconButton>
              <VisibilityIcon fontSize="small" className="text-white" />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
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
