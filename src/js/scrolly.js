import { animate, inView } from "motion";

function throttle(cb, delay = 250) {
  let shouldWait = false;

  return (...args) => {
    if (shouldWait) return;

    cb(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

/**
 * @type {import("motion").AnimationControls}
 */
let control1;
/**
 * @type {import("motion").AnimationControls}
 */
let control2;
let scrollWrapper = document.querySelector(".scroll-wrapper");
let marquee1 = document.querySelector(".marquee-1");
let marquee2 = document.querySelector(".marquee-2");

function slowStop(controls, duration = 0.8) {
  animate(
    (progress) => {
      controls.playbackRate = 1 - progress;
    },
    { duration }
  );
}
function slowStart(controls, duration = 0.8) {
  animate(
    (progress) => {
      controls.playbackRate = progress;
    },
    { duration }
  );
}
const duration = 25;

inView(scrollWrapper, () => {
  control1 = animate(
    ".marquee-1 .scroll-container",
    { transform: "translateX(-100%)" },
    { duration, easing: "linear", repeat: Infinity }
  );

  control2 = animate(
    ".marquee-2 .scroll-container",
    { transform: "translateX(-100%)" },
    { duration, easing: "linear", repeat: Infinity, direction: "reverse" }
  );

  () => {
    control1.pause();
    control2.pause();
  };
});

let isMobile = window.matchMedia("(any-pointer:coarse)").matches;

if (isMobile) {
  // let start = { x: 0, y: 0 };
  // function touchStart(event) {
  //   control2.pause();
  //   start.x = event.touches[0].pageX;
  //   start.y = event.touches[0].pageY;
  // }
  // function touchMove(event) {
  //   event.preventDefault();
  //   let x = start.x - event.touches[0].pageX;
  //   if (control2.currentTime) control2.currentTime = (control2.currentTime - x / 2000) % duration;
  // }
  // marquee2.addEventListener("touchstart", touchStart, false);
  // marquee2.addEventListener("touchmove", touchMove, false);
  // marquee2.addEventListener("touchend", () => {
  //   setTimeout(() => slowStart(control2), 2000);
  // });
} else {
  marquee1.addEventListener("mouseenter", () => {
    slowStop(control1);
  });
  marquee1.addEventListener("mouseleave", () => {
    slowStart(control1);
  });
  marquee2.addEventListener("mouseenter", () => {
    slowStop(control2);
  });
  marquee2.addEventListener("mouseleave", () => {
    slowStart(control2);
  });

  marquee1.addEventListener("wheel", (e) => {
    control1.currentTime = Math.max(control1.currentTime + e.deltaX / 100, duration);
  });
  marquee2.addEventListener("wheel", (e) => {
    control2.currentTime = Math.max(control2.currentTime - e.deltaX / 100, duration);
  });
}
