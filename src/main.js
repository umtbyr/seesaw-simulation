import { SEESAW_CENTER_POINT } from "./const.js";
import { getRandomInt } from "./utils.js";

const seesaw = document.querySelector("#seesaw");

seesaw.addEventListener("click", (event) => {
  const seesawHitBox = seesaw.getBoundingClientRect();
  const distanceToLeftEdge = event.clientX - seesawHitBox.left;

  /* 
  distanceToCenter will be used in tork calculation 
  left -> +
  right -> - 
  */
  const distanceToCenter = SEESAW_CENTER_POINT - distanceToLeftEdge;

  console.log(distanceToCenter);

  const object = document.createElement("div");
  object.className = "object";
  //since we make the object's position absolute it will be positioned relative to seesaw
  object.style.left = distanceToLeftEdge + "px";
  object.textContent = getRandomInt();
  seesaw.appendChild(object);
});
