# mini-biblioteca-frontend

Frontend de la aplicación Mini Biblioteca, construido con **React + Vite + JavaScript**. Se comunica con el backend Spring Boot exclusivamente a través de su API REST en `/api/...`.

## Requisitos previos

- Node.js 18+
- El backend `mini-biblioteca-backend` corriendo en `http://localhost:8080`

## Instalación

```bash
cd mini-biblioteca-frontend
npm install
```

## Configuración

Copiá el archivo `.env.example` como `.env` y ajustá la URL del backend si fuera necesario:

```
VITE_API_URL=http://localhost:8080
```

## Desarrollo local

```bash
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

## Estructura del proyecto

```
src/
├── components/       # Componentes de UI reutilizables
│   ├── EstadoCarga.jsx
│   ├── LibroCard.jsx
│   ├── ListaLibros.jsx
│   └── Navbar.jsx
├── hooks/            # Custom hooks que encapsulan estado + efecto
│   └── useLibros.js
├── pages/            # Pantallas completas (componen components)
│   ├── LibrosPage.jsx
│   ├── UsuariosPage.jsx
│   └── PrestamosPage.jsx
├── services/         # Capa de acceso a la API (solo HTTP)
│   ├── api.js        # Cliente HTTP base
│   ├── libros.js
│   ├── usuarios.js
│   └── prestamos.js
├── styles/
│   └── global.css    # Estilos globales
├── utils/
│   └── formatear.js  # Funciones utilitarias puras
├── App.jsx           # Navegación entre páginas
└── main.jsx          # Punto de entrada React
```

## Construcción para producción

```bash
npm run build
```

Los archivos estáticos quedan en `dist/`, listos para desplegar en cualquier hosting estático (Vercel, Netlify, etc.).
