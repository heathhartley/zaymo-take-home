


import React, { useState } from "react";
import PreviewHtml from "./PreviewHTML";
import DownloadHtml from "./DownloadHtml";


export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [previewHtml, setPreviewHtml] = useState(""); 
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".html")) {
      alert("Please upload an HTML file.");
      return;
    }

    setFile(selectedFile);
    setDownloadUrl("");
    setPreviewHtml("");
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8001/upload-html", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const modifiedHtml = await response.text();

      // Create a Blob for download
      const blob = new Blob([modifiedHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Set the preview HTML
      setPreviewHtml(modifiedHtml);

    } catch (err) {
      console.error(err);
      alert("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    marginTop: "50px",    
    gap: "24px",
  };

  const inputButtonContainerStyle = {
    display: "flex",
    flexDirection: "row",  
    alignItems: "center",
    gap: "12px",
  };

  const fileInputStyle = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    fontWeight: "500",
  };

  const uploadButtonStyle = {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#70b8fa",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const uploadButtonDisabledStyle = {
    ...uploadButtonStyle,
    backgroundColor: "#a0c9f5",
    cursor: "not-allowed",
  };


  return (
    <div style={containerStyle}>
      <div style={inputButtonContainerStyle}>
        <input
          type="file"
          accept=".html"
          onChange={handleFileChange}
          style={fileInputStyle}
        />
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          style={!file || loading ? uploadButtonDisabledStyle : uploadButtonStyle}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "#4a90e2";
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "#70b8fa";
          }}
        >
          {loading ? "Uploading..." : "Upload & Shorten Links"}
        </button>
      </div>
      {downloadUrl && <DownloadHtml downloadUrl={downloadUrl} fileName={file.name} />}

      {previewHtml && <PreviewHtml previewHtml={previewHtml} />}
    </div>

  );
}
