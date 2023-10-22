import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import ReactDOM from "react-dom/client";

import "./index.css";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "@/context/authContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
