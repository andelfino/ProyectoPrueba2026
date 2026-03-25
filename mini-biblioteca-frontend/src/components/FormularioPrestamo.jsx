import { useState, useEffect } from "react";
import { usuariosService } from "../services/usuarios";
import { librosService } from "../services/libros";

const VACIO = { usuarioId: "", libroId: "" };

export function FormularioPrestamo({ onGuardar, onCancelar, guardando }) {
  const [campos, setCampos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  const [usuarios, setUsuarios] = useState([]);
  const [librosDisponibles, setLibrosDisponibles] = useState([]);
  const [cargandoOpciones, setCargandoOpciones] = useState(true);
  const [errorOpciones, setErrorOpciones] = useState(null);

  useEffect(() => {
    async function cargarOpciones() {
      setCargandoOpciones(true);
      setErrorOpciones(null);
      try {
        const [todosUsuarios, todosLibros] = await Promise.all([
          usuariosService.listar(),
          librosService.listar(),
        ]);
        setUsuarios(todosUsuarios);
        setLibrosDisponibles(todosLibros.filter((l) => l.disponible));
      } catch {
        setErrorOpciones("No se pudieron cargar usuarios o libros. Reintentá más tarde.");
      } finally {
        setCargandoOpciones(false);
      }
    }
    cargarOpciones();
  }, []);

  function actualizar(e) {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: null }));
  }

  function validar() {
    const nuevosErrores = {};
    if (!campos.usuarioId) nuevosErrores.usuarioId = "Seleccioná un usuario.";
    if (!campos.libroId) nuevosErrores.libroId = "Seleccioná un libro.";
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
      usuarioId: Number(campos.usuarioId),
      libroId: Number(campos.libroId),
    });
  }

  if (cargandoOpciones) {
    return (
      <div className="formulario-cargando">
        <div className="spinner" aria-label="Cargando opciones..." />
        <p>Cargando usuarios y libros...</p>
      </div>
    );
  }

  if (errorOpciones) {
    return (
      <div className="estado-error">
        <p className="mensaje-error">{errorOpciones}</p>
        <button className="btn btn-secundario" onClick={onCancelar}>
          Cerrar
        </button>
      </div>
    );
  }

  const sinUsuarios = usuarios.length === 0;
  const sinLibros = librosDisponibles.length === 0;

  return (
    <form className="formulario" onSubmit={handleSubmit} noValidate>
      {sinUsuarios && (
        <p className="campo__mensaje-error campo__mensaje-error--global">
          No hay usuarios registrados. Registrá uno primero.
        </p>
      )}
      {sinLibros && (
        <p className="campo__mensaje-error campo__mensaje-error--global">
          No hay libros disponibles para prestar en este momento.
        </p>
      )}

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="usuarioId">
          Usuario <span className="campo__requerido">*</span>
        </label>
        <select
          id="usuarioId"
          name="usuarioId"
          className={`campo__input campo__select ${errores.usuarioId ? "campo__input--error" : ""}`}
          value={campos.usuarioId}
          onChange={actualizar}
          disabled={guardando || sinUsuarios}
        >
          <option value="">— Seleccioná un usuario —</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} ({u.email})
            </option>
          ))}
        </select>
        {errores.usuarioId && (
          <p className="campo__mensaje-error">{errores.usuarioId}</p>
        )}
      </div>

      <div className="campo">
        <label className="campo__etiqueta" htmlFor="libroId">
          Libro disponible <span className="campo__requerido">*</span>
        </label>
        <select
          id="libroId"
          name="libroId"
          className={`campo__input campo__select ${errores.libroId ? "campo__input--error" : ""}`}
          value={campos.libroId}
          onChange={actualizar}
          disabled={guardando || sinLibros}
        >
          <option value="">— Seleccioná un libro —</option>
          {librosDisponibles.map((l) => (
            <option key={l.id} value={l.id}>
              {l.titulo} — {l.autor}
            </option>
          ))}
        </select>
        {errores.libroId && (
          <p className="campo__mensaje-error">{errores.libroId}</p>
        )}
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
        <button
          type="submit"
          className="btn btn-primario"
          disabled={guardando || sinUsuarios || sinLibros}
        >
          {guardando ? "Registrando..." : "Registrar préstamo"}
        </button>
      </div>
    </form>
  );
}
