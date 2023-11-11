import React, { useEffect, useState } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here

import Delete from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Link, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import { UseMutateFunction } from "@tanstack/react-query";
import ModalWarning from "./modals/alert/ModalWarning";
import dayjs from "dayjs";
import ModalExportData from "./modals/ModalExportData";
import { string } from "yup";
import ModalReceiveBenefit from "./modals/ModalReceiveBenefit";
import useUpdateIndigentBenefit from "../queries/indigentBenefit/useUpdateIndigentBenefit";
import { refreshNotify } from "../helper/toastNotifications";
import { COLORS } from "../constants/COLORS";

type TableTypeProps<T extends Record<string, any>> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  isError?: boolean;
  showBackButton?: boolean;
  showViewButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showExportButton?: boolean;
  showIndigentButton?: boolean;
  refreshButton?: () => void;
  deleteButton?: UseMutateFunction<string, unknown, string, unknown>;
  children?: React.ReactNode;
};

const Table = <T extends Record<string, any>>({
  data,
  columns,
  isError,
  showBackButton = true,
  showViewButton = true,
  showEditButton = true,
  showDeleteButton = true,
  showExportButton,
  showIndigentButton,
  refreshButton,
  deleteButton,
  children,
  ...props
}: TableTypeProps<T> & MaterialReactTableProps<T>) => {
  const location = useLocation();
  const [isDefaultPath, setDefaultPath] = useState<boolean | undefined>();

  const [fileName, setFileName] = useState<string>();

  const [rowId, setRowId] = useState<string>();

  const [showExportDataModal, setShowExportDataModal] =
    useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [showIndigentModal, setShowIndigentModal] = useState<boolean>(false);
  const [showIndigentSelfModal, setShowIndigentSelfModal] =
    useState<boolean>(false);

  const { mutateAsync: updateIndigent } = useUpdateIndigentBenefit();

  const handleDelete = () => {
    if (deleteButton && rowId) {
      deleteButton(rowId);
    }

    setShowDeleteModal(false);
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    useBom: true,
    replaceUndefinedWith: "null",
    showColumnHeaders: true,
    filename: fileName,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);

    setShowExportDataModal(false);
  };

  const handleSetFileName = (text: string) => {
    setFileName(text);
  };

  const handleReceiveBySelf = async (indigentId: string) => {
    await updateIndigent({
      indigentBenefitId: indigentId,
      updatedData: {
        status: "Received",
        receiver: "Self",
      },
    });

    setShowIndigentSelfModal(false);
  };

  useEffect(() => {
    setDefaultPath(location.pathname === "/");
  }, []);

  return (
    <div>
      {showBackButton && !isDefaultPath && (
        <div className="flex flex-1 pb-5">
          <BackButton />
        </div>
      )}

      {children && <div className="bg-white">{children}</div>}
      <MaterialReactTable
        data={data ?? []}
        columns={columns}
        enableRowActions
        renderRowActions={({ row }) => [
          <Box
            sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}
            key={row.id}
          >
            {showViewButton && (
              <Link to={`view/${row.original._id}`}>
                <Tooltip arrow title="View Details">
                  <IconButton>
                    <VisibilityIcon style={{ color: COLORS.secondaryGold }} />
                  </IconButton>
                </Tooltip>
              </Link>
            )}

            {showEditButton && (
              <Link to={`edit/${row.original._id}`}>
                <Tooltip arrow title="Edit Details">
                  <IconButton>
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
              </Link>
            )}

            {showDeleteButton && (
              <Tooltip
                arrow
                title="Delete"
                onClick={() => {
                  setShowDeleteModal(true);
                  setRowId(row.original._id);
                }}
              >
                <IconButton>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            )}

            {showIndigentButton && row.original.status === "Not Received" && (
              <>
                <Tooltip
                  arrow
                  title="Received by Others"
                  onClick={() => {
                    setRowId(row.original._id);
                    setShowIndigentModal(true);
                  }}
                >
                  <IconButton>
                    <CompareArrowsIcon sx={{ color: "black" }} />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  arrow
                  title="Received by Self"
                  onClick={() => {
                    setRowId(row.original._id);
                    setShowIndigentSelfModal(true);
                  }}
                >
                  <IconButton>
                    <KeyboardReturnIcon sx={{ color: "black" }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>,
        ]}
        enableStickyHeader={true}
        enableColumnResizing
        enableRowNumbers
        // enableRowSelection
        enableHiding={false}
        enableDensityToggle={false}
        positionActionsColumn="last"
        positionToolbarAlertBanner="bottom"
        columnResizeMode="onChange"
        rowNumberMode="original"
        initialState={{
          density: "comfortable",
        }}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            size: 200, //make actions column wider
          },
        }}
        muiTablePaperProps={{
          sx: {
            backgroundColor: "white",
          },
        }}
        muiTableBodyProps={{
          sx: {
            "& tr": {
              backgroundColor: "white",
              textAlign: "center",
            },
            "& .mrt-empty-state-message": {
              color: "red", // change this to your desired text color
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            borderBottom: "white",
            color: "black",
            borderWidth: 1,
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            backgroundColor: "white",
            color: "black", // change this to your desired text color
          },
        }}
        muiTopToolbarProps={{
          sx: {
            backgroundColor: "white",
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            "& th": {
              textTransform: "uppercase",
              backgroundColor: "white", // change this to your desired color
              color: "black", //change this to your desired color
            },
          },
        }}
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        muiSelectAllCheckboxProps={{
          sx: {
            color: COLORS.secondaryGold,
          },
        }}
        muiSelectCheckboxProps={{
          sx: {
            color: COLORS.secondaryGold,
          },
        }}
        muiTableHeadCellColumnActionsButtonProps={{
          sx: {
            color: "black",
          },
        }}
        muiTablePaginationProps={{
          sx: {
            color: "black",
          },
        }}
        muiTableBodyRowProps={{ hover: false }}
        muiTableHeadCellFilterTextFieldProps={{
          InputProps: {
            style: { color: "black" },
          },
        }}
        muiSearchTextFieldProps={{
          InputProps: {
            style: { color: "black" },
          },
        }}
        renderTopToolbarCustomActions={({ table }) => (
          <div>
            <Tooltip arrow title="Refresh Data">
              <IconButton
                onClick={() => {
                  if (refreshButton) {
                    refreshButton();
                    refreshNotify();
                  } else {
                    return null;
                  }
                }}
                sx={{ color: COLORS.secondaryGold }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            {showExportButton && (
              <Tooltip arrow title="Export Data">
                <IconButton
                  onClick={() => setShowExportDataModal(true)}
                  sx={{ color: COLORS.secondaryGold }}
                >
                  <FileDownloadOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        )}
        {...props}
      />

      <ModalWarning
        open={showDeleteModal}
        title="ARE YOU SURE YOU WANT TO DELETE DATA"
        description="This action is irreversible upon confirmation. Confirm to continue."
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        handlePrimaryButton={handleDelete}
        handleSecondaryButton={() => setShowDeleteModal(false)}
      />

      <ModalExportData
        open={showExportDataModal}
        fileName={fileName ?? ""}
        handleSetFileName={handleSetFileName}
        handleSubmit={handleExportData}
        handleClose={() => setShowExportDataModal(false)}
      />

      <ModalReceiveBenefit
        open={showIndigentModal}
        handleClose={() => setShowIndigentModal(false)}
        indigentId={rowId}
      />

      <ModalWarning
        open={showIndigentSelfModal}
        title="RECEIVING BY SELF"
        description="Confirm to receive the benefit by self."
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        handlePrimaryButton={() => handleReceiveBySelf(rowId ?? "")}
        handleSecondaryButton={() => setShowIndigentSelfModal(false)}
      />
    </div>
  );
};

export default Table;
