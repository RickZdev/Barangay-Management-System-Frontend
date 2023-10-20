import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectFieldPropType = {
  label: string;
  initialValue?: string;
  isEdit?: boolean;
  isOptional?: boolean;
  selections: {
    value: string;
  }[];
  register?: UseFormRegisterReturn<string>;
  error?: string;
};

const SelectField: React.FC<SelectFieldPropType> = ({
  label,
  isEdit,
  isOptional,
  initialValue,
  selections,
  register,
  error,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue ?? "");

  useEffect(() => {
    // Set the initial value when it changes
    setSelectedValue(initialValue ?? "");
  }, [initialValue]);

  return (
    <>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: "red",
        }}
      >
        <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">
          {label} {!isOptional && <span className="text-red-800"> * </span>}
        </p>

        <Select
          style={{
            border: error
              ? "1px solid red"
              : isEdit
              ? "1px solid white"
              : "1px solid #232537",
          }}
          sx={{
            flex: 1,
            backgroundColor: "#232537",
            minWidth: "66.6667%",
            height: 40,
            padding: 0,
            margin: 0,
            fontFamily: "poppins",
            fontSize: 14,
            ":hover": {
              border: "1px solid #50D5B7",
            },
            "& .MuiSelect-icon": {
              color: "white",
            },
          }}
          disabled={!isEdit}
          value={selectedValue} // Use value prop to make it controlled
          onChange={(e) => setSelectedValue(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          {...register}
          {...props}
        >
          {/* Placeholder MenuItem */}
          <MenuItem value="">
            <em>Select an option</em>
          </MenuItem>

          {selections.map((selection, index) => (
            <MenuItem
              value={selection?.value ?? ""}
              key={index.toString()}
              onClick={(e) => setSelectedValue(selection.value)}
            >
              {selection.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && (
        <div className="flex flex-1 w-full justify-end">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </>
  );
};

export default SelectField;
