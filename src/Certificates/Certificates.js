import React, { useEffect, useState, useRef } from "react";
import "./Certificates.css";

function Certificates() {
  const [certs, setCerts] = useState([]);
  const cardsRef = useRef(null);

  // Fetch certificate data from GitHub
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/sree-vignesh/data-for-portfolio/refs/heads/main/certificates/certificateData.json",
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((data) => setCerts(data))
      .catch(() => setCerts([]));
  }, []);

  // Spotlight hover effect
  useEffect(() => {
    const cards = document.querySelectorAll(".glass-card");
    if (!cards.length) return;

    const handlers = new Map();

    cards.forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = ((e.clientX - rect.left) / rect.width) * 100;
        const cy = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--spot-x", `${cx}%`);
        card.style.setProperty("--spot-y", `${cy}%`);
      };

      const onEnter = () => card.classList.add("has-spot");
      const onLeave = () => card.classList.remove("has-spot");

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      handlers.set(card, { onMove, onEnter, onLeave });
    });

    return () => {
      handlers.forEach((h, card) => {
        card.removeEventListener("mousemove", h.onMove);
        card.removeEventListener("mouseenter", h.onEnter);
        card.removeEventListener("mouseleave", h.onLeave);
      });
    };
  }, [certs]);

  return (
    <section className="Projects">
      <h1 className="section-heading">Certifications</h1>

      <div className="projects-grid" ref={cardsRef}>
        {certs.map((c, i) => (
          <div className="glass-card compact-card" key={i}>
            {/* Top row: issuer (left) + issued date (right) */}
            <div className="card-top-row">
              <span className="issuer-label">{c.issuer}</span>
              <span className="date-label">{c.issued}</span>
            </div>
            <hr className="divider-card" />

            <h2 className="project-title compact-title">{c.title}</h2>

            <p className="project-desc compact-desc">{c.description}</p>

            <div className="card-footer compact-footer">
              <a
                className="button-view-project underline-anim"
                href={c.link}
                target="_blank"
                rel="noreferrer"
              >
                View Certificate
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;
