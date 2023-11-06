import { useNavigate } from "react-router-dom";
import { Tree, TreeNode } from "react-organizational-chart";
import { Add } from "@mui/icons-material";

import CustomButton from "../../../components/CustomButton";
import useGetOfficialByPosition from "../../../queries/official/useGetOfficialByPosition";
import { OfficialPropType } from "../../../utils/types";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import useAuthContext from "../../../queries/auth/useAuthContext";
import DefaultUserAvatar from "../../../assets/images/default-user-avatar.png";

const BarangayOfficial: React.FC = () => {
  const navigation = useNavigate();

  const auth = useAuthContext();

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

      <div className="bg-white py-10 rounded-xl">
        <Tree
          label={
            captainData.officialDetails?._id && (
              <OfficialCard
                position="Barangay Captain"
                officialDetails={captainData.officialDetails}
              />
            )
          }
          lineWidth="2px"
          nodePadding="0px"
          lineColor="black"
        >
          {treasurerData.officialDetails?._id && (
            <TreeNode
              label={
                <OfficialCard
                  position="Treasurer"
                  officialDetails={treasurerData.officialDetails}
                />
              }
            />
          )}
          {adminData.officialDetails?._id && (
            <TreeNode
              label={
                <OfficialCard
                  position="Admin"
                  officialDetails={adminData.officialDetails}
                />
              }
            />
          )}

          <TreeNode label={<div></div>}>
            {kagawad1Data.officialDetails?._id && (
              <TreeNode
                label={
                  <OfficialCard
                    position="Kagawad"
                    officialDetails={kagawad1Data.officialDetails}
                  />
                }
              />
            )}
            <TreeNode
              label={
                kagawad2Data.officialDetails?._id && (
                  <OfficialCard
                    position="Kagawad"
                    officialDetails={kagawad2Data.officialDetails}
                  />
                )
              }
            >
              {kagawad3Data.officialDetails?._id && (
                <TreeNode
                  label={
                    <OfficialCard
                      position="Kagawad"
                      officialDetails={kagawad3Data.officialDetails}
                    />
                  }
                />
              )}

              {kagawad4Data.officialDetails?._id && (
                <TreeNode
                  label={
                    <OfficialCard
                      position="Kagawad"
                      officialDetails={kagawad4Data.officialDetails}
                    />
                  }
                />
              )}

              {kagawad5Data.officialDetails?._id && (
                <TreeNode
                  label={
                    <OfficialCard
                      position="Kagawad"
                      officialDetails={kagawad5Data.officialDetails}
                    />
                  }
                />
              )}

              {kagawad6Data.officialDetails?._id && (
                <TreeNode
                  label={
                    <OfficialCard
                      position="Kagawad"
                      officialDetails={kagawad6Data.officialDetails}
                    />
                  }
                />
              )}
            </TreeNode>
            {kagawad7Data.officialDetails?._id && (
              <TreeNode
                label={
                  <OfficialCard
                    position="Kagawad"
                    officialDetails={kagawad7Data.officialDetails}
                  />
                }
              />
            )}
          </TreeNode>

          {secretaryData.officialDetails?._id && (
            <TreeNode
              label={
                <OfficialCard
                  position="Secretary"
                  officialDetails={secretaryData.officialDetails}
                />
              }
            />
          )}
          {skChairmanData.officialDetails?._id && (
            <TreeNode
              label={
                <OfficialCard
                  position="SK Chairman"
                  officialDetails={skChairmanData.officialDetails}
                />
              }
            />
          )}
        </Tree>
      </div>
      {auth.userRole === "Captain" && (
        <div className="flex justify-end my-5">
          <CustomButton
            label="Edit Officials"
            Icon={Add}
            onClick={() => navigation("edit")}
          />
        </div>
      )}
    </>
  );
};

const OfficialCard: React.FC<OfficialPropType> = ({
  position,
  officialDetails,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* image */}
      <div className="w-8 h-8 md:w-14 md:h-14 relative z-10 p-0.5 border-white rounded-full overflow-hidden">
        <img
          src={
            officialDetails?.profilePhoto === ""
              ? DefaultUserAvatar
              : officialDetails?.profilePhoto
          }
          className="rounded-full w-full h-full object-cover object-center overflow-hidden bg-white"
        />
      </div>
      {/* details */}
      <div
        className="bg-white px-4 py-7 relative -top-4 rounded-md"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          filter: "drop-shadow",
        }}
      >
        <p className="text-sm font-bold text-[#067D68]">
          {getResidentFullName({
            lastName: officialDetails?.lastName,
            firstName: officialDetails?.firstName,
            middleName: officialDetails?.middleName,
            suffix: officialDetails?.suffix,
          })}
        </p>
        <p className="text-[#7c7c7c] text-xs">{position}</p>
      </div>
    </div>
  );
};

export default BarangayOfficial;
