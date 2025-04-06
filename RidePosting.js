document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step-content");
  const progressBar = document.querySelector(".progress-bar");
  const stepItems = document.querySelectorAll(".step-item");

  // Navigation (Next)
  document.querySelectorAll(".next-step").forEach((button) => {
    button.addEventListener("click", function () {
      const currentStepIndex = [...steps].findIndex((s) =>
        s.classList.contains("active")
      );
      const currentStep = steps[currentStepIndex];

      if (validateStep(currentStep)) {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
          steps[currentStepIndex].classList.remove("active");
          steps[nextIndex].classList.add("active");
          updateProgress(nextIndex + 1);
          steps[nextIndex].scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Navigation (Back)
  document.querySelectorAll(".prev-step").forEach((button) => {
    button.addEventListener("click", function () {
      const currentStepIndex = [...steps].findIndex((s) =>
        s.classList.contains("active")
      );
      const prevIndex = currentStepIndex - 1;
      if (prevIndex >= 0) {
        steps[currentStepIndex].classList.remove("active");
        steps[prevIndex].classList.add("active");
        updateProgress(prevIndex + 1);
        steps[prevIndex].scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Progress bar logic
  function updateProgress(stepIndex) {
    const progressPercentage = (stepIndex / steps.length) * 100;
    progressBar.style.width = progressPercentage + "%";

    stepItems.forEach((item, index) => {
      item.classList.toggle("active", index < stepIndex);
    });
  }

  // Add/remove stops
  const addStopBtn = document.getElementById("addStopBtn");
  const stopsContainer = document.getElementById("stopsContainer");

  addStopBtn?.addEventListener("click", function () {
    const stopDiv = document.createElement("div");
    stopDiv.className = "input-group mb-2";
    stopDiv.innerHTML = `
          <span class="input-group-text bg-light"><i class="fas fa-map-pin text-primary"></i></span>
          <input type="text" class="form-control" placeholder="Enter a stop on your route">
          <button type="button" class="btn btn-outline-secondary remove-stop"><i class="fas fa-times"></i></button>
      `;
    stopsContainer.appendChild(stopDiv);

    stopDiv
      .querySelector(".remove-stop")
      .addEventListener("click", function () {
        stopsContainer.removeChild(stopDiv);
      });
  });

  // Remove existing stop buttons
  document.querySelectorAll(".remove-stop").forEach((button) => {
    button.addEventListener("click", function () {
      const stopDiv = this.closest(".input-group");
      stopsContainer.removeChild(stopDiv);
    });
  });

  // Ride frequency toggle
  const dailyBasis = document.getElementById("dailyBasis");
  const monthlyBasis = document.getElementById("monthlyBasis");
  const dailyBasisOptions = document.getElementById("dailyBasisOptions");
  const monthlyBasisOptions = document.getElementById("monthlyBasisOptions");

  dailyBasis?.addEventListener("change", function () {
    if (this.checked) {
      dailyBasisOptions.classList.remove("d-none");
      monthlyBasisOptions.classList.add("d-none");

      // Make daily fields required
      dailyBasisOptions
        .querySelectorAll("[data-daily-required]")
        .forEach((input) => input.setAttribute("required", "required"));

      // Remove required from monthly fields
      monthlyBasisOptions
        .querySelectorAll("[data-monthly-required]")
        .forEach((input) => input.removeAttribute("required"));
    }
  });

  monthlyBasis?.addEventListener("change", function () {
    if (this.checked) {
      monthlyBasisOptions.classList.remove("d-none");
      dailyBasisOptions.classList.add("d-none");

      // Make monthly fields required
      monthlyBasisOptions
        .querySelectorAll("[data-monthly-required]")
        .forEach((input) => input.setAttribute("required", "required"));

      // Remove required from daily fields
      dailyBasisOptions
        .querySelectorAll("[data-daily-required]")
        .forEach((input) => input.removeAttribute("required"));
    }
  });

  // One-way vs round-trip
  const oneWay = document.getElementById("oneWay");
  const roundTrip = document.getElementById("roundTrip");
  const returnTimeContainer = document.querySelector(".return-time-container");

  oneWay?.addEventListener("change", () => {
    returnTimeContainer?.classList.add("d-none");
  });

  roundTrip?.addEventListener("change", () => {
    returnTimeContainer?.classList.remove("d-none");
  });

  if (oneWay?.checked) {
    returnTimeContainer?.classList.add("d-none");
  }

  // Car vs Bike
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

  carType?.addEventListener("change", function () {
    if (this.checked) {
      carDetailsSection?.classList.remove("d-none");
      bikeDetailsSection?.classList.add("d-none");
      passengersSection?.classList.remove("d-none");
      carPreferencesSection?.classList.remove("d-none");
      bikePreferencesSection?.classList.add("d-none");
    }
  });

  bikeType?.addEventListener("change", function () {
    if (this.checked) {
      carDetailsSection?.classList.add("d-none");
      bikeDetailsSection?.classList.remove("d-none");
      passengersSection?.classList.add("d-none");
      carPreferencesSection?.classList.add("d-none");
      bikePreferencesSection?.classList.remove("d-none");
    }
  });

  // Form submission
  const ridePostingForm = document.getElementById("ridePostingForm");

  ridePostingForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const lastStep = steps[steps.length - 1];
    if (validateStep(lastStep)) {
      const formData = new FormData(ridePostingForm);
      console.log("Form submitted!");
      alert("Your ride has been posted successfully!");
      // window.location.href = "confirmation.html";
    }
  });

  // Validation that skips hidden fields
  function validateStep(step) {
    let isValid = true;
    const requiredFields = step.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      const isHidden = field.offsetParent === null;
      if (!isHidden && !field.value.trim()) {
        isValid = false;
        field.classList.add("is-invalid");

        field.addEventListener(
          "input",
          () => {
            if (field.value.trim()) {
              field.classList.remove("is-invalid");
            }
          },
          { once: true }
        );
      } else {
        field.classList.remove("is-invalid");
      }
    });

    // NUST Campus validation (only if present in current step)
    const startNUST = document.getElementById("isNustStart");
    const endNUST = document.getElementById("isNustDest");

    if (startNUST && endNUST && step.contains(startNUST)) {
      if (!startNUST.checked && !endNUST.checked) {
        isValid = false;

        // Highlight or show error near the checkboxes
        const checkboxContainer =
          startNUST.closest(".mb-3") || startNUST.parentElement;
        checkboxContainer.classList.add("border", "border-danger", "p-2");

        const existingError = checkboxContainer.querySelector(".nust-error");
        if (!existingError) {
          const errorMsg = document.createElement("div");
          errorMsg.className = "text-danger mt-2 nust-error";
          errorMsg.textContent =
            "Please select at least one NUST campus option.";
          checkboxContainer.appendChild(errorMsg);
        }

        // Remove highlighting when one is checked
        [startNUST, endNUST].forEach((cb) => {
          cb.addEventListener("change", function () {
            if (startNUST.checked || endNUST.checked) {
              checkboxContainer.classList.remove(
                "border",
                "border-danger",
                "p-2"
              );
              const err = checkboxContainer.querySelector(".nust-error");
              if (err) err.remove();
            }
          });
        });
      }
    }

    // Validate at least one weekday selected
    const daySelections = step.querySelectorAll(
      'input[type="checkbox"][id^="monday"], input[id^="tuesday"], input[id^="wednesday"], input[id^="thursday"], input[id^="friday"], input[id^="saturday"]'
    );

    if (daySelections.length > 0) {
      const atLeastOneDaySelected = [...daySelections].some((cb) => cb.checked);
      if (!atLeastOneDaySelected) {
        isValid = false;
        const daysSection = daySelections[0]?.closest(".mb-4");
        if (daysSection) {
          daysSection.classList.add("border", "border-danger", "p-2");
          daySelections.forEach((cb) => {
            cb.addEventListener("change", () => {
              daysSection.classList.remove("border", "border-danger", "p-2");
            });
          });
        }
      }
    }

    if (!isValid) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "alert alert-danger mt-3";
      errorDiv.textContent =
        "Please fill in all required fields before proceeding.";
      const existingError = step.querySelector(".alert-danger");
      if (existingError) existingError.remove();
      step.appendChild(errorDiv);
      setTimeout(() => errorDiv.remove(), 3000);
    }

    return isValid;
  }
});
