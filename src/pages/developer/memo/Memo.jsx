import React from "react";
import Layout from "../Layout";
import MemoList from "./MemoList";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModalAddMemo from "./ModalAddMemo";

const Memo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="memo" submenu="">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between w-full">
          <h1>Memo</h1>
          <div>
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={handleAdd}
            >
              <FaPlus className="text-primary" />
              Add
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div>
          <MemoList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {store.isAdd && (
        <ModalAddMemo itemEdit={itemEdit} setItemEdit={setItemEdit} />
      )}
    </>
  );
};

export default Memo;
