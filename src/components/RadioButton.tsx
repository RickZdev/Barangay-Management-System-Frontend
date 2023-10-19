import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

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
        <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">
          {label}
          {!isOptional && <span className="text-red-800"> * </span>}
        </p>
        <RadioGroup
          className="flex w-2/3"
          sx={{ flexDirection: "row" }}
          value={selectedValue}
          onChange={(event) => setSelectedValue(event.target.value)}
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
                  disabled={!isEdit}
                  value={selection.value}
                  sx={{
                    color: error ? "red" : "white",
                    "&.Mui-checked": {
                      color: "#50D5B7",
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
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </>
  );
};

export default RadioButton;
