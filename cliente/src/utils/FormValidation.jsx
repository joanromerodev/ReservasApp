function renderErrorMessage(errors) {
  if (errors) {
    if (errors.name) {
      if (errors.name.type === "required") {
        return (
          <span className="text-red-500 text-sm text-center py-2 font-poppins">
            Los nombres son obligatorios.
          </span>
        );
      }
      if (errors.name.type === "maxLength") {
        return (
          <span className="text-red-500 text-sm text-center py-2 font-poppins">
            Nombres demasiados largos.
          </span>
        );
      }
    }
    if (errors.date) {
      if (errors.date.type === "required") {
        return (
          <span className="text-red-500 text-sm text-center py-2 font-poppins">
            La fecha de reserva es obligatoria.
          </span>
        );
      }
    }
    if (errors.customer) {
      if (errors.customer.type === "required") {
        return (
          <span className="text-red-500 text-sm text-center py-2 font-poppins">
            El cliente es obligatorio
          </span>
        );
      }
    }
    if (errors.service) {
      if (errors.service.type === "required") {
        return (
          <span className="text-red-500 text-sm text-center py-2 font-poppins">
            El servicio es obligatorio.
          </span>
        );
      }
    }
    if (errors.price) {
      if (errors.price.type === "required") {
        return (
          <span className="text-red-500 text-sm text-center py-2 font-poppins">
            El precio es obligatorio.
          </span>
        );
      }
      if (errors.price.type === "maxLength") {
        return (
          <span className="text-red-500 text-sm text-center py-2 font-poppins">
            Precio muy largo. Maximo 10 caracteres.
          </span>
        );
      }
    }
  }
}

export { renderErrorMessage };
