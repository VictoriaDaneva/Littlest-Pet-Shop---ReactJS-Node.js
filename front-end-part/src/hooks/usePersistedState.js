import { useState } from "react";

export default function usePersistedState(stateKey, initialState) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(stateKey);
    if (!persistedState) {
      console.log(
        `No persisted state found for [${stateKey}]. Using initial state.`
      );
      return typeof initialState === "function" ? initialState() : initialState;
    }

    const persistedStateData = JSON.parse(persistedState);
    console.log(
      `Loaded state from localStorage [${stateKey}]:`,
      persistedStateData
    ); // ✅ Debugging Step

    return persistedStateData;
  });

  const setPersistedState = (input) => {
    const data = typeof input === "function" ? input(state) : input;

    console.log(`Saving state to localStorage [${stateKey}]:`, data); // ✅ Debugging Step

    localStorage.setItem(stateKey, JSON.stringify(data));
    setState(data);
  };

  return [state, setPersistedState];
}
