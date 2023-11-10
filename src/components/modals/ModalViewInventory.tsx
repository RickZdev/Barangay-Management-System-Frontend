import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import { Close, Delete } from "@mui/icons-material";
import CustomButton from "../CustomButton";
import QuantityField from "../QuantityField";
import useGetInventories from "../../queries/inventories/useGetInventories";
import { InventoriesPropType } from "../../utils/types";
import useUpdateInventory from "../../queries/inventories/useUpdateInventory";
import _ from "lodash";
import LoaderModal from "./loader/LoaderModal";
import useDeleteInventory from "../../queries/inventories/useDeleteInventory";
import ModalSuccess from "./alert/ModalSuccess";

type ModalViewInventoryPropType = {
  open: boolean;
  showEdit?: boolean;
  handleClose: () => void;
};

const ModalViewInventory: React.FC<ModalViewInventoryPropType> = ({
  open,
  showEdit = true,
  handleClose,
}) => {
  const { data: inventories, isLoading: isInventoriesLoading } =
    useGetInventories();
  const { mutateAsync: updateInventories } = useUpdateInventory();
  const { mutateAsync: deleteInventory } = useDeleteInventory();

  const [quantities, setQuantities] = useState<number[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const quantitiesMapped = useMemo(() => {
    return (
      _.map(
        inventories?.data,
        (inventory: InventoriesPropType) => inventory?.quantity ?? 0
      ) ?? []
    );
  }, [inventories, isInventoriesLoading]);

  const isLoading = isInventoriesLoading || isProcessing;

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = newQuantity;
    setQuantities(updatedQuantities);
  };

  const onSubmit = () => {
    setIsProcessing(true);
    _.map(
      inventories?.data,
      async (item: InventoriesPropType, index: number) =>
        await updateInventories({
          inventoryId: item?._id ?? "",
          updatedData: {
            ...item,
            quantity: !isNaN(quantities[index]) ? quantities[index] : 0,
          },
        })
    );

    setIsEdit(false);
    setIsProcessing(false);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    setQuantities(quantitiesMapped);
  }, [quantitiesMapped]);

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <Dialog
        PaperProps={{ sx: { backgroundColor: "white", borderRadius: 5 } }}
        onClose={handleClose}
        open={open}
        maxWidth={"xs"}
        fullWidth
        sx={{ borderRadius: 20 }}
      >
        <Card>
          <form className="space-y-4 flex flex-col bg-white p-4">
            <Tooltip
              arrow
              title="Close"
              sx={{ alignSelf: "flex-end" }}
              color="error"
              onClick={() => {
                handleClose();
              }}
            >
              <IconButton>
                <Close color="error" />
              </IconButton>
            </Tooltip>

            <CardHeader title="Inventory Lists" />

            <div className="flex flex-row justify-between items-center space-x-10 mb-4">
              <p className="flex-1 text-black text-base">ITEM NAME</p>
              <p className="text-black text-base ">QUANTITY</p>
              {isEdit && <p className="text-black text-base">ACTION</p>}
            </div>

            {inventories?.data?.map(
              (inventory: InventoriesPropType, index: number) => (
                <div className="flex flex-row items-center space-x-10">
                  <p className="flex-1 text-black text-base ">
                    {inventory?.item}
                  </p>

                  {quantities[index] === 0 && !isEdit ? (
                    <p className="text-secondary text-base ">OUT OF STOCK</p>
                  ) : (
                    <QuantityField
                      isEdit={isEdit}
                      isOptional
                      quantity={quantities[index]}
                      setQuantity={(newQuantity) =>
                        handleQuantityChange(index, newQuantity)
                      }
                    />
                  )}

                  {isEdit && (
                    <Tooltip
                      arrow
                      title="Delete"
                      onClick={async () => {
                        setIsProcessing(true);
                        await deleteInventory(inventory?._id ?? "");
                        setIsProcessing(false);
                      }}
                    >
                      <IconButton>
                        <Delete color="error" />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              )
            )}
            {showEdit && (
              <div>
                {!isEdit ? (
                  <div className="flex justify-end pt-5 ">
                    <CustomButton
                      label="Edit Inventory"
                      onClick={() => setIsEdit(true)}
                    />
                  </div>
                ) : (
                  <div className="flex justify-end pt-5 space-x-4">
                    <CustomButton
                      label="Cancel"
                      backgroundColor="rgb(239, 68, 68)"
                      onClick={() => setIsEdit(false)}
                    />
                    <CustomButton label="Submit" onClick={onSubmit} />
                  </div>
                )}
              </div>
            )}
          </form>
        </Card>
      </Dialog>

      <ModalSuccess
        open={showSuccessModal}
        title="Update Inventory Successfully"
        description="You can now view the updated list of your inventory."
        buttonLabel="Back to Screen"
        handleButtonPress={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default ModalViewInventory;
