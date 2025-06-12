import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Projects.css";

function Projects() {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/projectData.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProjectData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load projects.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="Projects d-flex justify-content-center align-items-center flex-column">
        <h1 className="section-heading">Projects</h1>
        <p className="loading">Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="Projects d-flex justify-content-center align-items-center flex-column">
        <h1 className="section-heading">Projects</h1>
        <p className="error">{error}</p>
      </section>
    );
  }

  return (
    <section className="Projects d-flex justify-content-center align-items-center flex-column">
      <h1 className="section-heading">Projects</h1>
      <Swiper
        className="mySwiper"
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        rewind={true}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
      >
        {projectData.map((project, index) => (
          <SwiperSlide key={index} className="terminal project-card-border">
            <div className="card-content">
              <h2 className="title">{project.title}</h2>
              <br />
              <p>{project.description}</p>
              <br />
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <br />
              <button
                className="github-link"
                onClick={() => window.open(project.link, "_blank")}
              >
                View Source
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Projects;
