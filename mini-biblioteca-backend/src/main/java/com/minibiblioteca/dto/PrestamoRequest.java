package com.minibiblioteca.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PrestamoRequest(
        @NotNull(message = "usuarioId es obligatorio") Long usuarioId,
        @NotNull(message = "libroId es obligatorio") Long libroId,
        LocalDate fechaPrestamo
) {
}
