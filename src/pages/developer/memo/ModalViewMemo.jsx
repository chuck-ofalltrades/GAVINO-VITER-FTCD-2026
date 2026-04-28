import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { setIsView } from "../../../store/StoreAction";
import ModalWrapperCenter from "../../../partials/modals/ModalWrapperCenter";

const ModalViewMemo = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsView(false));
  };

  if (!itemEdit) return null;

  return (
    <ModalWrapperCenter>
      <div className="w-full max-w-[60rem] bg-white rounded-md p-10">
        {/* TOP DETAILS */}
        <div className="grid gap-3 text-[14px] text-gray-700">
          <div className="grid grid-cols-[90px_1fr]">
            <span className="font-semibold">To:</span>
            <span>{itemEdit.memo_to}</span>
          </div>

          <div className="grid grid-cols-[90px_1fr]">
            <span className="font-semibold">From:</span>
            <span>{itemEdit.memo_from}</span>
          </div>

          <div className="grid grid-cols-[90px_1fr]">
            <span className="font-semibold">Date:</span>
            <span>{itemEdit.memo_date}</span>
          </div>

          <div className="grid grid-cols-[90px_1fr]">
            <span className="font-semibold">Category:</span>
            <span>{itemEdit.memo_category}</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t my-6"></div>

        {/* MEMO BODY (DOCUMENT STYLE) */}
        <div className="text-[14px] text-gray-700 leading-7 whitespace-pre-line space-y-4">
          {itemEdit.memo_text}
        </div>

        {/* ACTION */}
        <div className="flex justify-end mt-10">
          <button
            type="button"
            className="px-6 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </ModalWrapperCenter>
  );
};

export default ModalViewMemo;
