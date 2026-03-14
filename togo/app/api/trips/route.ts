import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  Timestamp,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { daysBetween } from "@/lib/db";
const TRIPS_COLLECTION = "trips";

export async function POST(req: NextRequest) {
  try {
    const formValues = await req.json();

    if (!formValues) {
      console.error("No form values provided", formValues);
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 },
      );
    }

    // parse request body
    const { tripName, location, startDate, endDate, users, locationImg } = formValues;

    if (daysBetween(startDate, endDate) <= 0) {
      return NextResponse.json(
        { error: "End date must be after start date" },
        { status: 400 },
      );
    }

    const docRef = await addDoc(collection(db, TRIPS_COLLECTION), {
      tripName,
      location,
      startDate: startDate
        ? Timestamp.fromDate(new Date(`${startDate}T00:00:00Z`))
        : null,
      endDate: endDate
        ? Timestamp.fromDate(new Date(`${endDate}T00:00:00Z`))
        : null,
      users,
      createdAt: new Date(),
      locationImg
    });

    return NextResponse.json(
      { tripId: docRef.id, message: "Post created" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create trip:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const formValues = await req.json();
    const { id, tripName } = formValues;

    console.log("in patch--id: " + id + " " + tripName);

    const docRef = doc(db, "trips", id);
    await updateDoc(docRef, formValues);

    return NextResponse.json(
      { tripId: docRef.id, message: "Trip name editted" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to update trip:", error);
    return NextResponse.json(
      { error: "Failed to create patch" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  //   return NextResponse.json({ trips }, { status: 200 });
}
