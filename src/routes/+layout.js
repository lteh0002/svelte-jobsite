export const ssr = false;

import { isLoggedIn } from "../utils/auth.js";
import { isUserRedirectedFromPostJob } from "../utils/alert.js"
import { isLocalStorageEmpty } from './../utils/auth.js'


export async function load() {
  await isLocalStorageEmpty()
  if (await isLoggedIn() == true) {
    isUserRedirectedFromPostJob.set(false)
  }
}