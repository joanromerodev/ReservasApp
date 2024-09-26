import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Quick Actions List
const sectionsList = [
  {
    title: "Reservas",
    description: "Agenda, actualiza y cancela reservas para tus clientes.",
    path: "/reservations",
  },
];

function Home() {
  // CONST AND VAR DECLARATIONS
  const [reservations, setReservations] = useState(null);
  const [loading, setLoading] = useState(false);
  const limit = 7;
  const port = 4080;
  const endpoint = "reservas";
  //FETCH ALL THE NECESSARY REQUESTS ON COMPONENT MOUNT
  useEffect(() => {
    const fetchReservationsOnLoad = async () => {
      const requestOptions = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:${port}/${endpoint}?limit=${limit}`,
          requestOptions
        );
        if (response.status === 200) {
          setReservations(
            response.data?.reservations?.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            )
          );
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Ocurrio un error al consultar la información", {
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
    fetchReservationsOnLoad();
  }, []);
  // FORMAT DAYS TO SHOW ON TABLE
  const formatDays = (date) => {
    const reservationDate = new Date(date);
    const currentDate = new Date();
    const differenceInMs = reservationDate - currentDate;
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    if (differenceInDays < 0) {
      return <p className="text-sm text-red-800">Past Due</p>;
    } else if (differenceInDays === 0) {
      return <p className="text-sm text-red-500">Today</p>;
    } else if (differenceInDays > 0 && differenceInDays <= 3) {
      return (
        <p className="text-sm text-orange-500">{differenceInDays} days left</p>
      );
    } else {
      return (
        <p className="text-sm text-green-700">{differenceInDays} days left</p>
      );
    }
  };
  return (
    <div className="bg-white h-full rounded-lg shadow-lg p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-4 mb-5">
        <p className="font-poppins font-medium text-gray-600 text-base">
          Proximas Reservas
        </p>
        <div className="border rounded-lg">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 rounded-lg">
              <thead className="text-xs text-gray-600 font-normal bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 font-poppins">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 font-poppins">
                    Cliente
                  </th>
                  <th scope="col" className="px-6 py-3 font-poppins">
                    Servicio
                  </th>
                  <th scope="col" className="px-6 py-3 font-poppins">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-3 font-poppins">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 font-poppins">
                    Dias Restantes
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations?.map((reservation, index) => (
                  <tr key={index} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-poppins">
                      {index + 1}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium font-poppins text-gray-900 whitespace-nowrap"
                    >
                      {reservation?.customer}
                    </th>
                    <td className="px-6 py-4 font-poppins">
                      {reservation?.service}
                    </td>
                    <td className="px-6 py-4 font-poppins">
                      ${reservation?.price}
                    </td>
                    <td className="px-6 py-4 font-poppins">
                      {new Date(reservation.date).toLocaleDateString("en-GB")}{" "}
                      {new Date(reservation.date).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 font-poppins">
                      {formatDays(reservation.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading ? (
              <div role="status" className="flex justify-center py-5">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-primary-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Cargando...</span>
              </div>
            ) : (
              <>
                {reservations && (
                  <div className="w-full text-center p-4">
                    <p className="font-poppins text-gray-600 text-sm">
                      Quieres ver más detalles y registros? Ir a la página de
                      Reservas{" "}
                      <Link
                        className="font-medium text-primary-500 hover:text-primary-600"
                        to="/reservations"
                      >
                        aquí
                      </Link>
                    </p>
                  </div>
                )}
                {!reservations && (
                  <p className="text-gray-700 font-poppins p-4 text-center text-sm">
                    No existen reservas aún. Ve a la página de reservas y crea
                    una.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="font-poppins font-medium text-center text-gray-600 text-base">
          Acceso Directo
        </p>
        <div className="border rounded-lg p-5 bg-transparent grid grid-cols-1 md:grid-cols-2 gap-3 shadow-inner">
          {sectionsList.map((section, index) => (
            <Link
              to={section.path}
              key={index}
              className="bg-primary-50 rounded-lg shadow p-2 gap-2 flex flex-col hover:scale-105 transition-all ease-in-out duration-300"
            >
              <p className="text-gray-700 font-medium font-poppins text-sm">
                {section.title}
              </p>
              <p className="font-poppins text-xs text-gray-500">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
      {/* TOAST COMPONENT */}
      <ToastContainer />
    </div>
  );
}

export default Home;
