import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { FieldValues, UseFormRegister } from "react-hook-form";

type RadioButtonPropType = {
  label: string;
  initialValue?: string;
  isEdit?: boolean;
  selections: Array<{
    value: string;
  }>;
  name?: string | undefined;
  register?: UseFormRegister<FieldValues>;
};

const RadioButton: React.FC<RadioButtonPropType> = ({
  label,
  isEdit,
  initialValue,
  selections,
  register,
  name,
}) => {
  return (
    <div className="flex flex-row items-center">
      <p className="text-[hsla(0,0%,100%,.6)] text-xs flex-1">{label}</p>

      <RadioGroup
        className="flex w-2/3"
        sx={{ flexDirection: "row" }}
        defaultValue={initialValue}
        {...(register && register(name ?? ""))}
      >
        {selections.map((selection, index) => (
          <FormControlLabel
            key={index}
            label={selection.value}
            sx={{
              color: isEdit ? "white" : "red",
              fontSize: 14,
            }}
            control={
              <Radio
                {...(register && register(name ?? ""))}
                disabled={!isEdit}
                defaultChecked={initialValue === selection.value}
                value={selection.value}
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "#50D5B7",
                  },
                }}
              />
            }
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioButton;
