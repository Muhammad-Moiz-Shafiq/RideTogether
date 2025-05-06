import { useState, useEffect, useRef } from "react";
import RouteDetailsForm from "../components/PostRide/RouteDetailsForm";
import PreferencesForm from "../components/PostRide/PreferencesForm";
import VehicleInfoForm from "../components/PostRide/VehicleInfoForm";
import ContactDetailsForm from "../components/PostRide/ContactDetailsForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/PostRide/HeroSection";

const PostRide = () => {
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [formData, setFormData] = useState({
    // Route Details
    startingPoint: "",
    destination: "",
    isNustStart: false,
    isNustDest: false,
    stops: [],

    // Preferences
    rideFrequency: "monthly",
    daysAvailable: [],
    tripType: "round-trip",
    departureTime: "",
    returnTime: "",
    price: "",

    // Vehicle Info
    vehicleType: "car",
    vehicleDetails: "",
    passengerCapacity: "",
    preferences: {
      car: {
        airConditioned: false,
        smokingAllowed: false,
        petsAllowed: false,
        musicAllowed: false,
      },
      bike: {
        helmetProvided: false,
        rainGearAvailable: false,
      },
    },
    additionalInfo: "",

    // Contact Details
    phoneNumber: "",
    isPrimaryWhatsapp: false,
    alternatePhone: "",
    isAlternateWhatsapp: false,
    email: "",
    preferredContactMethod: "whatsapp",
    shareContactConsent: false,
    termsAgreed: false,
  });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "days[]") {
        const updatedDays = [...formData.daysAvailable];
        if (checked) {
          updatedDays.push(value);
        } else {
          const index = updatedDays.indexOf(value);
          if (index > -1) {
            updatedDays.splice(index, 1);
          }
        }
        setFormData({ ...formData, daysAvailable: updatedDays });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePreferenceChange = (section, preference, checked) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [section]: {
          ...formData.preferences[section],
          [preference]: checked,
        },
      },
    });
  };

  const handleAddStop = () => {
    setFormData({
      ...formData,
      stops: [...formData.stops, ""],
    });
  };

  const handleRemoveStop = (index) => {
    const updatedStops = [...formData.stops];
    updatedStops.splice(index, 1);
    setFormData({
      ...formData,
      stops: updatedStops,
    });
  };

  const handleStopChange = (index, value) => {
    const updatedStops = [...formData.stops];
    updatedStops[index] = value;
    setFormData({
      ...formData,
      stops: updatedStops,
    });
  };

  const validateForm = () => {
    // Check if at least one NUST campus checkbox is checked
    if (!formData.isNustStart && !formData.isNustDest) {
      showAlert(
        "danger",
        "Please check the NUST campus checkbox for either Starting Point or Destination (in Route Details part)."
      );
      return false;
    }

    // Check if at least one day is selected
    if (formData.daysAvailable.length === 0) {
      showAlert(
        "danger",
        "Please select at least one day of the week in Days Available part (preference section)."
      );
      return false;
    }

    // Check required fields
    const requiredFields = [
      "startingPoint",
      "destination",
      "departureTime",
      "price",
      "phoneNumber",
    ];

    // Add conditional required fields
    if (formData.tripType === "round-trip") {
      requiredFields.push("returnTime");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to an API
      console.log("Form submitted with data:", formData);
      showAlert(
        "success",
        "Ride posted successfully! Your ride is now available for booking."
      );
      // reset the form data after successful submission
      setFormData({
        startingPoint: "",
        destination: "",
        isNustStart: false,
        isNustDest: false,
        stops: [],
        rideFrequency: "monthly",
        daysAvailable: [],
        tripType: "round-trip",
        departureTime: "",
        returnTime: "",
        price: "",
        vehicleType: "car",
        vehicleDetails: "",
        passengerCapacity: "",
        preferences: {
          car: {
            airConditioned: false,
            smokingAllowed: false,
            petsAllowed: false,
            musicAllowed: false,
          },
          bike: {
            helmetProvided: false,
            rainGearAvailable: false,
          },
        },
        additionalInfo: "",
        phoneNumber: "",
        isPrimaryWhatsapp: false,
        alternatePhone: "",
        isAlternateWhatsapp: false,
        email: "",
        preferredContactMethod: "whatsapp",
        shareContactConsent: false,
        termsAgreed: false,
      });
      // Optionally, you can redirect the user to another page or reset the form
      // window.location.href = "/thank-you"; // Example redirect
      // or reset the form
      // document.getElementById("ridePostingForm").reset(); // Example reset
      // or clear the form data in state
      // setFormData({}); // Example clear
    }
  };

  return (
    <>
      <Navbar />
      <HeroSection />
      {alert.show && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 shadow`}
          role="alert"
          style={{ zIndex: 2000, maxWidth: "90%", width: "auto" }}
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert({ ...alert, show: false })}
          ></button>
        </div>
      )}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body p-4 p-md-5">
                  <form id="ridePostingForm" onSubmit={handleSubmit}>
                    <RouteDetailsForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleAddStop={handleAddStop}
                      handleRemoveStop={handleRemoveStop}
                      handleStopChange={handleStopChange}
                    />

                    <hr className="my-4" />

                    <PreferencesForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />

                    <hr className="my-4" />

                    <VehicleInfoForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handlePreferenceChange={handlePreferenceChange}
                    />

                    <hr className="my-4" />

                    <ContactDetailsForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <div id="scrollTopBtn"></div>
    </>
  );
};

export default PostRide;
