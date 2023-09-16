import React, { useMemo } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableButton from "../../../components/TableButton";

type CertificateRecordsPropType = {
  _id: string;
  residentName: string;
  typeOfCertificate: string;
  dateRequested: string;
  dateOfReleased: string;
  certificationId: string;
};

const CertificateRecords: React.FC = React.memo(() => {
  const data: CertificateRecordsPropType[] = [
    {
      _id: "1",
      residentName: "Castaneda, Frederick",
      typeOfCertificate: "Clearance",
      dateRequested: "2022-04-21",
      dateOfReleased: "2022-04-23",
      certificationId: "#32435435",
    },
    {
      _id: "2",
      residentName: "Cocadiz, Joshua",
      typeOfCertificate: "Clearance",
      dateRequested: "2022-04-20",
      dateOfReleased: "2022-04-24",
      certificationId: "#56573457",
    },
    {
      _id: "3",
      residentName: "Gabas, Calvin",
      typeOfCertificate: "Business Permit",
      dateRequested: "2022-04-19",
      dateOfReleased: "2022-04-22",
      certificationId: "#73233455",
    },
  ];

  const columns = useMemo<MRT_ColumnDef<CertificateRecordsPropType>[]>(
    () => [
      {
        accessorKey: "residentName",
        header: "Resident Name",
        size: 150,
      },
      {
        accessorKey: "typeOfCertificate",
        header: "Type of Certificate",
        size: 150,
      },
      {
        accessorKey: "dateRequested",
        header: "Date Requested",
        size: 150,
      },
      {
        accessorKey: "dateOfReleased",
        header: "Date of Release",
        size: 150,
      },
      {
        accessorKey: "certificationId",
        header: "Certification ID",
        size: 150,
      },
    ],
    []
  );

  return (
    <Table
      data={data}
      columns={columns}
      isError={false}
      enableRowNumbers={true}
      showEditButton={false}
      showDeleteButton={false}
      showBackButton={false}
    >
      <div className="flex flex-col pt-4 px-2 space-y-2 md:flex md:flex-row md:justify-end md:space-x-4 md:space-y-0">
        <TableButton
          path={"/certificate/pending"}
          label="Pending Certificates"
          Icon={VisibilityIcon}
        />

        <TableButton
          path={"/certificate/request"}
          label="Request Certificate"
          Icon={AddCircleOutlineIcon}
        />
      </div>
    </Table>
  );
});

export default CertificateRecords;
