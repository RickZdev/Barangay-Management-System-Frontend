import { useState } from "react";
import BackButton from "../../../components/BackButton";
import Card from "../../../components/Card";
import CustomButton from "../../../components/CustomButton";
import SearchableTextField from "../../../components/SearchableTextField";
import { OfficialPropType, ResidentPropType } from "../../../utils/types";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import useGetOfficialByPosition from "../../../queries/official/useGetOfficialByPosition";
import Loading from "../../errors/Loading";
import useUpdateOfficial from "../../../queries/official/useUpdateOfficial";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, RemoveModerator } from "@mui/icons-material";
import useDeleteOfficial from "../../../queries/official/useDeleteOfficial";
import useGetResidents from "../../../queries/resident/useGetResidents";
import useDeleteAdmin from "../../../queries/admin/useDeleteAdmin";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import IMAGES from "../../../constants/IMAGES";
import useAuthContext from "../../../queries/auth/useAuthContext";
import ModalFailed from "../../../components/modals/alert/ModalFailed";
import { useQueryClient } from "@tanstack/react-query";
import ModalWarning from "../../../components/modals/alert/ModalWarning";

const BarangayOfficialEdit: React.FC = () => {
  const { mutate: updateOfficial } = useUpdateOfficial();

  const { data: captainData, isLoading: captainIsLoading } =
    useGetOfficialByPosition("captain");
  const { data: treasurerData, isLoading: treasurerIsLoading } =
    useGetOfficialByPosition("treasurer");
  const { data: adminData, isLoading: adminIsLoading } =
    useGetOfficialByPosition("admin");
  const { data: secretaryData, isLoading: secretaryIsLoading } =
    useGetOfficialByPosition("secretary");
  const { data: skChairmanData, isLoading: skChairmanIsLoading } =
    useGetOfficialByPosition("skChairman");

  const { data: kagawad1Data, isLoading: kagawad1IsLoading } =
    useGetOfficialByPosition("kagawad1");
  const { data: kagawad2Data, isLoading: kagawad2IsLoading } =
    useGetOfficialByPosition("kagawad2");
  const { data: kagawad3Data, isLoading: kagawad3IsLoading } =
    useGetOfficialByPosition("kagawad3");
  const { data: kagawad4Data, isLoading: kagawad4IsLoading } =
    useGetOfficialByPosition("kagawad4");
  const { data: kagawad5Data, isLoading: kagawad5IsLoading } =
    useGetOfficialByPosition("kagawad5");
  const { data: kagawad6Data, isLoading: kagawad6IsLoading } =
    useGetOfficialByPosition("kagawad6");
  const { data: kagawad7Data, isLoading: kagawad7IsLoading } =
    useGetOfficialByPosition("kagawad7");

  // const [residentDetails, setResidentDetails] = useState<OfficialPropType>();
  const [captainDetails, setCaptainDetails] = useState<OfficialPropType>();
  const [treasurerDetails, setTreasurerDetails] = useState<OfficialPropType>();
  const [adminDetails, setAdminDetails] = useState<OfficialPropType>();
  const [secretaryDetails, setSecretaryDetails] = useState<OfficialPropType>();
  const [skChairmanDetails, setSkChairmanDetails] =
    useState<OfficialPropType>();
  const [kagawad1Details, setKagawad1Details] = useState<OfficialPropType>();

  const [kagawad2Details, setKagawad2Details] = useState<OfficialPropType>();

  const [kagawad3Details, setKagawad3Details] = useState<OfficialPropType>();

  const [kagawad4Details, setKagawad4Details] = useState<OfficialPropType>();

  const [kagawad5Details, setKagawad5Details] = useState<OfficialPropType>();

  const [kagawad6Details, setKagawad6Details] = useState<OfficialPropType>();

  const [kagawad7Details, setKagawad7Details] = useState<OfficialPropType>();

  const [showTransfershipWarningModal, setShowTransfershipWarningModal] =
    useState<boolean>(false);

  const officials = [
    captainDetails,
    treasurerDetails,
    adminDetails,
    secretaryDetails,
    skChairmanDetails,
    kagawad1Details,
    kagawad2Details,
    kagawad3Details,
    kagawad4Details,
    kagawad5Details,
    kagawad6Details,
    kagawad7Details,
  ];

  const isLoading =
    captainIsLoading ||
    treasurerIsLoading ||
    adminIsLoading ||
    secretaryIsLoading ||
    skChairmanIsLoading ||
    kagawad1IsLoading ||
    kagawad2IsLoading ||
    kagawad3IsLoading ||
    kagawad4IsLoading ||
    kagawad5IsLoading ||
    kagawad6IsLoading ||
    kagawad7IsLoading;

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <BackButton />
      <div className="grid md:grid-cols-2 gap-6 mt-5 pb-5">
        <div className="flex flex-col space-y-6">
          {/* captain */}

          {captainDetails?.officialDetails?._id && (
            <Card>
              <SearchableTextField
                label={"Captain"}
                isEdit
                handleChange={(resident) => {
                  setCaptainDetails({
                    position: "captain",
                    officialDetails: resident,
                  });
                }}
              />
            </Card>
          )}

          {(captainData?.officialDetails?._id ||
            captainDetails?.officialDetails?._id) && (
            <Card className="flex flex-col relative">
              {!captainDetails?.officialDetails?._id && (
                <div className="self-end bg-[#1e1e2f] rounded-full absolute">
                  <Tooltip
                    arrow
                    title="Transfer Leadership"
                    onClick={() => setShowTransfershipWarningModal(true)}
                  >
                    <IconButton>
                      <RemoveModerator color="primary" />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              <CaptainCard
                position={"Barangay Captain"}
                officialDetails={
                  captainDetails?.position
                    ? captainDetails?.officialDetails
                    : captainData?.officialDetails
                }
              />
            </Card>
          )}
          <CardField
            position={"Treasurer"}
            officialDetails={
              treasurerDetails?.position
                ? treasurerDetails?.officialDetails
                : treasurerData?.officialDetails
            }
            handleChange={(resident) => {
              updateOfficial({
                position: "treasurer",
                updatedData: {
                  residentId: resident?._id,
                },
              });

              setTreasurerDetails({
                position: "treasurer",
                officialDetails: resident,
              });
            }}
          />

          <CardField
            position={"Admin"}
            officialDetails={
              adminDetails?.position
                ? adminDetails?.officialDetails
                : adminData?.officialDetails
            }
            handleChange={(resident) => {
              updateOfficial({
                position: "admin",
                updatedData: {
                  residentId: resident?._id,
                },
              });

              setAdminDetails({
                position: "admin",
                officialDetails: resident,
              });
            }}
          />

          <CardField
            position={"Secretary"}
            officialDetails={
              secretaryDetails?.position
                ? secretaryDetails?.officialDetails
                : secretaryData?.officialDetails
            }
            handleChange={(resident) => {
              updateOfficial({
                position: "secretary",
                updatedData: {
                  residentId: resident?._id,
                },
              });

              setSecretaryDetails({
                position: "secretary",
                officialDetails: resident,
              });
            }}
          />

          <CardField
            position={"SK Chairman"}
            officialDetails={
              skChairmanDetails?.position
                ? skChairmanDetails?.officialDetails
                : skChairmanData?.officialDetails
            }
            handleChange={(resident) => {
              updateOfficial({
                position: "skChairman",
                updatedData: {
                  residentId: resident?._id,
                },
              });

              setSkChairmanDetails({
                position: "skChairman",
                officialDetails: resident,
              });
            }}
          />
        </div>

        <div className="flex flex-col space-y-6">
          <CardField
            position={"kagawad1"}
            officialDetails={
              kagawad1Details?.position
                ? kagawad1Details?.officialDetails
                : kagawad1Data?.officialDetails
            }
            handleChange={(resident) =>
              setKagawad1Details({
                position: "kagawad1",
                officialDetails: resident,
              })
            }
          />

          <CardField
            position={"kagawad2"}
            officialDetails={
              kagawad2Details?.position
                ? kagawad2Details?.officialDetails
                : kagawad2Data?.officialDetails
            }
            handleChange={(resident) => {
              setKagawad2Details({
                position: "kagawad2",
                officialDetails: resident,
              });
            }}
          />

          <CardField
            position={"kagawad3"}
            officialDetails={
              kagawad3Details?.position
                ? kagawad3Details?.officialDetails
                : kagawad3Data?.officialDetails
            }
            handleChange={(resident) =>
              setKagawad3Details({
                position: "kagawad3",
                officialDetails: resident,
              })
            }
          />

          <CardField
            position={"kagawad4"}
            officialDetails={
              kagawad4Details?.position
                ? kagawad4Details?.officialDetails
                : kagawad4Data?.officialDetails
            }
            handleChange={(resident) =>
              setKagawad4Details({
                position: "kagawad4",
                officialDetails: resident,
              })
            }
          />

          <CardField
            position={"kagawad5"}
            officialDetails={
              kagawad5Details?.position
                ? kagawad5Details?.officialDetails
                : kagawad5Data?.officialDetails
            }
            handleChange={(resident) =>
              setKagawad5Details({
                position: "kagawad5",
                officialDetails: resident,
              })
            }
          />

          <CardField
            position={"kagawad6"}
            officialDetails={
              kagawad6Details?.position
                ? kagawad6Details?.officialDetails
                : kagawad6Data?.officialDetails
            }
            handleChange={(resident) =>
              setKagawad6Details({
                position: "kagawad6",
                officialDetails: resident,
              })
            }
          />

          <CardField
            position={"kagawad7"}
            officialDetails={
              kagawad7Details?.position
                ? kagawad7Details?.officialDetails
                : kagawad7Data?.officialDetails
            }
            handleChange={(resident) =>
              setKagawad7Details({
                position: "kagawad7",
                officialDetails: resident,
              })
            }
          />
        </div>
      </div>

      <ModalWarning
        open={showTransfershipWarningModal}
        title="CONFIRM LEADERSHIP TRANSFER REQUEST?"
        description="This action is irreversible upon confirmation of transferee. Confirm to the continue the request."
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        handlePrimaryButton={() => console.log("request")}
        handleSecondaryButton={() => setShowTransfershipWarningModal(false)}
      />
    </>
  );
};

type CardFieldPropType = OfficialPropType & {
  isRealData?: boolean;
  handleChange: (resident: ResidentPropType | undefined) => void;
};

const CardField: React.FC<CardFieldPropType> = ({
  position,
  officialDetails,
  handleChange,
}) => {
  const [showAlreadyOfficialErrorModal, setShowAlreadyOfficialErrorModal] =
    useState<boolean>(false);

  const [showDeleteWarningModal, setShowDeleteWarningModal] =
    useState<boolean>(false);

  const { mutate: updateOfficial, mutateAsync: updateAsyncOffical } =
    useUpdateOfficial();
  const { mutate: deleteAdminButton } = useDeleteAdmin();

  const handleUpdate = async (resident?: ResidentPropType) => {
    const response = await updateAsyncOffical({
      position: position,
      updatedData: {
        residentId: resident?._id,
      },
    });

    if (response?.error?.message === "Official already assigned!") {
      setShowAlreadyOfficialErrorModal(true);
    } else {
      handleChange(resident);
    }
  };

  const handleDelete = () => {
    updateOfficial({
      position:
        position === "SK Chairman" ? "skChairman" : position?.toLowerCase(),
      updatedData: {
        residentId: "",
      },
    });

    deleteAdminButton(officialDetails?._id ?? "");
    setShowDeleteWarningModal(false);

    window.location.reload();
  };

  return (
    <>
      {!officialDetails && (
        <Card>
          <SearchableTextField
            label={position?.includes("kagawad") ? "Kagawad" : position ?? ""}
            isEdit
            handleChange={handleUpdate}
          />
        </Card>
      )}

      {officialDetails?._id && (
        <Card className="flex flex-col relative">
          <div className="self-end bg-[#1e1e2f] rounded-full absolute">
            <Tooltip
              arrow
              title="Delete"
              onClick={() => setShowDeleteWarningModal(true)}
            >
              <IconButton>
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </div>

          <OfficialCard position={position} officialDetails={officialDetails} />
        </Card>
      )}

      <ModalWarning
        open={showDeleteWarningModal}
        title="Are you sure you want to remove this official?"
        description="This action is irreversible and will also remove associated admin account, if any. Confirm to continue."
        primaryButtonLabel="Confirm"
        secondaryButtonLabel="Cancel"
        handlePrimaryButton={handleDelete}
        handleSecondaryButton={() => setShowDeleteWarningModal(false)}
      />

      <ModalFailed
        open={showAlreadyOfficialErrorModal}
        title="Update Official Failed"
        description="Official already assigned."
        buttonLabel="Try Again"
        handleButtonPress={() => setShowAlreadyOfficialErrorModal(false)}
      />
    </>
  );
};

const OfficialCard: React.FC<OfficialPropType> = ({
  position,
  officialDetails,
}) => {
  return (
    <div className="flex flex-row space-x-4 items-center gap-10 ">
      <div
        style={{
          width: "20%",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 0,
            paddingBottom: "100%",
            borderRadius: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
          }}
        >
          <img
            src={officialDetails?.profilePhoto ?? IMAGES.DefaultUserAvatar}
            className="rounded-full object-cover w-full"
          />
        </div>
      </div>
      <div className="flex-1 text-left ">
        <h1 className="text-[#50D5B7] text-sm uppercase">
          {position?.includes("kagawad") ? "Kagawad" : position}
        </h1>
        <h1 className="text-white text-xl">
          {getResidentFullName({
            lastName: officialDetails?.lastName,
            firstName: officialDetails?.firstName,
            middleName: officialDetails?.middleName,
            suffix: officialDetails?.suffix,
          })}
        </h1>
        <p className="text-white text-sm">
          {officialDetails?.houseNumber +
            " " +
            officialDetails?.streetAddress +
            " Purok " +
            officialDetails?.purokNumber}
        </p>{" "}
        <p className="text-white text-xs">{officialDetails?.contactNumber}</p>
      </div>
    </div>
  );
};

const CaptainCard: React.FC<OfficialPropType> = ({
  position,
  officialDetails,
}) => {
  return (
    <div className="flex flex-row space-x-4 items-center">
      <div
        style={{
          width: "30%",
          height: 0,
          paddingBottom: "40%",
          position: "relative",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 0,
            paddingBottom: "100%",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={officialDetails?.profilePhoto ?? IMAGES.DefaultUserAvatar}
            className="rounded-full object-cover w-full"
          />
        </div>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-[#50D5B7] text-2xl uppercase">{position}</h1>
        <h1 className="text-white text-xl">
          {getResidentFullName({
            lastName: officialDetails?.lastName,
            firstName: officialDetails?.firstName,
            middleName: officialDetails?.middleName,
            suffix: officialDetails?.suffix,
          })}{" "}
        </h1>
        <p className="text-white text-sm">
          {officialDetails?.houseNumber +
            " " +
            officialDetails?.streetAddress +
            " Purok " +
            officialDetails?.purokNumber}
        </p>
        <p className="text-white text-sm">{officialDetails?.contactNumber}</p>
      </div>
    </div>
  );
};

export default BarangayOfficialEdit;
