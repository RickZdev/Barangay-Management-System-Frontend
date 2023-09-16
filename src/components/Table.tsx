import React, { useEffect, useState } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";

import Delete from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Link, useLocation } from "react-router-dom";
import BackButton from "./BackButton";
import { UseMutateFunction } from "@tanstack/react-query";

type TableTypeProps<T extends Record<string, any>> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  isError?: boolean;
  showBackButton?: boolean;
  showViewButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
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
  refreshButton,
  deleteButton,
  children,
  ...props
}: TableTypeProps<T> & MaterialReactTableProps<T>) => {
  const location = useLocation();
  const [isDefaultPath, setDefaultPath] = useState<boolean | undefined>();

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
      {children && <div className="bg-[#29283d]">{children}</div>}
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
                    <VisibilityIcon color="info" />
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
                  if (deleteButton) {
                    deleteButton(row.original._id);
                  }
                  return;
                }}
              >
                <IconButton>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
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
            backgroundColor: "#29283d",
          },
        }}
        muiTableBodyProps={{
          sx: {
            "& tr": {
              backgroundColor: "#29283d",
              textAlign: "center",
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            borderBottom: "#29283d",
            color: "white",
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            backgroundColor: "#29283d",
            color: "white", // change this to your desired text color
          },
        }}
        muiTopToolbarProps={{
          sx: {
            backgroundColor: "#29283d",
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            "& th": {
              textTransform: "uppercase",
              backgroundColor: "#29283d", // change this to your desired color
              color: "#50D5B7", //change this to your desired color
              borderBottom: ".0625rem solid rgb(63, 62, 81)",
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
            color: "#f04e23",
          },
        }}
        muiSelectCheckboxProps={{
          sx: {
            color: "white",
          },
        }}
        muiTableHeadCellColumnActionsButtonProps={{
          sx: {
            color: "white",
          },
        }}
        muiTablePaginationProps={{
          sx: {
            color: "white",
          },
        }}
        muiTableBodyRowProps={{ hover: false }}
        muiTableHeadCellFilterTextFieldProps={{
          InputProps: {
            style: { color: "white" },
          },
        }}
        muiSearchTextFieldProps={{
          InputProps: {
            style: { color: "white" },
          },
        }}
        renderTopToolbarCustomActions={({ table }) => (
          <div>
            <Tooltip arrow title="Refresh Data">
              <IconButton
                onClick={() => {
                  refreshButton ? refreshButton() : null;
                }}
                sx={{ color: "rgb(214, 214, 218)" }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Tooltip arrow title="Export Data">
              <IconButton
                onClick={() => {
                  console.log("EXPORT DATA");
                }}
                sx={{ color: "rgb(214, 214, 218)" }}
              >
                <FileDownloadOutlinedIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
        {...props}
      />
    </div>
  );
};

export default Table;
