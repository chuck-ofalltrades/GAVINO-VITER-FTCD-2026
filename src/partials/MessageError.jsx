import React from "react";
import { FaTimes } from "react-icons/fa";
import { setError, setMessage } from "../store/StoreAction";
import { StoreContext } from "../store/StoreContext";

const MessageError = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const ref = React.useRef(null);

  const handleClose = () => {
    dispatch(setError(false));
  };

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ref]);

  // Safely extract the error message whether it's a string or an object
  const displayMessage =
    typeof store.message === "object" && store.message !== null
      ? store.message.errorInfo ||
        store.message.message ||
        JSON.stringify(store.message)
      : store.message;

  return (
    <>
      <div
        className="bg-red-200 px-4 py-3 mt-4 rounded-sm flex items-center justify-between gap-1"
        ref={ref}
      >
        <span className="text-red-500">{displayMessage}</span>
        <div>
          <button
            type="button"
            className="rounded-sm p-2 hover:bg-gray-100/20"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageError;
