import { useState, useEffect, useRef } from "react";
import RouteDetailsForm from "../components/PostRide/RouteDetailsForm";
import PreferencesForm from "../components/PostRide/PreferencesForm";
import VehicleInfoForm from "../components/PostRide/VehicleInfoForm";
import ContactDetailsForm from "../components/PostRide/ContactDetailsForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/PostRide/HeroSection";
import rideService from "../services/rideService"; // Import the ride service

const PostRide = () => {
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
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
    userName: "", // Added name field
    studentId: "", // Added student ID field
    phoneNumber: "",
    isPrimaryWhatsapp: false,
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
    // Check if name is provided
    if (!formData.userName.trim()) {
      showAlert(
        "danger",
        "Please enter your name in the Contact Details section."
      );
      return false;
    }

    // Check if student ID is provided
    if (!formData.studentId.trim()) {
      showAlert(
        "danger",
        "Please enter your student ID in the Contact Details section."
      );
      return false;
    }

    // Check if at least one NUST campus checkbox is checked
    if (!formData.isNustStart && !formData.isNustDest) {
      showAlert(
        "danger",
        "Please check the NUST campus checkbox for either Starting Point or Destination."
      );
      return false;
    }

    // Check if at least one day is selected
    if (formData.daysAvailable.length === 0) {
      showAlert(
        "danger",
        "Please select at least one day of the week in the Preferences section."
      );
      return false;
    }

    // Check vehicle details
    if (formData.vehicleType === "car" && !formData.passengerCapacity) {
      showAlert("danger", "Please select the passenger capacity for your car.");
      return false;
    }

    // Check required fields
    const requiredFields = [
      { field: "startingPoint", message: "Please enter your starting point" },
      { field: "destination", message: "Please enter your destination" },
      { field: "departureTime", message: "Please enter your departure time" },
      { field: "price", message: "Please enter the price per seat" },
      { field: "vehicleDetails", message: "Please enter your vehicle details" },
      { field: "phoneNumber", message: "Please enter your phone number" },
    ];

    for (const item of requiredFields) {
      if (!formData[item.field].trim()) {
        showAlert("danger", item.message);
        return false;
      }
    }

    // Add conditional required fields
    if (formData.tripType === "round-trip" && !formData.returnTime) {
      showAlert("danger", "Please enter your return time for round trips");
      return false;
    }

    // Check consent and terms
    if (!formData.shareContactConsent || !formData.termsAgreed) {
      showAlert(
        "danger",
        "Please agree to sharing your contact details and accept the terms and conditions"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsSubmitting(true);

        // Extract data to send to the API
        const rideData = {
          ...formData,
          // Remove termsAgreed as it's not needed in the database
          termsAgreed: undefined,
        };

        // Send data to the API
        const response = await rideService.postRide(rideData);

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
          userName: "",
          studentId: "",
          phoneNumber: "",
          isPrimaryWhatsapp: false,
          email: "",
          preferredContactMethod: "whatsapp",
          shareContactConsent: false,
          termsAgreed: false,
        });
      } catch (error) {
        console.error("Error posting ride:", error);
        showAlert("danger", `Failed to post ride: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
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
                    {/* Submit Button Section */}
                    <div className="d-flex justify-content-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg px-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Posting...
                          </>
                        ) : (
                          "Post Ride"
                        )}
                      </button>
                    </div>
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
