export const ssr = false;
import { isLocalStorageEmpty } from './../utils/auth.js'


export async function load() {
  await isLocalStorageEmpty()
}