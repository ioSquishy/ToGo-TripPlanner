import type { ReactNode } from 'react';
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
  return (
    <div>
      <hr></hr>
      <h3>{dateFormatter.format(date)}</h3>
      <ItemContainer id={date.toLocaleDateString()} wishlist={false}>
        {children}
      </ItemContainer>
    </div>
  );
}