document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toggleButton = document.getElementById("toggleButton");
    const toggleButtonLogin = document.getElementById("toggleButtonLogin");
    const signupSection = document.getElementById("signupSection");
    const formTitle = document.getElementById("formTitle");

    const backendPort = 5007; // Hardcoded backend port for now

    // Toggle to Sign-Up form
    toggleButton.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.style.display = "none";
        signupSection.style.display = "block";
        formTitle.innerText = "Sign Up";
    });

    // Toggle to Login form
    toggleButtonLogin.addEventListener("click", (e) => {
        e.preventDefault();
        signupSection.style.display = "none";
        loginForm.style.display = "block";
        formTitle.innerText = "Login";
    });

    // Handle Login Form Submission
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            fetch(`http://localhost:${backendPort}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Login successful") {
                    alert(`Logged in as ${email}`);
                    localStorage.setItem("authToken", data.token);
                    window.location.href = "index.html"; // Redirect to home page
                } else {
                    alert(data.message); // Show error message from backend
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred during login, please try again.");
            });
        } else {
            alert("Please enter both email and password.");
        }
    });

    // Handle Sign-Up Form Submission
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email-signup").value;
        const password = document.getElementById("password-signup").value;
    
        if (name && email && password) {
            try {
                const response = await fetch(`http://localhost:${backendPort}/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password }),
                });
                const data = await response.json();
                console.log(data); // Log the response to see what you get from the backend
                if (data.message === "User signed up successfully") {
                    alert("Signup successful! Please log in.");
                    loginForm.style.display = "block";
                    signupSection.style.display = "none";
                } else {
                    alert(data.message); // Show error message from backend
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred during sign-up, please try again.");
            }
        } else {
            alert("Please fill out all fields.");
        }
    });
    
});
