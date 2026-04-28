import React from "react";
import { FaPlus } from "react-icons/fa";
import { setIsAdd } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import Layout from "../Layout";
import EmployeesList from "./EmployeesList";
import ModalAddEmployees from "./ModalAddEmployees";

const Employees = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    setItemEdit(null);
    dispatch(setIsAdd(true));
  };

  return (
    <>
      <Layout menu="employees">
        <div className="flex items-center justify-between w-full">
          <h1>Employees</h1>

          <button
            type="button"
            className="flex items-center gap-1"
            onClick={handleAdd}
          >
            <FaPlus className="text-primary" />
            Add
          </button>
        </div>

        <EmployeesList itemEdit={itemEdit} setItemEdit={setItemEdit} />
      </Layout>

      {store.isAdd && <ModalAddEmployees itemEdit={itemEdit} />}
    </>
  );
};

export default Employees;
