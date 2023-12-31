import React, { useEffect, useMemo, useState } from "react";
import {
  MRT_RowSelectionState,
  type MRT_ColumnDef,
} from "material-react-table";
import Table from "../../../components/Table";
import TableButton from "../../../components/TableButton";
import dayjs, { Dayjs } from "dayjs";
import { ResidentPropType } from "../../../utils/types";
import { getResidentAge } from "../../../helper/getResidentAge";
import useDeleteResident from "../../../queries/resident/useDeleteResident";
import useGetResidents from "../../../queries/resident/useGetResidents";
import Loading from "../../errors/Loading";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import useAuthContext from "../../../queries/auth/useAuthContext";
import useGetResidentStatuses from "../../../queries/resident/useGetResidentStatuses";
import CustomButton from "../../../components/CustomButton";
import useDeleteResidentStatus from "../../../queries/resident/useDeleteResidentStatus";
import _ from "lodash";

const ResidentPending: React.FC = () => {
  const auth = useAuthContext();

  const {
    data,
    isError,
    isLoading: isResidentsLoading,
    isRefetching,
    refetch,
  } = useGetResidentStatuses();
  const { mutate: deleteResident, isLoading: isDeleteLoading } =
    useDeleteResident();

  const { mutate: deleteResidentStatus, isLoading: isResidentStatusLoading } =
    useDeleteResidentStatus();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [showAction, setShowAction] = useState<boolean>(false);
  const [rows, setRows] = useState<string[]>([]);

  const isLoading =
    isResidentsLoading ||
    isDeleteLoading ||
    isResidentStatusLoading ||
    isRefetching ||
    isProcessing;

  const columns = useMemo<MRT_ColumnDef<ResidentPropType>[]>(
    () => [
      {
        id: "_id",
        accessorKey: "lastName",
        header: "Last Name",
        size: 200,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 200,
      },
      {
        accessorKey: "middleName",
        header: "Middle Name",
        size: 200,
      },
      {
        accessorKey: "suffix",
        header: "Suffix",
        size: 100,
        Cell(props) {
          const suffix = props.row.original.suffix;
          return <div>{suffix ?? ""}</div>;
        },
      },
      {
        accessorKey: "houseNumber",
        header: "House No.",
        size: 180,
      },
      {
        accessorKey: "streetAddress",
        header: "Street Address",
        size: 200,
      },
      {
        accessorKey: "purokNumber",
        header: "Purok No.",
        size: 180,
      },
      {
        accessorKey: "contactNumber",
        header: "Contact Number",
        size: 200,
      },
      {
        accessorKey: "birthDate",
        header: "Date Of Birth",
        enableResizing: false,
        enableColumnFilter: false,
        size: 200,
        columns: [
          {
            header: "M/D",
            Cell(props) {
              const birthDate = props.row.original.birthDate;
              const monthDay = getBirthdate(birthDate, "monthAndDay");
              return <div>{monthDay}</div>;
            },
          },
          {
            header: "Year",
            Cell(props) {
              const birthDate = props.row.original.birthDate;
              const monthDay = getBirthdate(birthDate, "year");
              return <div>{monthDay}</div>;
            },
          },
        ],
      },
      {
        accessorKey: "sex",
        header: "Sex",
        enableResizing: false,
        enableColumnFilter: false,

        size: 100,
        columns: [
          {
            header: "Male",
            Cell(props) {
              const value = props.row.original.sex;
              return <div>{value === "Male" ? "✓" : ""}</div>;
            },
          },
          {
            header: "Female",
            Cell(props) {
              const value = props.row.original.sex;
              return <div>{value === "Female" ? "✓" : ""}</div>;
            },
          },
        ],
      },
      {
        accessorKey: "civilStatus",
        header: "Civil Status",
        size: 200,
      },
      {
        header: "Age",
        size: 200,
        Cell(props) {
          const birthDate = props?.row?.original?.birthDate;
          const age = getResidentAge(birthDate);
          return <div>{age}</div>;
        },
      },
      {
        header: "Category of Age",
        size: 250,
        enableResizing: false,
        enableColumnFilter: false,
        columns: [
          {
            header: "0-5",
            size: 100,
            Cell(props) {
              const birthDate = props?.row?.original?.birthDate;
              const age = getResidentAge(birthDate);

              const ageBracket = getAgeBracket(age);

              return <div>{ageBracket === "0-5" ? "✓" : ""}</div>;
            },
          },
          {
            header: "6-9",
            size: 100,
            Cell(props) {
              const birthDate = props?.row?.original?.birthDate;
              const age = getResidentAge(birthDate);
              const ageBracket = getAgeBracket(age);

              return <div>{ageBracket === "6-9" ? "✓" : ""}</div>;
            },
          },
          {
            header: "10-17",
            size: 100,
            Cell(props) {
              const birthDate = props?.row?.original?.birthDate;
              const age = getResidentAge(birthDate);
              const ageBracket = getAgeBracket(age);

              return <div>{ageBracket === "10-17" ? "✓" : ""}</div>;
            },
          },
          {
            header: "18-59",
            size: 100,
            Cell(props) {
              const birthDate = props?.row?.original?.birthDate;
              const age = getResidentAge(birthDate);
              const ageBracket = getAgeBracket(age);

              return <div>{ageBracket === "18-59" ? "✓" : ""}</div>;
            },
          },
          {
            header: "60+",
            size: 100,
            Cell(props) {
              const birthDate = props?.row?.original?.birthDate;
              const age = getResidentAge(birthDate);
              const ageBracket = getAgeBracket(age);

              return <div>{ageBracket === "60 and above" ? "✓" : ""}</div>;
            },
          },
        ],
      },
      {
        accessorKey: "citizenship",
        header: "Citizenship",
        size: 200,
      },
      {
        accessorKey: "educationalAttainment",
        header: "Educational Attainment",
        enableResizing: false,
        enableColumnFilter: false,
        columns: [
          {
            header: "Elem",
            size: 100,

            Cell(props) {
              const value = props?.row?.original?.educationalAttainment;

              const education = getEducationalAttainmentBracket(value);

              return <div>{education === "Elementary" ? "✓" : ""}</div>;
            },
          },
          {
            header: "HS",
            size: 100,

            Cell(props) {
              const value = props.row.original.educationalAttainment;

              const education = getEducationalAttainmentBracket(value);

              return <div>{education === "High School" ? "✓" : ""}</div>;
            },
          },
          {
            header: "COL",
            size: 100,

            Cell(props) {
              const value = props.row.original.educationalAttainment;

              const education = getEducationalAttainmentBracket(value);

              return <div>{education === "College" ? "✓" : ""}</div>;
            },
          },
        ],
      },
      {
        accessorKey: "occupation",
        header: "Occupation",
        size: 200,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 200,
        enableResizing: false,
        enableColumnFilter: false,
        columns: [
          {
            header: "PWD",
            size: 100,

            Cell(props) {
              const value = props?.row?.original?.category;

              return <div>{value === "PWD" ? "✓" : ""}</div>;
            },
          },
          {
            header: "SINGLE PARENT",
            size: 100,

            Cell(props) {
              const value = props.row.original?.category;

              return <div>{value === "Single Parent" ? "✓" : ""}</div>;
            },
          },
          {
            header: "SENIOR CITIZEN",
            size: 100,

            Cell(props) {
              const birthDate = props?.row?.original?.birthDate;
              const age = getResidentAge(birthDate);

              return <div>{age >= 60 ? "✓" : ""}</div>;
            },
          },
        ],
      },
      {
        accessorKey: "emailAddress",
        header: "Email Address",
        size: 200,
      },
    ],
    []
  );

  const getBirthdate = (
    birthDate: string | undefined,
    date: string
  ): string => {
    const birthdate = dayjs(birthDate, "MM/DD/YYYY");
    const day = birthdate.date();
    const month = birthdate.month() + 1;
    const year = birthdate.year();

    if (date === "monthAndDay") {
      return `${month}/${day}`;
    } else {
      return year.toString();
    }
  };

  const getAgeBracket = (age: number | undefined): string | void => {
    if (age === 0) {
      return "0-5";
    } else if (age) {
      let ageBracket: string;

      switch (true) {
        case age >= 1 && age <= 5:
          ageBracket = "0-5";
          break;
        case age >= 6 && age <= 9:
          ageBracket = "6-9";
          break;
        case age >= 10 && age <= 17:
          ageBracket = "10-17";
          break;
        case age >= 18 && age <= 59:
          ageBracket = "18-59";
          break;
        default:
          ageBracket = "60 and above";
          break;
      }

      return ageBracket;
    }
  };

  const getEducationalAttainmentBracket = (
    education: string | undefined
  ): string => {
    let educationBracket;

    switch (education) {
      case "College":
        educationBracket = "College";
        break;
      case "High School":
        educationBracket = "High School";
        break;
      case "Elementary":
        educationBracket = "Elementary";
        break;
      default:
        educationBracket = "";
    }

    return educationBracket;
  };

  const handleAccept = () => {
    setIsProcessing(true);

    _.filter(data, (resident, index) => {
      if (rows.includes(index.toString())) {
        deleteResidentStatus({
          residentId: resident?._id ?? "",
          status: "Approved",
        });
      }
    });

    setRowSelection({});

    setIsProcessing(false);
  };

  const handleReject = () => {
    setIsProcessing(true);

    _.filter(data, (resident, index) => {
      if (rows.includes(index.toString())) {
        deleteResidentStatus({
          residentId: resident?._id ?? "",
          status: "Rejected",
        });

        deleteResident(resident?._id ?? "");
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

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <div className="pb-10">
        <Table
          data={data ?? []}
          columns={columns}
          isError={isError}
          enableGlobalFilter={true}
          enableFilters
          enableRowSelection
          onRowSelectionChange={setRowSelection}
          state={{ rowSelection }}
          positionToolbarAlertBanner="top"
          muiTableDetailPanelProps={{
            sx: { color: "white" },
          }}
          showBackButton
          showEditButton={false}
          showDeleteButton={false}
          showExportButton
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
                  label="Reject Account"
                  backgroundColor="rgb(239, 68, 68)"
                  onClick={handleReject}
                />

                <CustomButton label="Accept Account" onClick={handleAccept} />
              </div>
            )}
          </>
        </Table>
      </div>
    </>
  );
};

export default ResidentPending;
