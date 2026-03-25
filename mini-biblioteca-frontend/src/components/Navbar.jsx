export function Navbar({ paginaActiva, onNavegar }) {
  const links = [
    { id: "libros", label: "Libros" },
    { id: "usuarios", label: "Usuarios" },
    { id: "prestamos", label: "Préstamos" },
  ];

  return (
    <header className="navbar">
      <div className="navbar__marca">
        <span className="navbar__icono">📚</span>
        <span className="navbar__nombre">Mini Biblioteca</span>
      </div>
      <nav className="navbar__nav">
        {links.map((link) => (
          <button
            key={link.id}
            className={`navbar__link ${paginaActiva === link.id ? "navbar__link--activo" : ""}`}
            onClick={() => onNavegar(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
