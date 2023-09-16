import React, { useMemo } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";

type CertificatePendingPropType = {
  _id: string;
  residentName: string;
  typeOfCertificate: string;
  dateRequested: string;
  dateOfReleased: string;
  amount: number;
};

const CertificatePending: React.FC = React.memo(() => {
  const data: CertificatePendingPropType[] = [
    {
      _id: "1",
      residentName: "Castaneda, Frederick",
      typeOfCertificate: "Clearance",
      dateRequested: "2022-04-21",
      dateOfReleased: "2022-04-23",
      amount: 30,
    },
    {
      _id: "2",
      residentName: "Cocadiz, Joshua",
      typeOfCertificate: "Clearance",
      dateRequested: "2022-04-20",
      dateOfReleased: "2022-04-24",
      amount: 30,
    },
    {
      _id: "3",
      residentName: "Gabas, Calvin",
      typeOfCertificate: "Business Permit",
      dateRequested: "2022-04-19",
      dateOfReleased: "2022-04-22",
      amount: 30,
    },
  ];

  const columns = useMemo<MRT_ColumnDef<CertificatePendingPropType>[]>(
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
        accessorKey: "amount",
        header: "Amount",
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
    />
  );
});

export default CertificatePending;
