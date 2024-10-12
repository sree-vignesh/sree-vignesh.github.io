import React from "react";
import "./Contact.css"; // Ensure to create this CSS file for additional styling
import luffy from "./luffy.svg";
function Contact() {
  return (
    <section className="Contact d-flex justify-content-center align-items-center">
      <div className="content text-center p-4 d-flex flex-row ">
        <div className="socials">
          <h1 className="section-heading">Contact</h1>
          <br />
          <br />

          <p className="description">
            Feel free to reach out through any of the platforms below!
          </p>
          <br />
          <div className="social-links d-flex felx-column justify-content-center align-items-center">
            <a
              href="https://github.com/sree-vignesh"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>
            <a
              href="mailto:reach.sreevignesh@gmail.com"
              className="social-link"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/sree-vignesh-c-807284249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="svg-container">
          <img src={luffy} alt="" className="cool-svg" />
        </div>
      </div>
    </section>
  );
}

export default Contact;
