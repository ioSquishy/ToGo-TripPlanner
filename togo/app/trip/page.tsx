'use client';

import { useEffect } from 'react';

export default function Trip() {
  // split screen resizing logic
  useEffect(() => {
    const dashboardContainer = document.getElementById('dashboardContainer');
    const handle = document.getElementById('resize-handle');
    const mapContainer = document.getElementById('mapContainer');

    if (dashboardContainer === null || handle === null || mapContainer === null) {
      console.log("Failed to get one or more elements by ID");
      return;
    }

    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startWidth = dashboardContainer.offsetWidth;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const newWidth = startWidth + deltaX;
      dashboardContainer.style.width = `${newWidth}px`;
    };

    handle.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    // remove afterward to prevent multiple listeners from potentially building up
    return () => {
      handle.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex w-full h-screen select-none">
      <div id="dashboardContainer" className="w-6/10 min-w-1/4 overflow-auto bg-sky-50">

      </div>
      <div id="resize-handle" className="w-1.5 bg-gray-300 hover:bg-gray-500 cursor-col-resize"></div>
      <div id="mapContainer" className="flex-1 min-w-1/10 overflow-auto bg-sky-100">

      </div>
    </div>
  );
}