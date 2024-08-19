document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("[data-form]");
  const firstNameError = document.getElementById("firstname-error");
  const lastNameError = document.getElementById("lastname-error");
  const emailError = document.getElementById("email-error");
  const queryError = document.getElementById("query-error");
  const messageError = document.getElementById("message-error");
  const termsError = document.getElementById("terms-error");

  const showError = (error, message) => {
    error.textContent = message;
    error.classList.remove("hide");
  };

  const hideError = (error) => {
    error.textContent = "";
    error.classList.add("hide");
  };

  const isValid = (input) => {
    input.classList.remove("isNotValid");
    input.classList.add("isValid");
  };

  const isNotValid = (input) => {
    input.classList.add("isNotValid");
  };

  // Name
  const validName = (input, error) => {
    const verify = input.value.trim();
    const containsNumber = /\d/.test(verify);
    const containsSymbols = /[^\w\s]/.test(verify);

    let valid = true;

    if (verify === "") {
      showError(error, "This field is required");
      isNotValid(input);
      valid = false;
    } else if (verify.length < 3) {
      showError(error, "Name should be greater than 3 characters");
      isNotValid(input);
      valid = false;
    } else if (containsNumber) {
      showError(error, "Numbers are not allowed");
      isNotValid(input);
      valid = false;
    } else if (containsSymbols) {
      showError(error, "Symbols are not allowed");
      valid = false;
    }

    if (valid) {
      hideError(error);
      isValid(input);
    }

    return valid;
  };

  // Email
  const validEmail = function (input, error) {
    const email = input.value.trim();
    //  emailPattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (email === "") {
      showError(error, "This field is required");
      isNotValid(input);
      valid = false;
    } else if (!emailPattern.test(email)) {
      showError(error, "Input a valid email-address");
      isNotValid(input);
      valid = false;
    }

    if (valid) {
      hideError(error);
      isValid(input);
    }
    return valid;
  };

  // Query
  const validQueryType = function (form, error) {
    const inputs = form.querySelectorAll("input[name = 'query']");

    let valid = false;

    inputs.forEach((input) => {
      const parent = input.parentNode;
      if (input.checked) {
        hideError(error);
        parent.classList.add("isChecked");
        valid = true;
      } else {
        parent.classList.remove("isChecked");
      }

      if (!valid) {
        parent.classList.add("isNotValid");
        setTimeout(
          () => parent.classList.remove("isNotValid"),

          3000
        );
        showError(error, "Please select a query type");
      }
    });

    return valid;
  };

  // Message
  const validMessage = function (input, error) {
    const message = input.value.trim();
    let valid = true;

    if (message === "") {
      showError(error, "This field is required");
      isNotValid(input);
      valid = false;
    }

    if (valid) {
      hideError(error);
      isValid(input);
    }
    return valid;
  };

  // Terms
  const validTerms = function (input, error) {
    let valid = true;

    if (!input.checked) {
      showError(
        error,
        "To submit this form, please consent to being contacted"
      );
      isNotValid(input);
      valid = false;
    }

    if (valid) {
      hideError(error);
      isValid(input);
    }
    return valid;
  };

  // Validate all fields
  const validateAll = () => {
    const firstNameValid = validName(
      document.getElementById("firstname"),
      firstNameError
    );
    const lastNameValid = validName(
      document.getElementById("lastname"),
      lastNameError
    );
    const emailValid = validEmail(document.getElementById("email"), emailError);
    const queryValid = validQueryType(form, queryError);
    const messageValid = validMessage(
      document.getElementById("message"),
      messageError
    );
    const termsValid = validTerms(document.getElementById("terms"), termsError);

    return (
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      queryValid &&
      messageValid &&
      termsValid
    );
  };

  form.addEventListener("input", function (e) {
    e.preventDefault();
    const { id, name } = e.target;

    switch (id) {
      case "firstname":
        validName(e.target, firstNameError);
        break;
      case "lastname":
        validName(e.target, lastNameError);
        break;
      case "email":
        validEmail(e.target, emailError);
        break;
      case "message":
        validMessage(e.target, messageError);
        break;
      case "terms":
        validTerms(e.target, termsError);
        break;
    }
    if (name === "query") {
      validQueryType(form, queryError);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateAll()) {
      alert("Your message has been received. We would get back to you.");
      form.reset(); // Clear the form
    } else {
      alert("Please fill out the form correctly before submitting.");
      // If its empty
      validateAll();
    }
  });
});
