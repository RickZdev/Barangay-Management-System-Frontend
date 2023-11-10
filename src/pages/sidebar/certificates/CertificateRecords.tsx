import React, { useMemo, useState } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableButton from "../../../components/TableButton";
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
import { Delete } from "@mui/icons-material";
import ModalWarning from "../../../components/modals/alert/ModalWarning";
import _ from "lodash";
import ModalResidentRequestCertificate from "../../../components/modals/ModalResidentRequestCertificate";
import ModalAdminRequestCertificate from "../../../components/modals/ModalAdminRequestCertificate";
import useGetApprovedCertificates from "../../../queries/certificates/useGetApprovedCertificates";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import useGetPendingCertificates from "../../../queries/certificates/useGetPendingCertificates";
import useGetRejectedCertificates from "../../../queries/certificates/useGetRejectedCertificates";

const CertificateRecords: React.FC = React.memo(() => {
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
        header: "Date of Release",
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
    data: certificateRecords,
    isLoading: isCertificateRecordsLoading,
    isRefetching,
    refetch,
  } = useGetApprovedCertificates();

  const { data: certificatePending, isLoading: isCertificatePendingLoading } =
    useGetPendingCertificates();

  const { data: certificateRejected, isLoading: isCertificateRejectedLoading } =
    useGetRejectedCertificates();

  const { mutate: deleteCertificate } = useDeleteCertificate();
  const { data: officials, isLoading: isOfficialsLoading } = useGetOfficials();

  const [certificate, setCertificate] = useState<{
    type: CertificationsPropType;
    data: any;
  }>({ type: "Barangay Clearance", data: {} });

  const [showCertificateModal, setShowCertificateModal] =
    useState<boolean>(false);
  const [showRequestCertificateModal, setShowRequestCertificateModal] =
    useState<boolean>(false);

  const [rowId, setRowId] = useState<string>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const isLoading =
    isCertificateRecordsLoading ||
    isOfficialsLoading ||
    isRefetching ||
    isCertificatePendingLoading ||
    isCertificateRejectedLoading;

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
      certificateRecords?.data,
      (certificate) => certificate?.residentId === auth?.userId
    );
  }, [certificateRecords?.data]);

  const certificatesRejectedForResident = useMemo(() => {
    return _.filter(
      certificateRejected?.data,
      (certificate) => certificate?.residentId === auth?.userId
    );
  }, [certificateRejected?.data]);

  const certificatesPendingForResident = useMemo(() => {
    return _.filter(
      certificatePending?.data,
      (certificate) => certificate?.residentId === auth?.userId
    );
  }, [certificatePending?.data]);

  const data =
    auth?.userRole !== "Resident"
      ? certificateRecords?.data
      : certificatesForResident;

  const handleDelete = () => {
    if (deleteCertificate && rowId) {
      deleteCertificate(rowId);
    }

    setShowDeleteModal(false);
  };

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
        showBackButton={false}
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
            {auth?.userRole === "Captain" && (
              <Tooltip
                arrow
                title="Delete"
                onClick={() => {
                  setShowDeleteModal(true);
                  setRowId(row.original._id);
                }}
              >
                <IconButton>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            )}
          </Box>,
        ]}
      >
        <div className="flex flex-col pt-4 px-2 space-y-2 md:flex md:flex-row md:justify-end md:space-x-4 md:space-y-0">
          <TableButton
            path={"/certificate/rejected"}
            label="Rejected Certificates"
            Icon={ThumbDownIcon}
            count={
              auth?.userRole === "Resident"
                ? certificatesRejectedForResident.length.toString()
                : certificateRejected?.data?.length.toString()
            }
          />
          <TableButton
            path={"/certificate/pending"}
            label="Pending Certificates"
            Icon={VisibilityIcon}
            count={
              auth?.userRole === "Resident"
                ? certificatesPendingForResident.length.toString()
                : certificatePending?.data?.length.toString()
            }
          />

          {auth?.userRole !== "Moderator" && (
            <TableButton
              label="Request Certificate"
              Icon={AddCircleOutlineIcon}
              onClick={() => setShowRequestCertificateModal(true)}
            />
          )}
        </div>
      </Table>

      <ModalViewCertificate
        officials={officialsData ?? []}
        certificateData={certificate}
        open={showCertificateModal}
        handleClose={() => setShowCertificateModal(false)}
      />

      {auth?.userRole === "Resident" ? (
        <ModalResidentRequestCertificate
          open={showRequestCertificateModal}
          handleClose={() => setShowRequestCertificateModal(false)}
        />
      ) : (
        <ModalAdminRequestCertificate
          open={showRequestCertificateModal}
          handleClose={() => setShowRequestCertificateModal(false)}
        />
      )}

      <ModalWarning
        open={showDeleteModal}
        title="ARE YOU SURE YOU WANT TO DELETE DATA"
        description="This action is irreversible upon confirmation. Confirm to continue."
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        handlePrimaryButton={handleDelete}
        handleSecondaryButton={() => setShowDeleteModal(false)}
      />
    </>
  );
});

export default CertificateRecords;
