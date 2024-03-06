import PocketBase from "pocketbase"

const url = "https://one-or.pockethost.io/"

export const client = new PocketBase(url)
client.autoCancellation(false)


export const isUserValid = client.authStore.model && client.authStore.model.id !== null;


export async function getInfos() {
  return await client.collection("users").getFullList()
}


export async function Signup(email, password) {
  const data = {
    email: email,
    password: password,
    passwordConfirm: password,
  }
  await client.collection("users").create(data)
}


export async function login(email, password, setIsUserValid) {
  await client.collection("users").authWithPassword(email, password);
  setIsUserValid(true);
}


export function signout(setIsUserValid) {
  client.authStore.clear()
  setIsUserValid(false);
}


export async function createRequestCollab(name, social_handle, contact, about) {
  const data = {
    name: name,
    social_handle: social_handle,
    contact: contact,
    about: about,
  }
  await client.collection("y_requests").create(data)
}
