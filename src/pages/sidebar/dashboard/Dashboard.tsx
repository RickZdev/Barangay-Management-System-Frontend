import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import DraftsIcon from "@mui/icons-material/Drafts";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import GroupIcon from "@mui/icons-material/Group";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PregnantWomanIcon from "@mui/icons-material/PregnantWoman";
import FlagIcon from "@mui/icons-material/Flag";
import Card from "../../../components/Card";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useNavigate } from "react-router-dom";
import useGetResidents from "../../../queries/resident/useGetResidents";
import Loading from "../../errors/Loading";
import useGetComplaints from "../../../queries/complaints/useGetComplaints";
import { DashboardPropType } from "../../../utils/types";
import { getResidentAge } from "../../../helper/getResidentAge";
import useGetTransactions from "../../../queries/transaction/useGetTransactions";
import useGetBorrowedRecords from "../../../queries/borrowedRecords/useGetBorrowedRecords";
import useGetBlotters from "../../../queries/blotter/useGetBlotters";
import useGetSulatReklamo from "../../../queries/sulatReklamo/useGetSulatReklamo";
import useAuthContext from "../../../queries/auth/useAuthContext";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import useGetUserById from "../../../queries/user/useGetUserById";
import useGetResidentById from "../../../queries/resident/useGetResidentById";

const Dashboard: React.FC = () => {
  const navigation = useNavigate();
  const auth = useAuthContext();

  const { data: residentData, isLoading: residentIsLoading } =
    useGetResidents();
  const { data: complaintsData, isLoading: complaintsIsLoading } =
    useGetComplaints();
  const { data: transactionsData, isLoading: transactionsIsLoading } =
    useGetTransactions();
  const { data: borrowedRecordsData, isLoading: borrowedRecordsIsLoading } =
    useGetBorrowedRecords();
  const { data: sulatReklamoData, isLoading: sulatReklamoIsLoading } =
    useGetSulatReklamo();
  const { data: blotterData, isLoading: blotterIsLoading } = useGetBlotters();

  const isLoading =
    residentIsLoading ||
    complaintsIsLoading ||
    transactionsIsLoading ||
    borrowedRecordsIsLoading ||
    blotterIsLoading ||
    sulatReklamoIsLoading;

  const residentsCount = residentData?.length;

  const femaleCount =
    residentData?.filter((resident) => resident?.sex === "Female").length ?? 0;

  const maleCount =
    residentData?.filter((resident) => resident.sex === "Male").length ?? 0;

  const seniorsCount = residentData?.reduce((count, { birthDate }) => {
    const age = getResidentAge(birthDate);
    return age >= 60 ? count + 1 : count;
  }, 0);

  const pwdsCount = residentData?.filter(
    (resident) => resident?.category === "PWD"
  ).length;

  const singleParentsCount = residentData?.filter(
    (resident) => resident?.category === "Single Parent"
  ).length;

  const complaintsCount = complaintsData?.length;
  const transactionsCount = transactionsData?.length;
  const borrowedRecordsCount = borrowedRecordsData?.length;
  const blottersCount = blotterData?.length;
  const sulatReklamoCount = sulatReklamoData?.length;

  const data: DashboardPropType[] = [
    {
      _id: "1",
      label: "Total Certificate Records (not yet)",
      total: 45,
      Icon: <DraftsIcon />,
      backgroundColor: "honeydew",
      navigationPath: "/certificate",
    },
    {
      _id: "2",
      label: "Total Blotters",
      total: blottersCount,
      Icon: <ReportGmailerrorredIcon />,
      backgroundColor: "gold",
      navigationPath: "/blotter",
    },
    {
      _id: "3",
      label: "Total Complaints",
      total: complaintsCount,
      Icon: <FlagIcon />,
      backgroundColor: "rgb(243, 113, 113)",
      navigationPath: "/complaints",
    },
    {
      _id: "4",
      label: "Total Sulat-Reklamo",
      total: sulatReklamoCount,
      Icon: <DriveFileRenameOutlineIcon />,
      backgroundColor: "goldenrod",
      navigationPath: "/sulat-reklamo",
    },
    {
      _id: "5",
      label: "Total Inventory Records",
      total: borrowedRecordsCount,
      Icon: <InventoryIcon />,
      backgroundColor: "cyan",
      navigationPath: "/inventory",
    },
    {
      _id: "6",
      label: "Total Transactions",
      total: transactionsCount,
      Icon: <PointOfSaleIcon />,
      backgroundColor: "khaki",
      navigationPath: "/transaction",
    },
    {
      _id: "7",
      label: "Total Residents",
      total: residentsCount,
      Icon: <GroupIcon />,
      backgroundColor: "white",
      navigationPath: "/resident",
    },
    {
      _id: "8",
      label: "Total Female Residents",
      total: femaleCount,
      Icon: <FemaleIcon />,
      backgroundColor: "pink",
      navigationPath: "",
    },
    {
      _id: "9",
      label: "Total Male Residents",
      total: maleCount,
      Icon: <MaleIcon />,
      backgroundColor: "skyblue",
      navigationPath: "",
    },

    {
      _id: "10",
      label: "Senior Citizen Residents",
      total: seniorsCount,
      Icon: <ElderlyWomanIcon />,
      backgroundColor: "lightgreen",
      navigationPath: "",
    },
    {
      _id: "11",
      label: "Total PWD Residents",
      total: pwdsCount,
      Icon: <AccessibleIcon />,
      backgroundColor: "#98BF64",
      navigationPath: "",
    },
    {
      _id: "12",
      label: "Total Single Parent Residents",
      total: singleParentsCount,
      Icon: <PregnantWomanIcon />,
      backgroundColor: "#0492c2",
      navigationPath: "",
    },
  ];

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <div className="flex flex-col space-y-10 pb-7">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-4">
          {data.map((summary) => (
            <Card
              className={`${
                summary.navigationPath && "cursor-pointer"
              } space-y-12 flex flex-col justify-between bg-[#29283d] rounded-md p-6`}
              key={summary._id}
              onClick={() => navigation(summary.navigationPath)}
            >
              <div className="flex flex-row justify-between items-center">
                <div
                  className="p-2 rounded-full"
                  style={{ backgroundColor: summary.backgroundColor }}
                >
                  {summary?.Icon}
                </div>
                <div className="flex flex-col items-end w-2/3 space-y-1">
                  <p className="text-white text-md md:text-sm text-right">
                    {summary.label}
                  </p>
                  <p className="text-white text-2xl">{summary.total}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-full h-[1px] bg-[#2f3453] items-center" />
                <div className="flex items-center justify-start space-x-2">
                  {summary.navigationPath && (
                    <p className="text-sm text-[#999]">More info</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
