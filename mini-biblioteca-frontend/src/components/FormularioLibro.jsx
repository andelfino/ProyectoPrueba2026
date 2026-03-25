import { useState } from "react";

const VACIO = { titulo: "", autor: "", isbn: "", disponible: true };

export function FormularioLibro({ valorInicial, onGuardar, onCancelar, guardando }) {
  const [campos, setCampos] = useState(valorInicial ?? VACIO);
  const [errores, setErrores] = useState({});

  function actualizar(e) {
    const { name, value, type, checked } = e.target;
    setCampos((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: null }));
  }

  function validar() {
    const nuevosErrores = {};
    if (!campos.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio.";
    if (!campos.autor.trim()) nuevosErrores.autor = "El autor es obligatorio.";
    return nuevosErrores;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    onGuardar({
      titulo: campos.titulo.trim(),
      autor: campos.autor.trim(),
      isbn: campos.isbn.trim() || null,
      disponible: campos.disponible,
    });
  }

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label className="campo__etiqueta" htmlFor="titulo">
          Título <span className="campo__requerido">*</span>
        </label>
        <input
          id="titulo"
          name="titulo"
          type="text"
          className={`campo__input ${errores.titulo ? "campo__input--error" : ""}`}
          value={campos.titulo}
          onChange={actualizar}
          placeholder="Ej: Cien años de soledad"
          disabled={guardando}
        />
        {errores.titulo && (
          <p className="campo__mensaje-error">{errores.titulo}</p>
        )}
      </div>

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="autor">
          Autor <span className="campo__requerido">*</span>
        </label>
        <input
          id="autor"
          name="autor"
          type="text"
          className={`campo__input ${errores.autor ? "campo__input--error" : ""}`}
          value={campos.autor}
          onChange={actualizar}
          placeholder="Ej: Gabriel García Márquez"
          disabled={guardando}
        />
        {errores.autor && (
          <p className="campo__mensaje-error">{errores.autor}</p>
        )}
      </div>

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="isbn">
          ISBN <span className="campo__opcional">(opcional)</span>
        </label>
        <input
          id="isbn"
          name="isbn"
          type="text"
          className="campo__input"
          value={campos.isbn}
          onChange={actualizar}
          placeholder="Ej: 978-0-06-112008-4"
          disabled={guardando}
        />
      </div>

      <div className="campo campo--inline">
        <input
          id="disponible"
          name="disponible"
          type="checkbox"
          className="campo__checkbox"
          checked={campos.disponible}
          onChange={actualizar}
          disabled={guardando}
        />
        <label className="campo__etiqueta campo__etiqueta--checkbox" htmlFor="disponible">
          Disponible para préstamo
        </label>
      </div>

      <div className="formulario__acciones">
        <button
          type="button"
          className="btn btn-secundario"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primario" disabled={guardando}>
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}
