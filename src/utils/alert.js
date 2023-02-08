import { writable } from 'svelte/store';

function initializeAlertStore() {
  const defaultValue = { message: null, type: null }
  const { subscribe, set } = writable(defaultValue);

  return {
    subscribe,
    setAlert: (message, type) => set({ message, type }),
    clearAlert: () => set({ message: null, type: null })
  };
}

export const alerts = initializeAlertStore();