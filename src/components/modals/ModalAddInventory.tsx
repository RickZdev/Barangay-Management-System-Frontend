import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import { Close, Delete } from "@mui/icons-material";
import CustomButton from "../CustomButton";
import QuantityField from "../QuantityField";
import TextField from "../TextField";
import useCreateInventory from "../../queries/inventories/useCreateInventory";
import LoaderModal from "./loader/LoaderModal";
import ModalFailed from "./alert/ModalFailed";
import ModalSuccess from "./alert/ModalSuccess";

type ModalAddInventoryPropType = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddInventory: React.FC<ModalAddInventoryPropType> = ({
  open,
  handleClose,
}) => {
  const { mutateAsync } = useCreateInventory();

  const [item, setItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showRequiredErrorModal, setShowRequiredErrorModal] =
    useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isLoading = isProcessing;

  const clearValues = () => {
    setItem("");
    setQuantity(1);
  };

  const onSubmit = async () => {
    if (item) {
      setIsProcessing(true);
      const res = await mutateAsync({ item, quantity });

      if (res.data) {
        clearValues();
      }

      setIsProcessing(false);
      setShowSuccessModal(true);
      handleClose();
    } else {
      setShowRequiredErrorModal(true);
    }
  };

  return (
    <>
      <LoaderModal isLoading={isLoading} />
      <Dialog
        PaperProps={{ sx: { backgroundColor: "white", borderRadius: 5 } }}
        onClose={() => {
          clearValues();
          handleClose();
        }}
        open={open}
        maxWidth={"sm"}
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
                clearValues();
                handleClose();
              }}
            >
              <IconButton>
                <Close color="error" />
              </IconButton>
            </Tooltip>

            <CardHeader title="Inventory Lists" />

            <div className="flex flex-row justify-between items-center space-x-10">
              <TextField
                label="Item Name"
                isEdit
                initialValue={item ?? ""}
                onChange={(e) => setItem(e.target.value)}
              />

              <QuantityField
                label="Quantity"
                isEdit
                isOptional
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>

            <div className="flex justify-end pt-5 space-x-4">
              <CustomButton label="Add Item" onClick={onSubmit} />
            </div>
          </form>
        </Card>
      </Dialog>

      <ModalSuccess
        open={showSuccessModal}
        title="Added Inventory Successfully"
        description="You can now view the updated list of your inventory."
        buttonLabel="Back to Screen"
        handleButtonPress={() => setShowSuccessModal(false)}
      />

      <ModalFailed
        open={showRequiredErrorModal}
        title="Adding Inventory Failed"
        description="Item Name is Required. Please try again."
        buttonLabel="Okay"
        handleButtonPress={() => setShowRequiredErrorModal(false)}
      />
    </>
  );
};

export default ModalAddInventory;
