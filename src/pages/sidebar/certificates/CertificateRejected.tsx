import React, { useMemo, useState } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useGetOfficials from "../../../queries/official/useGetOfficials";
import { getResidentFullNameWithInitial } from "../../../helper/getResidentFullNameWithInitial";
import useAuthContext from "../../../queries/auth/useAuthContext";
import ModalViewCertificate from "../../../components/modals/ModalViewCertificate";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  CertificateRecordsPropType,
  CertificationsPropType,
} from "../../../utils/types";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import ViewDetails from "../../../components/ViewDetails";
import useDeleteCertificate from "../../../queries/certificates/useDeleteCertificate";
import _ from "lodash";
import useGetRejectedCertificates from "../../../queries/certificates/useGetRejectedCertificates";

const CertificateRejected: React.FC = React.memo(() => {
  const columns = useMemo<MRT_ColumnDef<CertificateRecordsPropType>[]>(
    () => [
      {
        accessorKey: "residentName",
        header: "Resident Name",
        size: 150,
        Cell: ({ cell }) => (
          <ViewDetails
            residentId={cell.row.original.residentId}
            residentName={cell.row.original.residentName}
          />
        ),
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
        header: "Date Rejected",
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
    data: certificateRejected,
    isLoading: isCertificateRecordsLoading,
    isRefetching,
    refetch,
  } = useGetRejectedCertificates();

  const { mutate: deleteCertificate } = useDeleteCertificate();
  const { data: officials, isLoading: isOfficialsLoading } = useGetOfficials();

  const [certificate, setCertificate] = useState<{
    type: CertificationsPropType;
    data: any;
  }>({ type: "Barangay Clearance", data: {} });

  const [showCertificateModal, setShowCertificateModal] =
    useState<boolean>(false);

  const isLoading =
    isCertificateRecordsLoading || isOfficialsLoading || isRefetching;

  const officialsData = useMemo(() => {
    const mappedOfficials = officials?.map((official) => {
      return {
        officialName: getResidentFullNameWithInitial({
          firstName: official?.firstName,
          middleName: official?.middleName,
          lastName: official?.lastName,
          suffix: official?.suffix,
        }),
        position: official?.position,
      };
    });

    return mappedOfficials?.reverse();
  }, [officials]);

  const certificatesForResident = useMemo(() => {
    return _.filter(
      certificateRejected?.data,
      (certificate) => certificate?.residentId === auth?.userId
    );
  }, [certificateRejected?.data]);

  const data =
    auth?.userRole !== "Resident"
      ? certificateRejected?.data
      : certificatesForResident;

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <Table
        data={(data as any) ?? []}
        columns={columns}
        isError={false}
        enableRowNumbers={true}
        showEditButton={false}
        showDeleteButton={true}
        showBackButton={true}
        refreshButton={refetch}
        deleteButton={deleteCertificate}
        enableRowActions
        renderRowActions={({ row }) => [
          <Box
            sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}
            key={row.id}
          >
            <Tooltip
              arrow
              title="View Certificate"
              onClick={() => {
                setCertificate({
                  type: row.original.typeOfCertificate,
                  data: row.original.certificateData,
                });
                setShowCertificateModal(true);
              }}
            >
              <IconButton>
                <VisibilityIcon
                  className="text-yellow-500"
                  sx={{ color: "rgb(234, 179, 8)" }}
                />
              </IconButton>
            </Tooltip>
          </Box>,
        ]}
      />

      <ModalViewCertificate
        officials={officialsData ?? []}
        certificateData={certificate}
        open={showCertificateModal}
        handleClose={() => setShowCertificateModal(false)}
      />
    </>
  );
});

export default CertificateRejected;
