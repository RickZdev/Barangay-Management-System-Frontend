import Table from "../../../components/Table";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import type { ComplaintsPropType } from "../../../utils/types";
import useGetComplaints from "../../../queries/complaints/useGetComplaints";
import useDeleteComplaint from "../../../queries/complaints/useDeleteComplaint";
import ViewDetails from "../../../components/ViewDetails";
import ViewMessagePanel from "../../../components/ViewMessagePanel";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import _ from "lodash";
import useAuthContext from "../../../queries/auth/useAuthContext";

const Complaints: React.FC = React.memo(() => {
  const columns = useMemo<MRT_ColumnDef<ComplaintsPropType>[]>(
    () => [
      {
        accessorKey: "complainantsName",
        header: "Complainant Name",
        size: 200,
        Cell: ({ cell }) => (
          <ViewDetails
            residentId={cell.row.original.complainantsId}
            residentName={cell.row.original.complainantsName}
          />
        ),
      },
      {
        accessorKey: "complainantsAddress",
        header: "Complainant Address",
        size: 200,
      },
      {
        accessorKey: "complaintType",
        header: "Complaint Type",
        size: 150,
      },
      {
        accessorKey: "respondentsName",
        header: "Respondent Name",
        size: 150,
        Cell: ({ cell }) => (
          <ViewDetails
            residentId={cell.row.original.respondentsId}
            residentName={cell.row.original.respondentsName}
          />
        ),
      },
      {
        accessorKey: "incidentDateAndTime",
        header: "Incident Date And Time",
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
    data: complaints,
    isLoading: isComplaintsLoading,
    refetch,
    isRefetching,
  } = useGetComplaints();

  const { mutate, isLoading: isDeleteBlotter } = useDeleteComplaint();

  const complaintsForResident = useMemo(() => {
    return _.filter(
      complaints,
      (complaint) => complaint.complainantsId === auth?.userId
    );
  }, [complaints]);

  const data =
    auth?.userRole !== "Resident" ? complaints : complaintsForResident;

  const isLoading = isComplaintsLoading || isRefetching || isDeleteBlotter;

  return (
    <>
      <LoaderModal isLoading={isLoading} />
      <Table
        data={data ?? []}
        columns={columns}
        isError={false}
        muiTableDetailPanelProps={{
          sx: { color: "white" },
        }}
        renderDetailPanel={({ row }) => (
          <ViewMessagePanel
            messageRow={row.original.complainantsStatement}
            title={`Complainant's Statement`}
          />
        )}
        enableRowActions={auth?.userRole !== "Resident"}
        enableRowNumbers={true}
        showBackButton={false}
        showViewButton={false}
        refreshButton={refetch}
        deleteButton={mutate}
      >
        <>
          {auth?.userRole !== "Resident" && (
            <div className="flex justify-end pt-4 px-2">
              <TableButton path={"/complaints/add"} label="Create Complaint" />
            </div>
          )}
        </>
      </Table>
    </>
  );
});

export default Complaints;
