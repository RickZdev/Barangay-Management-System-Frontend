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
import ViewMessagePanel from "../../../components/ViewMessagePanel";
import useAuthContext from "../../../queries/auth/useAuthContext";

const Blotter: React.FC = React.memo(() => {
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

  const nonResidentColumns = useMemo<MRT_ColumnDef<BlotterPropType>[]>(
    () => [
      {
        accessorKey: "complainantName",
        header: "Complainant Name",
        size: 150,
        Cell: ({ cell }) => {
          return (
            <div className="font-poppins text-base">
              {cell.row.original.complainantName}
            </div>
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

  const auth = useAuthContext();

  const {
    data: blotters,
    isLoading: isGetBlotterLoading,
    isRefetching,
    refetch,
  } = useGetBlotters();

  const { mutate, isLoading: isDeleteBlotter } = useDeleteBlotter();

  const isLoading = isGetBlotterLoading || isDeleteBlotter;

  const blotterResidents = useMemo(() => {
    return _.filter(
      blotters,
      (blotter) => blotter?.complainantType === "Resident"
    );
  }, [blotters]);

  const blotterNonResidents = useMemo(() => {
    return _.filter(
      blotters,
      (blotter) => blotter?.complainantType === "Non-Resident"
    );
  }, [blotters]);

  const blottersForResident = useMemo(() => {
    return _.filter(
      blotters,
      (blotter) => blotter?.complainantId === auth?.userId
    );
  }, [blotters]);

  const data =
    auth?.userRole !== "Resident" ? blotterResidents : blottersForResident;

  return (
    <>
      <LoaderModal isLoading={isLoading || isRefetching} />

      <div className="space-y-10 pb-10">
        <Table
          data={data ?? []}
          columns={columns}
          isError={false}
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
          renderDetailPanel={({ row }) => (
            <ViewMessagePanel messageRow={row.original.narrativeReport} />
          )}
          enableRowActions={auth?.userRole !== "Resident"}
          showExportButton={auth?.userRole !== 'Resident'}
          enableRowNumbers={true}
          showBackButton={false}
          showViewButton={false}
          showDeleteButton={auth?.userRole !== 'Moderator'}
          refreshButton={refetch}
          deleteButton={mutate}
        >
          <>
            {auth?.userRole !== "Resident" && (
              <div className="flex justify-between pt-4 px-2">
                <h1 className="text-black text-3xl pl-8 uppercase font-extrabold">
                  Resident
                </h1>

                <TableButton
                  path={"/blotter/add/resident"}
                  label="Create Resident Blotter"
                />
              </div>
            )}
          </>
        </Table>

        {auth?.userRole !== "Resident" && (
          <Table
            data={blotterNonResidents ?? []}
            columns={nonResidentColumns}
            isError={false}
            muiTableDetailPanelProps={{
              sx: { color: "white" },
            }}
            renderDetailPanel={({ row }) => (
              <ViewMessagePanel messageRow={row.original.narrativeReport} />
            )}
            showExportButton
            enableRowNumbers={true}
            showBackButton={false}
            showDeleteButton={auth?.userRole !== 'Moderator'}
            showViewButton={false}
            refreshButton={refetch}
            deleteButton={mutate}
          >
            <div className="flex justify-between pt-4 px-2">
              <h1 className="text-black text-3xl pl-8 uppercase font-extrabold">
                Non-Resident
              </h1>

              <TableButton
                path={"/blotter/add/non-resident"}
                label="Create Non-Resident Blotter"
              />
            </div>
          </Table>
        )}
      </div>
    </>
  );
});

export default Blotter;
