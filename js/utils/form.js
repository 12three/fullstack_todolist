export async function sendForm(url, form) {
    const formData = Object.fromEntries(new FormData(form));

    return await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
    });
}

export function blockForm(form) {
    const loader = form.querySelector('#loader');
    const submitButton = form.querySelector('#submitButton');

    loader.classList.remove('hide');
    submitButton.classList.add('disabled');
}

export function unblockForm(form) {
    const loader = form.querySelector('#loader');
    const submitButton = form.querySelector('#submitButton');

    loader.classList.add('hide');
    submitButton.classList.remove('disabled');
}

export function resetError(form, field) {
    const errorContainer = getErrorContainer(form, field);

    field.classList.remove('invalid');
    if (errorContainer) errorContainer.dataset.error = '';
}

export function getField(form, fieldName) {
    return form.querySelector(`input[name="${fieldName}"]`);
}

export function getErrorContainer(form, field) {
    return field.parentNode.querySelector('.error-container');
}

export function showError(form, fieldName, errorMsg) {
    const field = getField(form, fieldName);
    const errorContainer = getErrorContainer(form, field);

    field.classList.add('invalid');
    if (errorContainer) errorContainer.dataset.error = errorMsg;
}

export function displayErrors(form, errors = []) {
    errors.forEach(({ param: fieldName, msg }) => {
        showError(form, fieldName, msg);
    });
}

