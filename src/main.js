import { SEESAW_CENTER_POINT } from "./const.js";
import { clampAngle, getRandomInt } from "./utils.js";

const seesaw = document.querySelector("#seesaw");
const objects = [];

seesaw.addEventListener("click", (event) => {
  const seesawHitBox = seesaw.getBoundingClientRect();
  const distanceToLeftEdge = event.clientX - seesawHitBox.left;

  /* 
  distanceToCenter will be used in tork calculation 
  left -> +
  right -> - 
  */
  const distanceToCenter = SEESAW_CENTER_POINT - distanceToLeftEdge;

  const weight = getRandomInt();

  const object = document.createElement("div");
  object.className = "object";
  //since we make the object's position absolute it will be positioned relative to seesaw (because objects are children of the seesaw)
  object.style.left = distanceToLeftEdge + "px";
  object.textContent = weight;
  seesaw.appendChild(object);
  objects.push({ distanceToCenter, weight });
  updateSeesawTilt();
});

const updateSeesawTilt = () => {
  const tiltAngle = calculateSeesawAngle(objects);
  document.querySelector("#tilt-angle-info").textContent = tiltAngle.toFixed(2);
  seesaw.style.transform = `translateX(-50%) translateY(-50%) rotate(${tiltAngle}deg)`;
};

const calculateSeesawAngle = (objects) => {
  /*   filter out the left and right objects
   then sum the torque values of them.
  abs is used since torque is absolute  */
  const leftTorque = objects
    .filter((object) => object.distanceToCenter > 0)
    .reduce(
      (sum, object) => sum + object.weight * Math.abs(object.distanceToCenter),
      0
    );
  const rightTorque = objects
    .filter((object) => object.distanceToCenter < 0)
    .reduce(
      (sum, object) => sum + object.weight * Math.abs(object.distanceToCenter),
      0
    );

  const torqueDiff = rightTorque - leftTorque;
  return clampAngle(torqueDiff);
};
