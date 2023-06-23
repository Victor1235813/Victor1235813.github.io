const project = {
    name: undefined,
    tech: undefined,
    description: undefined
};

var project1 = Object.create(project);
project1.name = "portfolio";
project1.tech = "HTML, " + "CSS, " + "JavaScript.";
project1.description = "create a portfolio";

/* process contact form information
*/
// define a project to group all the input fields
const fields = {};
// assign values to the properties
document.addEventListener("submit", function() {
    fields.firstName = document.getElementById("firstName");
    fields.lastName = document.getElementById("lastName");
    fields.email = document.getElementById("email");
    fields.comment = document.getElementById("subject");
    sendContact();
    console.log(usr);
});
// define some functions to validate the input information
// check if a field is empty
function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined') return false;
    return (value.length > 0);
}
// check if a field is a number
function isNum(num) {
    return (num.length > 0) && !isNaN(num);
}
// check if a string is in correct email format
function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}
// group all validate functions
function fieldValidate(field, validateFunction) {
    if (field == null) return false;

    let isFieldValid = validateFunction(field.value);
    if (!isFieldValid) {
        field.className = "placeholderRed";
    } else {
        field.className = "";
    }

    return isFieldValid;
}

function isValid() {
    let valid = true;

    valid &= fieldValidate(fields.firstName, isNotEmpty);
    valid &= fieldValidate(fields.lastName, isNotEmpty);
    valid &= fieldValidate(fields.email, isEmail);
    valid &= fieldValidate(fields.comment, isNotEmpty);

    return valid;
}

// define a user prototype
const user = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    comment: undefined
}

const usr = Object(user);

// define a function to send information
function sendContact() {
    if (isValid()) {
        usr.firstName = fields.firstName;
        usr.lastName = fields.lastName;
        usr.email = fields.email;
        usr.comment = fields.comment;
        alert(`${usr.firstName.value}, Thanks for submmitting your comment!\nSomeone will contact you shortly.`);
    } else {
        alert("There was an error in the form.");
    }
}
