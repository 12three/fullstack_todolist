/*
    REGISTRATION
*/

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', registrationHandler);
registrationForm.addEventListener('keypress', typingHandler);

function registrationHandler(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(this));

    fetch('/registration', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(formData),
    })
        .then(handleErrors(this))
        .then(res => {
            // TODO: redirect
        })
        .catch(err => console.error(err));
}

function typingHandler(e) {
    const field = e.target;
    resetError(this, field);
}

 function handleErrors(form) {
     return async function(res) {
         if (res.ok) return res;

         const body = await res.json();

         if (body.errors) {
             body.errors.forEach(({ param: fieldName, msg }) => {
                 showError(form, fieldName, msg);
             });
         }

         return body;
     };
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
/*
    /REGISTRATION
*/