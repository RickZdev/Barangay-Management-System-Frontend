import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import CardHeader from "../../../components/CardHeader";
import CardPhoto from "../../../components/CardPhoto";
import CustomButton from "../../../components/CustomButton";
import TextField from "../../../components/TextField";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import BackButton from "../../../components/BackButton";
import SearchableTextField from "../../../components/SearchableTextField";
import { ResidentPropType } from "../../../utils/types";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import { getResidentFullAddress } from "../../../helper/getResidentFullAddres";
import DateTimePickerField from "../../../components/DateTimePickerField";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import SubmitButton from "../../../components/SubmitButton";
import useCreateBorrowedInventory from "../../../queries/borrowedInventory/useCreateBorrowedInventory";
import useAuthContext from "../../../queries/auth/useAuthContext";

type ItemPropType = {
  itemName: string;
  quantity: number;
};

const InventoryRequest: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useCreateBorrowedInventory();
  const auth = useAuthContext();

  const [residentDetails, setResidentDetails] = useState<
    ResidentPropType | undefined
  >();

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [listOfItems, setListOfItems] = useState<ItemPropType[]>([]);

  const handleChange = (resident: ResidentPropType | undefined) => {
    setResidentDetails(resident);
  };

  const handleAddItem = () => {
    if (itemName) {
      setListOfItems((prevList) => [
        ...prevList,
        { itemName: itemName, quantity: quantity },
      ]);
      setItemName("");
      setQuantity(1);
    } else {
      alert("ITEM NAME IS REQUIRED!");
    }
  };

  const handleDeleteItem = (index: number) => {
    const tempArr = listOfItems.filter(
      (item, itemIndex) => itemIndex !== index
    );

    setListOfItems(tempArr);
  };

  const onSubmit = (event: any) => {
    console.log({
      borroweeId: residentDetails?._id,
      borroweeName: getResidentFullName({
        lastName: residentDetails?.lastName,
        firstName: residentDetails?.firstName,
        middleName: residentDetails?.middleName,
        suffix: residentDetails?.suffix,
      }),
      borroweeContactNumber: residentDetails?.contactNumber,
      borrowedDateAndTime: dayjs().format("MM/DD/YYYY - hh:mm A"),
      officialInCharge: "Captain",
      borrowedItems: listOfItems,
      ...event,
    });

    mutate({
      borroweeId: residentDetails?._id,
      borroweeName: getResidentFullName({
        lastName: residentDetails?.lastName,
        firstName: residentDetails?.firstName,
        middleName: residentDetails?.middleName,
        suffix: residentDetails?.suffix,
      }),
      borroweeContactNumber: residentDetails?.contactNumber,
      borrowedDateAndTime: dayjs().format("MM/DD/YYYY - hh:mm A"),
      officialInCharge: auth?.userRole,
      borrowedItems: listOfItems,
      ...event,
    });
  };

  return (
    <div className="pb-10">
      <BackButton />
      <form
        className="grid md:grid-cols-2 gap-6 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 1st column */}
        <div>
          <Card className="mb-6">
            <SearchableTextField
              label="Borrowee Name"
              isEdit
              handleChange={handleChange}
            />
          </Card>
          {residentDetails && (
            <Card className="space-y-4 mb-6">
              <CardPhoto />
              <div className="flex flex-col items-center space-y-2">
                <p className="flex-1 text-white text-lg font-bold">
                  {getResidentFullName({
                    lastName: residentDetails?.lastName,
                    firstName: residentDetails?.firstName,
                    middleName: residentDetails?.middleName,
                    suffix: residentDetails?.suffix,
                  })}
                </p>
                <p className="text-[hsla(0,0%,100%,.6)] text-sm font-bold">
                  {getResidentFullAddress({
                    houseNumber: residentDetails?.houseNumber,
                    streetAddress: residentDetails?.streetAddress,
                    purokNumber: residentDetails?.purokNumber,
                  })}
                </p>
                <p className="text-[hsla(0,0%,100%,.6)] text-sm font-bold">
                  {residentDetails?.contactNumber}
                </p>
              </div>
            </Card>
          )}
          <Card>
            <CardHeader title="Borrowed Details" isRequired />

            <div className="space-y-4">
              <TextField
                label="Purpose of Borrowing"
                isEdit
                register={register}
                name="purposeOfBorrowing"
              />
              <TextField
                label="Location of Event"
                isEdit
                register={register}
                name="eventLocation"
              />
              <DateTimePickerField label="Date and Time" value={dayjs()} />
            </div>
          </Card>
        </div>

        {/* 2nd column */}
        <div className="flex flex-col space-y-6">
          <Card className="space-y-4 ">
            <TextField
              label="Item Name"
              isEdit
              value={itemName}
              onChange={(event) => setItemName(event?.target?.value)}
            />
            <QuantityField quantity={quantity} setQuantity={setQuantity} />
            <div className="flex justify-end">
              <CustomButton label="Add Item" onClick={handleAddItem} />
            </div>
          </Card>
          <div className="overflow-x-auto">
            <Card className="min-w-[500px] md:w-full">
              <CardHeader title="List of Items" isRequired />
              <div className="flex flex-row justify-between text-white px-6">
                <h1 className="text-[#50D5B7]">ITEM</h1>
                <h1 className="text-[#50D5B7]">QUANTITY</h1>
                <h1 className="text-[#50D5B7]">ACTION</h1>
              </div>
              <div className="min-w-[450px] md:min-w-0">
                {listOfItems?.map((item, index) => {
                  return (
                    <ul
                      key={index}
                      className="flex text-white items-center px-5 mb-2 border-white border-[1px]"
                    >
                      <li className="py-3 w-[45%]">
                        <p>{item.itemName}</p>
                      </li>
                      <li className="flex-1">
                        <p>
                          {item.quantity > 1
                            ? item.quantity + " pcs."
                            : item.quantity + " pc."}
                        </p>
                      </li>
                      <li>
                        <Tooltip
                          arrow
                          title="Delete"
                          onClick={() => handleDeleteItem(index)}
                        >
                          <IconButton>
                            <Delete color="error" />
                          </IconButton>
                        </Tooltip>
                      </li>
                    </ul>
                  );
                })}
              </div>
            </Card>
            {/* submit button */}
            <div className="flex justify-end mt-6">
              <SubmitButton label="Submit" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

type QuantityFieldPropType = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

const QuantityField: React.FC<QuantityFieldPropType> = ({
  quantity = 0,
  setQuantity,
}) => {
  const handleAddQuantity = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <p className=" text-[hsla(0,0%,100%,.6)] text-xs w-[33%]">Quantity</p>
      <div className="flex flex-row items-center space-x-2">
        <MinusQuantity handleClick={handleMinusQuantity} />
        <input
          type="number"
          min="1"
          maxLength={100}
          max="100"
          step="1"
          value={quantity}
          style={{ appearance: "none" }}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="appearance-none border-white hover:border-[1px] text-center hover:border-[#50D5B7] focus:border-[#50D5B7] w-10 h-8 text-sm text-white bg-[#232537]"
        />
        <AddQuantity handleClick={handleAddQuantity} />
      </div>
    </div>
  );
};

const AddQuantity = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      className="w-8 h-8 bg-[#067D68] rounded-md flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-white">+</p>
    </div>
  );
};

const MinusQuantity = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      className="w-8 h-8 bg-[#067D68] rounded-md flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-white">-</p>
    </div>
  );
};

export default InventoryRequest;
