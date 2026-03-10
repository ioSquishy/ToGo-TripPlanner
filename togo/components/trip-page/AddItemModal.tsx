import MapLocation from "@/types/MapLocation";

export interface AddItemModalProps {
  hidden: boolean;
  onClose: () => void;
}

export interface AddItemFormSubmitData {
  location: MapLocation;
  addedToWishlist: boolean;
  addedToDayIndicies: number[];
}

export default function AddItemModal(props: AddItemModalProps) {
  if (props.hidden) return null;

  function handleSubmission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35" onClick={props.onClose}>
      <div className="relative w-11/12 max-w-2xl min-h-80 rounded-xl bg-gray-50 p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={props.onClose} className="absolute top-3 right-3 h-8 w-8 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black" aria-label="Close modal">x</button>
        <h3 className="mb-2 text-center">Add Destination</h3>
        <form onSubmit={handleSubmission}>
        <label htmlFor="destination" className="text-black font-bold font-medium text-left">Destination</label>
          
        </form>
      </div>
    </div>
  );
}