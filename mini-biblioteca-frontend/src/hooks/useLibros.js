import { useState, useEffect, useCallback } from "react";
import { librosService } from "../services/libros";

export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await librosService.listar();
      setLibros(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { libros, cargando, error, recargar: cargar };
}
