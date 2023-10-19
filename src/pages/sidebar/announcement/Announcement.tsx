import Table from "../../../components/Table";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import TableButton from "../../../components/TableButton";
import { AnnouncementPropType } from "../../../utils/types";
import useGetAnnouncements from "../../../queries/announcement/useGetAnnouncements";
import Loading from "../../errors/Loading";
import useDeleteAnnouncement from "../../../queries/announcement/useDeleteAnnouncement";
import LoaderModal from "../../../components/modals/loader/LoaderModal";

const Announcement: React.FC = React.memo(() => {
  const {
    data,
    isLoading: isAnnouncementsLoading,
    isRefetching,
    refetch,
  } = useGetAnnouncements();
  const { mutate, isLoading: isDeleteLoading } = useDeleteAnnouncement();

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

  const isLoading = isAnnouncementsLoading || isDeleteLoading || isRefetching;

  return (
    <>
      <LoaderModal isLoading={isLoading} />

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
        renderDetailPanel={({ row }) => {
          const messageWithLineBreaks =
            row.original.announcementMessage.replace(/\n/g, "<br>");

          return (
            <div className="flex flex-col px-5 pb-4">
              <h1 className="text-lg">Message: </h1>
              <p
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: messageWithLineBreaks }}
              />

              <div className="w-1/3 h-1/3 bg-[#1e1e2f] rounded-md items-center flex justify-center mt-5">
                <img
                  src={row.original.announcementImage}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          );
        }}
        refreshButton={refetch}
        deleteButton={mutate}
      >
        <div className="flex justify-end pt-4 px-2">
          <TableButton path={"/announcement/add"} label="Add Announcement" />
        </div>
      </Table>
    </>
  );
});

export default Announcement;
