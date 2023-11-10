import React from "react";
import { Dialog, IconButton, Tooltip } from "@mui/material";
import Card from "../Card";
import { Close } from "@mui/icons-material";
import { PDFViewer } from "@react-pdf/renderer";
import BusinessPermitCertification from "../certificates/BusinessPermitCertification";
import { CertificationsPropType } from "../../utils/types";
import CertificateOfIndigency from "../certificates/CertificateOfIndigency";
import JobSeekerCertification from "../certificates/JobSeekerCertification";
import ClearanceCertification from "../certificates/ClearanceCertification";
import ResidencyCertification from "../certificates/ResidencyCertification";
import useAuthContext from "../../queries/auth/useAuthContext";

type ModalViewCertificatePropType = {
  officials: { officialName: string; position: string }[];
  certificateData: { type: CertificationsPropType; data: any };
  open: boolean;
  handleClose: () => void;
};

const ModalViewCertificate: React.FC<ModalViewCertificatePropType> = ({
  officials,
  certificateData,
  open,
  handleClose,
}) => {
  const auth = useAuthContext();
  const officialsData = officials;

  return (
    <Dialog
      PaperProps={{ sx: { backgroundColor: "white", borderRadius: 5 } }}
      onClose={handleClose}
      open={open}
      maxWidth={"xl"}
      fullWidth
      sx={{ borderRadius: 20 }}
    >
      <Card>
        <form className="space-y-4 flex flex-col bg-white p-4">
          <Tooltip
            arrow
            title="Close"
            sx={{ alignSelf: "flex-end" }}
            color="error"
            onClick={handleClose}
          >
            <IconButton>
              <Close color="error" />
            </IconButton>
          </Tooltip>

          <PDFViewer
            className="w-full h-screen"
            width={"100%"}
            showToolbar={auth?.userRole !== "Resident"}
          >
            {certificateData.type === "Certificate of Indigency" ? (
              <CertificateOfIndigency
                officials={officialsData ?? []}
                residentName={certificateData.data?.fullName ?? ""}
                purpose={certificateData.data?.purpose}
                requestedFor={certificateData.data?.indigent}
                address={{
                  houseNumber: certificateData.data?.address?.houseNumber ?? 0,
                  streetAddress:
                    certificateData.data?.address?.streetAddress ?? "",
                }}
              />
            ) : certificateData.type === "Barangay Clearance" ? (
              <ClearanceCertification
                officials={officialsData ?? []}
                residentName={certificateData.data?.fullName ?? ""}
                purpose={certificateData.data?.purpose}
                address={{
                  houseNumber: certificateData.data?.address?.houseNumber ?? 0,
                  streetAddress:
                    certificateData.data?.address?.streetAddress ?? "",
                }}
              />
            ) : certificateData.type === "Certificate of Residency" ? (
              <ResidencyCertification
                officials={officialsData ?? []}
                residentName={certificateData.data?.fullName ?? ""}
                purpose={certificateData.data?.purpose}
                address={{
                  houseNumber: certificateData.data?.address?.houseNumber ?? 0,
                  streetAddress:
                    certificateData.data?.address?.streetAddress ?? "",
                }}
              />
            ) : certificateData.type === "First-time Jobseeker Certificate" ? (
              <JobSeekerCertification
                officials={officialsData ?? []}
                residentName={certificateData.data?.fullName ?? ""}
                residency={certificateData.data?.residency}
                address={{
                  houseNumber: certificateData.data?.address?.houseNumber ?? 0,
                  streetAddress:
                    certificateData.data?.address?.streetAddress ?? "",
                }}
              />
            ) : certificateData.type === "Business Permit" ? (
              <BusinessPermitCertification
                officials={officialsData ?? []}
                businessOwner={certificateData.data?.businessOwner ?? ""}
                businessName={certificateData.data?.businessName}
                businessNature={certificateData.data?.businessNature}
                businessAddress={certificateData.data?.businessAddress}
                building={certificateData.data?.building}
                ownership={certificateData.data?.ownership}
              />
            ) : (
              <div />
            )}
          </PDFViewer>
        </form>
      </Card>
    </Dialog>
  );
};

export default ModalViewCertificate;
