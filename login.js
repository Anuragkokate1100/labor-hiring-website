document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // Toggle to Sign-Up form
    document.getElementById("signupLink").addEventListener("click", (event) => {
        event.preventDefault();
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });

    // Toggle to Login form
    document.getElementById("loginLink").addEventListener("click", (event) => {
        event.preventDefault();
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Handle Login Form Submission
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            alert(`Logged in with email: ${email}`);
            loginForm.reset(); // Clear form
            window.location.href = "index.html"; // Redirect to homepage after login
        } else {
            alert("Please enter email and password.");
        }
    });

    // Handle Sign-Up Form Submission
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email-signup").value;
        const password = document.getElementById("password-signup").value;

        if (name && email && password) {
            alert(`Signed up with email: ${email}`);
            signupForm.reset(); // Clear form
            signupForm.style.display = "none";
            loginForm.style.display = "block";
        } else {
            alert("Please fill out all fields.");
        }
    });
});
