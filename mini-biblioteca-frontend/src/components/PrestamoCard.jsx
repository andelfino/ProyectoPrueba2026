import { formatearFecha } from "../utils/formatear";

export function PrestamoCard({ prestamo }) {
  return (
    <article className="prestamo-card">
      <div className="prestamo-card__libro">
        <span className="prestamo-card__icono" aria-hidden="true">📖</span>
        <span className="prestamo-card__titulo-libro">{prestamo.libroTitulo}</span>
      </div>
      <div className="prestamo-card__detalle">
        <div className="prestamo-card__fila">
          <span className="prestamo-card__etiqueta">Usuario</span>
          <span className="prestamo-card__valor">{prestamo.usuarioNombre}</span>
        </div>
        <div className="prestamo-card__fila">
          <span className="prestamo-card__etiqueta">Fecha de préstamo</span>
          <span className="prestamo-card__valor">
            {formatearFecha(prestamo.fechaPrestamo)}
          </span>
        </div>
      </div>
    </article>
  );
}
