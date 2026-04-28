import { FaCogs, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { MdChildCare } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { devNavUrl, urlDeveloper } from "../functions/functions-general";

export const navList = [
  {
    label: "Donor List",
    icon: <FaHandHoldingHeart />,
    menu: "donor-list",
    path: `${devNavUrl}/${urlDeveloper}/donor-list`,
    submenu: "",
  },
  {
    label: "Children List",
    icon: <MdChildCare />,
    menu: "children-list",
    path: `${devNavUrl}/${urlDeveloper}/children-list`,
    submenu: "",
  },
  {
    label: "Reports",
    icon: <TbReportAnalytics />,
    menu: "reports",
    submenu: "",
    subNavList: [
      {
        label: "Donations",
        path: `${devNavUrl}/${urlDeveloper}/reports/donations`,
      },
      {
        label: "Contact Us",
        path: `${devNavUrl}/${urlDeveloper}/reports/contact-us`,
      },
      {
        label: "FAQ",
        path: `${devNavUrl}/${urlDeveloper}/reports/faq`,
      },
    ],
  },
  {
    label: "Settings",
    icon: <FaCogs />,
    menu: "settings",
    submenu: "",
    subNavList: [
      {
        label: "Users",
        path: `${devNavUrl}/${urlDeveloper}/settings/users`,
      },
      {
        label: "Category",
        path: `${devNavUrl}/${urlDeveloper}/settings/category`,
      },
      {
        label: "Designation",
        path: `${devNavUrl}/${urlDeveloper}/settings/designation`,
      },
      {
        label: "Notification",
        path: `${devNavUrl}/${urlDeveloper}/settings/notification`,
      },
      {
        label: "Maintenance",
        path: `${devNavUrl}/${urlDeveloper}/settings/maintenance`,
      },
    ],
  },
];
