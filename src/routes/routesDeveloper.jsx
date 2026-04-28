import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Dashboard from "../pages/developer/dashboard/Dashboard";
import Roles from "../pages/developer/settings/roles/Roles";
import Users from "../pages/developer/settings/users/Users";
import SystemUsers from "../pages/developer/settings/users/SystemUsers";

export const routesDeveloper = [
  {
    path: `${devNavUrl}/${urlDeveloper}/`,
    element: <Dashboard />,
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/dashboard`,
    element: <Dashboard />,
  },

  // USERS MAIN
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users`,
    element: <Users />,
  },

  // SYSTEM USERS
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/users/system`,
    element: <SystemUsers />,
  },

  // ROLES (separate from users)
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/roles`,
    element: <Roles />,
  },
];
