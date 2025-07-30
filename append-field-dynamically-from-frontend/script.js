document.addEventListener("DOMContentLoaded", function () {
    const formBox = document.querySelector(".formBox");
    const appendDynamicField = document.getElementById("appendDynamicField");
    const addPhoneButton = document.querySelector("#addField");

    // click event
    addPhoneButton.addEventListener("click", function () {
        const phoneFieldHTML = `
          <div class="col-md-6 phone-field">
            <div class="mb-3">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-control" required />
            </div>
          </div>`;
        appendDynamicField.insertAdjacentHTML("beforeend", phoneFieldHTML);
    });

    // form submit event
    formBox.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {};
        const inputs = formBox.querySelectorAll("input:not([type='submit'])");

        inputs.forEach((input, index) => {
            formData[`Field ${index + 1} (${input.type})`] = input.value;
        });

        console.log("Dynamic Form Data:", formData);

        // formBox.reset();
    });
});