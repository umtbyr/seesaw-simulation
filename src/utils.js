import { MAX_TILT_ANGLE, TILT_SENSITIVITY } from "./const.js";

export const getRandomInt = () => {
  return Math.floor(Math.random() * 10) + 1;
};

export const clampAngle = (torqueDiff) => {
  let angle = torqueDiff / TILT_SENSITIVITY;
  if (angle > MAX_TILT_ANGLE) angle = 30;
  if (angle < -MAX_TILT_ANGLE) angle = -30;
  return angle;
};
