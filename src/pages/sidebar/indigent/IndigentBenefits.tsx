import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/Table";
import { MRT_ColumnDef } from "material-react-table";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ViewDetails from "../../../components/ViewDetails";
import { IndigentBenefitsPropType } from "../../../utils/types";
import useGetIndigentBenefits from "../../../queries/indigentBenefit/useGetIndigentBenefits";
import Loading from "../../errors/Loading";
import dayjs from "dayjs";
import useCreateIndigentBenefit from "../../../queries/indigentBenefit/useCreateIndigentBenefit";
import useGetResidents from "../../../queries/resident/useGetResidents";
import { getResidentAge } from "../../../helper/getResidentAge";
import { getResidentFullName } from "../../../helper/getResidentFullName";
import ModalReceiveBenefit from "../../../components/modals/ModalReceiveBenefit";
import { getIndigentBenefitAge } from "../../../services/apiHelper";

const IndigentBenefits: React.FC = React.memo(() => {
  const { data, isLoading } = useGetIndigentBenefits();
  const { mutate } = useCreateIndigentBenefit();
  const { data: residents } = useGetResidents();
  const currentDate = dayjs();

  useEffect(() => {
    const seniorCitizen = residents?.filter(
      (resident) => getResidentAge(resident.birthDate) >= 60
    );

    const isAlreadyFilled = data?.filter((resident) => {
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
          monthAndYear: dayjs().format("MMMM") + " " + dayjs().year(),
        })
      );
    }
  }, [residents, data]);

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
        Cell: ({ cell }) => {
          const { residentId } = cell.row.original;
          const [age, setAge] = useState<number>();

          useEffect(() => {
            const fetchAge = async () => {
              const age = await getIndigentBenefitAge(residentId);
              setAge(age);
            };

            fetchAge();
          }, [residentId]);

          return <Typography>{age}</Typography>;
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

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          data={data ?? []}
          columns={columns}
          isError={false}
          showBackButton={false}
          enableRowNumbers={false}
          enableGrouping
          positionToolbarAlertBanner="top"
          enableColumnDragging={false}
          initialState={{ grouping: ["monthAndYear"] }}
          renderRowActions={({ row, cell }) => [
            <>
              {row.original.status === "Not Received" && (
                <Box
                  sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}
                  key={row.id}
                >
                  <Tooltip arrow title="Received" onClick={handleClickOpen}>
                    <IconButton>
                      <KeyboardReturnIcon
                        className="text-yellow-500"
                        sx={{ color: "rgb(234, 179, 8)" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}

              <ModalReceiveBenefit
                open={open}
                handleClose={handleClose}
                indigentId={cell.row.original?._id}
              />
            </>,
          ]}
        />
      )}
    </>
  );
});

export default IndigentBenefits;
