import { LibroCard } from "./LibroCard";

export function ListaLibros({ libros, onEliminar }) {
  return (
    <div className="lista-libros">
      {libros.map((libro) => (
        <LibroCard key={libro.id} libro={libro} onEliminar={onEliminar} />
      ))}
    </div>
  );
}
