import { TextInput } from "flowbite-react";
import { UseFormRegisterReturn } from "react-hook-form";
import { COLORS } from "../constants/COLORS";

type NumberFieldPropType = {
  label: string;
  initialValue?: number;
  isEdit?: boolean;
  isOptional?: boolean;
  register?: UseFormRegisterReturn<string>;
  error?: string;
};

const NumberField: React.FC<
  NumberFieldPropType & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label,
  initialValue,
  isEdit,
  isOptional,
  register,
  error,
  ...props
}) => {
  return (
    <>
      <div className="flex flex-row items-center ">
        <p className="flex-1 text-black text-sm font-semibold">{label}</p>

        <TextInput
          type="number"
          onKeyDown={(event) => {
            if (
              event.key == "." ||
              event.key === "-" ||
              event.key === "+" ||
              event.key === "e"
            ) {
              event.preventDefault();
            }
          }}
          disabled={!isEdit}
          defaultValue={initialValue}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            ((e.target as HTMLInputElement).value = (
              e.target as HTMLInputElement
            ).value.slice(0, 11))
          }
          className="w-[80%] text-sm text-white font-medium"
          style={{
            backgroundColor: error
              ? COLORS.lightRed
              : isEdit
              ? "rgb(247,248,249)"
              : "rgb(247,248,249)",
            borderColor: error
              ? COLORS.secondary
              : isEdit
              ? "rgb(97, 106, 113)"
              : "",
            height: 45,
            borderWidth: isEdit ? 2 : 0,
          }}
          {...register}
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

export default NumberField;
