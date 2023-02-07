import { redirect } from "@sveltejs/kit";
import { isLoggedIn } from "../../../utils/auth.js";
import {isUserRedirectedFromPostJob} from "../../../utils/alert";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  if (!(await isLoggedIn())) {
    isUserRedirectedFromPostJob.set(true)
    throw redirect(307, '/login');
  }
}