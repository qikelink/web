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
  getMeetingRequests,
  getNotifications,
} from "../../../backend/src/pocketbase";
import { usePathname } from "next/navigation";

// Create a context for managing user data
const UserContext = createContext();

// Custom hook to access user context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const pathname = usePathname();
  const [user, setUser] = useState({});
  const [mentors, setMentors] = useState([]);
  const [quickMentors, setQuickMentors] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [createdSessions, setCreatedSessions] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [createdOrganization, setCreatedOrganization] = useState([]);
  const [allOrganization, setAllOrganization] = useState([]);
  const [meetingRequests, setMeetingRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [selectedButtons, setSelectedButtons] = useState("");

  // Function to fetch data and cache it
  const fetchDataAndCache = async (
    fetchFunction,
    cacheSetter,
    cacheKey,
    expirationTime = 3600,
    ...args
  ) => {
    try {
      // Check if data is already cached and not expired
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      if (
        cachedData &&
        cachedTimestamp &&
        Date.now() - parseInt(cachedTimestamp) < expirationTime * 1000
      ) {
        cacheSetter(JSON.parse(cachedData));
        return;
      }

      // If not cached or expired, fetch data and cache it
      const data = await fetchFunction(...args);
      cacheSetter(data);
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(`${cacheKey}_timestamp`, Date.now());
    } catch (error) {
      console.error("Error fetching or caching data:", error);
    }
  };

  // Fetch user and mentor data on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isUserValid) {
          const userData = await getUser();
          setUser(userData);
          localStorage.setItem("user_cache", JSON.stringify(userData));
          localStorage.setItem("user_cache_timestamp", Date.now());

          const mentorData = await getMentor();
          setMentor(mentorData);
          localStorage.setItem("mentor_cache", JSON.stringify(mentorData));
          localStorage.setItem("mentor_cache_timestamp", Date.now());
        }

        fetchDataAndCache(getMentors, setMentors, "mentors_cache", 3600); // Cache for 1 hour
        fetchDataAndCache(
          getQuickMentors,
          setQuickMentors,
          "quick_mentors_cache",
          3600
        ); // Cache for 1 hour
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isUserValid]);

  // Fetch other data based on the specific user
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pathname === "/bookmark") {
          fetchDataAndCache(
            getBookmarks,
            setBookmarks,
            "bookmarks_cache",
            3600,
            user.id
          ); // Cache for 1 hour
        } else if (
          pathname === "/manager/Settings" ||
          pathname === "/manager/Organization" ||
          pathname === "/manager/Request"
        ) {
          fetchDataAndCache(
            getCreatedOrganizations,
            setCreatedOrganization,
            "created_org_cache",
            3600,
            user.id
          ); // Cache for 1 hour
          fetchDataAndCache(
            getAllOrganizations,
            setAllOrganization,
            "all_org_cache",
            3600,
            user.id,
            user.email
          ); // Cache for 1 hour
          fetchDataAndCache(
            getMeetingRequests,
            setMeetingRequests,
            "meeting_requests_cache",
            3600,
            user.id
          ); // Cache for 1 hour
        } else if (pathname === "/sessions") {
          fetchDataAndCache(
            getCreatedSessions,
            setCreatedSessions,
            "created_sessions_cache",
            3600,
            user.id
          ); // Cache for 1 hour
          fetchDataAndCache(
            getAllSessions,
            setAllSessions,
            "all_sessions_cache",
            3600,
            user.id,
            user.email
          ); // Cache for 1 hour
        } else if (pathname === "/") {
          // const email = `${ user.email || user.superEmail}`;

          fetchDataAndCache(
            getNotifications,
            setNotifications,
            "notifications_cache",
            3600,
            user.id,
            user.email
          ); // Cache for 1 hour
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingUserData(false);
      }
    };

    fetchData();
  }, [pathname, user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isLoadingUserData,
        quickMentors,
        setQuickMentors,
        mentors,
        setMentors,
        mentor,
        setMentor,
        bookmarks,
        setBookmarks,
        createdSessions,
        allSessions,
        setAllSessions,
        createdOrganization,
        allOrganization,
        setAllOrganization,
        meetingRequests,
        setMeetingRequests,
        notifications,
        setNotifications,
        selectedButtons,
        setSelectedButtons,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
