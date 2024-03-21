'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { getMentors, getUser, isUserValid } from "../../../backend/src/pocketbase";

// Create a context for managing user data
const UserContext = createContext();

// Custom hook to access user context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on initial load
  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      });

    getMentors()
      .then((res) => {
        setMentors(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching mentor data:", error);
        setIsLoading(false);
      });

  }, [isUserValid]);

  return (
    <UserContext.Provider value={{ user,  setUser, isLoading, mentors }}>
      {children}
    </UserContext.Provider>
  );
};
