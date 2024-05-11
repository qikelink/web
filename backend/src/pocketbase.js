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
  return await client
    .collection("users")
    .getOne(`${client.authStore.model.id}`, {});
}

export async function getExistingUsers() {
  return await client.collection("users").getFullList({});
}

// to get all the verified mentors for the home card
export async function getMentors() {
  return await client
    .collection("mentors")
    .getFullList({ filter: "display = True", expand: "users" });
}

// to get all the verified mentors available for quick service
export async function getQuickMentors() {
  return await client.collection("mentors").getFullList({
    filter: "display = True && quickService = True",
    expand: "users",
  });
}

// to get a single mentor, for verification purposes
export async function getMentor() {
  return await client
    .collection("mentors")
    .getFirstListItem(`users = '${client.authStore.model.id}'`);
}

export async function getMentorForBooking(id) {
  return await client
    .collection("mentors")
    .getFirstListItem(`users = '${id}'`, { expand: "users" });
}

export async function getGoogle() {
  return await client
    .collection("google")
    .getFirstListItem(`id = "9tazh4uvxf8pcxr"`);
}

export async function Signup(superEmail, email, superPassword, password) {
  const data = {
    superEmail: superEmail,
    email: email,
    superPassword: superPassword,
    password: password,
    passwordConfirm: password,
  };
  await createWelcomeNotification(
    "Welcome to Qikelink 🎉",
    undefined,
    undefined,
    email,
    undefined,
    undefined,
    "Welcome onboard! 🎉 Share your booking link and start engaging with your audience today! If you have any questions or need assistance, reach out via support@qikelink.com. Best regards, support team."
  );
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

export async function Xlogin(username, password, setIsUserValid) {
  await client.collection("users").authWithPassword(username, password);
  setIsUserValid(true);
}

export function signout(setIsUserValid) {
  client.authStore.clear();
  setIsUserValid(false);
}

export async function updateSetting(
  id,
  avatar,
  name,
  phoneNumber,
  bio,
  awards
) {
  const data = {
    avatar: avatar,
    name: name,
    phoneNumber: phoneNumber,
    bio: bio,
    awards: awards,
  };
  await client.collection("users").update(id, data);
}

export async function toggleQuickService(id, quickService) {
  const data = {
    quickService: quickService,
  };
  await client.collection("mentors").update(id, data);
}

export async function toggleGoogle(signIn) {
  const data = {
    signIn: signIn,
  };
  await client.collection("google").update("9tazh4uvxf8pcxr", data);
}

export async function verifyRequest(
  username,
  phoneNumber,
  bio,
  awards,
  contact,
  account,
  validId,
  rate,
  interests,
  rating
) {
  const data = {
    username: username,
    phoneNumber: phoneNumber,
    bio: bio,
    awards: awards,
    contact: contact,
    account: account,
    validId: validId,
    rate: rate,
    interests: interests,
    rating: rating,
    users: client.authStore.model.id,
  };
  await client.collection("mentors").create(data);
}

export async function updateVerifyRequest(
  id,
  username,
  phoneNumber,
  bio,
  awards,
  contact,
  account,
  validId,
  rate,
  interests,
  rating
) {
  const data = {
    username: username,
    phoneNumber: phoneNumber,
    bio: bio,
    awards: awards,
    contact: contact,
    account: account,
    validId: validId,
    rate: rate,
    interests: interests,
    rating: rating,
    users: client.authStore.model.id,
  };
  await client.collection("mentors").update(id, data);
}

export async function updateMentor(
  id,
  username,
  email,
  phoneNumber,
  bio,
  awards
) {
  const data = {
    username: username,
    email: email,
    phoneNumber: phoneNumber,
    bio: bio,
    awards: awards,
  };
  await client.collection("mentors").update(id, data);
}

export async function CreateBookmark(
  username,
  rate,
  bio,
  awards,
  interests,
  rating,
  mentor
) {
  const data = {
    username: username,
    rate: rate,
    bio: bio,
    awards: awards,
    interests: interests,
    rating: rating,
    mentor: mentor,
    users: client.authStore.model.id,
  };
  await client.collection("bookmarks").create(data);
}

export async function RemoveBookmark(id) {
  await client.collection("bookmarks").delete(`${id}`);
}

export async function getBookmarks(id) {
  return await client
    .collection("bookmarks")
    .getFullList({ filter: `users = '${id}'`, expand: "users, mentor.users" });
}

export async function createSession(
  mentor,
  rating,
  organization,
  purpose,
  sessionTime,
  sessionDate,
  host_name,
  host_bio,
  interval
) {
  const data = {
    mentor: mentor,
    rating: rating,
    organization: organization,
    purpose: purpose,
    sessionTime: sessionTime,
    sessionDate: sessionDate,
    host_name: host_name,
    host_bio: host_bio,
    interval: interval,
    owner: client.authStore.model.id,
  };
  await client.collection("sessions").create(data);
}

export async function updateSession(id, approved, done) {
  const data = {
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

// org upcoming session
export async function getOrgSessions(id) {
  return await client
    .collection("sessions")
    .getFirstListItem(`organization = '${id}'`, {
      expand: "organization,mentor.users,owner ",
      sort: "created",
    });
}

// using the like/cotains to fetch all sessions where user id exists expanding the org relation
export async function getAllSessions(id, email) {
  return await client.collection("sessions").getFullList({
    filter: `owner = '${id}' || mentor.users = '${id}' || organization.members ~ '${email}'`,
    expand: "organization,mentor.users,owner ",
  });
}

export async function createOrganization(
  avatar,
  username,
  org_about,
  members,
  interests
) {
  const data = {
    avatar: avatar,
    username: username,
    org_about: org_about,
    members: members,
    interests: interests,
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
  return await client.collection("organization").getFullList({
    filter: `owner = '${id}' || members ~ '${email}' || public = True`,
  });
}

export async function updateOrganization(
  id,
  avatar,
  username,
  org_about,
  org_info,
  members,
  questions
) {
  const data = {
    avatar: avatar,
    username: username,
    org_about: org_about,
    org_info: org_info,
    members: members,
    questions: questions,
    owner: client.authStore.model.id,
  };
  await client.collection("organization").update(id, data);
}

export async function removeOrganization(id) {
  await client.collection("organization").delete(`${id}`);
}

export async function getMeetingRequests(id) {
  return await client.collection("sessions").getFullList({
    filter: `mentor.users = '${id}' && approved = False && done = False`,
    expand: "owner,organization,mentor",
  });
}

export async function createNotification(
  title,
  messageSender,
  messageReceiver,
  email,
  target,
  organization,
  message
) {
  const data = {
    title: title,
    messageSender: messageSender,
    messageReceiver: messageReceiver,
    email: email,
    target: target,
    organization: organization,
    message: message,
    owner: client.authStore.model.id,
  };
  await client.collection("notifications").create(data);
}

export async function createWelcomeNotification(
  title,
  messageSender,
  messageReceiver,
  email,
  target,
  organization,
  message
) {
  const data = {
    title: title,
    messageSender: messageSender,
    messageReceiver: messageReceiver,
    email: email,
    target: target,
    organization: organization,
    message: message,
    owner: undefined,
  };
  await client.collection("notifications").create(data);
}

export async function getNotifications(id, email) {
  return await client.collection("notifications").getList(1, 6, {
    filter: `owner = '${id}' || email ~ '${email}' || target ~ '${id}' || organization.members ~ '${email}'`,
    expand: "organization, target, welcome",
    sort: "-created",
  });
}

export async function removeNotification(id) {
  await client.collection("notifications").delete(`${id}`);
}

export async function sendFeedback(feedback) {
  const data = {
    feedback: feedback,
    user: client.authStore.model.id,
  };
  await client.collection("feedback").create(data);
}

export async function sendQuestion(question, organization) {
  const data = {
    question: question,
    organization: organization,
    user: client.authStore.model.id,
  };
  await client.collection("questions").create(data);
}
