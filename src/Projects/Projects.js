import React, { useEffect, useState } from "react";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data/projectData.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section className="Projects">
      <h1 className="section-heading">Projects</h1>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="glass-card" key={index}>
            <h2 className="project-title">{project.title}</h2>
            <p className="project-desc">{project.description}</p>

            <div className="tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <a className="btn" href={project.link} target="_blank">
              View Source →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
