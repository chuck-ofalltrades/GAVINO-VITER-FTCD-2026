import React from "react";
import Layout from "../../Layout";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  devNavUrl,
  urlDeveloper,
} from "../../../../functions/functions-general";

const Users = () => {
  const navigate = useNavigate();

  return (
    <Layout menu="settings" submenu="users">
      {/* HEADER */}
      <div className="flex items-center gap-5 mb-6">
        <HiMenuAlt2 className="text-xl text-dark" />
        <FaArrowLeftLong className="text-xl text-dark cursor-pointer" />

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-primary">Settings</span>
          <span className="text-primary">›</span>
          <span className="text-dark">Users</span>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-lg font-bold mb-6">Users</h1>

      {/* LIST */}
      <div className="bg-white rounded-md overflow-hidden">
        {/* ITEM */}
        <div
          onClick={() =>
            navigate(`${devNavUrl}/${urlDeveloper}/settings/users/system`)
          }
          className="flex items-center justify-between px-4 py-4 border-b cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-gray-600" />
            <span className="text-sm">System user</span>
          </div>
          <MdChevronRight className="text-gray-500 text-lg" />
        </div>

        {/* ITEM */}
        <div className="flex items-center justify-between px-4 py-4 border-b cursor-pointer hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-gray-600" />
            <span className="text-sm">Other user</span>
          </div>
          <MdChevronRight className="text-gray-500 text-lg" />
        </div>

        {/* ITEM */}
        <div
          onClick={() =>
            navigate(`${devNavUrl}/${urlDeveloper}/settings/roles`)
          }
          className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-gray-600" />
            <span className="text-sm">Roles</span>
          </div>
          <MdChevronRight className="text-gray-500 text-lg" />
        </div>
      </div>
    </Layout>
  );
};

export default Users;
