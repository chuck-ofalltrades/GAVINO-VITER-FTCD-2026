import React from "react";
import Layout from "../../Layout";
import { FaChevronRight, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  devNavUrl,
  urlDeveloper,
} from "../../../../functions/functions-general";

const Users = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout menu="settings" submenu="users">
        <div className="flex items-center gap-4 mb-8">
          <button type="button" className="text-2xl text-dark">
            ←
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-primary">Settings</span>
            <span className="text-primary">›</span>
            <span className="text-dark">Users</span>
          </div>
        </div>

        <h1 className="text-lg font-bold mb-8">Users</h1>

        <div className="w-full">
          <div
            onClick={() =>
              navigate(`${devNavUrl}/${urlDeveloper}/settings/users/system`)
            }
            className="flex items-center justify-between border-b border-gray-300 py-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-dark text-sm" />
              <span className="font-bold text-sm">System user</span>
            </div>
            <FaChevronRight className="text-dark text-lg" />
          </div>

          <div
            onClick={() =>
              navigate(`${devNavUrl}/${urlDeveloper}/settings/users/other`)
            }
            className="flex items-center justify-between border-b border-gray-300 py-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-dark text-sm" />
              <span className="font-bold text-sm">Other user</span>
            </div>
            <FaChevronRight className="text-dark text-lg" />
          </div>

          <div
            onClick={() =>
              navigate(`${devNavUrl}/${urlDeveloper}/settings/roles`)
            }
            className="flex items-center justify-between border-b border-gray-300 py-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-dark text-sm" />
              <span className="font-bold text-sm">Roles</span>
            </div>
            <FaChevronRight className="text-dark text-lg" />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Users;
