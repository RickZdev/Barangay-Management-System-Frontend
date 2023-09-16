import Table from "../../../components/Table";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import type { ComplaintsPropType } from "../../../utils/types";
import useGetComplaints from "../../../queries/complaints/useGetComplaints";
import Loading from "../../errors/Loading";
import useDeleteComplaint from "../../../queries/complaints/useDeleteComplaint";
import ViewDetails from "../../../components/ViewDetails";

const Complaints: React.FC = React.memo(() => {
  const { data, isLoading, refetch } = useGetComplaints();
  const { mutate } = useDeleteComplaint();

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          data={data ?? []}
          columns={columns}
          isError={false}
          enableRowNumbers={true}
          showEditButton={false}
          showBackButton={false}
          refreshButton={refetch}
          deleteButton={mutate}
        >
          <div className="flex justify-end pt-4 px-2">
            <TableButton path={"/complaints/add"} label="Create Complaint" />
          </div>
        </Table>
      )}
    </>
  );
});

export default Complaints;
