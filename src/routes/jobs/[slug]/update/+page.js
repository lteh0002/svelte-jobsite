import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { redirect } from "@sveltejs/kit";
import { isLocalStorageEmpty } from '../../../../utils/auth';

export async function load({ fetch, params }) {
  if (await isLocalStorageEmpty()) {
    throw redirect(307, '/');
  }

  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);

  let obtainDataFromLocalStrage= localStorage.getItem("auth")
  let parseJSON = JSON.parse(obtainDataFromLocalStrage)
  let userID = parseJSON.userId

  const res = await resp.json();
  if (res.user !== userID) {
    throw redirect(307, `/jobs/${res.id}`);
  }
    
  if (resp.status == 200) {
    return {
      job: res
    }
  } else {
    return {
      jobs: []
    }
  }
}


