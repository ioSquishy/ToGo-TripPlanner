'use client';

import { useEffect, useState } from 'react';
import ItineraryItem, { ItineraryItemProps } from '@/components/ItineraryItem';
import ItemContainer from '@/components/ItemContainer';
import ItineraryDay, { ItineraryDayProps, getItineraryDayId } from '@/components/ItineraryDay';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

const wishlistContainerId = "wishlistContainer";

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
  const [itineraryDays, setItineraryDays] = useState<ItineraryDayProps[]>([]);

  // load itinerary
  useEffect(() => {
    const tripName = document.getElementById("tripName");
    const tripDates = document.getElementById("tripDates");
    const wishlistContainer = document.getElementById(wishlistContainerId);
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
    wlItems.push({id: 0, index: 0, destName: "Central Park", destDesc: "Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions!", destImg: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqKCop4voDjTEiAlmhsYYEK0tCj8zvKerfFK201dC3bigw31EvAYeVl3aKjftWVc8sJEyoExHTH20m9cRcwA2nwVodKqlf7R1mnUhHJabnGVJaQpRQ-ta_grh-TI_OuTyeGXi2a=s1360-w1360-h1020-rw", itemNote: "Bike"});
    setWishlistItems(wlItems);

    /* TODO: fill in itinerary days */
    let dayContainers : ItineraryDayProps[] = [];
    // for each day in db, create a dayContainer
    //    for each dayContainer made, add ItineraryItemProps
    let dayItems : ItineraryItemProps[] = [];
    dayItems.push({id: 1, index: 0, destName: "Central Park", destDesc: "Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions!", destImg: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqKCop4voDjTEiAlmhsYYEK0tCj8zvKerfFK201dC3bigw31EvAYeVl3aKjftWVc8sJEyoExHTH20m9cRcwA2nwVodKqlf7R1mnUhHJabnGVJaQpRQ-ta_grh-TI_OuTyeGXi2a=s1360-w1360-h1020-rw", itemNote: "Picnic"});
    dayItems.push({id: 2, index: 1, destName: "Times Square", destDesc: "Times Square description", destImg: "/img_placeholder.svg", itemNote: "Shopping"});
    let day : ItineraryDayProps = {date: new Date(), items: dayItems};
    dayContainers.push(day);

    let tomorrowDate = new Date();
    tomorrowDate.setDate(new Date().getDate() + 1);
    let dayItems2 : ItineraryItemProps[] = [];
    dayItems2.push({id: 3, index: 0, destName: "Central Park", destDesc: "Central park is considered the heart of New York. With the park spanning over 800 acres, visitors can walk around scenic paths and discover an abundance of attractions!", destImg: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqKCop4voDjTEiAlmhsYYEK0tCj8zvKerfFK201dC3bigw31EvAYeVl3aKjftWVc8sJEyoExHTH20m9cRcwA2nwVodKqlf7R1mnUhHJabnGVJaQpRQ-ta_grh-TI_OuTyeGXi2a=s1360-w1360-h1020-rw", itemNote: "Picnic"});
    dayItems2.push({id: 4, index: 1, destName: "Times Square", destDesc: "Times Square description", destImg: "/img_placeholder.svg", itemNote: "Shopping"});
    let day2 : ItineraryDayProps = {date: tomorrowDate, items: dayItems2};
    dayContainers.push(day2);
    setItineraryDays(dayContainers);
  }, []);


  /**
   * Get ItineraryItems from ID of ItineraryDay/Wishlist
   * @param id id of ItineraryDay of Wishlist id
   * @returns ItineraryDayProps[] of that container
   */
  function getItemContainerItems(id: string) {
    return id === wishlistContainerId 
      ? wishlistItems 
      : itineraryDays.find(d => getItineraryDayId(d.date) === id)?.items || [];
  }
  // drag and drop logic
  function onDragEnd(result: DropResult) {
    const {source, destination} = result;

    // if no destsination, return
    if (!destination) return;

    // get list of all ItineraryItems in both source container and destination container
    const sameContainer = source.droppableId === destination.droppableId; // true if item didn't move containers
    const sourceList = [...getItemContainerItems(source.droppableId)];
    const destList = sameContainer ? sourceList : [...getItemContainerItems(destination.droppableId)];

    // remove ItineraryItem from source list
    const [movedItem] = sourceList.splice(source.index, 1);
    // add ItineraryItem to dest list
    destList.splice(destination.index, 0, movedItem);

    // update source container
    if (source.droppableId === wishlistContainerId) { 
      setWishlistItems(sourceList);
    } else {
      // go through each itinerary day
      setItineraryDays(prev => prev.map(day => (
        // if this day was this source container, update list (or else do not change)
        getItineraryDayId(day.date) === source.droppableId ? { ...day, items: sourceList } : day
      )));
    }
    // update destination container
    if (destination.droppableId === wishlistContainerId) { 
      setWishlistItems(destList);
    } else if (source.droppableId !== destination.droppableId) {
      // go through each itinerary day
      setItineraryDays(prev => prev.map(day => (
        // if this day is the destination container, update list
        getItineraryDayId(day.date) === destination.droppableId ? { ...day, items: destList } : day
      )));
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          <ItemContainer id={wishlistContainerId} wishlist={true} items={wishlistItems} />
        </div>


        {/* trip days */}
        <div id="itineraryDaysContainer" className="w-8/10 mx-auto flex flex-col gap-8 mt-10 mb-10">
          {itineraryDays.map(dayContainer => (
            <ItineraryDay key={getItineraryDayId(dayContainer.date)} {...dayContainer} />
          ))}
        </div>
      </div>
      <div id="resize-handle" className="w-1.5 bg-gray-600 hover:bg-gray-400 cursor-col-resize"></div>
      <div id="mapContainer" className="flex-1 min-w-1/10 overflow-hidden bg-sky-100">
        // TODO: add google maps
      </div>
    </div>
    </DragDropContext>
  );
}