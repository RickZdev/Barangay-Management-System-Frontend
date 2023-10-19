import Table from "../../../components/Table";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import useGetSulatReklamo from "../../../queries/sulatReklamo/useGetSulatReklamo";
import Loading from "../../errors/Loading";
import { SulatReklamoPropType } from "../../../utils/types";
import ViewDetails from "../../../components/ViewDetails";
import useDeleteSulatReklamo from "../../../queries/sulatReklamo/useDeleteSulatReklamo";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import ViewMessagePanel from "../../../components/ViewMessagePanel";

const SulatReklamo: React.FC = React.memo(() => {
  const {
    data,
    isLoading: isGetSulatReklamoLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetSulatReklamo();
  const { mutate, isLoading: isDeleteLoading } = useDeleteSulatReklamo();

  const columns = useMemo<MRT_ColumnDef<SulatReklamoPropType>[]>(
    () => [
      {
        accessorKey: "residentName",
        header: "Resident Name",
        size: 200,
        Cell: ({ cell }) => (
          <ViewDetails
            residentId={cell.row.original.residentId}
            residentName={cell.row.original.residentName}
          />
        ),
      },
      {
        accessorKey: "dateAndTimeRecorded",
        header: "Date Recorded",
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
    ],
    []
  );

  const isLoading = isGetSulatReklamoLoading || isDeleteLoading || isRefetching;

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <Table
        data={data ?? []}
        columns={columns}
        isError={isError}
        enableRowNumbers={false}
        muiTableDetailPanelProps={{
          sx: { color: "white" },
        }}
        renderDetailPanel={({ row }) => (
          <ViewMessagePanel messageRow={row.original.narrativeReport} />
        )}
        showViewButton={false}
        showBackButton={false}
        refreshButton={refetch}
        deleteButton={mutate}
      >
        <div className="flex justify-end pt-4 px-2">
          <TableButton
            path={"/sulat-reklamo/add"}
            label="Create Sulat-Reklamo"
          />
        </div>
      </Table>
    </>
  );
});

export default SulatReklamo;
