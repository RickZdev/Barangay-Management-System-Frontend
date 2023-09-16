import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FieldValues, UseFormRegister } from "react-hook-form";

type SelectFieldPropType = {
  label: string;
  initialValue?: string | number;
  isEdit?: boolean;
  selections: {
    value: string | number;
  }[];
  name?: string | undefined;
  register?: UseFormRegister<FieldValues>;
};

const SelectField: React.FC<SelectFieldPropType> = ({
  label,
  isEdit,
  initialValue,
  selections,
  register,
  name,
}) => {
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "red",
      }}
    >
      <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">{label}</p>

      <Select
        style={{ border: isEdit ? "1px solid white" : "1px solid #232537" }}
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
        defaultValue={initialValue}
        {...(register && register(name ?? ""))}
      >
        {selections.map((selection, index) => (
          <MenuItem value={selection.value} key={index.toString()}>
            {selection.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
