import { FieldValues, UseFormRegister } from "react-hook-form";

type NumberFieldPropType = {
  label: string;
  initialValue?: number;
  isEdit?: boolean;
  name?: string | undefined;
  register?: UseFormRegister<FieldValues>;
};

const NumberField: React.FC<
  NumberFieldPropType & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, initialValue, isEdit, register, name, ...props }) => {
  return (
    <div className="flex flex-row items-center relative">
      <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">{label}</p>
      <input
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
        className="hover:border-[1px] hover:border-[#50D5B7] focus:border-[#50D5B7] w-2/3 h-10 text-sm text-white bg-[#232537] pl-4 pr-10"
        style={{
          borderColor: isEdit ? "white" : "#232537",
        }}
        {...(register && register(name ?? ""))}
        {...props}
      />
    </div>
  );
};

export default NumberField;
