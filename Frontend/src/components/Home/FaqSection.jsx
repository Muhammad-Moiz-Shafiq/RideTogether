import React from "react";

const FaqSection = () => {
  return (
    <section className="faq-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5" data-aos="fade-up">
          Frequently Asked Questions
        </h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {/* FAQ Item 1 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    How do I book a ride?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    To book a ride, simply use our search box on the homepage.
                    Enter your pickup and drop-off locations, select your
                    preferred date, and choose the number of passengers. Browse
                    through available rides and click on "Book Now" to reserve
                    your seat. You'll receive a confirmation email with all the
                    ride details.
                  </div>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Is it safe to ride with other students?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes, safety is our top priority! All users must verify their
                    NUST email addresses to create an account. We also have a
                    rating system where both drivers and passengers can rate
                    each other after each ride. Additionally, you can view
                    driver profiles, including their ratings and previous ride
                    history before booking.
                  </div>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    How does payment work?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Payments are handled securely through our platform. When you
                    book a ride, you'll see the exact fare before confirming.
                    You can pay using various methods including credit/debit
                    cards or digital wallets. The payment is held securely and
                    released to the driver after the ride is completed.
                  </div>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    What if I need to cancel my ride?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    You can cancel your ride up to 2 hours before the scheduled
                    departure time through the app or website. If you cancel
                    within the allowed timeframe, you'll receive a full refund.
                    Late cancellations may be subject to a cancellation fee as
                    per our policy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
