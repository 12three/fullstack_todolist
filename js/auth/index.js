import { blockForm, unblockForm, sendForm, displayErrors, resetError } from '../utils/form';

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
