// scripts.js
function toggleForm(form) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');

    if (form === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        loginToggle.classList.remove('active');
        signupToggle.classList.add('active');
    }
}

function handleSubmit(event, form) {
    event.preventDefault();
    if (form === 'login') {
        alert('Login form submitted');
    } else {
        alert('Sign up form submitted');
    }
}
