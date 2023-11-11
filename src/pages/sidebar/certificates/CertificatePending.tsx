import React, { useEffect, useMemo, useState } from "react";
import {
  MRT_RowSelectionState,
  type MRT_ColumnDef,
} from "material-react-table";
import Table from "../../../components/Table";
import dayjs from "dayjs";
import {
  CertificateRecordsPropType,
  CertificationsPropType,
} from "../../../utils/types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import useAuthContext from "../../../queries/auth/useAuthContext";
import CustomButton from "../../../components/CustomButton";
import _ from "lodash";
import ViewDetails from "../../../components/ViewDetails";
import { Box, IconButton, Tooltip } from "@mui/material";
import ModalViewCertificate from "../../../components/modals/ModalViewCertificate";
import useGetOfficials from "../../../queries/official/useGetOfficials";
import { getResidentFullNameWithInitial } from "../../../helper/getResidentFullNameWithInitial";
import useGetPendingCertificates from "../../../queries/certificates/useGetPendingCertificates";
import useUpdateCertificate from "../../../queries/certificates/useUpdateCertificate";

const CertificatePending: React.FC = () => {
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
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
    ],
    []
  );

  const auth = useAuthContext();

  const {
    data: certificatesData,
    isError,
    isLoading: isCertificatesLoading,
    isRefetching,
    refetch,
  } = useGetPendingCertificates();

  const { mutateAsync: updateCertificate } = useUpdateCertificate();

  const { data: officials, isLoading: isOfficialsLoading } = useGetOfficials();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [showAction, setShowAction] = useState<boolean>(false);
  const [rows, setRows] = useState<string[]>([]);

  const [certificate, setCertificate] = useState<{
    type: CertificationsPropType;
    data: any;
  }>({ type: "Barangay Clearance", data: {} });

  const [showCertificateModal, setShowCertificateModal] =
    useState<boolean>(false);

  const isLoading =
    isCertificatesLoading || isRefetching || isProcessing || isOfficialsLoading;

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
      certificatesData?.data,
      (certificate) => certificate?.residentId === auth?.userId
    );
  }, [certificatesData?.data]);

  const handleAccept = () => {
    setIsProcessing(true);

    _.filter(certificatesData?.data, (resident, index) => {
      if (rows.includes(index.toString())) {
        updateCertificate({
          certificateId: resident?._id ?? "",
          updatedData: {
            dateOfReleased: dayjs().format("MM/DD/YYYY - hh:mm A"),
            status: "Approved",
          },
        });
      }
    });

    setRowSelection({});
    setIsProcessing(false);
  };

  const handleReject = () => {
    setIsProcessing(true);

    _.filter(certificatesData?.data, (resident, index) => {
      if (rows.includes(index.toString())) {
        updateCertificate({
          certificateId: resident?._id ?? "",
          updatedData: {
            dateOfReleased: dayjs().format("MM/DD/YYYY - hh:mm A"),
            status: "Rejected",
          },
        });
      }
    });

    setRowSelection({});

    setIsProcessing(false);
  };

  useEffect(() => {
    if (Object.values(rowSelection).length === 0) {
      setShowAction(false);
    } else {
      setShowAction(true);
    }

    const selectedRowsId = Object.keys(rowSelection);
    setRows(selectedRowsId);
  }, [rowSelection]);

  const data =
    auth?.userRole !== "Resident"
      ? certificatesData?.data
      : certificatesForResident;

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <div className="pb-10">
        <Table
          data={(data as any) ?? []}
          columns={columns}
          isError={isError}
          enableGlobalFilter={true}
          enableFilters
          enableRowSelection={
            auth?.userRole === "Captain" || auth?.userRole === "Administrator"
          }
          onRowSelectionChange={setRowSelection}
          state={{ rowSelection }}
          positionToolbarAlertBanner="top"
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
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
          showBackButton
          showEditButton={false}
          showDeleteButton={false}
          showExportButton={false}
          refreshButton={refetch}
        >
          <>
            {showAction && (
              <div className="flex flex-col space-y-2 px-4 py-8 justify-end md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1 flex">
                  <CustomButton
                    label="Cancel"
                    backgroundColor="#1565c0"
                    onClick={() => setRowSelection({})}
                  />
                </div>
                <CustomButton
                  label="Reject Request"
                  backgroundColor="rgb(239, 68, 68)"
                  onClick={handleReject}
                />

                <CustomButton label="Accept Request" onClick={handleAccept} />
              </div>
            )}
          </>
        </Table>
      </div>

      <ModalViewCertificate
        officials={officialsData ?? []}
        certificateData={certificate}
        open={showCertificateModal}
        handleClose={() => setShowCertificateModal(false)}
      />
    </>
  );
};

export default CertificatePending;
