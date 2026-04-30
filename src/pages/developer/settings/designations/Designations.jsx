import React from "react";
import Layout from "../../Layout";
import DesignationsList from "./DesignationsList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiMenuAlt2 } from "react-icons/hi";
import ModalAddDesignations from "./ModalAddDesignations";

const Designations = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="settings" submenu="designations">
        <div className="flex items-center gap-5 mb-6">
          <HiMenuAlt2 className="text-xl text-dark" />
          <FaArrowLeftLong className="text-xl text-dark" />

          <div className="flex items-center gap-2 text-xs">
            <span className="text-primary">Settings</span>
            <span className="text-primary">›</span>
            <span className="text-primary">Designations</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold">Designation</h1>
          <button
            type="button"
            className="flex items-center gap-1 text-primary text-sm hover:underline"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>

        <DesignationsList itemEdit={itemEdit} setItemEdit={setItemEdit} />
      </Layout>

      {store.isAdd && <ModalAddDesignations itemEdit={itemEdit} />}
    </>
  );
};

export default Designations;
