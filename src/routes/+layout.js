export const ssr = false;

import { isLoggedIn } from "../utils/auth.js";
import {isUserRedirectedFromPostJob} from "../utils/alert.js"

export async function load() {
    if (await isLoggedIn() == true) {
      isUserRedirectedFromPostJob.set(false)
    }
}