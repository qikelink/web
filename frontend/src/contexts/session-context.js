'use client'

import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext();

export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <SessionContext.Provider value={{ session, status }}>
      {children}
    </SessionContext.Provider>
  );
};
