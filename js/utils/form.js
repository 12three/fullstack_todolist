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
    // const loader = form.querySelector('#loader');
    // const submitButton = form.querySelector('#submitButton');

    // loader.classList.remove('hide');
    // submitButton.classList.add('disabled');
}

export function unblockForm(form) {
    // const loader = form.querySelector('#loader');
    // const submitButton = form.querySelector('#submitButton');

    // loader.classList.add('hide');
    // submitButton.classList.remove('disabled');
}

//uk-form-danger
//uk-text-danger

export function resetError(form, field) {
    field.classList.remove('uk-form-danger');
    removeError(field);
}

export function getField(form, fieldName) {
    return form.querySelector(`input[name="${fieldName}"]`);
}

function addError(field, errorMsg) {
    const errorElem = `<span class="error uk-text-danger">${errorMsg}</p>`;

    field.parentNode.insertAdjacentHTML('afterend', errorElem);
}

function removeError(field) {
    const wrapper = field.parentNode.parentNode;
    const errorElem = wrapper.querySelector('.error');

    if (errorElem) wrapper.removeChild(errorElem);
}

export function showError(form, fieldName, errorMsg) {
    const field = getField(form, fieldName);

    field.classList.add('uk-form-danger');
    addError(field, errorMsg);
}

export function displayErrors(form, errors = []) {
    errors.forEach(({ param: fieldName, msg }) => {
        showError(form, fieldName, msg);
    });
}

