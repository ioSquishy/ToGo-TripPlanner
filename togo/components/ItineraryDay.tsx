import { useEffect, type ReactNode } from 'react';
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
  const buttonId = `collapseButton-${dateStrWithHyphens}`;
  const imgId = `collapseImg-${dateStrWithHyphens}`;
  const divId = `collapseDiv-${dateStrWithHyphens}`;

  useEffect(() => {
    const collapseImg = document.querySelector(`#${imgId}`) as HTMLImageElement;
    const collapseDiv = document.querySelector(`#${divId}`) as HTMLDivElement;
    const collapseButton = document.querySelector(`#${buttonId}`) as HTMLButtonElement;

    if (collapseButton == null) {
      console.log("Failed to query select collapseButton.");
      return;
    } else {
      collapseButton.addEventListener("click", collapseContainer);
    }
    
    let isCollapsed = false;
    function collapseContainer() {
      if (collapseImg === null) {
        return;
      }
      if (isCollapsed) {
        // uncollapse
        collapseImg.src = "/collapse_icon-open.svg";
        collapseDiv.classList.remove("hidden");
      } else {
        // collapse
        collapseImg.src = "/collapse_icon-closed.svg";
        collapseDiv.classList.add("hidden");
      }
      isCollapsed = !isCollapsed;
    }

    return () => {
      collapseButton.removeEventListener("click", collapseContainer);
    };
  }, []);

  return (
    <div>
      <hr className="mb-3"></hr>
      <div className="flex mb-1">
        <button id={buttonId} className="w-10"><img id={imgId} src="/collapse_icon-open.svg" /></button>
        <h3 className="m-0">{dateFormatter.format(date)}</h3>
      </div>
      <div id={divId}>
        <ItemContainer id={dateStrWithHyphens} wishlist={false}>
          {children}
        </ItemContainer>
      </div>
    </div>
  );
}