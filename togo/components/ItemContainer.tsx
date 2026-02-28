import React from 'react';
import type { ReactNode } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import ItineraryItem, { ItineraryItemProps } from './ItineraryItem';

interface ItemContainerProps {
  id: string;
  wishlist: boolean;
  items: ItineraryItemProps[];
}

export default function ItemContainer({id, wishlist, items}: ItemContainerProps) {
  return (
    <Droppable droppableId={id} direction={wishlist ? "horizontal" : "vertical"}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div id={id} className={`flex gap-5 overflow-hidden w-full min-h-18 ${wishlist ? "flex-row" : "flex-col"}`}>
            {items.map((item, index) => (
              <ItineraryItem key={item.id} {...item} index={index} wishlistItem={wishlist} />
            ))}
            {provided.placeholder}
          </div>
          {/* drag and drop card */}
          <button className="group w-full h-20 cursor-pointer border border-1 border-dashed rounded-lg mt-5 select-none flex items-center justify-center bg-gray-50">
            <h5 className="m-0 text-gray-400 group-hover:text-black font-normal">+ Drop/Add Places Here</h5>
          </button>
        </div>
      )}
    </Droppable>
  );
}