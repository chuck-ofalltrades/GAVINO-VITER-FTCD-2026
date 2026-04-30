import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiVersion } from "../../../../functions/functions-general";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { queryData } from "../../../../functions/custom-hooks/queryData";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText } from "../../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../partials/MessageError";

const ModalAddDesignations = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/designations/designations.php?id=${itemEdit.designation_aid}`
          : `${apiVersion}/controllers/developers/settings/designations/designations.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["designations"] });
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfully ${itemEdit ? "updated" : "added"}`));
        dispatch(setIsAdd(false));
      }
      if (data.success === false) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    ...itemEdit,
    designation_name: itemEdit ? itemEdit.designation_name : "",
    designation_category: itemEdit ? itemEdit.designation_category : "",
  };

  const yupSchema = Yup.object({
    designation_name: Yup.string().trim().required("required."),
    designation_category: Yup.string().trim().required("required."),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, [dispatch]);

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/30"></div>
      <div className="fixed top-0 right-0 z-[70] h-full w-[35rem] bg-white flex flex-col">
        <div className="relative px-6 pt-7 pb-4">
          <h3 className="text-dark text-lg font-bold">
            {itemEdit ? "Update" : "Add"} Designation
          </h3>
          <button
            type="button"
            className="absolute top-7 right-6 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center"
            onClick={handleClose}
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
        <div className="flex-1 px-6 pt-4">
          <Formik
            initialValues={initVal}
            enableReinitialize={true}
            validationSchema={yupSchema}
            onSubmit={(values) => {
              dispatch(setError(false));
              mutation.mutate(values);
            }}
          >
            {(props) => (
              <Form className="h-full flex flex-col justify-between">
                <div>
                  <div className="relative mb-8">
                    <InputText
                      label="Name"
                      name="designation_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-8">
                    {/* Updated to InputText for a smaller box */}
                    <InputText
                      label="Category"
                      name="designation_category"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  {store.error && <MessageError />}
                </div>
                <div className="flex gap-4 pb-8">
                  <button
                    type="submit"
                    disabled={mutation.isPending || !props.dirty}
                    className="w-full h-11 rounded-md bg-primary/50 text-white text-sm font-semibold disabled:opacity-70"
                  >
                    {mutation.isPending ? (
                      <ButtonSpinner />
                    ) : itemEdit ? (
                      "Save"
                    ) : (
                      "Add"
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-full h-11 rounded-md border border-gray-300 bg-white text-dark text-sm font-semibold"
                    onClick={handleClose}
                    disabled={mutation.isPending}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalAddDesignations;
