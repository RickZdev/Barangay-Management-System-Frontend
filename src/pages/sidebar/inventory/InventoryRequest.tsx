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
import { InventoriesPropType, ResidentPropType } from "../../../utils/types";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import { getResidentFullAddress } from "../../../helper/getResidentFullAddres";
import DateTimePickerField from "../../../components/DateTimePickerField";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import SubmitButton from "../../../components/SubmitButton";
import useCreateBorrowedInventory from "../../../queries/borrowedInventory/useCreateBorrowedInventory";
import useAuthContext from "../../../queries/auth/useAuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { inventoryFormValidation } from "../../../utils/validation";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import ModalSuccess from "../../../components/modals/alert/ModalSuccess";
import ModalFailed from "../../../components/modals/alert/ModalFailed";
import QuantityField from "../../../components/QuantityField";
import useGetInventories from "../../../queries/inventories/useGetInventories";
import DefaultUserAvatar from "../../../assets/images/default-user-avatar.png";
import _ from "lodash";
import useUpdateInventory from "../../../queries/inventories/useUpdateInventory";
import ModalViewInventory from "../../../components/modals/ModalViewInventory";
import TableButton from "../../../components/TableButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InventoryRequest: React.FC = () => {
  const {
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(inventoryFormValidation),
  });

  const { data: inventories } = useGetInventories();
  const { mutateAsync: createBorrowedInventory } = useCreateBorrowedInventory();
  const { mutateAsync: updateInventory } = useUpdateInventory();
  const auth = useAuthContext();

  const [isResidentTextEmpty, setIsResidentTextEmpty] = useState<boolean>(true);
  const [resident, setResident] = useState<ResidentPropType | undefined>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showListErrorModal, setShowListErrorModal] = useState<boolean>(false);
  const [showViewInventoryModal, setShowViewInventoryModal] =
    useState<boolean>(false);

  const [isError, setIsError] = useState<boolean[]>([]);

  const [quantities, setQuantities] = useState<number[]>([]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = newQuantity;
    setQuantities(updatedQuantities);
  };

  const handleIsErrorChange = (index: number, errors: boolean) => {
    const updatedErrors = [...isError];
    updatedErrors[index] = errors;
    setIsError(updatedErrors);
  };

  const isLoading = isProcessing;

  const handleSuccess = () => {
    setShowSuccessModal(false);

    window.location.reload();
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    const borrowedItems = _.map(
      inventories?.data,
      (item: InventoriesPropType, index: number) => {
        return {
          _id: item?._id,
          itemName: item?.item,
          quantity: !isNaN(quantities[index]) ? quantities[index] : 0,
        };
      }
    );

    const mappedBorrowedItems = _.filter(
      borrowedItems,
      (item) => item?.quantity !== 0
    );

    if (mappedBorrowedItems.length !== 0) {
      await createBorrowedInventory({
        borroweeId: resident?._id,
        borroweeName: getResidentFullName({
          lastName: resident?.lastName,
          firstName: resident?.firstName,
          middleName: resident?.middleName,
          suffix: resident?.suffix,
        }),
        borroweeContactNumber: resident?.contactNumber,
        borrowedDateAndTime: dayjs().format("MM/DD/YYYY - hh:mm A"),
        officialInCharge: auth?.userRole,
        borrowedItems: mappedBorrowedItems,
        ...data,
      });

      _.map(
        inventories?.data,
        async (inventory: InventoriesPropType, index: number) => {
          let decreaseQuantity;

          if (quantities[index]) {
            decreaseQuantity = inventory?.quantity - quantities[index];
          } else {
            decreaseQuantity = inventory?.quantity;
          }

          await updateInventory({
            inventoryId: inventory?._id ?? "",
            updatedData: {
              item: inventory?.item,
              quantity: !isNaN(quantities[index])
                ? decreaseQuantity
                : inventory?.quantity,
            },
          });
        }
      );

      setIsProcessing(false);
      setShowSuccessModal(true);
    } else {
      setShowListErrorModal(true);
      setIsProcessing(false);
    }
  };

  // searchable field errors
  useEffect(() => {
    if (isResidentTextEmpty) {
      setValue(
        "borroweeName",
        getResidentFullName({
          lastName: resident?.lastName,
          firstName: resident?.firstName,
          middleName: resident?.middleName,
          suffix: resident?.suffix,
        })
      );

      clearErrors("borroweeName");
    } else {
      setValue("borroweeName", "");
      setError("borroweeName", { message: "This is a required field." });
    }
  }, [isResidentTextEmpty]);

  useEffect(() => {
    setValue("borroweeName", "");
  }, []);

  return (
    <div className="pb-10">
      <LoaderModal isLoading={isLoading} />

      <BackButton />

      <div className="pt-5">
        <TableButton
          label="View Available Stocks in Inventory "
          Icon={VisibilityIcon}
          onClick={() => setShowViewInventoryModal(true)}
        />
      </div>

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
              handleChange={setResident}
              handleIsEmptyText={setIsResidentTextEmpty}
              error={errors?.borroweeName?.message}
            />
          </Card>
          {resident && (
            <Card className="space-y-4 mb-6">
              <CardPhoto
                showTooltip={false}
                image={
                  resident?.profilePhoto === ""
                    ? DefaultUserAvatar
                    : resident?.profilePhoto ?? ""
                }
              />
              <div className="flex flex-col items-center space-y-2">
                <p className="flex-1 text-white text-lg font-bold">
                  {getResidentFullName({
                    lastName: resident?.lastName,
                    firstName: resident?.firstName,
                    middleName: resident?.middleName,
                    suffix: resident?.suffix,
                  })}
                </p>
                <p className="text-[hsla(0,0%,100%,.6)] text-sm font-bold">
                  {getResidentFullAddress({
                    houseNumber: resident?.houseNumber,
                    streetAddress: resident?.streetAddress,
                    purokNumber: resident?.purokNumber,
                  })}
                </p>
                <p className="text-[hsla(0,0%,100%,.6)] text-sm font-bold">
                  {resident?.contactNumber}
                </p>
              </div>
            </Card>
          )}
          <Card>
            <CardHeader title="Borrowed Details" />

            <div className="space-y-4">
              <TextField
                label="Purpose of Borrowing"
                isEdit
                register={register("purposeOfBorrowing")}
                error={errors?.purposeOfBorrowing?.message}
              />
              <TextField
                label="Location of Event"
                isEdit
                register={register("eventLocation")}
                error={errors?.eventLocation?.message}
              />
              <DateTimePickerField label="Date and Time" value={dayjs()} />
            </div>
          </Card>
        </div>

        {/* 2nd column */}
        <div className="flex flex-col space-y-6">
          <div className="overflow-x-auto">
            <Card className="min-w-[500px] md:w-full">
              <CardHeader title="List of Items" />
              <div className="flex flex-row justify-between text-white px-6">
                <h1 className="text-[#50D5B7]">ITEM</h1>
                <h1 className="text-[#50D5B7]">QUANTITY</h1>
              </div>
              <div className="min-w-[450px] md:min-w-0">
                {inventories?.data?.map(
                  (inventory: InventoriesPropType, index: number) => (
                    <div key={index.toString()}>
                      <div className="flex flex-row items-center space-x-10 border-[1px] border-white my-4 p-2">
                        <p className="flex-1 text-white text-base ">
                          {inventory?.item}
                        </p>

                        <div>
                          {inventory?.quantity === 0 ? (
                            <p className="text-red-400 text-base ">
                              OUT OF STOCK
                            </p>
                          ) : (
                            <QuantityField
                              limit={inventory?.quantity}
                              isEdit
                              setIsError={(error) =>
                                handleIsErrorChange(index, error)
                              }
                              isOptional
                              quantity={quantities[index]}
                              setQuantity={(newQuantity) =>
                                handleQuantityChange(index, newQuantity)
                              }
                            />
                          )}
                        </div>
                      </div>

                      {isError[index] && (
                        <div className="flex flex-1 w-full justify-end">
                          <p className="text-red-400 text-xs">
                            This item has {inventory?.quantity}{" "}
                            {inventory?.quantity > 1 ? "stocks" : "stock"} left.
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </Card>
            {/* submit button */}
            <div className="flex justify-end mt-6">
              <SubmitButton label="Submit" />
            </div>
          </div>
        </div>
      </form>

      <ModalViewInventory
        open={showViewInventoryModal}
        showEdit={false}
        handleClose={() => setShowViewInventoryModal(false)}
      />

      <ModalSuccess
        open={showSuccessModal}
        title="Borrowed Complete"
        description="Your inventory has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />

      <ModalFailed
        open={showListErrorModal}
        title="Inventory Failed"
        description="Please add minimum one item per request."
        buttonLabel="Try Again"
        handleButtonPress={() => setShowListErrorModal(false)}
      />
    </div>
  );
};

export default InventoryRequest;
