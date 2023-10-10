import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/Table";
import {
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from "material-react-table";
import { Typography } from "@mui/material";
import CustomButton from "../../../components/CustomButton";
import { BorrowedInventoryPropType } from "../../../utils/types";
import useGetBorrowedInventory from "../../../queries/borrowedInventory/useGetBorrowedInventory";
import Loading from "../../errors/Loading";
import useDeleteBorrowedInventory from "../../../queries/borrowedInventory/useDeleteBorrowedInventory";
import useCreateBorrowedRecord from "../../../queries/borrowedRecords/useCreateBorrowedRecord";
import useGetBorrowedInventoryById from "../../../queries/borrowedInventory/useGetBorrowedInventoryById";
import dayjs from "dayjs";
import ViewDetails from "../../../components/ViewDetails";

const InventoryBorrow: React.FC = React.memo(() => {
  const { data, isLoading } = useGetBorrowedInventory();
  const { mutate: deleteItem } = useDeleteBorrowedInventory();
  const { mutate: returnItem } = useCreateBorrowedRecord();
  const columns = useMemo<MRT_ColumnDef<BorrowedInventoryPropType>[]>(
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
        accessorKey: "borrowedDateAndTime",
        header: "Borrowed Date",
        size: 150,
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
        accessorKey: "borroweeContactNumber",
        header: "Contact Number",
        size: 150,
      },
      {
        accessorKey: "officialInCharge",
        header: "Official-In-Charge",
        size: 150,
      },
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [showAction, setShowAction] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<string>>([]);

  const handleReturnItem = () => {
    rows.map((rowId) => {
      deleteItem(rowId);
      returnItem({
        borrowedId: rowId,
        returnedDateAndTime: dayjs().format("MM/DD/YYYY - hh:mm A"),
      });
    });

    setRowSelection({});
  };

  useEffect(() => {
    if (Object.values(rowSelection).length === 0) {
      setShowAction(false);
    } else {
      setShowAction(true);
    }
    const selectedRowsId = Object.keys(rowSelection);
    setRows(selectedRowsId);
  }, [rowSelection]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          data={data ?? []}
          columns={columns}
          isError={false}
          enableRowNumbers={false}
          enableRowActions={false}
          enableRowSelection
          getRowId={(row) => row._id}
          onRowSelectionChange={setRowSelection}
          state={{ rowSelection }}
          positionToolbarAlertBanner="top"
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
          renderDetailPanel={({ row }) => (
            <div className="flex flex-col">
              <p className="font-bold uppercase text-lg py-2 text-center">
                Borrowed Items
              </p>
              <div className="grid grid-cols-2">
                <div className="border-[1px] border-[#50D5B7] p-3 bg-[#067D68]">
                  <Typography align="center" fontWeight={"bold"}>
                    ITEMS
                  </Typography>
                </div>
                <div className="border-[1px] border-[#50D5B7] p-3 bg-[#067D68]">
                  <Typography align="center" fontWeight={"bold"}>
                    QUANTITY
                  </Typography>
                </div>

                {row.original.borrowedItems.map((item, index) => (
                  <>
                    <div className="border-[1px] border-[#50D5B7] px-5 py-3">
                      <Typography align="center">{item?.itemName}</Typography>
                    </div>
                    <div className="border-[1px] border-[#50D5B7] px-5 py-3">
                      <Typography align="center">{item.quantity}</Typography>
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        >
          <>
            {showAction && (
              <div className="flex flex-col space-y-2 px-4 py-8 justify-end md:flex-row md:space-y-0 md:space-x-4">
                <CustomButton
                  label="Cancel"
                  backgroundColor="rgb(239, 68, 68)"
                  onClick={() => setRowSelection({})}
                />
                <CustomButton
                  label="Return Item"
                  onClick={() => handleReturnItem()}
                />
              </div>
            )}
          </>
        </Table>
      )}
    </>
  );
});

export default InventoryBorrow;