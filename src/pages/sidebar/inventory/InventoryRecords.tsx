import React, { useMemo, useState } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";
import { Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import TableButton from "../../../components/TableButton";
import { BorrowedRecordsPropType } from "../../../utils/types";
import useGetBorrowedRecords from "../../../queries/borrowedRecords/useGetBorrowedRecords";
import Loading from "../../errors/Loading";
import ViewDetails from "../../../components/ViewDetails";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import useAuthContext from "../../../queries/auth/useAuthContext";
import useDeleteBorrowedRecord from "../../../queries/borrowedRecords/useDeleteBorrowedRecord";
import _ from "lodash";
import useGetBorrowedInventory from "../../../queries/borrowedInventory/useGetBorrowedInventory";
import ModalAddInventory from "../../../components/modals/ModalAddInventory";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalViewInventory from "../../../components/modals/ModalViewInventory";
import InventoryPanel from "../../../components/InventoryPanel";

const InventoryRecords: React.FC = React.memo(() => {
  const auth = useAuthContext();

  const columns = useMemo<MRT_ColumnDef<BorrowedRecordsPropType>[]>(
    () => [
      {
        accessorKey: "borroweeName",
        header: "Borrowee Name",
        size: 150,
        Cell: ({ cell }) => (
          <ViewDetails
            residentId={cell.row.original.borroweeId}
            residentName={cell.row.original.borroweeName}
          />
        ),
      },
      {
        accessorKey: "purposeOfBorrowing",
        header: "Purpose of Borrowing",
        size: 150,
      },
      {
        accessorKey: "eventLocation",
        header: "Location of Event",
        size: 150,
      },
      {
        accessorKey: "borrowedDateAndTime",
        header: "Borrowed Date",
        size: 150,
      },
      {
        accessorKey: "returnedDateAndTime",
        header: "Returned Date",
        size: 150,
      },
    ],
    []
  );

  const {
    data: inventoryRecords,
    isLoading: isGetRecordsLoading,
    isRefetching,
    refetch,
  } = useGetBorrowedRecords();

  const { data: borrowedInventories, isLoading: isBorrowedInventoriesLoading } =
    useGetBorrowedInventory();

  const { mutate: deleteInventory } = useDeleteBorrowedRecord();

  const [showViewInventoryModal, setShowViewInventoryModal] =
    useState<boolean>(false);
  const [showAddInventoryModal, setShowAddInventoryModal] =
    useState<boolean>(false);

  const InventoryRecordsForResident = useMemo(() => {
    return _.filter(
      inventoryRecords,
      (inventoryRecord) => inventoryRecord?.borroweeId === auth?.userId
    );
  }, [inventoryRecords]);

  const BorrowedInventoriesForResident = useMemo(() => {
    return _.filter(
      borrowedInventories,
      (borrowedInventory) => borrowedInventory?.borroweeId === auth?.userId
    );
  }, [borrowedInventories]);

  const data =
    auth?.userRole !== "Resident"
      ? inventoryRecords
      : InventoryRecordsForResident;

  const countBorrowedInventories =
    auth?.userRole !== "Resident"
      ? borrowedInventories
      : BorrowedInventoriesForResident;

  const isLoading =
    isGetRecordsLoading || isRefetching || isBorrowedInventoriesLoading;

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <Table
        data={data ?? []}
        columns={columns}
        enableRowNumbers={true}
        enableRowActions={auth?.userRole === "Captain" ? true : false}
        muiTableDetailPanelProps={{
          sx: { color: "white" },
        }}
        renderDetailPanel={({ row }) => <InventoryPanel row={row} />}
        isError={false}
        showDeleteButton={auth?.userRole === "Captain" ? true : false}
        showBackButton={false}
        showEditButton={false}
        showViewButton={false}
        refreshButton={refetch}
        deleteButton={deleteInventory}
      >
        <div className="flex flex-col pt-4 px-2 space-y-2 md:flex md:flex-row md:justify-end md:space-x-4 md:space-y-0">
          {auth?.userRole !== "Resident" && (
            <div className="flex flex-1 space-x-4">
              <TableButton
                label="View Inventory"
                Icon={VisibilityIcon}
                onClick={() => setShowViewInventoryModal(true)}
              />

              <TableButton
                label="Add Inventory"
                onClick={() => setShowAddInventoryModal(true)}
              />
            </div>
          )}

          <TableButton
            label="Borrowed Inventory"
            path={"borrow"}
            Icon={InventoryIcon}
            count={countBorrowedInventories?.length.toString()}
          />
          {auth?.userRole !== "Resident" && (
            <TableButton label="Request Inventory" path={"request"} />
          )}
        </div>
      </Table>

      <ModalViewInventory
        open={showViewInventoryModal}
        handleClose={() => setShowViewInventoryModal(false)}
      />

      <ModalAddInventory
        open={showAddInventoryModal}
        handleClose={() => setShowAddInventoryModal(false)}
      />
    </>
  );
});

export default InventoryRecords;
