import { animate, inView } from "motion";

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
