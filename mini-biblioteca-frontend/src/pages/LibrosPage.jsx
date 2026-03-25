import { useState } from "react";
import { useLibros } from "../hooks/useLibros";
import { librosService } from "../services/libros";
import { ListaLibros } from "../components/ListaLibros";
import { EstadoCarga } from "../components/EstadoCarga";
import { Modal } from "../components/Modal";
import { FormularioLibro } from "../components/FormularioLibro";

export function LibrosPage() {
  const { libros, cargando, error, recargar } = useLibros();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorMutacion, setErrorMutacion] = useState(null);

  async function handleCrear(datos) {
    setGuardando(true);
    setErrorMutacion(null);
    try {
      await librosService.crear(datos);
      setModalAbierto(false);
      recargar();
    } catch (err) {
      setErrorMutacion(err.message);
    } finally {
      setGuardando(false);
    }
  }

  async function handleEliminar(id) {
    try {
      await librosService.eliminar(id);
      recargar();
    } catch (err) {
      alert(`No se pudo eliminar el libro: ${err.message}`);
    }
  }

  function handleCerrarModal() {
    if (guardando) return;
    setModalAbierto(false);
    setErrorMutacion(null);
  }

  const mostrarEstado = cargando || error || libros.length === 0;

  return (
    <main className="pagina">
      <div className="pagina__encabezado pagina__encabezado--con-accion">
        <div>
          <h1 className="pagina__titulo">Libros</h1>
          <p className="pagina__subtitulo">Catálogo de libros disponibles</p>
        </div>
        <button
          className="btn btn-primario"
          onClick={() => setModalAbierto(true)}
        >
          + Nuevo libro
        </button>
      </div>

      {mostrarEstado ? (
        <EstadoCarga
          cargando={cargando}
          error={error}
          vacio={!cargando && !error && libros.length === 0}
          onReintentar={recargar}
        />
      ) : (
        <>
          <p className="pagina__conteo">
            {libros.length} libro{libros.length !== 1 ? "s" : ""} en el catálogo
          </p>
          <ListaLibros libros={libros} onEliminar={handleEliminar} />
        </>
      )}

      {modalAbierto && (
        <Modal titulo="Nuevo libro" onCerrar={handleCerrarModal}>
          {errorMutacion && (
            <p className="campo__mensaje-error campo__mensaje-error--global">
              {errorMutacion}
            </p>
          )}
          <FormularioLibro
            onGuardar={handleCrear}
            onCancelar={handleCerrarModal}
            guardando={guardando}
          />
        </Modal>
      )}
    </main>
  );
}
