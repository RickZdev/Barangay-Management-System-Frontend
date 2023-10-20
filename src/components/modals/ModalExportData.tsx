import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import SubmitButton from "../SubmitButton";

import { Close } from "@mui/icons-material";

import TextField from "../TextField";
import CustomButton from "../CustomButton";

type ModalAddTransactionPropType = {
  open: boolean;
  fileName: string;
  handleSetFileName: (text: string) => void;
  handleClose: () => void;
  handleSubmit: () => void;
};

const ModalExportData: React.FC<ModalAddTransactionPropType> = ({
  open,
  fileName,
  handleSetFileName,
  handleClose,
  handleSubmit,
}) => {
  return (
    <>
      <Dialog
        PaperProps={{ sx: { backgroundColor: "#29283d", borderRadius: 5 } }}
        onClose={handleClose}
        open={open}
        maxWidth={"xs"}
        fullWidth
        sx={{ borderRadius: 20 }}
      >
        <Card>
          <form className="space-y-4 flex flex-col bg-[#29283d] p-4">
            <Tooltip
              arrow
              title="Close"
              sx={{ alignSelf: "flex-end" }}
              color="error"
              onClick={handleClose}
            >
              <IconButton>
                <Close color="error" />
              </IconButton>
            </Tooltip>

            <CardHeader title="Export Data File" />

            <TextField
              label="File Name"
              isEdit
              value={fileName ?? ""}
              onChange={(event) => handleSetFileName(event?.target.value)}
            />

            <div className="flex justify-end">
              <CustomButton label="Submit" onClick={handleSubmit} />
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  );
};

export default ModalExportData;
