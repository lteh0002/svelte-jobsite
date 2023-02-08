import { redirect } from "@sveltejs/kit";
import { isLoggedIn } from "../../../utils/auth.js";
import { alerts } from "../../../utils/alert.js";

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
  if (!(await isLoggedIn())) {
    alerts.setAlert("Please login/sign up to create jobs", "warning")
    throw redirect(307, '/login');
  }
}