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

const Dashboard: React.FC = () => {
  const navigation = useNavigate();

  const { data: residentData, isLoading: residentIsLoading } =
    useGetResidents();
  const { data: complaintsData, isLoading: complaintsIsLoading } =
    useGetComplaints();
  const { data: transactionsData, isLoading: transactionsIsLoading } =
    useGetTransactions();
  const { data: borrowedRecordsData, isLoading: borrowedRecordsIsLoading } =
    useGetBorrowedRecords();
  const { data: blotterData, isLoading: blotterIsLoading } = useGetBlotters();
  const { data: sulatReklamoData, isLoading: sulatReklamoIsLoading } =
    useGetSulatReklamo();

  const residentsCount = residentData?.reduce((count, { _id }) => {
    return _id ? count + 1 : count;
  }, 0);
  const femaleCount = residentData?.reduce((count, { sex }) => {
    return sex === "Female" ? count + 1 : count;
  }, 0);
  const maleCount = residentData?.reduce((count, { sex }) => {
    return sex === "Male" ? count + 1 : count;
  }, 0);
  const seniorsCount = residentData?.reduce((count, { birthDate }) => {
    const age = getResidentAge(birthDate);
    return age >= 60 ? count + 1 : count;
  }, 0);
  const pwdsCount = residentData?.reduce((count, { category }) => {
    return category === "PWD" ? count + 1 : count;
  }, 0);
  const singleParentsCount = residentData?.reduce((count, { category }) => {
    return category === "Single Parent" ? count + 1 : count;
  }, 0);

  const complaintsCount = complaintsData?.reduce((count, { _id }) => {
    return _id ? count + 1 : count;
  }, 0);
  const transactionsCount = transactionsData?.reduce((count, { _id }) => {
    return _id ? count + 1 : count;
  }, 0);
  const borrowedRecordsCount = borrowedRecordsData?.reduce((count, { _id }) => {
    return _id ? count + 1 : count;
  }, 0);
  const blottersCount = blotterData?.reduce((count, { _id }) => {
    return _id ? count + 1 : count;
  }, 0);
  const sulatReklamoCount = sulatReklamoData?.reduce((count, { _id }) => {
    return _id ? count + 1 : count;
  }, 0);

  const data: DashboardPropType[] = [
    {
      _id: "1",
      label: "Total Certificate Request (not yet)",
      total: 45,
      Icon: <DraftsIcon />,
      backgroundColor: "honeydew",
      navigationPath: "/certificate",
    },
    {
      _id: "2",
      label: "Total Blotter Request",
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
      label: "Total Inventory Request",
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
      navigationPath: "/resident",
    },
    {
      _id: "9",
      label: "Total Male Residents",
      total: maleCount,
      Icon: <MaleIcon />,
      backgroundColor: "skyblue",
      navigationPath: "/resident",
    },

    {
      _id: "10",
      label: "Senior Citizen Residents",
      total: seniorsCount,
      Icon: <ElderlyWomanIcon />,
      backgroundColor: "lightgreen",
      navigationPath: "/resident",
    },
    {
      _id: "11",
      label: "Total PWD Residents",
      total: pwdsCount,
      Icon: <AccessibleIcon />,
      backgroundColor: "#98BF64",
      navigationPath: "/resident",
    },
    {
      _id: "12",
      label: "Total Single Parent Residents",
      total: singleParentsCount,
      Icon: <PregnantWomanIcon />,
      backgroundColor: "#0492c2",
      navigationPath: "/resident",
    },
  ];

  const auth = useAuthContext();

  useEffect(() => {
    const userId = localStorage?.getItem("userId")
      ? JSON.parse(localStorage?.getItem("userId")!)
      : null;
    const userRole = localStorage?.getItem("userRole")
      ? JSON.parse(localStorage?.getItem("userRole")!)
      : null;
    const token = localStorage?.getItem("accessToken")
      ? JSON.parse(localStorage?.getItem("accessToken")!)
      : null;

    if (userId && token) {
      auth.setUserId(userId);
      auth.setUserRole(userRole);
      auth.setAccessToken(token);
    }
  }, []);

  return (
    <div className="flex flex-col space-y-10 pb-7">
      {residentIsLoading &&
      complaintsIsLoading &&
      transactionsIsLoading &&
      borrowedRecordsIsLoading &&
      blotterIsLoading &&
      sulatReklamoIsLoading ? (
        <Loading />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-4">
          {data.map((summary) => (
            <Card
              className="space-y-12 flex flex-col justify-between bg-[#29283d] rounded-md p-6 cursor-pointer"
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
                  <ExpandMoreIcon className="text-white" />
                  <p className="text-sm text-[#999]">More info</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
