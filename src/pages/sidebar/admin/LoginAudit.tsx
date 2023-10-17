import React, { useMemo } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";
import { LoginAuditPropType } from "../../../utils/types";
import useGetLoginAudits from "../../../queries/loginAudit/useGetLoginAudits";
import Loading from "../../errors/Loading";

const LoginAudit: React.FC = React.memo(() => {
  const { data, isLoading, refetch } = useGetLoginAudits();

  const columns = useMemo<MRT_ColumnDef<LoginAuditPropType>[]>(
    () => [
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
        accessorKey: "loginTime",
        header: "Login Time",
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
          enableRowActions={false}
          refreshButton={refetch}
        />
      )}
    </>
  );
});

export default LoginAudit;
