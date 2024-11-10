document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const toggleButton = document.getElementById("toggleButton");
    const toggleButtonLogin = document.getElementById("toggleButtonLogin");
    const signupSection = document.getElementById("signupSection");
    const formTitle = document.getElementById("formTitle");
    
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
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            fetch("http://localhost:5007/login", {
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
            alert("Please enter email and password.");
        }
    });

    // Handle Sign-Up Form Submission
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email-signup").value;
        const password = document.getElementById("password-signup").value;

        if (name && email && password) {
            fetch("http://localhost:5007/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "User signed up successfully") {
                    alert("Sign-up successful, now log in.");
                    signupForm.reset(); // Reset form
                    signupSection.style.display = "none";
                    loginForm.style.display = "block";
                    formTitle.innerText = "Login";
                } else {
                    alert(data.message); // Show error message from backend
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred during sign-up, please try again.");
            });
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Fetch Protected User Profile
    const fetchUserProfile = () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please login first.");
            window.location.href = "login.html"; // Redirect to login if no token
            return;
        }

        fetch("http://localhost:5007/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.user) {
                // Display user profile information
                document.getElementById("profileName").textContent = data.user.name;
                document.getElementById("profileEmail").textContent = data.user.email;
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error fetching profile:", error);
            alert("An error occurred while fetching the profile.");
        });
    };

    // Delete Account
    const deleteAccount = () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please login first.");
            window.location.href = "login.html"; // Redirect to login if no token
            return;
        }

        fetch("http://localhost:5007/delete-account", {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Account deleted successfully") {
                alert("Your account has been deleted.");
                localStorage.removeItem("authToken"); // Remove token from localStorage
                window.location.href = "signup.html"; // Redirect to signup page
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error deleting account:", error);
            alert("An error occurred while deleting the account.");
        });
    };

    // Call the function to fetch user profile (on a profile page)
    if (window.location.pathname === "/profile.html") {
        fetchUserProfile();
    }

    // Delete account event listener (on delete page)
    if (window.location.pathname === "/delete-account.html") {
        const deleteButton = document.getElementById("deleteAccountButton");
        deleteButton.addEventListener("click", deleteAccount);
    }

    // Hamburger Menu (Mobile)
    const hamburger = document.getElementById("hamburger");
    const menuList = document.getElementById("menu-list");

    hamburger.addEventListener("click", () => {
        menuList.classList.toggle("show");
    });

    // Ensure that the menu closes on larger screen sizes
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            menuList.classList.remove("show");
        }
    });
});
