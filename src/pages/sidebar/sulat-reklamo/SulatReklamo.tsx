import Table from "../../../components/Table";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import useGetSulatReklamo from "../../../queries/sulatReklamo/useGetSulatReklamo";
import Loading from "../../errors/Loading";
import { SulatReklamoPropType } from "../../../utils/types";
import ViewDetails from "../../../components/ViewDetails";
import useDeleteSulatReklamo from "../../../queries/sulatReklamo/useDeleteSulatReklamo";

const SulatReklamo: React.FC = React.memo(() => {
  const { data, isLoading, isError, refetch } = useGetSulatReklamo();
  const { mutate } = useDeleteSulatReklamo();

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          data={data ?? []}
          columns={columns}
          isError={isError}
          enableRowNumbers={false}
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
          renderDetailPanel={({ row }) => (
            <div className="flex flex-col px-5 pb-4">
              <h1 className="text-lg">Narrative Report: </h1>
              <p>{row.original.narrativeReport}</p>
            </div>
          )}
          showEditButton={true}
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
      )}
    </>
  );
});

export default SulatReklamo;
