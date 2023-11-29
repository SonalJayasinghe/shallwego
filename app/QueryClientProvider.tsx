"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient(); //cache data from the backend

  return (
    <ReactQueryClientProvider client={queryClient}>
      {" "}
      {children}{" "}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
