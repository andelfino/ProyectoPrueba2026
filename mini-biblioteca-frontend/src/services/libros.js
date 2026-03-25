import { api } from "./api";

const ENDPOINT = "/api/libros";

export const librosService = {
  listar: () => api.get(ENDPOINT),
  crear: (libro) => api.post(ENDPOINT, libro),
  actualizar: (id, libro) => api.put(`${ENDPOINT}/${id}`, libro),
  eliminar: (id) => api.delete(`${ENDPOINT}/${id}`),
};
