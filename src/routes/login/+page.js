import { redirect } from "@sveltejs/kit";
import { isLoggedIn } from "../../utils/auth.js";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  if (await isLoggedIn()) {
    throw redirect(307, '/');
  }
}