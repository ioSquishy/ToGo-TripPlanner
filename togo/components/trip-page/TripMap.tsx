import {
  Map,
  MapCameraChangedEvent,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { ItineraryDayProps } from "./ItineraryDay";
import {
  ItineraryItemProps
} from "@/components/trip-page/ItineraryItem";

const DAY_COLORS: Record<number, string> = {
  0:  "#e6194b", 1:  "#3cb44b", 2:  "#4363d8", 3:  "#f58231",
  4:  "#911eb4", 5:  "#42d4f4", 6:  "#f032e6", 7:  "#bfef45",
  8:  "#fabed4", 9:  "#469990", 10: "#dcbeff", 11: "#9a6324",
  12: "#fffac8", 13: "#800000", 14: "#aaffc3", 15: "#808000",
  16: "#ffd8b1", 17: "#000075", 18: "#a9a9a9", 19: "#e6beff",
  20: "#ff4500", 21: "#2e8b57", 22: "#1e90ff", 23: "#ffd700",
  24: "#dc143c", 25: "#00ced1", 26: "#ff69b4", 27: "#8b4513",
  28: "#7fff00", 29: "#4b0082", 30: "#ff8c00", 31: "#00fa9a",
};

interface MapViewProps {
  lat: number;
  lon: number;
  itinerary: ItineraryDayProps[];
}

export default function TripMap({ lat, lon, itinerary }: MapViewProps) {
  return (
    <Map
      mapId={"d324cbd014b8ccf5e5e023e5"}
      defaultZoom={13}
      defaultCenter={{ lat: lat, lng: lon }}
    >
      {itinerary?.flatMap((days) =>
        days.items.map((location) => (
          <AdvancedMarker
            key={location.firestoreId}
            position={{
              lat: location.location?.locationLat ?? 0,
              lng: location.location?.locationLon ?? 0,
            }}
          >
            <Pin background={DAY_COLORS[days.dayIndex % 32]} borderColor={DAY_COLORS[days.dayIndex % 32]} glyphColor="white" />
          </AdvancedMarker>
        )),
      )}
    </Map>
  );
}
