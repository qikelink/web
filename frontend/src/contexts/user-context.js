"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getMentors,
  getQuickMentors,
  getMentor,
  getUser,
  isUserValid,
  getBookmarks,
  getCreatedOrganizations,
  getAllOrganizations,
  getCreatedSessions,
  getAllSessions,
  
} from "../../../backend/src/pocketbase";

// Create a context for managing user data
const UserContext = createContext();

// Custom hook to access user context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [quickMentors, setQuickMentors] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [createdSessions, setCreatedSessions] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [createdOrganization, setCreatedOrganization] = useState([]);
  const [allOrganization, setAllOrganization] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [selectedButtons, setSelectedButtons] = useState("");

  // Fetch user and mentor data on initial load
  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // get all mentors for the profile card
    getMentors()
      .then((res) => {
        setMentors(res);
      })
      .catch((error) => {
        console.error("Error fetching mentors data:", error);
      });

    // get all mentors available for quick services
    getQuickMentors()
      .then((res) => {
        setQuickMentors(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Quickmentors data:", error);
        setIsLoading(false);
      });
  }, [isUserValid]);

  // get other datas based on the specific user
  useEffect(() => {
    if (user.length > 0) {
      getMentor(user[0].id)
        .then((res) => {
          setMentor(res);
        })
        .catch((error) => {
          console.error("Error fetching mentor data:", error);
        });

      getBookmarks(user[0].id)
        .then((res) => {
          setBookmarks(res);
        })
        .catch((error) => {
          console.error("Error fetching bookmarks data:", error);
        });

      getCreatedOrganizations(user[0].id)
        .then((res) => {
          setCreatedOrganization(res);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
        });

      getAllOrganizations(user[0].id, user[0].email)
        .then((res) => {
          setAllOrganization(res);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
        });

      getCreatedSessions(user[0].id)
        .then((res) => {
          setCreatedSessions(res);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
        });

      getAllSessions(user[0].id, user[0].email)
        .then((res) => {
          setAllSessions(res);
          setIsLoadingUserData(false);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
          setIsLoadingUserData(false);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoadingUserData,
        quickMentors,
        mentors,
        mentor,
        bookmarks,
        setBookmarks,
        createdSessions,
        allSessions,
        createdOrganization,
        allOrganization,
        setAllOrganization,
        selectedButtons,
        setSelectedButtons,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
