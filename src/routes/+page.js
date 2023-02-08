import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { alerts } from '../utils/alert';

export async function load({ fetch }) {
  alerts.clearAlert()
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records?sort=-created,id');
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