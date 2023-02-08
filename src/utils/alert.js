import { writable } from 'svelte/store';

function initializeAlertStore() {
  const { subscribe, set } = writable(0);

  return {
    subscribe,
    setAlert: (message, type) => set({ message, type }),
    clearAlert: () => set({ message: null, type: null })
  };
}

export const alerts = initializeAlertStore();