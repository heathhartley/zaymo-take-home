
import React from "react";

export default function Header() {
  const headerStyle = {
    width: "100%",
    backgroundColor: "#70b8fa", 
    color: "#fff",         
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: "12px", 

  };

  const logoStyle = {
    fontWeight: "bold",
    fontSize: 20,
  };



  return (
    <header style={headerStyle}>
      <div style={logoStyle}>URL Shortener</div>
    </header>
  );
}
