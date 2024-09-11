// Get references to the login and registration forms
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Check if user is remembered
document.addEventListener('DOMContentLoaded', () => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('loginUsername').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
});

// Function to show error message
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Function to hide error message
function hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

// Function to show feedback message
function showFeedback(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Function to hide feedback message
function hideFeedback(element) {
    element.textContent = '';
    element.style.display = 'none';
}

// Function to validate username
function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

// Function to validate password
function isValidPassword(password) {
    return password.length >= 8 && !password.includes(' ');
}

// Add event listener for the login form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginUsernameError = document.getElementById('loginUsernameError');
    const loginPasswordError = document.getElementById('loginPasswordError');
    const loginFeedback = document.getElementById('loginFeedback');

    // Clear previous errors and feedback
    hideError(loginUsernameError);
    hideError(loginPasswordError);
    hideFeedback(loginFeedback);

    // Validate inputs
    if (!isValidUsername(username)) {
        showError(loginUsernameError, 'Invalid username');
        return;
    }
    if (!isValidPassword(password)) {
        showError(loginPasswordError, 'Invalid password');
        return;
    }

    // Retrieve stored user data from localStorage
    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const user = JSON.parse(storedUser);
        // Check if the entered password matches the stored password
        if (user.password === password) {
            showFeedback(loginFeedback, 'Login successful');
            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            } else {
                localStorage.removeItem('rememberedUser');
            }
            window.location.href = 'dashboard.html'; // Redirect to the dashboard page
        } else {
            showError(loginPasswordError, 'Incorrect password');
        }
    } else {
        showError(loginUsernameError, 'User not found');
    }
});

// Add event listener for the registration form submission
registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const registerUsernameError = document.getElementById('registerUsernameError');
    const registerPasswordError = document.getElementById('registerPasswordError');
    const registerFeedback = document.getElementById('registerFeedback');

    // Clear previous errors and feedback
    hideError(registerUsernameError);
    hideError(registerPasswordError);
    hideFeedback(registerFeedback);

    // Validate inputs
    if (!isValidUsername(username)) {
        showError(registerUsernameError, 'Invalid username. Must be 3-20 characters long and can contain letters, numbers, and underscores.');
        return;
    }
    if (!isValidPassword(password)) {
        showError(registerPasswordError, 'Password must be at least 8 characters long and must not contain spaces.');
        return;
    }

    // Simple validation to check if fields are non-empty
    if (username && password) {
        // Store user data in localStorage
        const user = { username, password };
        localStorage.setItem(username, JSON.stringify(user));
        console.log('Registration successful');
        showFeedback(registerFeedback, 'Registration successful. Please log in.');
    } else {
        alert('Please enter both username and password');
    }
});

// Add event listener for "Forgot Password" link
document.querySelector('.forgot-password').addEventListener('click', function(event) {
    event.preventDefault();
    alert('A password reset link has been sent to your email address.');
});
