document.addEventListener("DOMContentLoaded", function () {
  // Form validation
  const form = document.getElementById("ridePostingForm");
  const isNustStart = document.getElementById("isNustStart");
  const isNustDest = document.getElementById("isNustDest");
  const dailyOption = document.getElementById("dailyBasis");
  const monthlyOption = document.getElementById("monthlyBasis");
  const priceSuggestion = document.getElementById("priceSuggestion");
  const roundTrip = document.getElementById("roundTrip");
  const oneWay = document.getElementById("oneWay");
  const returnTimeSection = document.getElementById("returnTimeSection");
  const carType = document.getElementById("carType");
  const bikeType = document.getElementById("bikeType");
  const carDetailsSection = document.getElementById("carDetailsSection");
  const bikeDetailsSection = document.getElementById("bikeDetailsSection");
  const passengersSection = document.getElementById("passengersSection");
  const carPreferencesSection = document.getElementById(
    "carPreferencesSection"
  );
  const bikePreferencesSection = document.getElementById(
    "bikePreferencesSection"
  );
  const addStopBtn = document.getElementById("addStopBtn");
  const stopsContainer = document.getElementById("stopsContainer");

  // Helper functions for form data collection
  function collectStops() {
    const stopInputs = stopsContainer.querySelectorAll('input[type="text"]');
    const stops = [];

    stopInputs.forEach((input) => {
      if (input.value.trim()) {
        stops.push(input.value.trim());
      }
    });

    return stops;
  }

  function collectDaysAvailable() {
    const checkedDays = document.querySelectorAll(
      'input[name="days[]"]:checked'
    );
    const days = [];

    checkedDays.forEach((day) => {
      days.push(day.value);
    });

    return days;
  }

  function collectVehicleDetails() {
    if (carType.checked) {
      return carDetailsSection.querySelector("input").value;
    } else {
      return bikeDetailsSection.querySelector("input").value;
    }
  }

  function collectPassengerCapacity() {
    if (carType.checked) {
      return passengersSection.querySelector("select").value;
    } else {
      return 1; // Bikes can only take 1 passenger
    }
  }

  function collectPreferences() {
    if (carType.checked) {
      return {
        car: {
          airConditioned: document.getElementById("airConditioned").checked,
          smokingAllowed: document.getElementById("smokingAllowed").checked,
          petsAllowed: document.getElementById("petsAllowed").checked,
          musicAllowed: document.getElementById("musicAllowed").checked,
        },
      };
    } else {
      return {
        bike: {
          helmetProvided: document.getElementById("helmetProvided").checked,
          rainGearAvailable:
            document.getElementById("rainGearAvailable").checked,
        },
      };
    }
  }

  function collectContactDetails() {
    return {
      phoneNumber: document.querySelector(
        'input[placeholder="Enter your phone number"]'
      ).value,
      isWhatsapp: document.getElementById("primaryWhatsapp").checked,
      alternatePhone: document.querySelector(
        'input[placeholder="Enter alternate contact number (Optional)"]'
      ).value,
      alternateWhatsapp: document.getElementById("alternateWhatsapp").checked,
      email: document.querySelector('input[type="email"]').value,
      preferredContactMethod: document
        .querySelector('input[name="contactPreference"]:checked')
        .id.replace("prefer", "")
        .toLowerCase(),
    };
  }

  // Show alert function
  function showAlert(type, message) {
    // Create alert element
    const alertElement = document.createElement("div");
    alertElement.className = `alert alert-${type} alert-dismissible fade show`;
    alertElement.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert at the top of the form
    form.parentNode.insertBefore(alertElement, form);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      alertElement.classList.remove("show");
      setTimeout(() => alertElement.remove(), 300);
    }, 5000);
  }

  // 1. Handle NUST campus checkbox validation
  function validateNustCampus() {
    if (!isNustStart.checked && !isNustDest.checked) {
      alert(
        "At least one location (Starting Point or Destination) must be NUST campus."
      );
      return false;
    }
    return true;
  }

  // Check if at least one day is selected
  function validateDays() {
    const checkedDays = document.querySelectorAll(
      'input[name="days[]"]:checked'
    );
    if (checkedDays.length === 0) {
      alert("Please select at least one day of the week.");
      return false;
    }
    return true;
  }

  // 2. Handle monthly/daily basis change
  dailyOption.addEventListener("change", function () {
    if (this.checked) {
      priceSuggestion.textContent =
        "Suggested: PKR 150-500 for Islamabad/Rawalpindi";
    }
  });

  monthlyOption.addEventListener("change", function () {
    if (this.checked) {
      priceSuggestion.textContent =
        "Suggested: PKR 3000-8000 for Islamabad/Rawalpindi";
    }
  });

  // 3. Handle one-way/round trip selection
  roundTrip.addEventListener("change", function () {
    if (this.checked) {
      returnTimeSection.classList.remove("d-none");
      returnTimeSection.querySelector("input").required = true;
    }
  });

  oneWay.addEventListener("change", function () {
    if (this.checked) {
      returnTimeSection.classList.add("d-none");
      returnTimeSection.querySelector("input").required = false;
    }
  });

  // 4. Handle vehicle type selection
  carType.addEventListener("change", function () {
    if (this.checked) {
      // Show car details, hide bike details
      carDetailsSection.classList.remove("d-none");
      bikeDetailsSection.classList.add("d-none");
      passengersSection.classList.remove("d-none");
      carPreferencesSection.classList.remove("d-none");
      bikePreferencesSection.classList.add("d-none");

      // Update required fields
      carDetailsSection.querySelector("input").required = true;
      passengersSection.querySelector("select").required = true;
      bikeDetailsSection.querySelector("input").required = false;
    }
  });

  bikeType.addEventListener("change", function () {
    if (this.checked) {
      // Show bike details, hide car details
      carDetailsSection.classList.add("d-none");
      bikeDetailsSection.classList.remove("d-none");
      passengersSection.classList.add("d-none");
      carPreferencesSection.classList.add("d-none");
      bikePreferencesSection.classList.remove("d-none");

      // Update required fields
      carDetailsSection.querySelector("input").required = false;
      passengersSection.querySelector("select").required = false;
      bikeDetailsSection.querySelector("input").required = true;
    }
  });

  // Handle adding stops
  addStopBtn.addEventListener("click", function () {
    const stopDiv = document.createElement("div");
    stopDiv.className = "input-group mb-2";
    stopDiv.innerHTML = `
        <span class="input-group-text bg-light">
            <i class="fas fa-map-pin text-primary"></i>
        </span>
        <input type="text" class="form-control" placeholder="Enter a stop on your route">
        <button type="button" class="btn btn-outline-secondary remove-stop">
            <i class="fas fa-times"></i>
        </button>
    `;
    stopsContainer.appendChild(stopDiv);

    // Add event listener to the remove button
    stopDiv
      .querySelector(".remove-stop")
      .addEventListener("click", function () {
        stopsContainer.removeChild(stopDiv);
      });
  });

  // Remove stop functionality for initial stop
  if (stopsContainer.querySelector(".btn-outline-secondary")) {
    stopsContainer
      .querySelector(".btn-outline-secondary")
      .addEventListener("click", function () {
        this.closest(".input-group").remove();
      });
  }

  // Form submission validation
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Check if at least one NUST campus checkbox is checked
    if (!validateNustCampus()) {
      return;
    }

    // Check if at least one day is selected
    if (!validateDays()) {
      return;
    }

    // Validate other required fields
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("is-invalid");
      } else {
        field.classList.remove("is-invalid");
      }
    });

    if (!isValid) {
      showAlert("danger", "Please fill in all required fields.");
      return;
    }
    // If all validations pass, submit the form
    alert("Ride posted successfully! Your ride is now available for booking.");
    // form.submit(); // Uncomment when connected to backend
  });

  // Initialize state based on default selections
  if (oneWay.checked) {
    returnTimeSection.classList.add("d-none");
    returnTimeSection.querySelector("input").required = false;
  }

  if (bikeType.checked) {
    carDetailsSection.classList.add("d-none");
    bikeDetailsSection.classList.remove("d-none");
    passengersSection.classList.add("d-none");
    carPreferencesSection.classList.add("d-none");
    bikePreferencesSection.classList.remove("d-none");
  }

  // Add input event listeners to remove invalid class when user starts typing
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("is-invalid");
    });
  });
});
