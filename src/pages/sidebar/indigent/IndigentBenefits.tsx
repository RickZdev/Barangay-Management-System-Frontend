import React, { useEffect, useMemo } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";

import ViewDetails from "../../../components/ViewDetails";
import { IndigentBenefitsPropType } from "../../../utils/types";
import useGetIndigentBenefits from "../../../queries/indigentBenefit/useGetIndigentBenefits";
import dayjs from "dayjs";
import useCreateIndigentBenefit from "../../../queries/indigentBenefit/useCreateIndigentBenefit";
import useGetResidents from "../../../queries/resident/useGetResidents";
import { getResidentAge } from "../../../helper/getResidentAge";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import LoaderModal from "../../../components/modals/loader/LoaderModal";
import useAuthContext from "../../../queries/auth/useAuthContext";
import _ from "lodash";

const IndigentBenefits: React.FC = React.memo(() => {
  const columns = useMemo<MRT_ColumnDef<IndigentBenefitsPropType>[]>(
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
        accessorKey: "monthAndYear",
        header: "Month/Year",
        size: 150,
      },
      {
        header: "Age",
        size: 150,
        Cell: (props) => {
          const birthDate = props?.row?.original?.birthDate;

          const age = getResidentAge(birthDate);
          return <div>{age}</div>;
        },
      },
      {
        accessorKey: "pension",
        header: "Pension",
        size: 150,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 150,
      },
      {
        accessorKey: "purok",
        header: "Purok",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        aggregationFn: "uniqueCount",
        AggregatedCell: ({ cell }) => {
          const receivedCount = cell.row.subRows?.filter(
            (subRow) => subRow.original.status === "Not Received"
          ).length;

          return (
            <p className="font-bold text-yellow-400">
              Not Received: {""}
              <span className="font-bold text-white">{receivedCount}</span>
            </p>
          );
        },
      },
      {
        accessorKey: "receiver",
        header: "Receiver",
        size: 150,
      },
      {
        accessorKey: "relation",
        header: "Relation",
        size: 150,
      },
    ],
    []
  );

  const auth = useAuthContext();

  const {
    data: indigents,
    isLoading: isIndigentLoading,
    refetch,
    isRefetching,
  } = useGetIndigentBenefits();

  const { data: residents, isLoading: isResidentsLoading } = useGetResidents();
  const { mutate } = useCreateIndigentBenefit();

  const IndigentsForResident = useMemo(() => {
    return _.filter(
      indigents,
      (indigent) => indigent?.residentId === auth?.userId
    );
  }, [indigents]);

  const data = auth?.userRole !== "Resident" ? indigents : IndigentsForResident;

  const currentDate = dayjs();
  const isLoading = isIndigentLoading || isResidentsLoading || isRefetching;

  useEffect(() => {
    const seniorCitizen = residents?.filter(
      (resident) => getResidentAge(resident.birthDate) >= 60
    );

    const isAlreadyFilled = indigents?.filter((resident) => {
      if (
        resident.monthAndYear ===
        dayjs().format("MMMM") + " " + dayjs().year()
      ) {
        return resident;
      }
    });

    if (currentDate.date() === 1 && isAlreadyFilled?.length === 0) {
      seniorCitizen?.map((resident) =>
        mutate({
          residentId: resident._id,
          residentName: getResidentFullName({
            lastName: resident?.lastName,
            firstName: resident?.firstName,
            middleName: resident?.middleName,
            suffix: resident?.suffix,
          }),
          pension: 500,
          purok: resident?.purokNumber,
          status: "Not Received",
          receiver: "",
          relation: "",
          birthDate: resident?.birthDate ?? "",
          monthAndYear: dayjs().format("MMMM") + " " + dayjs().year(),
        })
      );
    }
  }, [residents, indigents]);

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      {auth?.userRole !== "Resident" ? (
        <Table
          data={data ?? []}
          columns={columns}
          isError={false}
          showBackButton={false}
          enableRowNumbers={false}
          showDeleteButton={false}
          showEditButton={false}
          showViewButton={false}
          showIndigentButton
          enableGrouping
          positionToolbarAlertBanner="top"
          enableColumnDragging={false}
          initialState={{ grouping: ["monthAndYear"] }}
          refreshButton={refetch}
        />
      ) : (
        <Table
          data={data ?? []}
          columns={columns}
          showBackButton={false}
          enableRowNumbers={false}
          enableRowActions={false}
          refreshButton={refetch}
        />
      )}
    </>
  );
});

export default IndigentBenefits;
