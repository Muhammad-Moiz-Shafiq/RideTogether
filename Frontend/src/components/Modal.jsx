import React, { useEffect } from "react";

const Modal = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmButtonClass = "btn-primary",
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [onCancel]);

  return (
    <div className="modal-wrapper">
      {/* Modal backdrop */}
      <div
        className="modal-backdrop-custom"
        onClick={onCancel}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      ></div>

      {/* Modal dialog */}
      <div
        className="modal-custom"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1050,
        }}
      >
        <div
          className="modal-dialog shadow"
          style={{
            maxWidth: "500px",
            margin: "1.75rem auto",
            position: "relative",
            width: "auto",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "0.3rem",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
            }}
          >
            <div className="modal-header bg-light" style={{ padding: "1rem" }}>
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body" style={{ padding: "1rem" }}>
              <p className="mb-0">{message}</p>
            </div>

            <div
              className="modal-footer bg-light"
              style={{ padding: "0.75rem" }}
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className={`btn ${confirmButtonClass}`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
