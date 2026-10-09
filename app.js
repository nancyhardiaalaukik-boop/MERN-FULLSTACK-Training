// ---------- Day 3: switch between login and register ----------

const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

function showRegisterView() {
  loginView.classList.add("hidden");
  registerView.classList.remove("hidden");
  document.title = "Register";
}

function showLoginView() {
  registerView.classList.add("hidden");
  loginView.classList.remove("hidden");
  document.title = "Login";
}

showRegister.addEventListener("click", function (event) {
  event.preventDefault(); // stops the link from jumping to the top of the page
  showRegisterView();
});

showLogin.addEventListener("click", function (event) {
  event.preventDefault();
  showLoginView();
});


// ---------- Day 4: form validation ----------

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// something@something.something (no spaces allowed)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// show a message under the field and turn its border red
function showError(input, message) {
  const group = input.closest(".form-group");
  group.querySelector(".error-msg").textContent = message;
  input.classList.add("invalid");
}

// remove the message and the red border
function clearError(input) {
  const group = input.closest(".form-group");
  group.querySelector(".error-msg").textContent = "";
  input.classList.remove("invalid");
}

// each check below returns true if the field is fine, false if not

function checkEmail(input) {
  const value = input.value.trim();

  if (value === "") {
    showError(input, "Email is required");
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(input, "Please enter a valid email (example: name@gmail.com)");
    return false;
  }

  clearError(input);
  return true;
}

function checkPassword(input) {
  const value = input.value;

  if (value === "") {
    showError(input, "Password is required");
    return false;
  }
  if (value.length < 6) {
    showError(input, "Password must be at least 6 characters");
    return false;
  }

  clearError(input);
  return true;
}

function checkName(input) {
  const value = input.value.trim();

  if (value === "") {
    showError(input, "Full name is required");
    return false;
  }
  if (value.length < 3) {
    showError(input, "Name must be at least 3 characters");
    return false;
  }

  clearError(input);
  return true;
}

function checkDob(input) {
  if (input.value === "") {
    showError(input, "Please select your date of birth");
    return false;
  }
  if (new Date(input.value) > new Date()) {
    showError(input, "Date of birth cannot be in the future");
    return false;
  }

  clearError(input);
  return true;
}

function checkGender() {
  const selected = document.querySelector('input[name="gender"]:checked');
  const firstRadio = document.querySelector('input[name="gender"]');

  if (!selected) {
    showError(firstRadio, "Please select your gender");
    return false;
  }

  clearError(firstRadio);
  return true;
}

function checkConfirm(passwordInput, confirmInput) {
  if (confirmInput.value === "") {
    showError(confirmInput, "Please confirm your password");
    return false;
  }
  if (confirmInput.value !== passwordInput.value) {
    showError(confirmInput, "Passwords do not match");
    return false;
  }

  clearError(confirmInput);
  return true;
}


// login form
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");
  const success = document.getElementById("loginSuccess");

  success.textContent = "";

  // run every check (no && here, so all errors show at once)
  const emailOk = checkEmail(email);
  const passwordOk = checkPassword(password);

  if (emailOk && passwordOk) {
    success.textContent = "Login successful!";
    loginForm.reset();
  }
});


// register form
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("regName");
  const email = document.getElementById("regEmail");
  const dob = document.getElementById("regDob");
  const password = document.getElementById("regPassword");
  const confirm = document.getElementById("regConfirm");
  const success = document.getElementById("registerSuccess");

  success.textContent = "";

  const nameOk = checkName(name);
  const emailOk = checkEmail(email);
  const dobOk = checkDob(dob);
  const genderOk = checkGender();
  const passwordOk = checkPassword(password);
  const confirmOk = checkConfirm(password, confirm);

  if (nameOk && emailOk && dobOk && genderOk && passwordOk && confirmOk) {
    success.textContent = "Account created successfully!";
    registerForm.reset();
  }
});


// remove the error as soon as the user starts fixing the field
const allInputs = document.querySelectorAll("#loginForm input, #registerForm input");

allInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    clearError(input);
  });
});