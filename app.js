// Day 3: switch between login and register without reloading the page//
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