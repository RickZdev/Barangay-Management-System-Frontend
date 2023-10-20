import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs as BreadcrumpsMUI } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname.split("/").filter((crumb) => crumb !== "");

  const breadcrumbs = crumbs.map((crumb, index) => {
    currentLink += `/${crumb}`;
    const lastItem = index < crumbs.length - 1;
    return (
      <div key={crumb}>
        <Link to={currentLink}>
          <p
            className="uppercase text-xs"
            style={{ color: lastItem ? "#fff" : "#50D5B7" }}
          >
            {crumb}
          </p>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex flex-row ">
      <BreadcrumpsMUI
        separator={<NavigateNextIcon fontSize="small" className="text-white" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </BreadcrumpsMUI>
    </div>
  );
};

export default Breadcrumbs;
