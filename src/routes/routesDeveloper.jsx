import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Dashboard from "../pages/developer/dashboard/Dashboard";
import Roles from "../pages/developer/settings/roles/Roles";
import Users from "../pages/developer/settings/users/Users";
import SystemUsers from "../pages/developer/settings/users/SystemUsers";
import Categories from "../pages/developer/settings/categories/Categories";
import Designations from "../pages/developer/settings/designations/Designations";
import Notification from "../pages/developer/settings/notification/Notification"; // <- 1. Notification Import Added
import Donor from "../pages/developer/donor/Donor";
import Children from "../pages/developer/children/Children";

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

  // CATEGORIES
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/category`,
    element: <Categories />,
  },

  // DESIGNATIONS
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/designation`,
    element: <Designations />,
  },

  // NOTIFICATION
  {
    path: `${devNavUrl}/${urlDeveloper}/settings/notification`, // <- 2. Notification Route Added
    element: <Notification />,
  },

  // DONOR
  {
    path: `${devNavUrl}/${urlDeveloper}/donor-list`,
    element: <Donor />,
  },

  // CHILDREN
  {
    path: `${devNavUrl}/${urlDeveloper}/children-list`,
    element: <Children />,
  },
];
