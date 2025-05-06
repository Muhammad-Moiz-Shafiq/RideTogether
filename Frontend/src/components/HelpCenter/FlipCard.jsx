import React from "react";

const FlipCard = ({ icon, title, content, delay }) => {
  return (
    <div className="flip-card" data-aos="flip-left" data-aos-delay={delay}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card h-100">
            <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
              <h5 className="card-title mb-0">
                <i className={`fas ${icon} text-primary me-2`}></i>
                {title}
              </h5>
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">
                {typeof content.title === "string" ? content.title : title}
              </h5>
              {content.list ? (
                <ol className="text-muted small">
                  {content.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted">{content.text}</p>
              )}
              <a href="#" className="btn btn-sm btn-primary mt-2">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
