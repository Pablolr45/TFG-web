"use client"
import React, { useEffect, useRef } from "react";
import Experience from "../../../RV/Experiencia";

const MyComponent = () => {
  const experienceRef = useRef(null);

  useEffect(() => {
    const experienceCanvas = experienceRef.current;

    if (experienceCanvas) {
      const experience = new Experience();
    }

    return () => {
    };
  }, []);

  return <div ref={experienceRef} className="experience-canvas"></div>;
};

export default MyComponent;
