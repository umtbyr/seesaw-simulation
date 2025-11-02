const STORAGE_KEY = "seesaw-game-state";

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.log("Failed to save the game state! ", err);
  }
};

export const getState = () => {
  try {
    const state = localStorage.getItem(STORAGE_KEY);
    if (!state) return null;
    return JSON.parse(state);
  } catch (error) {
    console.log("Failed to load the game state! ", error);
    return null;
  }
};
