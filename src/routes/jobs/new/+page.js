import { redirect } from "@sveltejs/kit";
import { isLoggedIn, isLocalStorageEmpty } from "../../../utils/auth.js";
import {redirected} from "../../../utils/alert";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  if (!(await isLoggedIn())) {
    redirected.set(true)
    throw redirect(307, '/login');
  } else if (await isLocalStorageEmpty()) {
    throw redirect(307, '/');
  }
}