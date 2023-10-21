import React, { useMemo, useState } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import ModalAddTransaction from "../../../components/modals/ModalAddTransaction";
import { TransactionPropType } from "../../../utils/types";
import useGetTransactions from "../../../queries/transaction/useGetTransactions";
import Loading from "../../errors/Loading";
import useDeleteTransaction from "../../../queries/transaction/useDeleteTransaction";
import ViewDetails from "../../../components/ViewDetails";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import useAuthContext from "../../../queries/auth/useAuthContext";

const Transaction: React.FC = React.memo(() => {
  const auth = useAuthContext();

  const {
    data,
    isLoading: isTransactionsLoading,
    isRefetching,
    refetch,
  } = useGetTransactions();
  const { mutate } = useDeleteTransaction();

  const columns = useMemo<MRT_ColumnDef<TransactionPropType>[]>(
    () => [
      {
        accessorKey: "residentName",
        header: "Resident Name",
        size: 150,
        Cell: ({ cell }) => (
          <ViewDetails
            residentId={cell.row.original.residentId}
            residentName={cell.row.original.residentName}
          />
        ),
      },
      {
        accessorKey: "transactionType",
        header: "Transaction Type",
        size: 150,
      },
      {
        accessorKey: "amount",
        header: "Paid Amount",
        size: 150,
      },
      {
        accessorKey: "transactionDateAndTime",
        header: "Transaction Date And Time",
        size: 150,
      },
      {
        accessorKey: "transactionReceiptNumber",
        header: "Receipt Number",
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

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const isLoading = isTransactionsLoading || isRefetching;

  return (
    <div className="pb-10">
      <LoaderModal isLoading={isLoading} />

      <Table
        data={data ?? []}
        columns={columns}
        isError={false}
        enableRowNumbers={true}
        showEditButton={false}
        showViewButton={false}
        showBackButton={false}
        enableRowActions={auth?.userRole === "Captain"}
        showDeleteButton={auth?.userRole === "Captain"}
        refreshButton={refetch}
        deleteButton={mutate}
      >
        <div className="flex justify-end pt-4 px-2">
          <TableButton label="Add Transaction" onClick={handleClickOpen} />
          <ModalAddTransaction open={open} handleClose={handleClose} />
        </div>
      </Table>
    </div>
  );
});

export default Transaction;
