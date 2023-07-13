"use client";
import { GameLocationsEnum } from "@/types/gameLocation";

declare const window: any;

export const ShowAllLocationsButton: React.FC = () => {
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => window.my_modal_3.showModal()}
      >
        Show all locations
      </button>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">
            These are all the possible locations
          </h3>
          {Object.values(GameLocationsEnum).map((location) => (
            <h3 className="font-bold text-base" key={location}>
              {location}
            </h3>
          ))}
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-secondary">Close</button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
