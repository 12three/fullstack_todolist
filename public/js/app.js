'use strict';

console.log('todo!');

async function sendForm(url, form) {
    const formData = Object.fromEntries(new FormData(form));

    return await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
    });
}

function blockForm(form) {
    const loader = form.querySelector('#loader');
    const submitButton = form.querySelector('#submitButton');

    loader.classList.remove('hide');
    submitButton.classList.add('disabled');
}

function unblockForm(form) {
    const loader = form.querySelector('#loader');
    const submitButton = form.querySelector('#submitButton');

    loader.classList.add('hide');
    submitButton.classList.remove('disabled');
}

function resetError(form, field) {
    const errorContainer = getErrorContainer(form, field);

    field.classList.remove('invalid');
    if (errorContainer) errorContainer.dataset.error = '';
}

function getField(form, fieldName) {
    return form.querySelector(`input[name="${fieldName}"]`);
}

function getErrorContainer(form, field) {
    return field.parentNode.querySelector('.error-container');
}

function showError(form, fieldName, errorMsg) {
    const field = getField(form, fieldName);
    const errorContainer = getErrorContainer(form, field);

    field.classList.add('invalid');
    if (errorContainer) errorContainer.dataset.error = errorMsg;
}

function displayErrors(form, errors = []) {
    errors.forEach(({ param: fieldName, msg }) => {
        showError(form, fieldName, msg);
    });
}

/*
    LOGIN
*/
const loginForm = document.querySelector('form[name="login"]');

if (loginForm) {
    loginForm.addEventListener('submit', loginHandler);
    loginForm.addEventListener('keypress', function(e) {
        resetError(this, e.target);
    });
}

async function loginHandler(e) {
    e.preventDefault();

    const form = this;

    blockForm(form);
    const response = await sendForm(location.href, form);

    if (!response.ok) {
        const body = await response.json();
        displayErrors(form, body.errors);
    } else {
        location.href = '/';
    }

    unblockForm(form);
}
/*
    /LOGIN
*/

/*
    LOGOUT
*/
const logoutButton = document.getElementById('logoutButton');

if (logoutButton) {
    logoutButton.addEventListener('click', async function(e) {
        e.preventDefault();

        await fetch('/logout', {
            method: 'POST',
        });

        location.href = '/';
    });
}
/*
    /LOGOUT
*/

const registrationForm = document.querySelector('form[name="registration"]');

if (registrationForm) {
    registrationForm.addEventListener('submit', registrationHandler);
    registrationForm.addEventListener('keypress', function (e) { resetError(this, e.target); });
}

async function registrationHandler(e) {
    e.preventDefault();

    const form = this;

    blockForm(form);
    const response = await sendForm(location.href, form);

    if (!response.ok) {
        const body = await response.json();
        displayErrors(form, body.errors);
    } else {
        location.href = '/';
    }

    unblockForm(form);
}
