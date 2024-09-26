import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  CalendarDaysIcon,
  HomeIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";

function SideBar() {
  const [collapsed, setCollapsed] = useState(
    JSON.parse(localStorage.getItem("settings"))?.sidebar?.collapsed || false
  );
  const [toggled, setToggled] = useState(false);
  const location = useLocation().pathname.replace("/", "");
  const storedSettings = JSON.parse(localStorage.getItem("settings"));

  const collapseSidebar = () => {
    if (storedSettings) {
      storedSettings.sidebar = { collapsed: !collapsed };
      localStorage.setItem("settings", JSON.stringify(storedSettings));
    } else {
      localStorage.setItem(
        "settings",
        JSON.stringify({ sidebar: { collapsed: !collapsed } })
      );
    }
    setCollapsed(!collapsed);
  };

  return (
    <div className="bg-[#f5f5f9]">
      <Sidebar
        toggled={toggled}
        onBackdropClick={() => setToggled(!toggled)}
        breakPoint="lg"
        collapsed={collapsed}
        backgroundColor="#FFFFFF"
        rootStyles={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
        className="shadow-lg h-full z-20"
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex ${
              collapsed ? "justify-center" : "justify-end"
            } p-2 mb-4`}
          >
            <button
              onClick={collapseSidebar}
              className="rounded-full text-gray-500 hover:bg-primary-500/10 hover:text-primary-700 p-2 outline-none"
            >
              {collapsed ? (
                <ChevronRightIcon className="size-5" />
              ) : (
                <XMarkIcon className="size-5" />
              )}
            </button>
          </div>
          <div className="mb-10 px-5 flex flex-row items-center space-x-3">
            <img
              src="/img/icon.png"
              alt="Booktanium logo"
              className="w-8 h-8 opacity-90"
            />
            <p className="text-2xl font-amaranth font-medium text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap flex-grow">
              Booktanium
            </p>
          </div>
          <div className="flex-1 mb-8">
            <Menu
              menuItemStyles={{
                button: ({ active }) => {
                  if (active)
                    return {
                      color: "#696CFF",
                      fontWeight: 600,
                      borderRight: "2px solid #696CFF",
                    };
                },
                icon: ({ active }) => {
                  if (active)
                    return {
                      color: "#696CFF",
                    };
                  else
                    return {
                      color: "#6B7280",
                    };
                },
              }}
            >
              <MenuItem
                active={location === ""}
                className="text-gray-600 hover:text-primary-500 hover:font-medium group font-poppins text-sm"
                icon={
                  <HomeIcon className="size-6 group-hover:text-primary-500" />
                }
                component={<Link to={"/"} className="outline-none" />}
                data-tooltip-id="home"
                data-tooltip-content="Inicio"
                data-tooltip-place="right"
                data-tooltip-position-strategy="fixed"
              >
                Inicio
                {collapsed && <Tooltip id="home" />}
              </MenuItem>
              <MenuItem
                active={location === "reservations"}
                icon={
                  <CalendarDaysIcon className="size-6 group-hover:text-primary-500" />
                }
                component={
                  <Link to={"/reservations"} className="outline-none" />
                }
                className="text-gray-600 hover:text-primary-500 hover:font-medium group font-poppins text-sm"
                data-tooltip-id="reservations"
                data-tooltip-content="Reservas"
                data-tooltip-place="right"
                data-tooltip-position-strategy="fixed"
              >
                Reservas
                {collapsed && <Tooltip id="reservations" />}
              </MenuItem>
            </Menu>
          </div>
          <p className="font-poppins text-xs text-gray-500 text-center mb-4">
            v1.0
          </p>
        </div>
      </Sidebar>
      <div className="flex absolute lg:hidden">
        <button className="mt-6 ml-6" onClick={() => setToggled(!toggled)}>
          <Bars3Icon className="size-8 text-gray-700" />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
