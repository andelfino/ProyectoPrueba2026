package com.minibiblioteca.service;

import com.minibiblioteca.dto.PrestamoRequest;
import com.minibiblioteca.dto.PrestamoResponse;
import com.minibiblioteca.entity.Libro;
import com.minibiblioteca.entity.Prestamo;
import com.minibiblioteca.entity.Usuario;
import com.minibiblioteca.exception.NegocioException;
import com.minibiblioteca.repository.LibroRepository;
import com.minibiblioteca.repository.PrestamoRepository;
import com.minibiblioteca.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrestamoService {

    private final PrestamoRepository prestamoRepository;
    private final UsuarioRepository usuarioRepository;
    private final LibroRepository libroRepository;

    public PrestamoService(
            PrestamoRepository prestamoRepository,
            UsuarioRepository usuarioRepository,
            LibroRepository libroRepository) {
        this.prestamoRepository = prestamoRepository;
        this.usuarioRepository = usuarioRepository;
        this.libroRepository = libroRepository;
    }

    @Transactional(readOnly = true)
    public List<PrestamoResponse> listar() {
        return prestamoRepository.findAllWithUsuarioYLibro().stream().map(this::toResponse).toList();
    }

    @Transactional
    public PrestamoResponse registrar(PrestamoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new NegocioException("No existe el usuario con id " + request.usuarioId()));
        Libro libro = libroRepository.findById(request.libroId())
                .orElseThrow(() -> new NegocioException("No existe el libro con id " + request.libroId()));

        if (!libro.isDisponible()) {
            throw new NegocioException("El libro no está disponible para préstamo");
        }

        LocalDate fecha = request.fechaPrestamo() != null ? request.fechaPrestamo() : LocalDate.now();

        Prestamo p = new Prestamo();
        p.setUsuario(usuario);
        p.setLibro(libro);
        p.setFechaPrestamo(fecha);

        libro.setDisponible(false);
        libroRepository.save(libro);

        prestamoRepository.save(p);
        return toResponse(p);
    }

    private PrestamoResponse toResponse(Prestamo p) {
        return new PrestamoResponse(
                p.getId(),
                p.getFechaPrestamo(),
                p.getUsuario().getId(),
                p.getUsuario().getNombre(),
                p.getLibro().getId(),
                p.getLibro().getTitulo());
    }
}
