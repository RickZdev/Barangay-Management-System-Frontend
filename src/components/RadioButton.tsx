import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { COLORS } from "../constants/COLORS";

type RadioButtonPropType = {
  label: string;
  initialValue?: string;
  isEdit?: boolean;
  isOptional?: boolean;
  selections: Array<{
    value: string;
  }>;
  register?: UseFormRegisterReturn<string>;
  error?: string;
};

const RadioButton: React.FC<RadioButtonPropType> = ({
  label,
  isEdit,
  isOptional,
  initialValue,
  selections,
  register,
  error,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue || "");

  useEffect(() => {
    setSelectedValue(initialValue || "");
  }, [initialValue]);

  return (
    <>
      <div className="flex flex-row items-center">
        <p className="flex-1 text-black text-sm font-semibold">{label}</p>

        <RadioGroup
          className="flex w-[80%]"
          sx={{ flexDirection: "row" }}
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}
        >
          {selections.map((selection, index) => (
            <FormControlLabel
              key={index}
              label={selection.value}
              sx={{
                color: isEdit ? "black" : "red",
                fontSize: 14,
              }}
              control={
                <Radio
                  disabled={!isEdit}
                  value={selection.value}
                  sx={{
                    color: error ? "red" : "black",
                    "&.Mui-checked": {
                      color: COLORS.primary,
                    },
                  }}
                  {...register}
                  {...props}
                />
              }
            />
          ))}
        </RadioGroup>
      </div>

      {error && (
        <div className="flex flex-1 w-full justify-end">
          <p className="text-secondary text-xs font-semibold">{error}</p>
        </div>
      )}
    </>
  );
};

export default RadioButton;
