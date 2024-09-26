/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PiUserCircle } from "react-icons/pi";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import * as Sidebar from "react-pro-sidebar";
import { useLocation } from "react-router-dom";

function TopBar() {
  const [toggled, setToggled] = useState(false);
  const location = useLocation().pathname.replace("/", "");
  const [showDevelopingModal, setShowDevelopingModal] = useState(false);

  const titleByPath = (path) => {
    if (path === "") {
      return "Inicio";
    }
    if (path === "reservations") {
      return "Reservas";
    }
  };
  return (
    <>
      <div
        className={`hidden ml-20 mr-10 lg:mx-10 mt-2 p-4 bg-white shadow-md rounded-lg md:flex flex-row items-center justify-between`}
      >
        <p className="font-poppins font-semibold pl-3 text-base text-gray-700">
          {titleByPath(location)}
        </p>
        <Menu as={"div"} className={"relative flex ml-2 z-20"}>
          <MenuButton
            className={
              "outline-none focus:ring-2 focus:ring-primary-300 focus:rounded-full focus:ring-offset-2"
            }
          >
            <img
              src="https://ui-avatars.com/api/?name=Joan+Romero&background=696CFF&color=FFF"
              alt="Profile Pic"
              className="rounded-full size-8 md:size-10 border border-primary-200"
            />
          </MenuButton>
          <MenuItems
            className={
              "absolute right-0 top-16 flex flex-col items-center bg-white shadow-lg rounded-lg min-w-40"
            }
          >
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setShowDevelopingModal(true)}
                  className={`${
                    active && "bg-gray-50 text-primary-500"
                  } p-3 text-gray-600 font-poppins text-sm w-full text-center flex flex-row items-center justify-start space-x-2`}
                >
                  <UserIcon className="size-5" />
                  <p>Perfil</p>
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  className={`${
                    active && "bg-gray-50 text-primary-500"
                  } p-3 text-gray-600 font-poppins text-sm w-full text-center flex flex-row items-center justify-start space-x-2`}
                  onClick={() => setShowDevelopingModal(true)}
                >
                  <Cog6ToothIcon className="size-5" />
                  <p>Ajustes</p>
                </button>
              )}
            </MenuItem>
            <div className="border-b-[1px] border-gray-200 w-full" />
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setShowDevelopingModal(true)}
                  className={`${
                    active && "bg-red-50"
                  } p-3 rounded-b-lg text-red-500 font-poppins text-sm w-full text-center flex flex-row items-center justify-start space-x-2`}
                >
                  <PowerIcon className="size-5" />
                  <p>Cerrar Sesión</p>
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="md:hidden">
        <Sidebar.Sidebar
          toggled={toggled}
          onBackdropClick={() => setToggled(!toggled)}
          breakPoint="lg"
          rtl={true}
          backgroundColor="#FFFFFF"
          className="shadow-lg bg-white h-full"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center p-5">
              <Menu as={"div"} className={"hidden relative md:flex ml-2 z-20"}>
                <MenuButton>
                  <img
                    src="https://ui-avatars.com/api/?name=Joan+Romero&background=696CFF&color=FFF"
                    alt="Profile Pic"
                    className="rounded-full size-12 shadow-lg"
                  />
                </MenuButton>
                <MenuItems
                  className={
                    "absolute -left-16 top-14 flex flex-col items-center border bg-white shadow-lg rounded-lg min-w-40"
                  }
                >
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setShowDevelopingModal(true)}
                        className={`${
                          active && "bg-gray-50 text-primary-500"
                        } p-3 text-gray-600 font-poppins text-sm w-full text-center flex flex-row items-center justify-center space-x-2`}
                      >
                        <UserIcon className="size-5" />
                        <p>Perfil</p>
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`${
                          active && "bg-gray-50 text-primary-500"
                        } p-3 text-gray-600 font-poppins text-sm w-full text-center flex flex-row items-center justify-center space-x-2`}
                        onClick={() => setShowDevelopingModal(true)}
                      >
                        <Cog6ToothIcon className="size-5" />
                        <p>Ajustes</p>
                      </button>
                    )}
                  </MenuItem>
                  <div className="border-b-[1px] border-gray-200 w-full" />
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setShowDevelopingModal(true)}
                        className={`${
                          active && "bg-red-50"
                        } p-3 rounded-b-lg text-red-500 font-poppins text-sm w-full text-center flex flex-row items-center justify-center space-x-2`}
                      >
                        <PowerIcon className="size-5" />
                        <p>Cerrar Sesión</p>
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
              <div className="md:hidden w-full">
                <div className="flex flex-col gap-2 items-center border-b w-full pb-2">
                  <img
                    src="https://ui-avatars.com/api/?name=Joan+Romero&background=696CFF&color=FFF"
                    alt="Profile Pic"
                    className="rounded-full size-10 shadow-lg"
                  />
                  <p className="font-poppins font-medium text-gray-700">
                    Joan Romero
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="mt-5">
                    <button
                      onClick={() => setShowDevelopingModal(true)}
                      className={`p-1 text-gray-600 font-poppins text w-full text-center text-sm flex flex-row items-center justify-center space-x-2`}
                    >
                      <p>Perfil</p>
                    </button>
                  </div>
                  <div>
                    <button
                      className={`p-1 text-gray-600 font-poppins text w-full text-center text-sm flex flex-row items-center justify-center space-x-2`}
                      onClick={() => setShowDevelopingModal(true)}
                    >
                      <p>Ajustes</p>
                    </button>
                  </div>
                  <div>
                    <button
                      className={`p-1 text-red-500 font-poppins text w-full text-center text-sm flex flex-row items-center justify-center space-x-2`}
                      onClick={() => setShowDevelopingModal(true)}
                    >
                      <p>Cerrar Sesión</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Sidebar.Sidebar>
        <div className="flex justify-end mr-5 md:hidden">
          <button className="ml-6 p-1" onClick={() => setToggled(!toggled)}>
            <PiUserCircle className="size-8 text-gray-700" />
          </button>
        </div>
        {showDevelopingModal && (
          <Transition appear show={showDevelopingModal}>
            <Dialog
              as="div"
              className="relative z-20 focus:outline-none"
              onClose={() => setShowDevelopingModal(false)}
            >
              <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl">
                      <DialogTitle
                        as="div"
                        className="flex flex-row items-center justify-center space-x-2 w-full"
                      >
                        <WrenchScrewdriverIcon className="size-5 text-yellow-600" />
                        <p className="text-yellow-600 font-medium font-poppins text-center">
                          Alerta de Mantenimiento
                        </p>
                      </DialogTitle>
                      <div className="my-10">
                        <p className="text-sm text-gray-700 text-center font-poppins">
                          Hey, lo lamentamos, aún estamos trabajando en esta
                          funcionalidad.
                        </p>
                      </div>
                      <div className="mt-4 w-full flex justify-center">
                        <Button
                          className="flex items-center gap-2 rounded-lg bg-primary-500 py-2 px-5 text-sm font-poppins font-medium text-white focus:outline-none hover:bg-primary-700"
                          onClick={() => setShowDevelopingModal(false)}
                        >
                          Entendido!
                        </Button>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
        )}
      </div>
    </>
  );
}

export default TopBar;
