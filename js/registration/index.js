import { blockForm, unblockForm, sendForm, displayErrors, resetError } from '../utils/form';

const registrationForm = document.querySelector('form[name="registration"]');

if (registrationForm) {
    registrationForm.addEventListener('submit', registrationHandler);
    registrationForm.addEventListener('keypress', function (e) { resetError(this, e.target) });
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

