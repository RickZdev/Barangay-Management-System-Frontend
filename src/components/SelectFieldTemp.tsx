import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { COLORS } from "../constants/COLORS";

type SelectFieldPropType = {
  label: string;
  initialValue?: string;
  isEdit?: boolean;
  isOptional?: boolean;
  selections: {
    value: string;
  }[];
  onChange: (e: any) => void;
  error?: string;
};

const SelectFieldTemp: React.FC<SelectFieldPropType> = ({
  label,
  isEdit,
  isOptional,
  initialValue,
  selections,
  onChange,
  error,
  ...props
}) => {
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
        <p className="flex-1 text-black text-sm font-semibold">{label}</p>

        <Select
          id="outlined-select"
          style={{
            border: error
              ? "2px solid red"
              : isEdit
              ? "2px solid rgb(97, 106, 113)"
              : "none",
            borderWidth: isEdit ? 2 : 0,
          }}
          sx={{
            flex: 1,
            backgroundColor: error ? COLORS.lightRed : "rgb(247,248,249)",
            borderRadius: 2,
            minWidth: "80%",
            height: 40,
            padding: 0,
            margin: 0,
            fontSize: 14,
            color: "black",
            border: "none", // Remove the border
            ".MuiOutlinedInput-notchedOutline": {
              borderWidth: 0,
            },

            // "&:hover .MuiOutlinedInput-notchedOutline": {
            //   borderColor: "red",
            // },
          }}
          onChange={onChange}
          disabled={!isEdit}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
          {...props}
        >
          {/* Placeholder MenuItem */}
          <MenuItem value="">
            <em>Select an option</em>
          </MenuItem>

          {selections.map((selection, index) => (
            <MenuItem value={selection?.value ?? ""} key={index.toString()}>
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

export default SelectFieldTemp;
