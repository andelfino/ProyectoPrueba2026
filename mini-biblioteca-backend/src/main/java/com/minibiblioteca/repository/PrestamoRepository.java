package com.minibiblioteca.repository;

import com.minibiblioteca.entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {

    boolean existsByLibro_Id(Long libroId);

    @Query("SELECT p FROM Prestamo p JOIN FETCH p.usuario JOIN FETCH p.libro ORDER BY p.fechaPrestamo DESC")
    List<Prestamo> findAllWithUsuarioYLibro();
}
