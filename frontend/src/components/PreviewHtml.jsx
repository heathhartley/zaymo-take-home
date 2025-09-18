import React from "react";

export default function PreviewHtml({ previewHtml }) {
  if (!previewHtml) return null; // return nothing if no HTML

  return (
    <div style={{ marginTop: "24px", width: "80%" }}>
      <h3>Preview of Modified HTML:</h3>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          border: "1px solid #ccc",
          padding: "16px",
          maxHeight: "400px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9"
        }}
      >
        {previewHtml}
      </pre>
    </div>
  );
}
