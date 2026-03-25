import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { LibrosPage } from "./pages/LibrosPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { PrestamosPage } from "./pages/PrestamosPage";

const PAGINAS = {
  libros: LibrosPage,
  usuarios: UsuariosPage,
  prestamos: PrestamosPage,
};

function App() {
  const [paginaActiva, setPaginaActiva] = useState("libros");

  const PaginaActual = PAGINAS[paginaActiva] ?? LibrosPage;

  return (
    <div className="layout">
      <Navbar paginaActiva={paginaActiva} onNavegar={setPaginaActiva} />
      <div className="layout__contenido">
        <PaginaActual />
      </div>
    </div>
  );
}

export default App;
