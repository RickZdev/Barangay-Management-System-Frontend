import { DateTimePicker, StaticDateTimePickerProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { COLORS } from "../constants/COLORS";

type DateTimePickerFieldPropType = {
  label: string;
  isEdit?: boolean;
  isOptional?: boolean;
  isMinDate?: boolean;
  isMaxDate?: boolean;
  isBlotterMinDate?: boolean;
  error?: string;
};

const DateTimePickerField: React.FC<
  DateTimePickerFieldPropType & StaticDateTimePickerProps<Dayjs>
> = ({
  label,
  isEdit,
  isOptional,
  isMinDate = true,
  isMaxDate,
  isBlotterMinDate,
  error,
  ...props
}) => {
  return (
    <>
      <div className="flex flex-row items-center relative ">
        <p className="flex-1 text-black text-sm font-semibold">{label}</p>

        <DateTimePicker
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
            ".MuiOutlinedInput-notchedOutline": {
              borderWidth: 0,
            },
            "& .MuiInputBase-icon": {
              color: "black",
            },
            "& .MuiIconButton-root": {
              color: "black",
            },
          }}
          minDate={isBlotterMinDate ? dayjs().subtract(5, 'day') : isMinDate ? dayjs("1950-01-01T00:00:00.000") : undefined}
          maxDate={dayjs()}
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

export default DateTimePickerField;
