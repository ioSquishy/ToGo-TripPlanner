import { useState } from "react";

interface EditDatesProps {
  startDate: Date;
  endDate: Date;
  onSave: (newStart: Date, newEnd: Date) => void;
  affectedCount?: number; // number of activities on days that would be removed
}

// format Date to "YYYY-MM-DD" for the date input value
function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function EditDates({ startDate, endDate, onSave, affectedCount }: EditDatesProps) {
  const [newStart, setNewStart] = useState(toDateString(startDate));
  const [newEnd, setNewEnd] = useState(toDateString(endDate));
  const [error, setError] = useState("");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!newStart || !newEnd) {
      setError("Both dates are required");
      return;
    }

    if (newEnd < newStart) {
      setError("End date can't be before start date");
      return;
    }

    onSave(new Date(newStart + "T00:00:00Z"), new Date(newEnd + "T00:00:00Z"));
  }

  return (
    <div>
      <h3 className="mb-2 text-center">Edit Trip Dates</h3>
      <form onSubmit={handleSave}>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="editStartDate">Start Date</label>
            <input
              type="date"
              id="editStartDate"
              value={newStart}
              onChange={(e) => setNewStart(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="editEndDate">End Date</label>
            <input
              type="date"
              id="editEndDate"
              value={newEnd}
              onChange={(e) => setNewEnd(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {affectedCount !== undefined && affectedCount > 0 && (
          <p className="text-amber-600 text-sm mb-2">
            {affectedCount} {affectedCount === 1 ? "activity" : "activities"} will be moved to the wishlist
          </p>
        )}

        <div className="flex justify-center">
          <button type="submit" className="trip-form-submit m-5 w-8/10">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
