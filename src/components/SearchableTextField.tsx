import { useState } from "react";
import type { ResidentPropType } from "../utils/types";
import useGetResidents from "../queries/resident/useGetResidents";
import { getResidentFullName } from "../helper/getResidentFullName";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

type TextFieldPropType = {
  label: string;
  isEdit?: boolean;
  handleChange: (resident: ResidentPropType | undefined) => void;
};

const SearchableTextField: React.FC<
  TextFieldPropType & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, isEdit, handleChange, ...props }) => {
  const { data: residentData } = useGetResidents();

  const [searchText, setSearchText] = useState<string | undefined>("");
  const [newResidentDb, setNewResidentDb] = useState<
    ResidentPropType[] | undefined
  >([]);

  const [isInputFocused, setIsInputFocused] = useState(false);

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
  };

  return (
    <div className="flex flex-col relative z-50">
      <div className="flex flex-row items-center relative">
        <p className="flex-1 text-[hsla(0,0%,100%,.6)] text-xs">{label}</p>
        <input
          type="text"
          disabled={!isEdit}
          className="hover:border-[1px] hover:border-[#50D5B7] focus:border-[#50D5B7] w-2/3 h-10 text-sm text-white bg-[#232537] pl-4 pr-10"
          style={{
            cursor: isEdit ? "text" : "not-allowed",
            borderColor: isEdit ? "white" : "#232537",
          }}
          value={searchText}
          onChange={(event) => searchFilter(event.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          {...props}
        />
        <PersonSearchIcon className="absolute right-2 text-white" />
      </div>

      {searchText !== "" && isInputFocused === true && (
        <ul className="search-textbox bg-white w-2/3 self-end absolute z-50 top-10 max-h-[200px] overflow-y-auto  rounded-b-lg">
          {newResidentDb?.map((resident) => {
            const fullName = getResidentFullName({
              lastName: resident?.lastName,
              firstName: resident?.firstName,
              middleName: resident?.middleName,
              suffix: resident?.suffix,
            });

            return (
              <li
                key={resident?._id}
                className="cursor-pointer p-2 hover:bg-[#f0f2fa]"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleChange(resident);
                  setSearchText(fullName);
                  setIsInputFocused(false);
                }}
              >
                <p className="text-black">{fullName}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchableTextField;
