import React from "react";
import Layout from "../Layout";
import DonorListTable from "./DonorListTable";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import ModalAddDonor from "./ModalAddDonor";

const Donor = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="donor-list">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <HiMenuAlt2 className="text-xl text-dark" />
            <h1 className="text-lg font-bold">Donor List</h1>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-primary text-sm hover:underline"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>

        <DonorListTable itemEdit={itemEdit} setItemEdit={setItemEdit} />
      </Layout>

      {store.isAdd && <ModalAddDonor itemEdit={itemEdit} />}
    </>
  );
};

export default Donor;
