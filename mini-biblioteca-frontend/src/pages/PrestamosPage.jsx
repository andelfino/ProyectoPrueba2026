import { useState } from "react";
import { usePrestamos } from "../hooks/usePrestamos";
import { prestamosService } from "../services/prestamos";
import { ListaPrestamos } from "../components/ListaPrestamos";
import { EstadoCarga } from "../components/EstadoCarga";
import { Modal } from "../components/Modal";
import { FormularioPrestamo } from "../components/FormularioPrestamo";

export function PrestamosPage() {
  const { prestamos, cargando, error, recargar } = usePrestamos();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorMutacion, setErrorMutacion] = useState(null);

  async function handleRegistrar(datos) {
    setGuardando(true);
    setErrorMutacion(null);
    try {
      await prestamosService.registrar(datos);
      setModalAbierto(false);
      recargar();
    } catch (err) {
      setErrorMutacion(err.message);
    } finally {
      setGuardando(false);
    }
  }

  function handleCerrarModal() {
    if (guardando) return;
    setModalAbierto(false);
    setErrorMutacion(null);
  }

  const mostrarEstado = cargando || error || prestamos.length === 0;

  return (
    <main className="pagina">
      <div className="pagina__encabezado pagina__encabezado--con-accion">
        <div>
          <h1 className="pagina__titulo">Préstamos</h1>
          <p className="pagina__subtitulo">Historial de préstamos registrados</p>
        </div>
        <button
          className="btn btn-primario"
          onClick={() => setModalAbierto(true)}
        >
          + Nuevo préstamo
        </button>
      </div>

      {mostrarEstado ? (
        <EstadoCarga
          cargando={cargando}
          error={error}
          vacio={!cargando && !error && prestamos.length === 0}
          onReintentar={recargar}
        />
      ) : (
        <>
          <p className="pagina__conteo">
            {prestamos.length} préstamo{prestamos.length !== 1 ? "s" : ""} registrado{prestamos.length !== 1 ? "s" : ""}
          </p>
          <ListaPrestamos prestamos={prestamos} />
        </>
      )}

      {modalAbierto && (
        <Modal titulo="Registrar préstamo" onCerrar={handleCerrarModal}>
          {errorMutacion && (
            <p className="campo__mensaje-error campo__mensaje-error--global">
              {errorMutacion}
            </p>
          )}
          <FormularioPrestamo
            onGuardar={handleRegistrar}
            onCancelar={handleCerrarModal}
            guardando={guardando}
          />
        </Modal>
      )}
    </main>
  );
}
