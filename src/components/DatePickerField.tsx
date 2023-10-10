import { DatePicker, StaticDatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

type DatePickerFieldPropType = {
  label: string;
  isEdit?: boolean;
};

const DatePickerField: React.FC<
  DatePickerFieldPropType & StaticDatePickerProps<Dayjs>
> = ({ label, isEdit, ...props }) => {
  return (
    <div className="flex flex-row items-center relative ">
      <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">{label}</p>
      <DatePicker
        readOnly={!isEdit}
        sx={{
          minWidth: "66.6667%",
          backgroundColor: "#232537",
          border: isEdit ? "1px solid white" : "1px solid #232537",
          borderRadius: 1,
          color: "white",
          ":hover": {
            border: !isEdit ? "1px solid transparent" : "1px solid white",
          },
          ":focus": {
            border: "1px solid #50D5B7",
          },
          "& .MuiInputBase-input": {
            color: "white",
            fontFamily: "poppins",
            fontSize: 14,
          },
          "& .MuiInputBase-icon": {
            color: "white",
          },
          "& .MuiIconButton-root": {
            color: "white",
          },
        }}
        {...props}
      />
    </div>
  );
};

export default DatePickerField;