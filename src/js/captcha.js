const inputFields = document.querySelectorAll('form[name="contact-form"] input, textarea');

inputFields.forEach((i) => {
  i.addEventListener("focus", (e) => {
    // If the captcha symbol is shown, make space for the "go to top" button
    const body = document.querySelector("body");
    body.style.setProperty("--top-button-margin", "80px");

    const captcha = document.querySelector(".grecaptcha-badge");
    captcha.classList.add("show");
  });
});
