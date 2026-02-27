'use client';

import { useEffect, useState } from 'react';
import ItineraryItem, { ItineraryItemProps } from '@/components/ItineraryItem';
import ItemContainer from '@/components/ItemContainer';
import ItineraryDay, { ItineraryDayProps } from '@/components/ItineraryDay';
import { createCookiesWithMutableAccessCheck } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export default function Trip() {
  // split screen resizing logic
  useEffect(() => {
    const dashboardContainer = document.getElementById('dashboardContainer');
    const handle = document.getElementById('resize-handle');
    const mapContainer = document.getElementById('mapContainer');

    if (!dashboardContainer || !handle || !mapContainer) {
      console.error("Failed to get one or more base-level container elements by ID");
      return;
    }

    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startWidth = dashboardContainer.offsetWidth;
      document.documentElement.classList.add('select-none');
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.documentElement.classList.remove('select-none');
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

  const [wishlistItems, setWishlistItems] = useState<ItineraryItemProps[]>([]);
  const [itineraryDayItems, setItineraryDayItems] = useState<ItineraryDayProps[]>([]);

  // load itinerary
  useEffect(() => {
    const tripName = document.getElementById("tripName");
    const tripDates = document.getElementById("tripDates");
    const wishlistContainer = document.getElementById("wishlistContainer");
    const itineraryDaysContainer = document.getElementById("itineraryDaysContainer");

    if (!tripName || !tripDates || !wishlistContainer || !itineraryDaysContainer) {
      console.error("Failed to query necessary elements to load trip page.");
      return;
    }

    /* TODO: fill in wishlist container */
    // get trip name from db
    tripName.innerText = "Trip Name";
    // get trip dates from db and format them
    tripDates.innerText = "M/DD - M/DD";

    /* TODO: fill in wishlist container */
    let wlItems : ItineraryItemProps[] = [];
    // push items from db in a loop to wlItems
    wlItems.push({id: 0, destName: "Central Park", destDesc: "Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions!", destImg: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqKCop4voDjTEiAlmhsYYEK0tCj8zvKerfFK201dC3bigw31EvAYeVl3aKjftWVc8sJEyoExHTH20m9cRcwA2nwVodKqlf7R1mnUhHJabnGVJaQpRQ-ta_grh-TI_OuTyeGXi2a=s1360-w1360-h1020-rw", itemNote: "Picnic"});
    setWishlistItems(wlItems);

    /* TODO: fill in itinerary days */
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div id="dashboardContainer" className="w-4/10 min-w-1/4 overflow-auto bg-gray-300  no-scrollbar">
        {/* trip name card container */}
        <div className="w-8/10 mx-auto my-8 bg-gray-50 rounded-lg p-3 drop-shadow-lg/60">
          <h1 id="tripName"></h1>
          {/* trip dates container */}
          <div className="bg-gray-200 w-fit px-3 py-2 rounded-md my-3 flex gap-2">
            <img src="/calendar_icon.svg" alt="Calendar icon"></img>
            <p id="tripDates" className="font-bold"></p>
          </div>
        </div>

        {/* trip info */}
        <div className="w-8/10 mx-auto">
          <h2>Itinerary</h2>
          <h5><span className="text-green-600">Wishlist</span> - Drag items below into your itinerary</h5>
          {/* wishlist container */}
          <ItemContainer id="wishlistContainer" wishlist={true}>
            {wishlistItems.map(item => (
              <ItineraryItem
                key={item.id}
                id={item.id}
                destName={item.destName}
                destDesc={item.destDesc}
                destImg={item.destImg}
                itemNote={item.itemNote}
              />
            ))}
          </ItemContainer>
        </div>


        {/* trip days */}
        <div id="itineraryDaysContainer" className="w-8/10 mx-auto flex flex-col gap-8 mt-10 mb-10">
          <ItineraryDay date={new Date()}>
            <ItineraryItem id={2} destName="Central Park" destDesc="Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions!" destImg="https://lh3.googleusercontent.com/gps-cs-s/AHVAweqKCop4voDjTEiAlmhsYYEK0tCj8zvKerfFK201dC3bigw31EvAYeVl3aKjftWVc8sJEyoExHTH20m9cRcwA2nwVodKqlf7R1mnUhHJabnGVJaQpRQ-ta_grh-TI_OuTyeGXi2a=s1360-w1360-h1020-rw" itemNote="Picnic" />
            <ItineraryItem id={3} destName="Central Park" destDesc="Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions! Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions!" destImg="/img_placeholder.svg" itemNote="Bike" />
          </ItineraryDay>
          <ItineraryDay date={new Date(2025, 1, 24)}>
            <ItineraryItem id={4} destName="Central Park" destDesc="Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions!" destImg="https://lh3.googleusercontent.com/gps-cs-s/AHVAweqKCop4voDjTEiAlmhsYYEK0tCj8zvKerfFK201dC3bigw31EvAYeVl3aKjftWVc8sJEyoExHTH20m9cRcwA2nwVodKqlf7R1mnUhHJabnGVJaQpRQ-ta_grh-TI_OuTyeGXi2a=s1360-w1360-h1020-rw" itemNote="Picnic" />
            <ItineraryItem id={5} destName="Central Park" destDesc="Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions! Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions!" destImg="/img_placeholder.svg" itemNote="Bike" />
          </ItineraryDay>
        </div>
      </div>
      <div id="resize-handle" className="w-1.5 bg-gray-600 hover:bg-gray-400 cursor-col-resize"></div>
      <div id="mapContainer" className="flex-1 min-w-1/10 overflow-hidden bg-sky-100">
        // TODO: add google maps
      </div>
    </div>
  );
}