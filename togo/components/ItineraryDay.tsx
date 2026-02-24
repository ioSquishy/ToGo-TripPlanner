import { useState, type ReactNode } from 'react';
import ItemContainer from "./ItemContainer";

interface ItineraryDayProps {
  date: Date;
  children?: ReactNode;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});

export default function ItineraryDay({date, children} : ItineraryDayProps) {
  const dateStr = date.toLocaleDateString();
  const dateStrWithHyphens = dateStr.replaceAll("/", "-");

  const [isCollapsed, setIsCollapsed] = useState(false);

  function collapseContainer() {
    setIsCollapsed(prev => !prev);
  }

  return (
    <div>
      <hr className="mb-3"></hr>
      <div className="flex mb-1">
        <button onClick={collapseContainer} className="w-10 cursor-pointer">
          <img src={isCollapsed ? "/collapse_icon-closed.svg" : "/collapse_icon-open.svg"} />
        </button>
        <h3 className="m-0">{dateFormatter.format(date)}</h3>
      </div>
      <div hidden={isCollapsed}>
        <ItemContainer id={dateStrWithHyphens} wishlist={false}>
          {children}
        </ItemContainer>
      </div>
    </div>
  );
}