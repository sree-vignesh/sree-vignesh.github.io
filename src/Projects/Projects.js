import React, { useEffect, useState, useRef } from "react";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const cardsRef = useRef(null); // used only to ensure effect reruns after projects load

  useEffect(() => {
    fetch("/data/projectData.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  // Spotlight: attach listeners after projects render
  useEffect(() => {
    // if no cards yet, do nothing
    const cards = document.querySelectorAll(".glass-card");
    if (!cards || cards.length === 0) return;

    // handler factory so we can remove exactly the same fn later
    const handlers = new Map();

    cards.forEach((card) => {
      // mousemove handler
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const clientX = e.type.startsWith("touch")
          ? (e.touches && e.touches[0] && e.touches[0].clientX) || 0
          : e.clientX;
        const clientY = e.type.startsWith("touch")
          ? (e.touches && e.touches[0] && e.touches[0].clientY) || 0
          : e.clientY;

        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;

        // clamp to 0..100 to be safe
        const cx = Math.max(0, Math.min(100, x));
        const cy = Math.max(0, Math.min(100, y));

        card.style.setProperty("--spot-x", `${cx}%`);
        card.style.setProperty("--spot-y", `${cy}%`);
      };

      // optional handlers for enter/leave to control opacity via class if needed
      const onEnter = () => card.classList.add("has-spot");
      const onLeave = () => card.classList.remove("has-spot");

      // attach listeners
      card.addEventListener("mousemove", onMove);
      card.addEventListener("touchmove", onMove, { passive: true });
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("touchstart", onEnter, { passive: true });
      card.addEventListener("touchend", onLeave, { passive: true });

      // store for cleanup
      handlers.set(card, { onMove, onEnter, onLeave });
    });

    // cleanup on unmount or when projects changes
    return () => {
      handlers.forEach((h, card) => {
        card.removeEventListener("mousemove", h.onMove);
        card.removeEventListener("touchmove", h.onMove);
        card.removeEventListener("mouseenter", h.onEnter);
        card.removeEventListener("mouseleave", h.onLeave);
        card.removeEventListener("touchstart", h.onEnter);
        card.removeEventListener("touchend", h.onLeave);
      });
    };
  }, [projects]); // re-run when projects change (ensures cards exist)

  return (
    <section className="Projects">
      <h1 className="section-heading">Projects</h1>

      <div className="projects-grid" ref={cardsRef}>
        {projects.map((project, index) => (
          <div className="glass-card" key={index} data-index={index}>
            <div className="card-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-desc">{project.description}</p>

              <div className="tags">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-footer">
              <a
                className="button-view-project underline-anim"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                View Source →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
