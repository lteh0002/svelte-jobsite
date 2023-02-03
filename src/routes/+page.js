import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { isLocalStorageEmpty } from '../utils/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
  if (await isLocalStorageEmpty()) {
    throw redirect(307, '/');
  }
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records');

  const res = await resp.json();
  if (resp.status == 200) {
    return {
      jobs: res.items
    }
  } else {
    return {
      jobs: []
    }
  }
}