import { useState } from "react";
import { formatearDisponibilidad } from "../utils/formatear";

export function LibroCard({ libro, onEliminar }) {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  async function handleEliminar() {
    if (!confirmando) {
      setConfirmando(true);
      return;
    }
    setEliminando(true);
    await onEliminar(libro.id);
    setEliminando(false);
    setConfirmando(false);
  }

  return (
    <article className="libro-card">
      <div className="libro-card__encabezado">
        <h3 className="libro-card__titulo">{libro.titulo}</h3>
        <span
          className={`badge ${libro.disponible ? "badge--verde" : "badge--rojo"}`}
        >
          {formatearDisponibilidad(libro.disponible)}
        </span>
      </div>
      <p className="libro-card__autor">{libro.autor}</p>
      {libro.isbn && (
        <p className="libro-card__isbn">
          <span className="label">ISBN:</span> {libro.isbn}
        </p>
      )}
      {onEliminar && (
        <div className="libro-card__acciones">
          {confirmando ? (
            <>
              <span className="libro-card__confirmar-texto">¿Confirmar?</span>
              <button
                className="btn btn-peligro btn-sm"
                onClick={handleEliminar}
                disabled={eliminando}
              >
                {eliminando ? "Eliminando..." : "Sí, eliminar"}
              </button>
              <button
                className="btn btn-secundario btn-sm"
                onClick={() => setConfirmando(false)}
                disabled={eliminando}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleEliminar}
              aria-label={`Eliminar ${libro.titulo}`}
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </article>
  );
}
