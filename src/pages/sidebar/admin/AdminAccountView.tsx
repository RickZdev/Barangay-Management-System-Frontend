import React, { useMemo } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Card from "../../../components/Card";
import TextField from "../../../components/TextField";
import { Link, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { MRT_ColumnDef } from "material-react-table";
import Table from "../../../components/Table";
import CustomButton from "../../../components/CustomButton";
import CardHeader from "../../../components/CardHeader";
import CardPhoto from "../../../components/CardPhoto";
import BackButton from "../../../components/BackButton";
import { LoginAuditPropType } from "../../../utils/types";
import useGetAdminById from "../../../queries/admin/useGetAdminById";
import Loading from "../../errors/Loading";
import useGetLoginAuditById from "../../../queries/loginAudit/useGetLoginAuditById";

const AdminAccountView: React.FC = () => {
  const { _id } = useParams();
  const { data: admin, isLoading: isAdminLoading } = useGetAdminById(_id);
  const { data: loginAudits, isLoading: isLoginAuditLoading } =
    useGetLoginAuditById(_id);

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
    <div className="pb-10">
      {isAdminLoading && isLoginAuditLoading ? (
        <Loading />
      ) : (
        <>
          <BackButton />
          <div className="grid md:grid-cols-2 gap-6 my-5">
            <Card>
              <CardHeader title="Admin Profile" />
              <div className="space-y-3">
                <TextField
                  label={"Admin Username"}
                  value={admin?.adminUsername}
                />
                <TextField label={"Admin Role"} value={admin?.adminRole} />
              </div>
            </Card>

            <Card>
              <div className="space-y-6">
                <div className="flex flex-col justify-center items-center space-y-5">
                  <CardPhoto showTooltip={false} />

                  <div className="flex flex-col items-center">
                    <p className="flex-1 text-white text-lg font-bold">
                      {admin?.adminUser}
                    </p>
                    <p className="text-[hsla(0,0%,100%,.6)] text-sm font-bold">
                      {admin?.adminRole}
                    </p>
                  </div>
                  <Link to={`/resident/view/${_id}`}>
                    <CustomButton label="View Details" Icon={VisibilityIcon} />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* admin log report */}
      <Table
        data={loginAudits ?? []}
        columns={columns}
        isError={false}
        enableRowNumbers={true}
        enableRowActions={false}
        showBackButton={false}
      >
        <div className="flex flex-col pt-4 px-5 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
          <h1 className="text-lg text-[#fff]">Admin Log Report</h1>
        </div>
      </Table>
    </div>
  );
};

export default AdminAccountView;
