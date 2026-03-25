import { api } from "./api";

const ENDPOINT = "/api/prestamos";

export const prestamosService = {
  listar: () => api.get(ENDPOINT),
  registrar: (prestamo) => api.post(ENDPOINT, prestamo),
};
