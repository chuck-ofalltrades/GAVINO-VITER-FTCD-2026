import React from "react";
import Layout from "../../Layout";
import ModalAddSystemUsers from "./ModalAddSystemUsers";
import { StoreContext } from "../../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../store/StoreAction";
import {
  FaArchive,
  FaEdit,
  FaKey,
  FaPlus,
  FaTrash,
  FaTrashRestore,
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiMenuAlt2 } from "react-icons/hi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { apiVersion } from "../../../../functions/functions-general";
import { queryDataInfinite } from "../../../../functions/custom-hooks/queryDataInfinite";
import SearchBar from "../../../../partials/SearchBar";
import Status from "../../../../partials/Status";
import TableLoading from "../../../../partials/TableLoading";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import Loadmore from "../../../../partials/Loadmore";
import ModalArchive from "../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../partials/modals/ModalDelete";

const SystemUsers = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [itemEdit, setItemEdit] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();

  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "system-users",
      search.current.value,
      store.isSearch,
      filterData,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        "",
        `${apiVersion}/controllers/developers/settings/users/system-users/page.php?start=${pageParam}`,
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        "post",
      ),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((p) => p.data).length;

      if (loadedItems < lastPage.total) {
        return loadedItems + 1;
      }

      return undefined;
    },
    refetchOnWindowFocus: false,
  });

  const handleAdd = () => {
    setItemEdit(null);
    dispatch(setIsAdd(true));
  };

  const handleEdit = (item) => {
    setItemEdit(item);
    dispatch(setIsAdd(true));
  };

  const handleArchive = (item) => {
    setItemEdit(item);
    dispatch(setIsArchive(true));
  };

  const handleRestore = (item) => {
    setItemEdit(item);
    dispatch(setIsRestore(true));
  };

  const handleDelete = (item) => {
    setItemEdit(item);
    dispatch(setIsDelete(true));
  };

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
            <span className="text-dark">System</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold">System</h1>

          <button
            type="button"
            className="flex items-center gap-1 text-primary text-sm hover:underline"
            onClick={handleAdd}
          >
            <FaPlus />
            Add
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="relative w-[100px]">
            <label>Status</label>
            <select
              value={filterData}
              onChange={(e) => setFilterData(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <SearchBar
            search={search}
            dispatch={dispatch}
            store={store}
            result={result?.pages}
            isFetching={isFetching}
            setOnSearch={setOnSearch}
            onSearch={onSearch}
          />
        </div>

        <div className="relative">
          {status !== "pending" && isFetching && <FetchingSpinner />}

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {!error &&
                (status === "pending" || result?.pages[0]?.count === 0) && (
                  <tr>
                    <td colSpan="100%" className="p-10">
                      {status === "pending" ? (
                        <TableLoading cols={2} count={20} />
                      ) : (
                        <NoData />
                      )}
                    </td>
                  </tr>
                )}

              {error && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    <ServerError />
                  </td>
                </tr>
              )}

              {result?.pages?.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page?.data?.map((item, itemIndex) => (
                    <tr key={`${item.system_user_aid}-${itemIndex}`}>
                      <td>{counter++}.</td>
                      <td>
                        <Status
                          text={
                            item.system_user_is_active == 1
                              ? "active"
                              : "inactive"
                          }
                        />
                      </td>
                      <td>
                        {item.system_user_first_name}{" "}
                        {item.system_user_last_name}
                      </td>
                      <td>{item.system_user_email}</td>
                      <td>{item.role_name}</td>
                      <td>
                        <div className="flex items-center gap-4 text-gray-600">
                          {item.system_user_is_active == 1 ? (
                            <>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                <FaEdit />
                              </button>

                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Archive"
                                onClick={() => handleArchive(item)}
                              >
                                <FaArchive />
                              </button>

                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Key"
                              >
                                <FaKey />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Restore"
                                onClick={() => handleRestore(item)}
                              >
                                <FaTrashRestore />
                              </button>

                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Delete"
                                onClick={() => handleDelete(item)}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div className="loadmore flex justify-center flex-col items-center pb-10">
            <Loadmore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
              isSearchOrFilter={store.isSearch || store?.isFilter}
            />
          </div>
        </div>
      </Layout>

      {store.isAdd && <ModalAddSystemUsers itemEdit={itemEdit} />}

      {store.isArchive && itemEdit && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/users/system-users/active.php?id=${itemEdit.system_user_aid}`}
          msg="Are you sure you want to archive this record?"
          successMsg="Successfully archived."
          item={`${itemEdit.system_user_first_name} ${itemEdit.system_user_last_name}`}
          dataItem={itemEdit}
          queryKey="system-users"
        />
      )}

      {store.isRestore && itemEdit && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/users/system-users/active.php?id=${itemEdit.system_user_aid}`}
          msg="Are you sure you want to restore this record?"
          successMsg="Successfully restored."
          item={`${itemEdit.system_user_first_name} ${itemEdit.system_user_last_name}`}
          dataItem={itemEdit}
          queryKey="system-users"
        />
      )}

      {store.isDelete && itemEdit && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/users/system-users/system-users.php?id=${itemEdit.system_user_aid}`}
          msg="Are you sure you want to delete this record?"
          successMsg="Successfully deleted."
          item={`${itemEdit.system_user_first_name} ${itemEdit.system_user_last_name}`}
          dataItem={itemEdit}
          queryKey="system-users"
        />
      )}
    </>
  );
};

export default SystemUsers;
