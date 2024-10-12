import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import projectData from "./projectData"; // Import the project data

import "./Projects.css";

function Projects() {
  return (
    <section className="Projects d-flex justify-content-center align-items-center">
      <Swiper
        className="mySwiper"
        spaceBetween={20}
        slidesPerView={1} // Show 1 card at a time on mobile
        centeredSlides={true}
        rewind={true}
        navigation={true}
        modules={[Navigation]}
      >
        {projectData.map((project) => (
          <SwiperSlide key={project.id} className="project-card">
            <div className="card-content">
              <h2 className="title">{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Projects;
