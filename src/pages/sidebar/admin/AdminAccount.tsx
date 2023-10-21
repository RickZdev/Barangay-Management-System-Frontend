import React, { useMemo } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableButton from "../../../components/TableButton";
import ModalAddAdminAccount from "../../../components/modals/ModalAddAdminAccount";
import useGetAdmins from "../../../queries/admin/useGetAdmins";
import { AdminAccountPropType } from "../../../utils/types";
import useDeleteAdmin from "../../../queries/admin/useDeleteAdmin";
import useAuthContext from "../../../queries/auth/useAuthContext";
import LoaderModal from "../../../components/modals/loader/LoaderModal";

const AdminAccount: React.FC = React.memo(() => {
  const auth = useAuthContext();

  const {
    data,
    isLoading: isAdminLoading,
    refetch,
    isRefetching,
  } = useGetAdmins();
  const { mutate } = useDeleteAdmin();

  const [showAdminModal, setShowAdminModal] = React.useState(false);

  const columns = useMemo<MRT_ColumnDef<AdminAccountPropType>[]>(
    () => [
      {
        accessorKey: "adminUsername",
        header: "Username",
        size: 150,
      },
      {
        accessorKey: "adminUser",
        header: "Admin User",
        size: 150,
      },
      {
        accessorKey: "adminRole",
        header: "Admin Role",
        size: 150,
      },
      {
        header: "Last Logged In",
        size: 150,
        Cell(props) {
          const lastLoggedIn = props?.row?.original?.loggedIns.slice(-1);

          return <div>{lastLoggedIn}</div>;
        },
      },
    ],
    []
  );

  const isLoading = isAdminLoading || isRefetching;

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <Table
        data={data ?? []}
        columns={columns}
        isError={false}
        enableRowNumbers={true}
        showEditButton={false}
        showBackButton={false}
        showDeleteButton={auth?.userRole === "Captain"}
        refreshButton={refetch}
        deleteButton={mutate}
      >
        <div className="flex flex-col pt-4 px-2 space-y-2 md:flex md:flex-row md:justify-end md:space-x-4 md:space-y-0">
          <TableButton
            path={"/admin-account/login-audit"}
            label="View Login Audit"
            Icon={VisibilityIcon}
          />

          {auth?.userRole === "Captain" && (
            <TableButton
              label="Add/Edit Admin Account"
              Icon={AddCircleOutlineIcon}
              onClick={() => setShowAdminModal(true)}
            />
          )}
        </div>

        <ModalAddAdminAccount
          open={showAdminModal}
          handleClose={() => setShowAdminModal(false)}
        />
      </Table>
    </>
  );
});

export default AdminAccount;
