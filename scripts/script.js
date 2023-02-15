//add event listener to form
document
  .getElementById("intro-component__form")
  .addEventListener("submit", validateForm);
//add event listener to input fields
let inputFields = document
  .getElementById("intro-component__form")
  .getElementsByTagName("input");
//add event for removing error style when input changes
for (let inputField of inputFields) {
  inputField.addEventListener("input", (event) => {
    removeError(inputField.getAttribute("name"));
  });
}

/* function declarations */

//validates the submitted form and shows the appropriate message
function validateForm(event) {
  event.preventDefault();
  //get form data
  let formData = new FormData(document.getElementById("intro-component__form"));
  for (let [name, value] of formData) {
    //if field is empty show the relevant error
    if (value.trim() == "") setError(name);
    //if the email is invalid show the invalid email error
    else if (name == "email" && !validateEmail(value)) setError(name, true);
    //else remove the error style
    else removeError(name);
  }
}

//sets the error / success message and relevant styles
function setError(name, invalid = false) {
  //get parent intro-component__input-group element
  let element = document.querySelector(`[name="${name}"`);
  //get next sibling <p> tag to sho the error
  let messageElement = element.nextElementSibling;
  //add error style
  element.parentElement.classList.add("intro-component__input-group--error");
  //if the email is invalid show the relevant message
  if (invalid) messageElement.textContent = "Looks like this is not an email";
  //else show the empty error message
  else
    messageElement.textContent =
      element.getAttribute("placeholder") + " can't be empty";
}

//removes the error style from element
function removeError(name) {
  // alert(name);
  let element = document.querySelector(`[name="${name}"`);
  element.parentElement.classList.remove("intro-component__input-group--error");
}

//validates the email using regex
function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(email)) return true;
  return false;
}
