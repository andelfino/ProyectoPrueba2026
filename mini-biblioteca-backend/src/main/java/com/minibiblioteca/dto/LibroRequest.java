package com.minibiblioteca.dto;

import jakarta.validation.constraints.NotBlank;

public record LibroRequest(
        @NotBlank(message = "El título es obligatorio") String titulo,
        @NotBlank(message = "El autor es obligatorio") String autor,
        String isbn
) {
}
