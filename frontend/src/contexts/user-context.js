"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getMentors,
  getMentor,
  getUser,
  isUserValid,
  getBookmarks,
} from "../../../backend/src/pocketbase";

// Create a context for managing user data
const UserContext = createContext();

// Custom hook to access user context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedButtons, setSelectedButtons] = useState();

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

    // get all mentors for the profile card
    getMentors()
      .then((res) => {
        setMentors(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching mentors data:", error);
        setIsLoading(false);
      });
  }, [isUserValid]);

  // get specific mentor data on user login
  useEffect(() => {
    if (user.length > 0) {
      getMentor(user[0].id)
        .then((res) => {
          setMentor(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching mentor data:", error);
          setIsLoading(false);
        });

      getBookmarks(user[0].id)
        .then((res) => {
          setBookmarks(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookmarks data:", error);
          setIsLoading(false);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        mentors,
        mentor,
        bookmarks,
        setBookmarks,
        selectedButtons,
        setSelectedButtons,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
