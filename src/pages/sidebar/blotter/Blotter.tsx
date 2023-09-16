import Table from "../../../components/Table";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import { BlotterPropType } from "../../../utils/types";
import useGetBlotters from "../../../queries/blotter/useGetBlotters";
import ViewDetails from "../../../components/ViewDetails";
import useDeleteBlotter from "../../../queries/blotter/useDeleteBlotter";
import Loading from "../../errors/Loading";

const Blotter: React.FC = React.memo(() => {
  const { data, isLoading, refetch } = useGetBlotters();
  const { mutate } = useDeleteBlotter();

  const columns = useMemo<MRT_ColumnDef<BlotterPropType>[]>(
    () => [
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 150,
        Cell: ({ cell }) => (
          <ViewDetails
            residentId={cell.row.original.complainantId}
            residentName={cell.row.original.complainantName}
          />
        ),
      },
      {
        accessorKey: "incidentType",
        header: "Incident Type",
        size: 200,
      },
      {
        accessorKey: "incidentLocation",
        header: "Incident Location",
        size: 200,
      },
      {
        accessorKey: "respondentName",
        header: "Respondent Name",
        size: 150,
        Cell: ({ cell }) => (
          <ViewDetails
            residentId={cell.row.original.respondentId}
            residentName={cell.row.original.respondentName}
          />
        ),
      },
      {
        accessorKey: "incidentTimeAndDate",
        header: "Date Incident",
        size: 150,
      },
      {
        accessorKey: "incidentReported",
        header: "Date Reported",
        size: 150,
      },
      {
        accessorKey: "incidentRecorded",
        header: "Date Recorded",
        size: 150,
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
          isError={false}
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
          renderDetailPanel={({ row }) => (
            <div className="flex flex-col px-5 pb-4">
              <h1 className="text-lg">Narrative Report: </h1>
              <p>{row.original.narrativeReport}</p>
            </div>
          )}
          enableRowNumbers={true}
          showBackButton={false}
          refreshButton={refetch}
          deleteButton={mutate}
        >
          <div className="flex justify-end pt-4 px-2">
            <TableButton path={"/blotter/add"} label="Create Blotter" />
          </div>
        </Table>
      )}
    </>
  );
});

export default Blotter;
