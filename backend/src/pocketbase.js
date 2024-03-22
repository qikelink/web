import PocketBase from "pocketbase";

const url = "https://one-or.pockethost.io/";

export const client = new PocketBase(url);
client.autoCancellation(false);

export const isUserValid =
  client.authStore.model && client.authStore.model.id !== null;

export async function getUser() {
  return await client.collection("users").getFullList();
}

// to get all the verified mentors for the home card
export async function getMentors() {
  return await client
    .collection("mentors")
    .getFullList({ filter: "verified = True" });
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

export async function editSetting(
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
