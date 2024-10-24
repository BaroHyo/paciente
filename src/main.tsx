import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import queryClient from "./queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <App /> 
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
