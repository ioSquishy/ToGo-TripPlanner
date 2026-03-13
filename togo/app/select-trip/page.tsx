"use client"
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function selectTrip() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // verify user is logged in, then load page
  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }
    setLoading(true);
    setError(null);

    if (!user) {
      setError("You must be signed in to view this page.");
      setLoading(false);
      return;
    }

    async function loadPage() {
      try {
        // TODO: get trips
        // if no trips, redirect to create-trip page
        
        // TODO: update page
      
      } catch (err) {
        console.error(err);
        setError("Failed to load trip.");
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [authLoading, user]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error ?? "Something went wrong."}
      </div>
    );
  }

  return (
    <>

    </>
  )
}