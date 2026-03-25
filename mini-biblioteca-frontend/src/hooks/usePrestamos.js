import { useState, useEffect, useCallback } from "react";
import { prestamosService } from "../services/prestamos";

export function usePrestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await prestamosService.listar();
      setPrestamos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { prestamos, cargando, error, recargar: cargar };
}
