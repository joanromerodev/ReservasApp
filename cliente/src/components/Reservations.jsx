import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import { renderErrorMessage } from "../utils/FormValidation";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reservations() {
  // CONST AND VAR DECLARATIONS
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newReservation, setNewReservation] = useState(null);
  const [editReservation, setEditReservation] = useState(null);
  const [deleteReservation, setDeleteReservation] = useState(null);
  const [showFilter, setShowFilter] = useState(null);
  const [showFilterDetails, setShowFilterDetails] = useState(false);
  const [query, setQuery] = useState(null);
  const port = 4080;
  const endpoint = "reservas";
  const requestOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  // INSTANCE OF USEFORM FROM REACT-HOOK-FORM
  const {
    register: registerEditReservation,
    handleSubmit: handleSubmitEditReservation,
    formState: { errors: errorsEditReservation },
    reset: resetEditReservation,
  } = useForm();
  const {
    register: registerNewReservation,
    handleSubmit: handleSubmitNewReservation,
    formState: { errors: errorsNewReservation },
    reset: resetNewReservation,
  } = useForm();
  const {
    register: registerFilter,
    handleSubmit: handleSubmitFilter,
    formState: { errors: errorsFilter },
    reset: resetFilter,
  } = useForm();
  //FETCH ALL THE NECESSARY REQUESTS ON COMPONENT MOUNT
  useEffect(() => {
    const fetchDataOnLoad = async () => {
      try {
        setLoading(true);
        const [reservationsResponse] = await Promise.all([
          axios.get(`http://localhost:${port}/${endpoint}`, requestOptions),
        ]);

        if (reservationsResponse.status === 200) {
          setReservations(reservationsResponse.data?.reservations);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Ocurrió un error al obtener la información", {
          position: "bottom-center",
          autoClose: 5000,
          style: { fontSize: 14 },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    };
    fetchDataOnLoad();
  }, []);
  useEffect(() => {
    getAllReservations();
  }, [query]);
  useEffect(() => {
    if (reservations?.length > 0) {
      const extractedServices = reservations.map(
        (reservation) => reservation.service
      );
      const uniqueServices = [...new Set(extractedServices)];
      const extractedCustomers = reservations.map(
        (reservation) => reservation.customer
      );
      const uniqueCustomers = [...new Set(extractedCustomers)];
      setServices(uniqueServices);
      setCustomers(uniqueCustomers);
    }
  }, [reservations]);
  // FUNCTION THAT FETCHES RESERVATIONS UPON CHANGES
  const getAllReservations = async () => {
    try {
      let url = `http://localhost:${port}/${endpoint}`;
      if (query) {
        const {
          startDate = "",
          endDate = "",
          service = "",
          customer = "",
        } = query;
        url = `http://localhost:${port}/${endpoint}?startDate=${startDate}&endDate=${endDate}&service=${service}&customer=${customer}`;
      }
      setLoading(true);
      const response = await axios.get(url, requestOptions);
      if (response.status === 200) {
        setReservations(response.data?.reservations);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // EDIT RESERVATION CALLBACK TO START API REQUEST
  const onEditSave = async (data) => {
    const formattedDate = new Date(data.date).toISOString();
    data.date = formattedDate;
    data.id = editReservation;
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:${port}/${endpoint}/${editReservation}`,
        data,
        requestOptions
      );
      if (response.status === 204) {
        toast.success("Reserva actualizada éxitosamente", {
          position: "bottom-center",
          autoClose: 5000,
          style: { fontSize: 14 },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error actualizando la reserva", {
        position: "bottom-center",
        autoClose: 5000,
        style: { fontSize: 14 },
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
      getAllReservations();
      setEditReservation(null);
      resetEditReservation();
    }
  };
  // NEW RESERVATION CALLBACK TO START API REQUEST
  const onNewSave = async (data) => {
    const formattedDate = new Date(data.date).toISOString();
    data.date = formattedDate;
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:${port}/${endpoint}`,
        data,
        requestOptions
      );
      if (response.status === 201) {
        toast.success("Reserva creada exitosamente", {
          position: "bottom-center",
          autoClose: 5000,
          style: { fontSize: 14 },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error creando la reserva", {
        position: "bottom-center",
        autoClose: 5000,
        style: { fontSize: 14 },
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
      getAllReservations();
      setNewReservation(null);
      resetNewReservation();
    }
  };
  // DELETE RESERVATION CALLBACK TO START API REQUEST
  const onDeleteSave = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:${port}/${endpoint}/${id}`,
        requestOptions
      );
      if (response.status === 204) {
        toast.success("Reserva eliminada exitosamente", {
          position: "bottom-center",
          autoClose: 5000,
          style: { fontSize: 14 },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error al eliminar esta reserva", {
        position: "bottom-center",
        autoClose: 5000,
        style: { fontSize: 14 },
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      getAllReservations();
      setLoading(false);
      setDeleteReservation(null);
    }
  };
  // FILTER RESERVATIONS SAVE
  const onFilterSave = (data) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      ...data,
    }));
    setShowFilter(null);
    resetFilter();
  };
  // FILTER RESERVATIONS RESET
  const onFilterReset = () => {
    setShowFilter(null);
    setShowFilterDetails(false);
    setQuery(null);
  };
  // FUNCTION TO RANDOMIZE IMAGES
  const randomizeImages = () => {
    const imgNumber = Math.floor(Math.random() * 3) + 1;
    return `img/reservationImage${imgNumber}.jpg`;
  };
  return (
    <div className="flex flex-col gap-4">
      {/* FILTER SECTION */}
      <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-between shadow">
        <div className="flex flex-row items-center space-x-2">
          <FunnelIcon className="size-5 text-gray-700" />
          <p className="text-sm font-poppins text-gray-700 font-medium">
            Filtros
          </p>
          {query && (
            <button
              onClick={() => {
                setShowFilter(null);
                setShowFilterDetails(true);
              }}
              className="size-5 bg-red-500 text-center flex items-center justify-center text-xs text-white rounded-full"
            >
              {Object.values(query).filter((item) => item !== "").length}
            </button>
          )}
        </div>
        <div className="flex flex-row items-center gap-4 mt-4 md:mt-0">
          <button
            onClick={() => {
              setShowFilterDetails(false);
              setShowFilter("byDate");
            }}
            className="flex flex-row text-primary-500 space-x-1 font-poppins items-center text-sm hover:text-primary-600 hover:font-medium"
          >
            <p>Fecha</p>
            <ChevronDownIcon className="size-4 mt-0.5" />
          </button>
          <button
            onClick={() => {
              setShowFilterDetails(false);
              setShowFilter("byService");
            }}
            className="flex flex-row text-primary-500 space-x-1 font-poppins items-center text-sm hover:text-primary-600 hover:font-medium"
          >
            <p>Servicio</p>
            <ChevronDownIcon className="size-4 mt-0.5" />
          </button>
          <button
            onClick={() => {
              setShowFilterDetails(false);
              setShowFilter("byCustomer");
            }}
            className="flex flex-row text-primary-500 space-x-1 font-poppins items-center text-sm hover:text-primary-600 hover:font-medium"
          >
            <p>Cliente</p>
            <ChevronDownIcon className="size-4 mt-0.5" />
          </button>
        </div>
      </div>
      {/* SHOW FILTER */}
      {showFilter && (
        <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-center shadow relative">
          {showFilter === "byDate" && (
            <div>
              <form
                className="flex flex-col gap-4 items-start"
                onSubmit={handleSubmitFilter(onFilterSave)}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block mb-2 text-xs font-medium text-gray-700 font-poppins "
                    >
                      Fecha Inicial
                    </label>
                    <input
                      type="datetime-local"
                      id="startDate"
                      {...registerFilter("startDate")}
                      className=" border outline-none font-poppins border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block mb-2 text-xs font-medium text-gray-700 font-poppins "
                    >
                      Fecha Final
                    </label>
                    <input
                      type="datetime-local"
                      id="endDate"
                      {...registerFilter("endDate")}
                      className=" border outline-none font-poppins border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-primary-500 text-white text-sm font-poppins rounded-lg w-full hover:bg-primary-600"
                >
                  Aplicar
                </button>
              </form>
            </div>
          )}
          {showFilter === "byService" && (
            <div>
              <form
                className="flex flex-col gap-4 items-start"
                onSubmit={handleSubmitFilter(onFilterSave)}
              >
                <div className="flex flex-row gap-4">
                  <div>
                    <label
                      htmlFor="service"
                      className="block mb-2 text-xs font-medium text-gray-700 font-poppins "
                    >
                      Servicio
                    </label>
                    <select
                      id="service"
                      {...registerFilter("service")}
                      className={`bg-gray-50 border border-gray-300 ${
                        errorsFilter.service
                          ? "focus:ring-red-300 focus:border-red-300"
                          : "focus:ring-primary-500 focus:border-primary-500"
                      } text-gray-900 text-sm rounded-lg outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                    >
                      <option defaultChecked></option>
                      {services?.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-primary-500 text-white text-sm font-poppins rounded-lg w-full hover:bg-primary-600"
                >
                  Aplicar
                </button>
              </form>
            </div>
          )}
          {showFilter === "byCustomer" && (
            <div>
              <form
                className="flex flex-col gap-4 items-start"
                onSubmit={handleSubmitFilter(onFilterSave)}
              >
                <div className="flex flex-row gap-4">
                  <div>
                    <label
                      htmlFor="customer"
                      className="block mb-2 text-xs font-medium text-gray-700 font-poppins "
                    >
                      Cliente
                    </label>
                    <select
                      id="customer"
                      {...registerFilter("customer")}
                      className={`bg-gray-50 border border-gray-300 ${
                        errorsFilter.customer
                          ? "focus:ring-red-300 focus:border-red-300"
                          : "focus:ring-primary-500 focus:border-primary-500"
                      } text-gray-900 text-sm rounded-lg outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                    >
                      <option defaultChecked></option>
                      {customers?.map((customer, index) => (
                        <option key={index} value={customer}>
                          {customer}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-primary-500 text-white text-sm font-poppins rounded-lg w-full hover:bg-primary-600"
                >
                  Aplicar
                </button>
              </form>
            </div>
          )}
          <button
            onClick={() => setShowFilter(null)}
            type="button"
            className="absolute top-0 right-0 p-2"
          >
            <XMarkIcon className="size-5 text-primary-500 hover:text-primary-800" />
          </button>
        </div>
      )}
      {/* FILTER DETAILS */}
      {showFilterDetails && (
        <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row items-center shadow relative">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {query &&
              Object.values(query)?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-2 font-poppins"
                >
                  {item !== "" ? (
                    <>
                      {Object.keys(query)[index] === "serviceId" ? (
                        <p className="capitalize text-gray-600 font-medium text-sm">
                          Servicio:{" "}
                          <span className="font-normal text-gray-900">
                            {
                              services?.find((service) => service.id == item)
                                .name
                            }
                          </span>
                        </p>
                      ) : Object.keys(query)[index] === "customerId" ? (
                        <p className="capitalize text-gray-600 font-medium text-sm">
                          Cliente:{" "}
                          <span className="font-normal text-gray-900">
                            {
                              customers.find((customer) => customer.id == item)
                                .name
                            }
                          </span>
                        </p>
                      ) : (
                        <p className="capitalize text-gray-600 font-medium text-sm">
                          {Object.keys(query)[index]}:{" "}
                          <span className="font-normal text-gray-900">
                            {item}
                          </span>
                        </p>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            <button
              onClick={() => onFilterReset()}
              className="mx-5 font-poppins text-sm text-primary-500 font-medium hover:text-primary-800"
            >
              Clear Filters
            </button>
          </div>
          <button
            onClick={() => setShowFilterDetails(false)}
            type="button"
            className="absolute top-2 right-0 p-2"
          >
            <XMarkIcon className="size-5 text-primary-500 hover:text-primary-800" />
          </button>
        </div>
      )}
      {/* RESERVATIONS SECTION */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border shadow rounded-lg p-4 space-y-3"
            >
              <div role="status" className="max-w-sm animate-pulse space-y-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {reservations?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* ITERATE OVER RESERVATION LIST */}
              {reservations.map((reservation, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row bg-white max-w-xl shadow-lg rounded-lg w-full group relative hover:cursor-pointer"
                >
                  <img
                    className="rounded-t-lg w-full lg:w-1/3 h-48 object-cover md:rounded-none md:rounded-s-lg"
                    src={randomizeImages()}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 w-full group-hover:blur-sm">
                    <div className="flex flex-row items-center justify-between gap-2">
                      <p className="font-poppins text-sm font-medium text-gray-800">
                        Cliente:
                      </p>
                      <p className="font-poppins text-gray-800 text-sm">
                        {reservation.customer}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-2">
                      <p className="font-poppins text-sm font-medium text-gray-800">
                        Servicio:
                      </p>
                      <p className="font-poppins text-gray-800 text-sm">
                        {reservation.service}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-2">
                      <p className="font-poppins text-sm font-medium text-gray-800">
                        Precio:
                      </p>
                      <p className="font-poppins text-gray-800 text-sm">
                        $ {reservation.price}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-2">
                      <p className="font-poppins text-sm font-medium text-gray-800">
                        Fecha:
                      </p>
                      <p className="font-poppins text-gray-800 text-sm">
                        {new Date(reservation.date).toLocaleDateString("en-GB")}{" "}
                        {new Date(reservation.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  {/* ACTION BUTTONS ON RESERVATION CARDS */}
                  <div className="absolute end-0 flex flex-col gap-2 justify-center items-center w-0 h-full group-hover:w-20 duration-300 transition-all ease-in-out rounded-lg">
                    <button
                      onClick={() => setEditReservation(reservation.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-primary-500 rounded-full hover:scale-105"
                      data-tooltip-id="editButton"
                      data-tooltip-content="Edit"
                      data-tooltip-place="left"
                      data-tooltip-position-strategy="fixed"
                    >
                      <PencilIcon className="size-5 text-white" />
                      <Tooltip id="editButton" style={{ fontSize: 12 }} />
                    </button>
                    <button
                      onClick={() => setDeleteReservation(reservation.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 bg-red-500 rounded-full hover:scale-105"
                      data-tooltip-id="deleteButton"
                      data-tooltip-content="Delete"
                      data-tooltip-place="left"
                      data-tooltip-position-strategy="fixed"
                    >
                      <TrashIcon className="size-5 text-white" />
                      <Tooltip id="deleteButton" style={{ fontSize: 12 }} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex flex-row bg-white max-w-xl shadow-lg rounded-lg w-full hover:bg-primary-500 transition-all ease-in-out duration-500 group">
                <button
                  onClick={() => setNewReservation(true)}
                  className="text-primary-500 flex flex-row justify-center items-center p-4 space-x-2 w-full bg-transparent group-hover:text-white transition-all ease-in-out duration-500"
                >
                  <PlusIcon className="size-6" />
                  <p className="font-poppins text-base">Nueva Reserva</p>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-row bg-white max-w-xl shadow-lg rounded-lg w-full">
                  <div className="text-primary-500 flex flex-row justify-center items-center p-4 space-x-2 w-full bg-transparent">
                    <p className="text-yellow-700 font-poppins p-4 text-center text-sm">
                      No existen reservas aún. Por favor crea una nueva reserva.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row bg-white max-w-xl shadow-lg rounded-lg w-full hover:bg-primary-500 transition-all ease-in-out duration-500 group">
                  <button
                    onClick={() => setNewReservation(true)}
                    className="text-primary-500 flex flex-row justify-center items-center p-4 space-x-2 w-full bg-transparent group-hover:text-white transition-all ease-in-out duration-500"
                  >
                    <PlusIcon className="size-6" />
                    <p className="font-poppins text-base">Nueva Reserva</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
      {/* EDIT RESERVATION MODAL */}
      {editReservation && (
        <Transition appear show={editReservation}>
          <Dialog
            as="div"
            className="relative z-20 focus:outline-none"
            onClose={() => {
              resetEditReservation();
              setEditReservation(false);
            }}
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
                      <p className="text-gray-700 font-medium font-poppins text-center">
                        Editar Reserva
                      </p>
                    </DialogTitle>
                    <div className="mt-8 flex justify-center w-full">
                      <form
                        className="w-full"
                        onSubmit={handleSubmitEditReservation(onEditSave)}
                      >
                        <div className="mb-5">
                          <label
                            htmlFor="date"
                            className="block mb-2 text-xs font-medium text-gray-500 font-poppins uppercase"
                          >
                            Fecha
                          </label>
                          <input
                            type="datetime-local"
                            id="date"
                            {...registerEditReservation("date", {
                              required: true,
                            })}
                            defaultValue={new Date(
                              reservations.find(
                                (reservation) =>
                                  reservation.id === editReservation
                              ).date
                            )
                              .toISOString()
                              .slice(0, 16)}
                            className={`bg-white border border-gray-300 text-gray-600 text-sm rounded-lg outline-none ${
                              errorsEditReservation.date
                                ? "focus:ring-red-300 focus:border-red-300"
                                : "focus:ring-primary-500 focus:border-primary-500"
                            } block w-full p-2.5`}
                          />
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="customer"
                            className="block mb-2 text-xs font-medium text-gray-500 font-poppins uppercase"
                          >
                            Cliente
                          </label>
                          <input
                            type="text"
                            id="customer"
                            {...registerEditReservation("customer", {
                              required: true,
                            })}
                            defaultValue={
                              reservations.find(
                                (reservation) =>
                                  reservation.id === editReservation
                              ).customer
                            }
                            className={`bg-gray-50 border border-gray-300 ${
                              errorsEditReservation.customer
                                ? "focus:ring-red-300 focus:border-red-300"
                                : "focus:ring-primary-500 focus:border-primary-500"
                            } text-gray-900 text-sm rounded-lg outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                          />
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="service"
                            className="block mb-2 text-xs font-medium text-gray-500 font-poppins uppercase"
                          >
                            Servicio
                          </label>
                          <input
                            type="text"
                            defaultValue={
                              reservations.find(
                                (reservation) =>
                                  reservation.id === editReservation
                              ).service
                            }
                            id="service"
                            {...registerEditReservation("service", {
                              required: true,
                            })}
                            className={`bg-gray-50 border border-gray-300 ${
                              errorsEditReservation.service
                                ? "focus:ring-red-300 focus:border-red-300"
                                : "focus:ring-primary-500 focus:border-primary-500"
                            } text-gray-900 text-sm rounded-lg outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                          />
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="service"
                            className="block mb-2 text-xs font-medium text-gray-500 font-poppins uppercase"
                          >
                            Precio
                          </label>
                          <input
                            type="number"
                            defaultValue={
                              reservations.find(
                                (reservation) =>
                                  reservation.id === editReservation
                              ).price
                            }
                            id="price"
                            {...registerEditReservation("price", {
                              required: true,
                              maxLength: 10,
                            })}
                            className={`bg-gray-50 border border-gray-300 ${
                              errorsEditReservation.price
                                ? "focus:ring-red-300 focus:border-red-300"
                                : "focus:ring-primary-500 focus:border-primary-500"
                            } text-gray-900 text-sm rounded-lg outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                          />
                        </div>
                        <p className="text-center text-xs mb-4">
                          {renderErrorMessage(errorsEditReservation)}
                        </p>
                        <button
                          type="submit"
                          className="text-white bg-primary-500 hover:bg-primary-600 hover:scale-105 transition-all ease-in-out duration-300 focus:ring-2 focus:bg-primary-600 focus:outline-none focus:ring-primary-300 rounded-lg text-sm w-full px-5 py-2.5 mt-2 text-center font-poppins"
                        >
                          Save Changes
                        </button>
                      </form>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      {/* NEW RESERVATION MODAL */}
      {newReservation && (
        <Transition appear show={newReservation}>
          <Dialog
            as="div"
            className="relative z-20 focus:outline-none"
            onClose={() => {
              resetNewReservation();
              setNewReservation(null);
            }}
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
                      <p className="text-gray-700 font-medium font-poppins text-center">
                        Nueva Reserva
                      </p>
                    </DialogTitle>
                    <div className="mt-8 flex justify-center w-full">
                      <form
                        className="w-full"
                        onSubmit={handleSubmitNewReservation(onNewSave)}
                      >
                        <div className="mb-5">
                          <label
                            htmlFor="date"
                            className="block mb-2 text-xs font-medium text-gray-500 font-poppins uppercase"
                          >
                            Fecha
                          </label>
                          <input
                            type="datetime-local"
                            id="date"
                            {...registerNewReservation("date", {
                              required: true,
                            })}
                            className={`bg-white border border-gray-300 text-gray-600 text-sm rounded-lg outline-none ${
                              errorsNewReservation.date
                                ? "focus:ring-red-300 focus:border-red-300"
                                : "focus:ring-primary-500 focus:border-primary-500"
                            } block w-full p-2.5`}
                          />
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="customer"
                            className="block mb-2 text-xs font-medium text-gray-500 font-poppins uppercase"
                          >
                            Cliente
                          </label>
                          <input
                            type="text"
                            id="customer"
                            {...registerNewReservation("customer", {
                              required: true,
                            })}
                            className={`bg-gray-50 border border-gray-300 ${
                              errorsNewReservation.customer
                                ? "focus:ring-red-300 focus:border-red-300"
                                : "focus:ring-primary-500 focus:border-primary-500"
                            } text-gray-900 text-sm rounded-lg outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                          />
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="service"
                            className="block mb-2 text-xs font-medium text-gray-500 font-poppins uppercase"
                          >
                            Servicio
                          </label>
                          <input
                            type="text"
                            id="service"
                            {...registerNewReservation("service", {
                              required: true,
                            })}
                            className={`bg-gray-50 border border-gray-300 ${
                              errorsNewReservation.service
                                ? "focus:ring-red-300 focus:border-red-300"
                                : "focus:ring-primary-500 focus:border-primary-500"
                            } text-gray-900 text-sm rounded-lg outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                          />
                        </div>
                        <div className="mb-5">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-xs font-medium text-gray-500 font-poppins uppercase"
                          >
                            Precio
                          </label>
                          <input
                            type="number"
                            id="price"
                            {...registerNewReservation("price", {
                              required: true,
                              maxLength: 10,
                            })}
                            className={`bg-gray-50 border border-gray-300 ${
                              errorsNewReservation.price
                                ? "focus:ring-red-300 focus:border-red-300"
                                : "focus:ring-primary-500 focus:border-primary-500"
                            } text-gray-900 text-sm rounded-lg outline-none focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5`}
                          />
                        </div>
                        <p className="text-center text-xs mb-4">
                          {renderErrorMessage(errorsNewReservation)}
                        </p>
                        <button
                          type="submit"
                          className="text-white bg-primary-500 hover:bg-primary-600 hover:scale-105 transition-all ease-in-out duration-300 focus:ring-2 focus:bg-primary-600 focus:outline-none focus:ring-primary-300 rounded-lg text-sm w-full px-5 py-2.5 mt-2 text-center font-poppins"
                        >
                          Guardar Cambios
                        </button>
                      </form>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      {/* DELETE RESERVATION MODAL */}
      {deleteReservation && (
        <Transition appear show={deleteReservation}>
          <Dialog
            as="div"
            className="relative z-20 focus:outline-none"
            onClose={() => setDeleteReservation(null)}
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
                      <p className="text-gray-700 font-medium font-poppins text-center">
                        Eliminar Reserva
                      </p>
                    </DialogTitle>
                    <div className="my-10">
                      <p className="text-sm text-gray-700 text-center">
                        Estás seguro que deseas eliminar esta reserva?
                      </p>
                      <p className="font-poppins text-gray-700 font-medium text-sm text-center mt-8">
                        Fecha:{" "}
                        <span className="font-normal">
                          {new Date(
                            reservations.find(
                              (reservation) =>
                                reservation.id === deleteReservation
                            ).date
                          ).toLocaleDateString("en-GB")}
                        </span>
                      </p>
                      <p className="font-poppins text-gray-700 font-medium text-sm text-center">
                        Cliente:{" "}
                        <span className="font-normal">
                          {
                            reservations.find(
                              (reservation) =>
                                reservation.id === deleteReservation
                            ).customer
                          }
                        </span>
                      </p>
                      <p className="font-poppins text-gray-700 font-medium text-sm text-center">
                        Servicio:{" "}
                        <span className="font-normal">
                          {
                            reservations.find(
                              (reservation) =>
                                reservation.id === deleteReservation
                            ).service
                          }
                        </span>
                      </p>
                    </div>
                    <div className="mt-4 w-full flex gap-4 justify-center">
                      <Button
                        className="flex items-center gap-2 rounded-lg bg-primary-500 py-2 px-5 text-sm font-poppins font-medium text-white focus:outline-none hover:bg-primary-700"
                        onClick={() => setDeleteReservation(null)}
                      >
                        Nope! Cancelar
                      </Button>
                      <Button
                        className="flex items-center gap-2 rounded-lg bg-red-500 py-2 px-5 text-sm font-poppins font-medium text-white focus:outline-none hover:bg-red-700"
                        onClick={() => onDeleteSave(deleteReservation)}
                      >
                        Yes, delete!
                      </Button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      {/* TOAST COMPONENT */}
      <ToastContainer />
    </div>
  );
}

export default Reservations;
