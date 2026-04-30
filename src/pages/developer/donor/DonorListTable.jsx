import React from "react";
import { FaArchive, FaEdit, FaTrash, FaTrashRestore } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { apiVersion } from "../../../functions/functions-general";
import { queryDataInfinite } from "../../../functions/custom-hooks/queryDataInfinite";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import Status from "../../../partials/Status";
import TableLoading from "../../../partials/TableLoading";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import Loadmore from "../../../partials/Loadmore";
import SearchBar from "../../../partials/SearchBar";
import ModalArchive from "../../../partials/modals/ModalArchive";
import ModalRestore from "../../../partials/modals/ModalRestore";
import ModalDelete from "../../../partials/modals/ModalDelete";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";

const DonorListTable = ({ itemEdit, setItemEdit }) => {
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
    queryKey: ["donor", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        "",
        `${apiVersion}/controllers/developers/donor/page.php?start=${pageParam}`,
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
        <div className="flex items-center gap-4">
          <div className="relative border border-gray-300 rounded-md px-2 py-1 flex items-center gap-2">
            <span className="text-xs text-gray-500 absolute -top-2 left-2 bg-white px-1">
              Status
            </span>
            <select
              className="outline-none text-sm bg-transparent"
              value={filterData}
              onChange={(e) => setFilterData(e.target.value)}
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <span className="text-sm font-semibold text-gray-600 flex items-center gap-1">
            <i className="fa-solid fa-users"></i> {result?.pages[0]?.total || 0}
          </span>
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
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Stripe ID</th>
              <th className="py-2 px-3"></th> {/* Removed "Action" here */}
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
                  <tr
                    key={`${item.donor_aid}-${itemIndex}`}
                    className="border-b"
                  >
                    <td className="py-2 px-3">{counter++}</td>
                    <td className="py-2 px-3">
                      <Status
                        text={item.donor_is_active == 1 ? "active" : "inactive"}
                      />
                    </td>
                    <td className="py-2 px-3">{item.donor_name}</td>
                    <td className="py-2 px-3">{item.donor_email}</td>
                    <td className="py-2 px-3">{item.donor_stripe_id || "-"}</td>
                    <td className="py-2 px-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="bg-primary text-white text-xs px-3 py-1 rounded"
                          onClick={() => handleEdit(item)}
                        >
                          Donate
                        </button>
                        {/* Adding standard action buttons for full CRUD */}
                        {item.donor_is_active == 1 ? (
                          <>
                            <button
                              type="button"
                              className="text-gray-500 hover:text-dark"
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="text-gray-500 hover:text-dark"
                              onClick={() => handleArchive(item)}
                            >
                              <FaArchive />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="text-gray-500 hover:text-dark"
                              onClick={() => handleRestore(item)}
                            >
                              <FaTrashRestore />
                            </button>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
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
          mysqlApiArchive={`${apiVersion}/controllers/developers/donor/active.php?id=${itemEdit.donor_aid}`}
          msg="Archive this donor?"
          successMsg="Archived."
          item={itemEdit.donor_name}
          queryKey="donor"
        />
      )}
      {store.isRestore && itemEdit && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/donor/active.php?id=${itemEdit.donor_aid}`}
          msg="Restore this donor?"
          successMsg="Restored."
          item={itemEdit.donor_name}
          queryKey="donor"
        />
      )}
      {store.isDelete && itemEdit && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/donor/donor.php?id=${itemEdit.donor_aid}`}
          msg="Delete this donor permanently?"
          successMsg="Deleted."
          item={itemEdit.donor_name}
          queryKey="donor"
        />
      )}
    </>
  );
};

export default DonorListTable;
