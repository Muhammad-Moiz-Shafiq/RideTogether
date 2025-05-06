const HeroSection = () => {
  return (
    <header
      className="hero-section py-5"
      style={{
        backgroundColor: "#1a73e8",
        backgroundImage: "linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h1 className="display-4 fw-bold text-white mb-3">
              Offer Your Ride
            </h1>
            <p className="lead text-white mb-4">
              Share your journey, reduce costs, and help fellow NUST students
            </p>
            <div className="badge bg-white text-primary mb-0 px-3 py-2">
              <i className="fas fa-info-circle me-2"></i>
              Fill out the form below with your ride details
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
