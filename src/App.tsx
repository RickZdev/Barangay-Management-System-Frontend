import { RouterProvider } from "react-router-dom";
import { rootRouter } from "./router/routes/RootRouter";
import { ProSidebarProvider } from "react-pro-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ContextProvider } from "./context/ContextProvider";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ProSidebarProvider>
            <RouterProvider router={rootRouter} />
          </ProSidebarProvider>
        </LocalizationProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default App;
