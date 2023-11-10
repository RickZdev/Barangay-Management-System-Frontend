import { DatePicker, StaticDatePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { COLORS } from "../constants/COLORS";

type DatePickerFieldPropType = {
  label: string;
  isEdit?: boolean;
  isOptional?: boolean;
  isMinDate?: boolean;
  error?: string;
};

const DatePickerField: React.FC<
  DatePickerFieldPropType & StaticDatePickerProps<Dayjs>
> = ({ label, isEdit, isOptional, isMinDate = true, error, ...props }) => {
  return (
    <>
      <div className="flex flex-row items-center relative ">
        <p className="flex-1 text-black text-sm font-semibold">{label}</p>

        <DatePicker
          readOnly={!isEdit}
          sx={{
            minWidth: "80%",
            backgroundColor: error ? COLORS.lightRed : "rgb(247,248,249)",
            border: error
              ? "2px solid red"
              : isEdit
              ? "2px solid rgb(97, 106, 113)"
              : "2px solid rgb(247, 248, 249)",
            color: "black",
            borderRadius: 2,
            ".MuiOutlinedInput-notchedOutline": {
              borderWidth: 0,
            },
            ":hover": {
              border: !isEdit
                ? "1px solid transparent"
                : "2px solid rgb(97, 106, 113)",
            },
            ":focus": {
              border: "2px solid rgb(97, 106, 113)",
            },
            "& .MuiInputBase-input": {
              color: "black",
              fontWeight: "700",
              fontFamily: "poppins",
              fontSize: 14,
              borderRadius: 10,
            },
            "& .MuiInputBase-icon": {
              color: "black",
            },
            "& .MuiIconButton-root": {
              color: "black",
            },
          }}
          minDate={isMinDate ? dayjs("1900-01-01T00:00:00.000") : undefined}
          {...props}
        />
      </div>

      {error && (
        <div className="flex flex-1 w-full justify-end">
          <p className="text-secondary text-xs font-semibold">{error}</p>
        </div>
      )}
    </>
  );
};

export default DatePickerField;
