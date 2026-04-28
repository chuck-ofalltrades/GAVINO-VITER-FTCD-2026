import React from "react";
import { FaIndent } from "react-icons/fa";
import { MdOutlineLogout, MdOutlineMailOutline } from "react-icons/md";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [show, setShow] = React.useState(false);
  const menuRef = React.useRef(null);
  const avatarRef = React.useRef(null);

  const firstName = "John";
  const lastName = "Doe";
  const email = "john@gmail.com";
  const nickName = "MM";

  const handleShowNavigation = () => {};
  const handleLogout = () => {};

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="print:hidden fixed z-[52] bg-white w-full flex justify-between items-center h-16 border-solid border-b-2 border-primary px-6">
        <div className="flex items-center gap-6">
          <img
            src={logo}
            alt="Face the Children Logo"
            className="h-6 w-auto"
          />
        </div>

        <div className="header__avatar pr-0 lg:pr-1 relative">
          <div
            ref={avatarRef}
            onClick={() => setShow(!show)}
            className="flex items-center pr-2 px-1 gap-2 xl:py-2 lg:pl-4 group cursor-pointer"
          >
            <div
              className={`p-[1px] duration-[50ms] ease-out border-2 border-transparent hover:border-2 hover:border-primary hover:border-opacity-50 rounded-full ${
                show ? "!border-primary" : "!border-opacity-50"
              }`}
            >
              <div className="flex bg-primary rounded-full justify-center items-center min-w-[2.8rem] min-h-[2.8rem] max-w-[2.8rem] max-h-[2.8rem] text-white pt-0.5 uppercase text-sm font-bold">
                {nickName}
              </div>
            </div>
          </div>

          <div
            ref={menuRef}
            className={`dropdown ${
              show ? "active" : "inactive hidden"
            } p-2 min-w-[250px] overflow-hidden rounded-md fixed right-6 top-[75px] drop-shadow-sm border border-gray-200 bg-white z-20 transition-all ease-in-out duration-200 transform -translate-x-1`}
          >
            <div className="text-xs p-1">
              <ul className="p-2">
                <li className="mb-0 font-bold capitalize text-sm">
                  {firstName} {lastName}
                </li>

                <li className="mb-0 pb-2 capitalize text-xs">Developer</li>

                <li className="pb-2 flex items-center gap-2 text-xs">
                  <MdOutlineMailOutline />
                  {email}
                </li>

                <button
                  onClick={handleLogout}
                  className="hover:text-primary flex items-center gap-2 pt-2 w-full"
                >
                  <MdOutlineLogout />
                  Logout
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
