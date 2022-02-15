const inputFields = document.querySelectorAll('form[name="contact-form"] input, textarea');

console.log(inputFields);
inputFields.forEach(i => {
  i.addEventListener('focus', (e) => {
    const captcha = document.querySelector('.grecaptcha-badge');
    captcha.classList.add('show');
  })
})

