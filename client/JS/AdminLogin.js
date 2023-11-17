const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginFormSubmit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.usernameInput.value;
    const password = loginForm.passwordInput.value;

    if (username === "admin" && password === "admin") {
        window.location.href="AdminInventoryDashboard.html"
    } else {
        alert("Wrong username or password");
    }
})