import React from "react";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { apiVersion } from "../../../../functions/functions-general";
import { queryDataInfinite } from "../../../../functions/custom-hooks/queryDataInfinite";
import FetchingSpinner from "../../../../partials/spinners/FetchingSpinner";
import Status from "../../../../partials/Status";
import TableLoading from "../../../../partials/TableLoading";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import Loadmore from "../../../../partials/Loadmore";
import SearchBar from "../../../../partials/SearchBar";
import ModalArchive from "../../../../partials/modals/ModalArchive";
import ModalRestore from "../../../../partials/modals/ModalRestore";
import ModalDelete from "../../../../partials/modals/ModalDelete";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";

const DesignationsList = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
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
      "designations",
      search.current.value,
      store.isSearch,
      filterData,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        "",
        `${apiVersion}/controllers/developers/settings/designations/page.php?start=${pageParam}`,
        false,
        { filterData, searchValue: search?.current?.value },
        "post",
      ),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((p) => p.data).length;
      if (loadedItems < lastPage.total) return loadedItems + 1;
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

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
      <div className="py-5 flex items-center justify-between">
        <div className="relative">
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
              <th>Category</th>
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
                  <tr key={`${item.designation_aid}-${itemIndex}`}>
                    <td>{counter++}</td>
                    <td>
                      <Status
                        text={
                          item.designation_is_active == 1
                            ? "active"
                            : "inactive"
                        }
                      />
                    </td>
                    <td>{item.designation_name}</td>
                    <td>{item.designation_category}</td>
                    <td>
                      <div className="flex gap-2">
                        {item.designation_is_active == 1 ? (
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

      {store.isArchive && itemEdit && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/settings/designations/active.php?id=${itemEdit.designation_aid}`}
          msg="Are you sure you want to archive this record?"
          successMsg="Successfully Archived."
          item={itemEdit.designation_name}
          dataItem={itemEdit}
          queryKey="designations"
        />
      )}
      {store.isRestore && itemEdit && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/settings/designations/active.php?id=${itemEdit.designation_aid}`}
          msg="Are you sure you want to restore this record?"
          successMsg="Successfully Restored."
          item={itemEdit.designation_name}
          dataItem={itemEdit}
          queryKey="designations"
        />
      )}
      {store.isDelete && itemEdit && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/settings/designations/designations.php?id=${itemEdit.designation_aid}`}
          msg="Are you sure you want to delete this record?"
          successMsg="Successfully Deleted."
          item={itemEdit.designation_name}
          dataItem={itemEdit}
          queryKey="designations"
        />
      )}
    </>
  );
};

export default DesignationsList;
