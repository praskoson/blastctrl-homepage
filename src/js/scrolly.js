import { animate, inView } from "motion";

function debounce(cb, delay = 250) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
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
      controls.playbackRate = Math.min(1 - progress, controls.playbackRate);
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

function boundedAdd(n1, n2, max) {
  const result = n1 + n2;
  if (result > max) {
    return result % max;
  } else if (result < 0) {
    return result + max;
  } else {
    return result;
  }
}

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

let isMobile = window.matchMedia("(any-pointer:coarse) and (max-width: 495px)").matches;

// let startX = 0;
if (isMobile) {
  // let restartingFn = debounce(() => {
  //   slowStart(control1);
  // }, 3500);
  // function touchStart(event) {
  //   slowStop(control1);
  //   startX = event.touches[0].pageX;
  //   restartingFn();
  // }
  // function touchMove(event) {
  //   let x = startX - event.touches[0].pageX;
  //   // console.log((x / 5000).toFixed(3));
  //   control1.currentTime = boundedAdd(control1.currentTime, x / 5000, duration);
  //   restartingFn();
  // }
  // marquee1.addEventListener("touchstart", touchStart, false);
  // marquee1.addEventListener("touchmove", touchMove, false);
  // // marquee1.addEventListener("touchend", startStoppingFn);
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
    control1.currentTime = boundedAdd(control1.currentTime, e.deltaX / 100, duration);
  });
  marquee2.addEventListener("wheel", (e) => {
    control2.currentTime = boundedAdd(control2.currentTime, -e.deltaX / 100, duration);
  });
}
