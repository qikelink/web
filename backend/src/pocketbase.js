import PocketBase from "pocketbase";

const url = "https://one-or.pockethost.io/";

export const client = new PocketBase(url);
client.autoCancellation(false);

export const isUserValid =
  client.authStore.model && client.authStore.model.id !== null;

export async function getUser() {
  return await client.collection("users").getFullList();
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

export async function editSetting(id, fullName, username, phoneNumber, bio, awards) {
  const data = {
    fullName: fullName,
    username: username,
    phoneNumber: phoneNumber,
     bio: bio,
    awards: awards
   
  }
  await client.collection("users").update(id, data)
}