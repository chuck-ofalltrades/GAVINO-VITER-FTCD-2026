import React from "react";
import Layout from "../../Layout";
import RolesList from "./RolesList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiMenuAlt2 } from "react-icons/hi";
import ModalAddRoles from "./ModalAddRoles";

const Roles = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
      <Layout menu="settings" submenu="users">
        <div className="flex items-center gap-5 mb-6">
          <HiMenuAlt2 className="text-xl text-dark" />
          <FaArrowLeftLong className="text-xl text-dark" />

          <div className="flex items-center gap-2 text-xs">
            <span className="text-primary">Settings</span>
            <span className="text-primary">›</span>
            <span className="text-primary">Users</span>
            <span className="text-primary">›</span>
            <span className="text-dark">Role</span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mb-8">
          <h1 className="text-lg font-bold">Role</h1>

          <button
            type="button"
            className="flex items-center gap-1 text-primary text-sm"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>

        <RolesList itemEdit={itemEdit} setItemEdit={setItemEdit} />
      </Layout>

      {store.isAdd && <ModalAddRoles itemEdit={itemEdit} />}
    </>
  );
};

export default Roles;
