import express from "express";
import cors from "cors";

//INSTANCIAMOS SERVIDOR (express)
const app = express();
const router = express.Router();
const port = 4080;
const reservations = [];

//CONFIGURAMOS SERVIDOR
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//OBTENER RESERVAS
router.get("/", (req, res) => {
  if (Object.keys(req.query).length > 0) {
    const { startDate, endDate, service, customer } = req.query;
    let queryResult = reservations;
    // Filtro por fecha de inicio
    if (startDate) {
      queryResult = queryResult.filter((reservation) => {
        const reservationDate = new Date(reservation.date);
        return reservationDate >= new Date(startDate);
      });
    }
    // Filtro por fecha de fin
    if (endDate) {
      queryResult = queryResult.filter((reservation) => {
        const reservationDate = new Date(reservation.date);
        return reservationDate <= new Date(endDate);
      });
    }
    // Filtro por servicio
    if (service) {
      queryResult = queryResult.filter(
        (reservation) => reservation.service === service
      );
    }
    // Filtro por cliente
    if (customer) {
      queryResult = queryResult.filter(
        (reservation) => reservation.customer === customer
      );
    }
    return res.status(200).json({ reservations: queryResult });
  } else {
    return res.status(200).json({ reservations });
  }
});
//NUEVA RESERVA
router.post("/", (req, res) => {
  if (req.body) {
    const newReservation = req.body;
    const reservationId =
      reservations.length === 0 ? 1 : reservations.length + 1;
    newReservation.id = reservationId;
    reservations.push(newReservation);
    return res.status(201).json({ msg: "Reserva creada éxitosamente" });
  } else {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor envíar datos para crear reserva",
    });
  }
});
//ACTUALIZAR RESERVA
router.put("/:id", (req, res) => {
  if (req.params.id && req.body) {
    const idReserva = req.params.id;
    const newReserva = req.body;
    reservations[idReserva - 1] = newReserva;
    return res.status(204).json({ msg: "Reserva actualizada éxitosamente" });
  } else {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor envíar datos para actualizar reserva",
    });
  }
});
//ELIMINAR RESERVA
router.delete("/:id", (req, res) => {
  if (req.params.id) {
    const idReserva = req.params.id;
    reservations.splice(idReserva - 1, 1);
    return res.status(204).json({ msg: "Reserva eliminada éxitosamente" });
  } else {
    return res.status(400).json({
      msg: "Solicitud incorrecta. Por favor envíar ID para eliminar reserva",
    });
  }
});

//CREAMOS LA RUTA
app.use("/reservas", router);

//INICIALIZAMOS SERVIDOR
app.listen(port, () => {
  console.log("Server running in port " + port);
});
