"use client";

type Props = {
  location: string;
  currentSpy: string;
};
declare const window: any;

export const ShowSpy: React.FC<Props> = ({ currentSpy, location }) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center flex-col">
        <button
          className="btn btn-primary"
          onClick={() => window.my_modal_2.showModal()}
        >
          Show spy and location
        </button>
        <dialog id="my_modal_2" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">The location was: {location}</p>
            <p className="py-4">The spy was: {currentSpy}</p>

            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-secondary">Close</button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};
