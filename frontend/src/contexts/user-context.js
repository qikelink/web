"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getMentors,
  getMentor,
  getUser,
  isUserValid,
  getBookmarks,
  getCreatedOrganizations,
  getAllOrganizations,
  getCreatedSessions,
  getAllSessions,
  getOrganizations,
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
  const [createdSessions, setCreatedSessions] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [createdOrganization, setCreatedOrganization] = useState([]);
  const [allOrganization, setAllOrganization] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedButtons, setSelectedButtons] = useState("");

  // Fetch user and mentor data on initial load
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

  // get other datas based on the specific user
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

      getCreatedOrganizations(user[0].id)
        .then((res) => {
          setCreatedOrganization(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
          setIsLoading(false);
        });

      getAllOrganizations(user[0].id)
        .then((res) => {
          setAllOrganization(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
          setIsLoading(false);
        });

      getCreatedSessions(user[0].id)
        .then((res) => {
          setCreatedSessions(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
          setIsLoading(false);
        });

      getAllSessions(user[0].id)
        .then((res) => {
          setAllSessions(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
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
        createdSessions,
        allSessions,
        createdOrganization,
        allOrganization,
        selectedButtons,
        setSelectedButtons,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
