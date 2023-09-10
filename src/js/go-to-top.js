import { scroll, animate } from "motion";
const goToTop = document.querySelector(".go-top-btn");

scroll(({ y }) => {
  if (y.current > 500) {
    animate(".go-top-btn", { opacity: 1, visibility: "visible" }, { duration: 0.1 });
  } else {
    animate(".go-top-btn", { opacity: 0, visibility: "hidden" }, { duration: 0.1 });
  }
});

goToTop.addEventListener("click", () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
});
