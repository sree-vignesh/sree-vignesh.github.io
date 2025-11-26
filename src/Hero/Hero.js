import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import "./Stars.css";
import ThreeScene from "./Three";
import "./New.css";

function Hero() {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // NEW: state for resume modal
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [heroRef]);

  return (
    <section
      ref={heroRef}
      className="hero d-flex justify-content-center align-items-center flex-column"
    >
      <StarAnimation />
      <div className="glass">
        <div className="greetings d-flex flex-column align-items-center">
          <p className="fs-5 nova-mono-regular" style={{ opacity: 0.7 }}>
            Greetings,
          </p>

          <h1 className="fs-1 fw-bold name nova-mono-regular">
            I'm Sree Vignesh!
          </h1>

          <p className="zeyada-regular fs-2" style={{ opacity: 0.9 }}>
            (un)professional dev.
          </p>

          <div className="btn-container">
            <a href="#about">
              <button className="primary">About me</button>
            </a>

            {/* UPDATED RESUME BUTTON */}
            <button onClick={() => setResumeOpen(true)}>Resume</button>
          </div>
        </div>
      </div>

      {/* RESUME POPUP MODAL */}
      {resumeOpen && (
        <div className="resume-backdrop">
          <div className="resume-modal">
            <button
              className="resume-close"
              onClick={() => setResumeOpen(false)}
            >
              ✕
            </button>

            <iframe
              src="https://overleaf-viewer.vercel.app/view/wdfgcctzrvtq"
              title="Resume"
              className="resume-iframe"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

const StarAnimation = () => {
  return (
    <div className="stars">
      {[...Array(50)].map((_, index) => (
        <div key={index} className="star"></div>
      ))}
      {[...Array(10)].map((_, index) => (
        <div key={index} className="star orange"></div>
      ))}
    </div>
  );
};

export default Hero;
