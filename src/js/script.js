const responsive = () => {
  const x = document.getElementById('navbar');
  x.classList.toggle('visible');
};

const thankyou = document.querySelector('.thank-you');
const submitError = document.querySelector('.submit-error');
const privacy = document.querySelector('.privacy');
const form = document.querySelector('form[name="contact-form"]');
const formWrapper = document.querySelector('.form-wrapper');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const companyInput = document.querySelector('input[name="company"]');
const messageInput = document.querySelector('textarea[name="message"]');
const inputUrl = document.querySelector('input[name="website_url"]');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => responsive());

const inputs = [nameInput, emailInput, messageInput];

const isValidEmail = email => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

let isFormValid = false;
let isValidationOn = false;

const resetInput = element => {
  element.classList.remove('invalid');
  element.nextElementSibling.classList.add('hidden');
};

const validateInputs = () => {
  if (!isValidationOn) {
    return;
  }

  isFormValid = true;
  inputs.forEach(i => resetInput(i));

  if (!nameInput.value) {
    isFormValid = false;
    nameInput.classList.add('invalid');
    nameInput.nextElementSibling.classList.remove('hidden');
  }

  if (!isValidEmail(emailInput.value)) {
    isFormValid = false;
    emailInput.classList.add('invalid');
    emailInput.nextElementSibling.classList.remove('hidden');
  }

  if (!messageInput.value) {
    isFormValid = false;
    messageInput.classList.add('invalid');
    messageInput.nextElementSibling.classList.remove('hidden');
  }
};

inputs.forEach(i => {
  i.addEventListener('input', () => {
    validateInputs();
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  grecaptcha.ready(function () {
    grecaptcha
      .execute('6Ld_zVoeAAAAAF-IMNuzhfg-infmB5VKZG5CEEvC', { action: 'submit' })
      .then(function (token) {
        // Add your logic to submit to your backend server here.
        isValidationOn = true;
        validateInputs();

        if (isFormValid) {
          const name = nameInput.value.trim();
          const email = emailInput.value.trim();
          const company = companyInput.value.trim();
          const message = messageInput.value.trim();
          const websiteUrl = inputUrl.checked;

          submitToApi({ name, email, company, message, websiteUrl, token });
        }
      });
  });
});

const submitToApi = data => {
  const url =
    'https://bck62jcx3i.execute-api.eu-central-1.amazonaws.com/contact';
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const raw = JSON.stringify(data);

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow',
  };

  fetch(url, requestOptions)
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error(response.status + ' ' + response.statusText);
    })
    .then(result => {
      form.classList.add('hidden');
      thankyou.classList.remove('hidden');
      thankyou.classList.add('appear');
      submitError.classList.add('removed');
      privacy.classList.add('hidden');
    })
    .catch(error => {
      console.error(error);
      submitError.classList.remove('removed');
    });
};

const styles = `
  input[name="website_url"] {
    display: none !important;
  }
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.body.appendChild(styleSheet);
