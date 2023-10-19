import { DatePicker, StaticDatePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

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
        <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">
          {label}
          {!isOptional && <span className="text-red-800"> * </span>}
        </p>

        <DatePicker
          readOnly={!isEdit}
          sx={{
            minWidth: "66.6667%",
            backgroundColor: "#232537",
            border: error
              ? "1px solid red"
              : isEdit
              ? "1px solid white"
              : "1px solid #232537",
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
          minDate={isMinDate ? dayjs("1900-01-01T00:00:00.000") : undefined}
          {...props}
        />
      </div>

      {error && (
        <div className="flex flex-1 w-full justify-end">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </>
  );
};

export default DatePickerField;
