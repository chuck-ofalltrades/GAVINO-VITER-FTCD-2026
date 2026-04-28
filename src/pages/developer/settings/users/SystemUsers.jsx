import React from "react";
import Layout from "../../Layout";
import { FaPlus, FaEdit, FaKey, FaUserSlash } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";

const SystemUsers = () => {
  const [users, setUsers] = React.useState([]);

  // TEMP ADD FUNCTION (manual)
  const handleAdd = () => {
    const newUser = {
      id: users.length + 1,
      name: "New User",
      email: "new@email.com",
      role: "Developer",
      status: "ACTIVE",
    };

    setUsers([...users, newUser]);
  };

  return (
    <Layout menu="settings" submenu="users">
      {/* HEADER */}
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

      {/* TITLE + ADD */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold">System</h1>

        <button
          onClick={handleAdd}
          className="flex items-center gap-1 text-primary text-sm hover:underline"
        >
          <FaPlus />
          Add
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm outline-none"
        />
        <button className="bg-primary px-4 py-2 rounded-r-md text-white">
          🔍
        </button>
      </div>

      {/* TABLE */}
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
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-400">
                No Data
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}.</td>
                <td className="text-green-700">{user.status}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="flex items-center gap-4 text-gray-600">
                    <button className="hover:text-primary">
                      <FaEdit />
                    </button>
                    <button className="hover:text-primary">
                      <FaUserSlash />
                    </button>
                    <button className="hover:text-primary">
                      <FaKey />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="text-center mt-6 text-sm text-gray-500">
        {users.length === 0 ? "" : "End of list."}
      </div>
    </Layout>
  );
};

export default SystemUsers;
