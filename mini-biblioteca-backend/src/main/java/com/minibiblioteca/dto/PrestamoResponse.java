package com.minibiblioteca.dto;

import java.time.LocalDate;

public record PrestamoResponse(
        Long id,
        LocalDate fechaPrestamo,
        Long usuarioId,
        String usuarioNombre,
        Long libroId,
        String libroTitulo
) {
}
