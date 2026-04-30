import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiVersion } from "../../../functions/functions-general";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../store/StoreAction";
import { queryData } from "../../../functions/custom-hooks/queryData";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import {
  InputText,
  InputTextArea,
} from "../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../partials/MessageError";

const ModalAddDonor = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/donor/donor.php?id=${itemEdit.donor_aid}`
          : `${apiVersion}/controllers/developers/donor/donor.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["donor"] });
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
    donor_is_active: itemEdit ? itemEdit.donor_is_active : 1,
    donor_name: itemEdit ? itemEdit.donor_name : "",
    donor_email: itemEdit ? itemEdit.donor_email : "",
    donor_contact: itemEdit ? itemEdit.donor_contact : "",
    donor_address: itemEdit ? itemEdit.donor_address : "",
    donor_city: itemEdit ? itemEdit.donor_city : "",
    donor_state: itemEdit ? itemEdit.donor_state : "",
    donor_country: itemEdit ? itemEdit.donor_country : "",
    donor_zip: itemEdit ? itemEdit.donor_zip : "",
  };

  const yupSchema = Yup.object({
    donor_name: Yup.string().trim().required("Required"),
    donor_email: Yup.string().email("Invalid email").required("Required"),
    donor_contact: Yup.string().trim().required("Required"),
    donor_address: Yup.string().trim().required("Required"),
    donor_city: Yup.string().trim().required("Required"),
    donor_state: Yup.string().trim().required("Required"),
    donor_country: Yup.string().trim().required("Required"),
    donor_zip: Yup.string().trim().required("Required"),
  });

  const handleClose = () => dispatch(setIsAdd(false));

  React.useEffect(() => {
    dispatch(setError(false));
  }, [dispatch]);

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/30"></div>
      <div className="fixed top-0 right-0 z-[70] h-full w-[35rem] bg-white flex flex-col">
        <div className="relative px-6 pt-7 pb-4">
          <h3 className="text-dark text-lg font-bold">
            {itemEdit ? "Update" : "Add"} Donor
          </h3>
          <button
            type="button"
            className="absolute top-7 right-6 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center"
            onClick={handleClose}
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        <div className="flex-1 px-6 pt-4 overflow-y-auto">
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
                  {/* Fixed Checkbox Size and Alignment */}
                  <div className="flex items-center justify-start gap-2 mb-6">
                    <input
                      type="checkbox"
                      id="donor_is_active"
                      name="donor_is_active"
                      className="w-4 h-4 cursor-pointer"
                      onChange={() =>
                        props.setFieldValue(
                          "donor_is_active",
                          props.values.donor_is_active == 1 ? 0 : 1,
                        )
                      }
                      checked={props.values.donor_is_active == 1}
                    />
                    <label
                      htmlFor="donor_is_active"
                      className="text-sm text-primary cursor-pointer"
                    >
                      Active
                    </label>
                  </div>

                  {/* Restored .relative wrappers for floating labels */}
                  <div className="relative mb-6">
                    <InputText
                      label="Full Name"
                      name="donor_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="Email"
                      name="donor_email"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="Contact Number"
                      name="donor_contact"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputTextArea
                      label="Address"
                      name="donor_address"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="City"
                      name="donor_city"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="State/Province"
                      name="donor_state"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-6">
                    <InputText
                      label="Country"
                      name="donor_country"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>
                  <div className="relative mb-8">
                    <InputText
                      label="Zip"
                      name="donor_zip"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {store.error && <MessageError />}
                </div>

                <div className="flex gap-4 pb-8 mt-4">
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

export default ModalAddDonor;
