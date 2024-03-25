import PocketBase from "pocketbase";

const url = "https://one-or.pockethost.io/";

export const client = new PocketBase(url);
client.autoCancellation(false);

export const isUserValid =
  client.authStore.model && client.authStore.model.id !== null;

 export const getImageUrl = (collectionId, recordId, fileName) => {
    return `${url}/api/files/${collectionId}/${recordId}/${fileName}`;
  };
  

export async function getUser() {
  return await client.collection("users").getFullList();
}

// to get all the verified mentors for the home card
export async function getMentors() {
  return await client
    .collection("mentors")
    .getFullList({ filter: "verified = True" });
}

// to get all the verified mentors available for quick service
export async function getQuickMentors() {
  return await client
    .collection("mentors")
    .getFullList({ filter: "verified = True && quickService = True" });
}

// to get a single mentor, for verification purposes
export async function getMentor(id) {
  return await client.collection("mentors").getFirstListItem(`user = '${id}'`);
}

export async function Signup(email, password) {
  const data = {
    email: email,
    password: password,
    passwordConfirm: password,
  };
  await client.collection("users").create(data);
}

// sign-in/sign-up with OAuth2 (Google, Facebook, etc.)
export async function SignupGoogle() {
  await client.collection("users").authWithOAuth2({
    provider: "google",
  });
}

export async function login(email, password, setIsUserValid) {
  await client.collection("users").authWithPassword(email, password);
  setIsUserValid(true);
}

export function signout(setIsUserValid) {
  client.authStore.clear();
  setIsUserValid(false);
}

export async function updateSetting(
  id,
  fullName,
  username,
  phoneNumber,
  bio,
  awards
) {
  const data = {
    fullName: fullName,
    username: username,
    phoneNumber: phoneNumber,
    bio: bio,
    awards: awards,
  };
  await client.collection("users").update(id, data);
}

export async function verifyRequest(
  fullName,
  username,
  phoneNumber,
  bio,
  awards,
  businessName,
  contact,
  account
) {
  const data = {
    fullName: fullName,
    username: username,
    phoneNumber: phoneNumber,
    bio: bio,
    awards: awards,
    businessName: businessName,
    contact: contact,
    account: account,
    user: client.authStore.model.id,
  };
  await client.collection("mentors").create(data);
}

export async function CreateBookmark(
  fullName,
  username,
  phoneNumber,
  bio,
  awards,
  businessName,
  contact,
  account
) {
  const data = {
    fullName: fullName,
    username: username,
    phoneNumber: phoneNumber,
    bio: bio,
    awards: awards,
    businessName: businessName,
    contact: contact,
    account: account,
    user: client.authStore.model.id,
  };
  await client.collection("bookmarks").create(data);
}

export async function RemoveBookmark(id) {
  await client.collection("bookmarks").delete(`${id}`);
}

export async function getBookmarks(id) {
  return await client
    .collection("bookmarks")
    .getFullList({ filter: `user = '${id}'` });
}

export async function createSession(title, purpose, sessionDate, participants) {
  const data = {
    title: title,
    purpose: purpose,
    sessionDate: sessionDate,
    owner: client.authStore.model.id,
    participants: participants,
  };
  await client.collection("sessions").create(data);
}

export async function updateSession(id, link, time, approved, done) {
  const data = {
    link: link,
    time: time,
    approved: approved,
    done: done,
  };
  await client.collection("sessions").update(id, data);
}

// hmmm learn brodie.. that like/contains
export async function getCreatedSessions(id) {
  return await client
    .collection("sessions")
    .getFullList({ filter: `owner = '${id}'` });
}

// using the like/cotains to fetch all sessions where user id exists
export async function getAllSessions(id) {
  return await client
    .collection("sessions")
    .getFullList({ filter: `owner = '${id}' || participants ~ '${id}'` });
}

export async function createOrganization(
  avatar,
  org_name,
  org_about,
  org_info,
  members
) {
  const data = {
    avatar: avatar,
    org_name: org_name,
    org_about: org_about,
    org_info: org_info,
    members: members,
    owner: client.authStore.model.id,
  };
  await client.collection("organization").create(data);
}

export async function getCreatedOrganizations(id) {
  return await client
    .collection("organization")
    .getFullList({ filter: `owner = '${id}'` });
}

// using the like/cotains to fetch all organizations where user id exists
export async function getAllOrganizations(id, email) {
  return await client
    .collection("organization")
    .getFullList({ filter: `owner = '${id}' || members ~ '${email}'` });
}
