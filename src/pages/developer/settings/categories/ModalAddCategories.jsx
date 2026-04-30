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
import {
  InputText,
  InputTextArea,
} from "../../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../partials/MessageError";

const ModalAddCategories = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  // Handles both Create (POST) and Update (PUT) based on itemEdit presence
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/categories/categories.php?id=${itemEdit.category_aid}`
          : `${apiVersion}/controllers/developers/settings/categories/categories.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      // Invalidate queries to trigger an auto-refresh of CategoriesList
      queryClient.invalidateQueries({ queryKey: ["categories"] });

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

  // Map initial values to the category column names
  const initVal = {
    ...itemEdit,
    category_name: itemEdit ? itemEdit.category_name : "",
    category_description: itemEdit ? itemEdit.category_description : "",
  };

  const yupSchema = Yup.object({
    category_name: Yup.string().trim().required("required."),
    category_description: Yup.string().trim().required("required."),
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
            {itemEdit ? "Update" : "Add"} Category
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
                      name="category_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-8">
                    <InputTextArea
                      label="Description"
                      name="category_description"
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

export default ModalAddCategories;
