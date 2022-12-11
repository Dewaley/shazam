import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "sans-serif",
        color: "#333",
      }}
    >
      <h1
        style={{
          fontSize: "3em",
          fontWeight: "bold",
          margin: "20px 0",
        }}
      >
        Oops! Page not found.
      </h1>
      <p
        style={{
          fontSize: "1.5em",
          lineHeight: "1.5",
          margin: "0 0 20px 0",
        }}
      >
        We're sorry, but the page you requested cannot be found. Please check
        the URL and try again, or switch to a mobile device and go to the{" "}
        <a
          href='/'
          style={{
            color: "#00bcd4",
            textDecoration: "none",
          }}
        >
          home page
        </a>{" "}
        to find what you're looking for.
      </p>
    </div>
  );
};

export default NotFound;
