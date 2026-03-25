import { PrestamoCard } from "./PrestamoCard";

export function ListaPrestamos({ prestamos }) {
  return (
    <div className="lista-prestamos">
      {prestamos.map((prestamo) => (
        <PrestamoCard key={prestamo.id} prestamo={prestamo} />
      ))}
    </div>
  );
}
