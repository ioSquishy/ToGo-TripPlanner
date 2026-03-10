"use client";

import { useParams } from "next/navigation";
import TripPage from "../page";

export default function TripByIdPage() {
  const params = useParams<{ tripId: string }>();
  const tripId = params.tripId;

  return <TripPage tripIdFromParams={tripId} />;
}
