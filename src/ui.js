import { OBJECT_SIZE_FACTOR } from "./const.js";
import { SoundEffectManager } from "./soundEffectManager.js";
import {
  setSoundPreferences,
  setSoundPreferencesDebounced,
} from "./storage.js";
import { getCoordinateOnSeesaw } from "./utils.js";

const seesaw = document.querySelector("#seesaw");
const nextWeightInfo = document.querySelector("#next-weight-info");
const leftWeightInfo = document.querySelector("#left-weight-info");
const rightWeightInfo = document.querySelector("#right-weight-info");
const tiltAngleInfo = document.querySelector("#tilt-angle-info");
const resetButton = document.querySelector("#reset-button");
const historySection = document.querySelector("#game-history-section");
const muteButton = document.querySelector("#mute-btn");
const volumeInput = document.querySelector("#volume-input");
const distanceIndicator = document.querySelector("#distance-indicator");

export const renderObject = ({ positionX, weight, color }) => {
  const size = weight * OBJECT_SIZE_FACTOR + "px";
  const object = document.createElement("div");
  object.className = "object";
  /*   since we make the object's position absolute it will be positioned
   relative to seesaw (because objects are children of the seesaw) */
  object.style.left = positionX + "px";
  object.style.width = size;
  object.style.height = size;
  object.style.background = color;
  object.innerHTML = `<span class="label">${weight}</span>`;
  seesaw.appendChild(object);
};

export const renderHistoryItem = (content) => {
  const historyItem = document.createElement("div");
  historyItem.className = "history-item";
  historyItem.textContent = content;
  historySection.prepend(historyItem);
};

export const setAngle = (angle) => {
  tiltAngleInfo.textContent = `${angle.toFixed(2)}°`;
  seesaw.style.transform = `translateX(-50%) translateY(-50%) rotate(${angle}deg)`;
  seesaw.style.setProperty("--neg-angle", `${-angle}deg`);
};

export const setWeightInfo = ({ leftWeight, rightWeight }) => {
  leftWeightInfo.textContent = `${leftWeight} kg`;
  rightWeightInfo.textContent = `${rightWeight} kg`;
};

export const setNextWeightInfo = (nextWeight) => {
  nextWeightInfo.textContent = `${nextWeight} kg`;
};

export const getSeesawElement = () => {
  return seesaw;
};

export const updateMuteIcon = () => {
  if (SoundEffectManager.muted) {
    volumeInput.style.visibility = "hidden";
  } else {
    volumeInput.style.visibility = "visible";
  }
  muteButton.textContent = SoundEffectManager.muted ? "🔇" : "🔊";
};

export const updateVolumeInput = (value) => {
  volumeInput.value = value * 100;
};

export const clearObjects = () => {
  seesaw.querySelectorAll(".object").forEach((object) => object.remove());
};

export const clearHistory = () => {
  historySection
    .querySelectorAll(".history-item")
    .forEach((item) => item.remove());
};

//handlers

export const setResetButtonHandler = (handler) => {
  resetButton.addEventListener("click", handler);
};

export const setSeesawClickHandler = (handler) => {
  seesaw.addEventListener("click", handler);
};

export const setMuteButtonClickHandler = () => {
  muteButton.addEventListener("click", () => {
    SoundEffectManager.toggleMute();
    setSoundPreferences({ muted: SoundEffectManager.muted });
    updateMuteIcon();
  });
};

export const setVolumeInputClcikHandler = () => {
  volumeInput.addEventListener("input", () => {
    const value = volumeInput.value / 100;
    SoundEffectManager.setVolume(value);
    setSoundPreferencesDebounced({ volume: value });
  });
};

export const setSeesawMouseEventHandler = () => {
  seesaw.addEventListener("mouseleave", () => {
    distanceIndicator.style.width = "0";
  });
  seesaw.addEventListener("mousemove", (event) => {
    const angleDeg = parseFloat(tiltAngleInfo.textContent);
    const centerX = seesaw.clientWidth / 2;
    const centerY = seesaw.clientHeight / 2;
    const localX = getCoordinateOnSeesaw(event, seesaw, angleDeg);
    const distance = localX - centerX;
    /* 
    even we rotate the indicator acc to seesaw
    with CSS variables if mouse change side 
    we should rotate indicator to oposite direction */
    const thetaLocal = distance >= 0 ? 0 : Math.PI;
    distanceIndicator.style.transform = `translate(${centerX}px, ${centerY}px) rotate(${thetaLocal}rad)`;
    distanceIndicator.style.width = `${Math.abs(distance)}px`;
  });
};
