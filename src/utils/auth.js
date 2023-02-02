import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable }  from 'svelte/store';

function setLogin() {
  const { subscribe, set } = writable(false);

  return {
    subscribe,
    login: () => set(true),
    logout: () => set(false)
  }
}

export const loginStatus = setLogin()

export async function authenticateUser(username, password) {
    const resp = await fetch(
        PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identity: username,
            password
          })
        }
      );

      const res = await resp.json();

      if (resp.status == 200) {
        localStorage.setItem("auth", JSON.stringify({
            "token": res.token,
            "username": res.record.username,
            "userId": res.record.id
          }));

          loginStatus.login()
          return {
            success: true,
            res
          }
    } else {
        return {
            success: false,
            res: res
      }
  }
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth")
  if (auth) {
      return JSON.parse(auth)["token"]
  }
  return null
}
  
export async function isLoggedIn() {
  if (!getTokenFromLocalStorage()) {
    return false
  }

  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
      }
    );

    const res = await resp.json()
    if (resp.status == 200) {

      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "username": res.record.username,
        "userId": res.record.id
      }));

      loginStatus.login()

      return true
    }

    return false
  } catch {
    return false
  }
  }

  const emptyAuth = {
    "token": "",
    "username": "",
    "userId": "",
  }
  
  export function logOut() {
    localStorage.setItem("auth", JSON.stringify(emptyAuth));
    loginStatus.logout()
    localStorage.removeItem("newUser")
    return true
  }