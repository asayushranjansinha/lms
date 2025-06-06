"use client";

import StoreProvider from "@/state/redux";


const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};
export default ReduxProvider;
