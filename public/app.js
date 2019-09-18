/*
    REGISTRATION
*/

const registrationForm = document.querySelector('form[name="registration"]');

if (registrationForm) {
    registrationForm.addEventListener('submit', registrationHandler);
    registrationForm.addEventListener('keypress', typingHandler);
}

async function registrationHandler(e) {
    e.preventDefault();

    const form = this;

    blockForm(form);
    const response = await sendForm(location.href, form);

    if (!response.ok) {
        await handleErrors(form, response);
    } else {
        alert('CREATED');
        // location.href = '/todos';
    }

    unblockForm(form);
}


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

function typingHandler(e) {
    const field = e.target;
    resetError(this, field);
}

async function handleErrors(form, res) {
    const body = await res.json();

    if (body.errors) {
        body.errors.forEach(({ param: fieldName, msg }) => {
            showError(form, fieldName, msg);
        });
    }
}

function showError(form, fieldName, errorMsg) {
    const field = getField(form, fieldName);
    const errorContainer = getErrorContainer(form, field);

    field.classList.add('invalid');
    if (errorContainer) errorContainer.dataset.error = errorMsg;
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
/*
    /REGISTRATION
*/

/*
    LOGIN
*/
const loginForm = document.querySelector('form[name="login"]');

if (loginForm) {
    loginForm.addEventListener('submit', loginHandler);
    loginForm.addEventListener('keypress', typingHandler);
}

async function loginHandler(e) {
    e.preventDefault();

    const form = this;

    blockForm(form);
    const response = await sendForm(location.href, form);

    if (!response.ok) {
        await handleErrors(form, response);
    } else {
        location.href = '/';
    }

    unblockForm(form);
};
/*
    /LOGIN
*/

/*
    LOGOUT
*/
const logoutButton = document.getElementById('logoutButton');

if (logoutButton) {
    logoutButton.addEventListener('click', async function (e) {
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