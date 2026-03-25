package com.minibiblioteca.service;

import com.minibiblioteca.dto.LibroRequest;
import com.minibiblioteca.dto.LibroResponse;
import com.minibiblioteca.entity.Libro;
import com.minibiblioteca.exception.NegocioException;
import com.minibiblioteca.repository.LibroRepository;
import com.minibiblioteca.repository.PrestamoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LibroService {

    private final LibroRepository libroRepository;
    private final PrestamoRepository prestamoRepository;

    public LibroService(LibroRepository libroRepository, PrestamoRepository prestamoRepository) {
        this.libroRepository = libroRepository;
        this.prestamoRepository = prestamoRepository;
    }

    @Transactional(readOnly = true)
    public List<LibroResponse> listar() {
        return libroRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Transactional
    public LibroResponse crear(LibroRequest request) {
        Libro l = new Libro();
        aplicarDatos(l, request);
        l.setDisponible(true);
        libroRepository.save(l);
        return toResponse(l);
    }

    @Transactional
    public LibroResponse actualizar(Long id, LibroRequest request) {
        Libro l = libroRepository.findById(id)
                .orElseThrow(() -> new NegocioException("No existe el libro con id " + id));
        aplicarDatos(l, request);
        libroRepository.save(l);
        return toResponse(l);
    }

    @Transactional
    public void eliminar(Long id) {
        Libro l = libroRepository.findById(id)
                .orElseThrow(() -> new NegocioException("No existe el libro con id " + id));
        if (prestamoRepository.existsByLibro_Id(id)) {
            throw new NegocioException("No se puede eliminar el libro porque tiene préstamos registrados");
        }
        libroRepository.delete(l);
    }

    private void aplicarDatos(Libro l, LibroRequest request) {
        l.setTitulo(request.titulo().trim());
        l.setAutor(request.autor().trim());
        l.setIsbn(request.isbn() != null && !request.isbn().isBlank() ? request.isbn().trim() : null);
    }

    private LibroResponse toResponse(Libro l) {
        return new LibroResponse(l.getId(), l.getTitulo(), l.getAutor(), l.getIsbn(), l.isDisponible());
    }
}
