import { redirect } from "@sveltejs/kit";
import { isLoggedIn, isLocalStorageEmpty } from "../../../utils/auth.js";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  if (!(await isLoggedIn())) {
    throw redirect(307, '/login');
  } else if (await isLocalStorageEmpty()) {
    throw redirect(307, '/');
  }
}