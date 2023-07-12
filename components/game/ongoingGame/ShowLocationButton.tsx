"use client";

type Props = {
  location: string;
};
declare const window: any;

export const ShowLocationButton: React.FC<Props> = ({ location }) => {
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => window.my_modal_2.showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">If you are not the spy the location is below</p>
          <h3>{location}</h3>
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
