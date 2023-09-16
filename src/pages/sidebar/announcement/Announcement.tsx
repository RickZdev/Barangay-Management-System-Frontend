import Table from "../../../components/Table";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import { AnnouncementPropType } from "../../../utils/types";
import useGetAnnouncements from "../../../queries/announcement/useGetAnnouncements";
import Loading from "../../errors/Loading";
import useDeleteAnnouncement from "../../../queries/announcement/useDeleteAnnouncement";

const Announcement: React.FC = React.memo(() => {
  const { data, isLoading, refetch } = useGetAnnouncements();
  const { mutate } = useDeleteAnnouncement();
  const columns = useMemo<MRT_ColumnDef<AnnouncementPropType>[]>(
    () => [
      {
        accessorKey: "announcementTitle",
        header: "Announcement Title",
        size: 200,
      },
      {
        accessorKey: "datePosted",
        header: "Date Posted",
        size: 150,
      },
      {
        accessorKey: "announcedBy",
        header: "Announced By",
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
          enableRowNumbers={false}
          showBackButton={false}
          showViewButton={false}
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
          initialState={{
            sorting: [
              {
                id: "datePosted",
                desc: true,
              },
            ],
          }}
          renderDetailPanel={({ row }) => (
            <div className="flex flex-col px-5 pb-4">
              <h1 className="text-lg">Message: </h1>
              <p>{row.original.announcementMessage}</p>

              <div className="w-1/3 h-[300px] bg-[#1e1e2f] rounded-md items-center flex justify-center mt-5">
                <img
                  src={"../../src/assets/images/upload-image-icon.webp"}
                  width={"20%"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}
          refreshButton={refetch}
          deleteButton={mutate}
        >
          <div className="flex justify-end pt-4 px-2">
            <TableButton path={"/announcement/add"} label="Add Announcement" />
          </div>
        </Table>
      )}
    </>
  );
});

export default Announcement;
