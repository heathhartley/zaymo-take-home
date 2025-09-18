
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

  const navStyle = {
    display: "flex",
    gap: 20,
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>URL Shortener</div>
      {/* <nav style={navStyle}>
        <a href="#home" style={linkStyle}>
          Home
        </a>
        <a href="#about" style={linkStyle}>
          Past Podcast
        </a>
        <a href="#contact" style={linkStyle}>
        </a>
      </nav> */}
    </header>
  );
}
