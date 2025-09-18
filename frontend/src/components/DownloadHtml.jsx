import React from "react";

export default function DownloadHtml({ downloadUrl, fileName }) {
  if (!downloadUrl) return null; // nothing to show

  const downloadBoxStyle = {
    marginTop: "24px",
    padding: "20px",
    border: "2px dashed #70b8fa",
    borderRadius: "12px",
    backgroundColor: "#f0f8ff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    boxSizing: "border-box",
  };

  const downloadTextStyle = {
    marginBottom: "16px",
    fontWeight: "bold",
    color: "#333",
  };

  const downloadLinkStyle = {
    textDecoration: "none",
    padding: "12px 24px",
    backgroundColor: "#70b8fa",
    color: "#fff",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  };

  return (
    <div style={downloadBoxStyle}>
      <p style={downloadTextStyle}>
        Your modified HTML is ready to download!
      </p>
      <a
        href={downloadUrl}
        download={`shortened-${fileName}`}
        style={downloadLinkStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#70b8fa")}
      >
        Download HTML
      </a>
    </div>
  );
}
