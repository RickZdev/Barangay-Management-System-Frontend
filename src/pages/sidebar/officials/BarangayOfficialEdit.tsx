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
import { Delete } from "@mui/icons-material";
import useDeleteOfficial from "../../../queries/official/useDeleteOfficial";
import useGetResidents from "../../../queries/resident/useGetResidents";
import useDeleteAdmin from "../../../queries/admin/useDeleteAdmin";

const BarangayOfficialEdit: React.FC = () => {
  // const kagawads = [
  //   {
  //     position: "Kagawad",
  //     officialDetails: {
  //       officialName: "Jackson Lopez",
  //       contactNumber: "+63951232317",
  //       address: "#45 Purok 1, Navotas",
  //       profileImage: "../../src/assets/images/officials/jackson.png",
  //     },
  //   },
  //   {
  //     position: "Kagawad",
  //     officialDetails: {
  //       officialName: "Elizer Lozada",
  //       contactNumber: "+63951232317",
  //       address: "#45 Purok 1, Navotas",
  //       profileImage: "../../src/assets/images/officials/elizer.png",
  //     },
  //   },
  //   {
  //     position: "Kagawad",
  //     officialDetails: {
  //       officialName: "Nelson Araga",
  //       contactNumber: "+63951232317",
  //       address: "#45 Purok 1, Navotas",
  //       profileImage: "../../src/assets/images/officials/nelson.png",
  //     },
  //   },
  //   {
  //     position: "Kagawad",
  //     officialDetails: {
  //       officialName: "Jun Benitez",
  //       contactNumber: "+63951232317",
  //       address: "#45 Purok 1, Navotas",
  //       profileImage: "../../src/assets/images/officials/jun.png",
  //     },
  //   },
  //   {
  //     position: "Kagawad",
  //     officialDetails: {
  //       officialName: "Lita Abordo",
  //       contactNumber: "+63951232317",
  //       address: "#45 Purok 1, Navotas",
  //       profileImage: "../../src/assets/images/officials/lita.png",
  //     },
  //   },
  //   {
  //     position: "Kagawad",
  //     officialDetails: {
  //       officialName: "Pheng Bumanglag",
  //       contactNumber: "+63951232317",
  //       address: "#45 Purok 1, Navotas",
  //       profileImage: "../../src/assets/images/officials/pheng.png",
  //     },
  //   },
  //   {
  //     position: "Kagawad",
  //     officialDetails: {
  //       officialName: "Nancy Sanche",
  //       contactNumber: "+63951232317",
  //       address: "#45 Purok 1, Navotas",
  //       profileImage: "../../src/assets/images/officials/nancy.png",
  //     },
  //   },
  // ];
  const { mutate } = useUpdateOfficial();
  const { mutate: deleteAdminButton } = useDeleteAdmin();

  const { data: captainData, isLoading: captainIsLoading } =
    useGetOfficialByPosition("captain");
  const { data: treasurerData, isLoading: treasurerIsLoading } =
    useGetOfficialByPosition("treasurer");
  const { data: adminData, isLoading: adminIsLoading } =
    useGetOfficialByPosition("admin");
  const { data: secretaryData, isLoading: secretartyIsLoading } =
    useGetOfficialByPosition("secretary");
  const { data: skChairmanData, isLoading: skChairmanIsLoading } =
    useGetOfficialByPosition("skChairman");

  const { data: kagawad1Data } = useGetOfficialByPosition("kagawad1");
  const { data: kagawad2Data } = useGetOfficialByPosition("kagawad2");
  const { data: kagawad3Data } = useGetOfficialByPosition("kagawad3");
  const { data: kagawad4Data } = useGetOfficialByPosition("kagawad4");
  const { data: kagawad5Data } = useGetOfficialByPosition("kagawad5");
  const { data: kagawad6Data } = useGetOfficialByPosition("kagawad6");
  const { data: kagawad7Data } = useGetOfficialByPosition("kagawad7");

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

  const onSubmit = () => {
    officials.map((official) => {
      if (official?.position)
        mutate({
          position: official?.position,
          updatedData: {
            residentId: official?.officialDetails?._id,
          },
        });
    });
  };

  return (
    <>
      {captainIsLoading &&
      treasurerIsLoading &&
      adminIsLoading &&
      secretartyIsLoading &&
      skChairmanIsLoading ? (
        <Loading />
      ) : (
        <>
          <BackButton />
          <div className="grid md:grid-cols-2 gap-6 mt-5">
            <div className="flex flex-col space-y-6">
              {/* captain */}
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

              {(captainData?.officialDetails?._id ||
                captainDetails?.officialDetails?._id) && (
                <Card className="flex flex-col">
                  {captainDetails?.officialDetails?._id === undefined && (
                    <div className="self-end bg-[#1e1e2f] rounded-full">
                      <Tooltip
                        arrow
                        title="Delete"
                        onClick={() => {
                          mutate({
                            position: "captain",
                            updatedData: {
                              residentId: "",
                            },
                          });

                          deleteAdminButton(
                            captainData?.officialDetails?._id ?? ""
                          );
                        }}
                      >
                        <IconButton>
                          <Delete color="error" />
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
                  setTreasurerDetails({
                    position: "treasurer",
                    officialDetails: resident,
                  });
                }}
                isRealData={
                  treasurerDetails?.officialDetails?._id ? false : true
                }
              />

              <CardField
                position={"Admin"}
                officialDetails={
                  adminDetails?.position
                    ? adminDetails?.officialDetails
                    : adminData?.officialDetails
                }
                handleChange={(resident) => {
                  setAdminDetails({
                    position: "admin",
                    officialDetails: resident,
                  });
                }}
                isRealData={adminDetails?.officialDetails?._id ? false : true}
              />

              <CardField
                position={"Secretary"}
                officialDetails={
                  secretaryDetails?.position
                    ? secretaryDetails?.officialDetails
                    : secretaryData?.officialDetails
                }
                handleChange={(resident) => {
                  setSecretaryDetails({
                    position: "secretary",
                    officialDetails: resident,
                  });
                }}
                isRealData={
                  secretaryDetails?.officialDetails?._id ? false : true
                }
              />

              <CardField
                position={"SK Chairman"}
                officialDetails={
                  skChairmanDetails?.position
                    ? skChairmanDetails?.officialDetails
                    : skChairmanData?.officialDetails
                }
                handleChange={(resident) => {
                  setSkChairmanDetails({
                    position: "skChairman",
                    officialDetails: resident,
                  });
                }}
                isRealData={
                  skChairmanDetails?.officialDetails?._id ? false : true
                }
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
                isRealData={
                  kagawad1Details?.officialDetails?._id ? false : true
                }
              />

              <CardField
                position={"kagawad2"}
                officialDetails={
                  kagawad2Details?.position
                    ? kagawad2Details?.officialDetails
                    : kagawad2Data?.officialDetails
                }
                handleChange={(resident) =>
                  setKagawad2Details({
                    position: "kagawad2",
                    officialDetails: resident,
                  })
                }
                isRealData={
                  kagawad2Details?.officialDetails?._id ? false : true
                }
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
                isRealData={
                  kagawad3Details?.officialDetails?._id ? false : true
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
                isRealData={
                  kagawad4Details?.officialDetails?._id ? false : true
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
                isRealData={
                  kagawad5Details?.officialDetails?._id ? false : true
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
                isRealData={
                  kagawad6Details?.officialDetails?._id ? false : true
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
                isRealData={
                  kagawad7Details?.officialDetails?._id ? false : true
                }
              />
            </div>
          </div>
          <div className="flex justify-end mt-5 pb-5">
            <CustomButton label="Save Changes" onClick={onSubmit} />
          </div>
        </>
      )}
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
  isRealData,
  handleChange,
}) => {
  const { mutate: updateOfficialButton } = useUpdateOfficial();
  const { mutate: deleteAdminButton } = useDeleteAdmin();

  return (
    <>
      <Card>
        <SearchableTextField
          label={position?.includes("kagawad") ? "Kagawad" : position ?? ""}
          isEdit
          handleChange={handleChange}
        />
      </Card>
      {officialDetails?._id !== undefined && (
        <Card className="flex flex-col">
          {isRealData && (
            <div className="self-end bg-[#1e1e2f] rounded-full">
              <Tooltip
                arrow
                title="Delete"
                onClick={() => {
                  console.log("OFFICIAL ID: sdasdadas", officialDetails?._id);
                  updateOfficialButton({
                    position:
                      position === "SK Chairman"
                        ? "skChairman"
                        : position?.toLowerCase(),
                    updatedData: {
                      residentId: "",
                    },
                  });

                  deleteAdminButton(officialDetails?._id ?? "");
                }}
              >
                <IconButton>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <OfficialCard position={position} officialDetails={officialDetails} />
        </Card>
      )}
    </>
  );
};

const OfficialCard: React.FC<OfficialPropType> = ({
  position,
  officialDetails,
}) => {
  return (
    <div className="flex flex-row space-x-4 items-center">
      <div
        style={{
          width: "30%",
          height: 0,
          paddingBottom: "20%",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "50%",
            height: 0,
            paddingBottom: "50%",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
          }}
        >
          <img
            src={officialDetails?.profilePhoto}
            className="rounded-full object-cover w-full"
          />
        </div>
      </div>
      <div className="flex-1 text-center">
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
            backgroundColor: "white",
          }}
        >
          <img
            src={officialDetails?.profilePhoto}
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
