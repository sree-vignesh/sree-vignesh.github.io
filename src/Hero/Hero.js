import React, { useEffect, useRef, useState } from "react";
import "./Hero.css"; // Your styles for the hero section
import "./Star.css"; // Your styles for the stars
import ThreeScene from "./Three"; // Assuming this is where your rotating cube component is

function Hero() {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      className="hero d-flex justify-content-center align-items-center"
    >
      <StarAnimation />
      <div className="glass p-4 d-flex flex-row align-items-center">
        <div className="greetings d-flex flex-column align-items-center ">
          <p className="fs-5 nova-mono-regular">Greetings,</p>

          <h1 className=" fs-1 fw-bold name nova-mono-regular">
            I'm Sree Vignesh!
          </h1>
          <br />
          <br />

          <p className="zeyada-regular fs-2">(un)professional dev.</p>
        </div>
        {/* <div className="three-scene">{ <ThreeScene /> }</div> */}
      </div>
    </section>
  );
}

const StarAnimation = () => {
  return (
    <div className="stars">
      {[...Array(50)].map((_, index) => (
        <div key={index} className="star"></div>
      ))}
    </div>
  );
};

export default Hero;