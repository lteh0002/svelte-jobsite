export const ssr = false;

import { isLoggedIn } from "../utils/auth.js";
import {redirected} from "../utils/alert.js"

export async function load() {
    await isLoggedIn()
    if (isLoggedIn() == true) {
      redirected.set(false)
    }
}