import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#f5f5f9]">
      <div className="flex flex-col gap-4 justify-center items-center text-center px-5">
        <p className="text-2xl text-primary-700 font-poppins font-bold">
          Ruta No Encontrada
        </p>
        <p className="text-gray-600">
          Oops, lo lamentamos &#128532;! No logramos encontrar la ruta que estás
          buscando.
        </p>
        <img src="/img/not_found.svg" />
        <button
          onClick={() => navigate("/", { replace: true })}
          className="py-3 px-5 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-all ease-in-out duration-300 hover:scale-105 outline-none focus:ring-2 focus:bg-primary-600 focus:ring-primary-400 focus:ring-offset-2"
        >
          Regresar al Inicio
        </button>
      </div>
    </div>
  );
}

export default NotFound;
