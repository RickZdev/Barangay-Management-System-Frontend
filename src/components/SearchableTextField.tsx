import { useState } from "react";
import type { ResidentPropType } from "../utils/types";
import { getResidentFullName } from "../helper/getResidentFullName";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import useDebounce from "../hooks/useDebounce";
import useSearchResidents from "../queries/resident/useSearchResidents";
import { UseFormRegisterReturn } from "react-hook-form";
import { Rings, ThreeDots } from "react-loader-spinner";
import { TextInput } from "flowbite-react";

type TextFieldPropType = {
  label: string;
  isEdit?: boolean;
  isOptional?: boolean;
  register?: UseFormRegisterReturn<string>;
  handleIsEmptyText?: (isEmptyText: boolean) => void;
  handleChange: (resident: ResidentPropType | undefined) => void;
  error?: string;
};

const SearchableTextField: React.FC<
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
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearch = useDebounce(searchText ?? "");
  const { data: residentData, isFetching } = useSearchResidents(
    debouncedSearch ?? ""
  );

  return (
    <>
      <div className="flex flex-col relative ">
        <div className="flex flex-row items-center relative">
          <p className="flex-1 text-black text-sm font-semibold">{label}</p>

          <TextInput
            type="text"
            disabled={!isEdit}
            className=" w-[80%] h-10 text-sm bg-[rgb(247,248,249)] "
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
            onChange={(event) => {
              setSearchText(event.target.value);

              if (handleIsEmptyText) {
                handleIsEmptyText(false);
              }
            }}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            {...register}
            {...props}
          />

          {isFetching ? (
            <div className="absolute right-2 text-white z-50">
              <ThreeDots
                height="30"
                width="20"
                color="black"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={isFetching}
                ariaLabel="rings-loading"
              />
            </div>
          ) : (
            <PersonSearchIcon className="absolute right-2 text-black" />
          )}
        </div>

        {debouncedSearch !== "" && isInputFocused === true && (
          <ul className="search-textbox bg-white w-[80%] self-end absolute z-50 top-10 max-h-[250px] overflow-y-auto  rounded-b-lg">
            {residentData?.map((resident: any) => {
              const fullName = getResidentFullName({
                lastName: resident?.lastName,
                firstName: resident?.firstName,
                middleName: resident?.middleName,
                suffix: resident?.suffix,
              });

              return (
                <li
                  key={resident?._id}
                  className="cursor-pointer p-2 hover:bg-[#f0f2fa] border-b-[1px] border-l-[1px] border-r-[1px] border-black"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleChange(resident);
                    setSearchText(fullName);
                    setIsInputFocused(true);

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
          <p className="text-secondary text-xs font-semibold">{error}</p>
        </div>
      )}
    </>
  );
};

export default SearchableTextField;
