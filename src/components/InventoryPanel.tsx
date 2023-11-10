import { Typography } from "@mui/material";

const InventoryPanel = ({ row }: { row: any }) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold uppercase text-lg py-2 text-center">
        Borrowed Items
      </p>
      <div className="grid grid-cols-2">
        <div className="border-[1px] border-black p-3 bg-black">
          <Typography align="center" fontWeight={"bold"}>
            ITEMS
          </Typography>
        </div>
        <div className="border-[1px] border-black p-3 bg-black">
          <Typography align="center" fontWeight={"bold"}>
            QUANTITY
          </Typography>
        </div>

        {row.original.borrowedItems.map((item: any, index: any) => (
          <>
            <div className="border-[1px] border-black px-5 py-3">
              <Typography align="center" color={"black"}>
                {item.itemName}
              </Typography>
            </div>
            <div className="border-[1px] border-black px-5 py-3">
              <Typography align="center" color={"black"}>
                {item.quantity}
              </Typography>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default InventoryPanel;
