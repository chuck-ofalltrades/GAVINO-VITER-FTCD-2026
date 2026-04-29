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
import useQueryData from "../../../../functions/custom-hooks/useQueryData";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText } from "../../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../../partials/MessageError";

const ModalAddSystemUsers = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const { isLoading, data: dataRoles } = useQueryData(
    `${apiVersion}/controllers/developers/settings/roles/roles.php`,
    "get",
    "roles",
  );

  const activeRoles = dataRoles?.data?.filter(
    (item) => item.role_is_active == 1,
  );

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/settings/users/system-users/system-users.php?id=${itemEdit.system_user_aid}`
          : `${apiVersion}/controllers/developers/settings/users/system-users/system-users.php`,
        itemEdit ? "put" : "post",
        values,
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["system-users"] });

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
    system_user_first_name: itemEdit ? itemEdit.system_user_first_name : "",
    system_user_last_name: itemEdit ? itemEdit.system_user_last_name : "",
    system_user_email: itemEdit ? itemEdit.system_user_email : "",
    system_user_role_id: itemEdit ? itemEdit.system_user_role_id : "",
  };

  const yupSchema = Yup.object({
    system_user_first_name: Yup.string().trim().required("required."),
    system_user_last_name: Yup.string().trim().required("required."),
    system_user_email: Yup.string()
      .trim()
      .email("Invalid email.")
      .required("required."),
    system_user_role_id: Yup.string().trim().required("required."),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/30"></div>

      <div className="fixed top-0 right-0 z-[70] h-full w-[35rem] bg-white flex flex-col">
        <div className="relative px-6 pt-7 pb-4">
          <h3 className="text-dark text-lg font-bold">
            {itemEdit ? "Update" : "Add"} System User
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
                      label="First Name"
                      name="system_user_first_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-8">
                    <InputText
                      label="Last Name"
                      name="system_user_last_name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-8">
                    <InputText
                      label="Email"
                      name="system_user_email"
                      type="email"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mb-8">
                    <label>Role</label>
                    <select
                      name="system_user_role_id"
                      value={props.values.system_user_role_id}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      disabled={mutation.isPending || isLoading}
                      className={
                        props.errors.system_user_role_id &&
                        props.touched.system_user_role_id
                          ? "error-show"
                          : ""
                      }
                    >
                      <option value="">Select Role</option>
                      {activeRoles?.map((item) => (
                        <option key={item.role_aid} value={item.role_aid}>
                          {item.role_name}
                        </option>
                      ))}
                    </select>

                    {props.errors.system_user_role_id &&
                      props.touched.system_user_role_id && (
                        <span className="error-show">
                          {props.errors.system_user_role_id}
                        </span>
                      )}
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

export default ModalAddSystemUsers;
