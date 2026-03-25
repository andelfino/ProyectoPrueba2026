export function formatearDisponibilidad(disponible) {
  return disponible ? "Disponible" : "Prestado";
}

export function truncarTexto(texto, maxCaracteres = 60) {
  if (!texto) return "";
  return texto.length > maxCaracteres
    ? texto.slice(0, maxCaracteres) + "…"
    : texto;
}

// Convierte "2025-03-25" (ISO-8601 que devuelve el backend) a "25/03/2025"
export function formatearFecha(isoDate) {
  if (!isoDate) return "—";
  const [anio, mes, dia] = isoDate.split("-");
  return `${dia}/${mes}/${anio}`;
}
