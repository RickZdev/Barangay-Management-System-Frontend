import { useState } from "react";
import type { ResidentPropType } from "../utils/types";
import {
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { getResidentFullName } from "../helper/getResidentFullName";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import useGetOfficials from "../queries/official/useGetOfficials";
import { TextInput } from "flowbite-react";

type TextFieldPropType = {
  label: string;
  isEdit?: boolean;
  isOptional?: boolean;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  handleIsEmptyText?: (isEmptyText: boolean) => void;
  handleChange: (resident: ResidentPropType | undefined) => void;
};

const OfficialSearchableTextField: React.FC<
  TextFieldPropType & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  label,
  isEdit,
  isOptional,
  error,
  register,
  handleIsEmptyText,
  handleChange,
  ...props
}) => {
  const [searchText, setSearchText] = useState<string | undefined>("");
  const [newResidentDb, setNewResidentDb] = useState<
    ResidentPropType[] | undefined
  >([]);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const { data: residentData } = useGetOfficials();

  const searchFilter = (text: string) => {
    if (text) {
      const newData = residentData?.filter((resident) => {
        const fullName = getResidentFullName({
          lastName: resident?.lastName,
          firstName: resident?.firstName,
          middleName: resident?.middleName,
          suffix: resident?.suffix,
        });
        const itemData = fullName.toLowerCase().includes(text.toLowerCase());
        return itemData;
      });

      setNewResidentDb(newData);
    } else {
      setNewResidentDb(residentData);
    }

    setSearchText(text);

    if (handleIsEmptyText) {
      handleIsEmptyText(false);
    }
  };

  return (
    <>
      <div className="flex flex-col relative z-50">
        <div className="flex flex-row items-center relative">
          <p className="flex-1 text-black text-sm font-semibold">{label}</p>

          <TextInput
            type="text"
            disabled={!isEdit}
            className="w-[80%] h-10 text-sm text-black bg-[rgb(247,248,249)]"
            style={{
              paddingRight: 40,
              cursor: isEdit ? "text" : "not-allowed",
              border: error
                ? "2px solid red"
                : isEdit
                ? "2px solid rgb(97, 106, 113)"
                : "2px solid rgb(97, 106, 113)",
            }}
            value={searchText}
            onChange={(event) => searchFilter(event.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            {...register}
            {...props}
          />
          <PersonSearchIcon className="absolute right-2 text-black" />
        </div>

        {searchText !== "" && isInputFocused === true && (
          <ul className="search-textbox bg-white w-[80%] self-end absolute top-10 max-h-[200px] overflow-y-auto rounded-b-lg ">
            {newResidentDb?.map((resident, index) => {
              const fullName = getResidentFullName({
                lastName: resident?.lastName,
                firstName: resident?.firstName,
                middleName: resident?.middleName,
                suffix: resident?.suffix,
              });

              return (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-[#f0f2fa] border-b-[1px] border-l-[1px] border-r-[1px] border-black"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleChange(resident);
                    setSearchText(fullName);
                    setIsInputFocused(false);

                    if (handleIsEmptyText) {
                      handleIsEmptyText(true);
                    }
                  }}
                >
                  <p className="text-black">{fullName}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error && (
        <div className="flex flex-1 w-full justify-end">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </>
  );
};

export default OfficialSearchableTextField;
