import Table from "../../../components/Table";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import { BlotterPropType } from "../../../utils/types";
import useGetBlotters from "../../../queries/blotter/useGetBlotters";
import ViewDetails from "../../../components/ViewDetails";
import useDeleteBlotter from "../../../queries/blotter/useDeleteBlotter";
import Loading from "../../errors/Loading";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import _ from "lodash";

const Blotter: React.FC = React.memo(() => {
  const { data, isLoading: isGetBlotterLoading, refetch } = useGetBlotters();

  const { mutate, isLoading: isDeleteBlotter } = useDeleteBlotter();

  const isLoading = isGetBlotterLoading || isDeleteBlotter;

  const columns = useMemo<MRT_ColumnDef<BlotterPropType>[]>(
    () => [
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 150,
        Cell: ({ cell }) => {
          return (
            <>
              {cell.row.original.complainantId ? (
                <ViewDetails
                  residentId={cell.row.original.complainantId}
                  residentName={cell.row.original.complainantName}
                />
              ) : (
                <div className="font-poppins text-base">
                  {cell.row.original.complainantName}
                </div>
              )}
            </>
          );
        },
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

  const blotterResidents = useMemo(() => {
    return _.filter(data, (blotter) => blotter?.complainantType === "Resident");
  }, [data]);

  const blotterNonResidents = useMemo(() => {
    return _.filter(
      data,
      (blotter) => blotter?.complainantType === "Non-Resident"
    );
  }, [data]);

  return (
    <>
      <LoaderModal isLoading={isLoading} />
      <div className="space-y-10 pb-10">
        <Table
          data={blotterResidents ?? []}
          columns={columns}
          isError={false}
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
          renderDetailPanel={({ row }) => {
            const messageWithLineBreaks = row.original.narrativeReport.replace(
              /\n/g,
              "<br>"
            );

            return (
              <div className="flex flex-col px-5 pb-4">
                <h1 className="text-lg">Narrative Report: </h1>
                <p
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: messageWithLineBreaks }}
                />
              </div>
            );
          }}
          enableRowNumbers={true}
          showBackButton={false}
          showViewButton={false}
          refreshButton={refetch}
          deleteButton={mutate}
        >
          <div className="flex justify-between pt-4 px-2">
            <h1 className="text-white text-3xl pl-8 uppercase font-extrabold">
              Resident
            </h1>

            <TableButton
              path={"/blotter/add/resident"}
              label="Create Resident Blotter"
            />
          </div>
        </Table>

        <Table
          data={blotterNonResidents ?? []}
          columns={columns}
          isError={false}
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
          renderDetailPanel={({ row }) => {
            const messageWithLineBreaks = row.original.narrativeReport.replace(
              /\n/g,
              "<br>"
            );

            return (
              <div className="flex flex-col px-5 pb-4">
                <h1 className="text-lg">Narrative Report: </h1>
                <p
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: messageWithLineBreaks }}
                />
              </div>
            );
          }}
          enableRowNumbers={true}
          showBackButton={false}
          showViewButton={false}
          refreshButton={refetch}
          deleteButton={mutate}
        >
          <div className="flex justify-between pt-4 px-2">
            <h1 className="text-white text-3xl pl-8 uppercase font-extrabold">
              Non-Resident
            </h1>

            <TableButton
              path={"/blotter/add/non-resident"}
              label="Create Non-Resident Blotter"
            />
          </div>
        </Table>
      </div>
    </>
  );
});

export default Blotter;
