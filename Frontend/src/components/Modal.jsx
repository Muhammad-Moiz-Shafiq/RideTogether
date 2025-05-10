import React, { useEffect } from "react";

const Modal = ({
  show = true,
  title,
  message,
  children,
  footer,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  onClose,
  confirmButtonClass = "btn-primary",
}) => {
  // Use onClose as fallback for onCancel for backward compatibility
  const handleClose = onCancel || onClose || (() => {});

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [handleClose]);

  // Don't render if show is false
  if (!show) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      {/* Modal backdrop */}
      <div
        className="modal-backdrop-custom"
        onClick={handleClose}
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
          padding: "15px",
        }}
      >
        <div
          className="modal-dialog shadow"
          style={{
            maxWidth: "500px",
            maxHeight: "90vh",
            margin: "0 auto",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "0.3rem",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="modal-header bg-light" style={{ padding: "1rem" }}>
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>

            <div
              className="modal-body"
              style={{
                padding: "1rem",
                overflowY: "auto",
                maxHeight: "calc(90vh - 130px)", // Subtract header and footer height
              }}
            >
              {children || <p className="mb-0">{message}</p>}
            </div>

            <div
              className="modal-footer bg-light"
              style={{ padding: "0.75rem" }}
            >
              {footer ? (
                footer
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleClose}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
