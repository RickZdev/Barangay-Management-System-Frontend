import { useNavigate } from "react-router-dom";
import { Tree, TreeNode } from "react-organizational-chart";
import { Add } from "@mui/icons-material";

import CustomButton from "../../../components/CustomButton";
import useGetOfficialByPosition from "../../../queries/official/useGetOfficialByPosition";
import { OfficialPropType } from "../../../utils/types";
import { getResidentFullName } from "../../../helper/getResidentFullName";

const BarangayOfficial: React.FC = () => {
  const navigation = useNavigate();

  const { data: captainData } = useGetOfficialByPosition("captain");
  const { data: treasurerData } = useGetOfficialByPosition("treasurer");
  const { data: adminData } = useGetOfficialByPosition("admin");
  const { data: secretaryData } = useGetOfficialByPosition("secretary");
  const { data: skChairmanData } = useGetOfficialByPosition("skChairman");
  const { data: kagawad1Data } = useGetOfficialByPosition("kagawad1");
  const { data: kagawad2Data } = useGetOfficialByPosition("kagawad2");
  const { data: kagawad3Data } = useGetOfficialByPosition("kagawad3");
  const { data: kagawad4Data } = useGetOfficialByPosition("kagawad4");
  const { data: kagawad5Data } = useGetOfficialByPosition("kagawad5");
  const { data: kagawad6Data } = useGetOfficialByPosition("kagawad6");
  const { data: kagawad7Data } = useGetOfficialByPosition("kagawad7");

  return (
    <>
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
      <div className="flex justify-end my-5">
        <CustomButton
          label="Edit Officials"
          Icon={Add}
          onClick={() => navigation("edit")}
        />
      </div>
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
      <div className="w-8 h-8 md:w-14 md:h-14 relative z-10 border-white bg-black border-4 rounded-full overflow-hidden">
        {/* <img
          src={officialDetails?.image}
          className="rounded-full w-full h-full object-cover object-center overflow-hidden bg-white"
        /> */}
      </div>
      {/* details */}
      <div
        className="bg-white px-4 py-7 relative -top-4 rounded-md cursor-pointer"
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
