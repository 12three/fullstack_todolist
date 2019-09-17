/*
    REGISTRATION
*/

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', registrationHandler);
registrationForm.addEventListener('keypress', typingHandler);

async function registrationHandler(e) {
    e.preventDefault();

    const form = this;
    const formData = Object.fromEntries(new FormData(form));

    blockForm(form);
    const response = await fetch('/registration', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
    })

    if (!response.ok) {
        await handleErrors(form, response);
    } else {
        alert('CREATED');
        // location.href = '/todos';
    }

    unblockForm(form);
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

    console.log(loader.classList);
    loader.classList.add('hide');
    submitButton.classList.remove('disabled');
}
/*
    /REGISTRATION
*/