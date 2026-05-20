# Rehabilitación HRC - versión estática para GitHub Pages

Este paquete fue reconstruido desde una instalación WordPress/cPanel para quedar como sitio estático compatible con GitHub Pages.

## Qué contiene

- `index.html`: landing principal.
- Carpetas por slug de ejercicios, por ejemplo `/rodilla/`.
- Carpetas de categorías compatibles con rutas antiguas tipo `/category/cabeza/`.
- `assets/css/styles.css` y `assets/js/main.js`.
- Imágenes optimizadas en WebP/PNG.
- Video principal comprimido y sin audio para uso como fondo.
- `.nojekyll` para evitar procesamiento de Jekyll.

## Qué se eliminó del WordPress original

- `wp-admin`, `wp-includes`, PHP, plugins, idiomas, temas, respaldos `.wpress`, archivos de cPanel y base de datos.
- Usuarios, contraseñas hash, `wp-config.php` y cualquier dependencia de MySQL/PHP.
- Archivos duplicados y medios no usados por la landing o los ejercicios publicados.

## Publicación en GitHub Pages

1. Crear un repositorio en GitHub.
2. Subir el contenido de este ZIP a la raíz del repositorio.
3. Ir a **Settings > Pages**.
4. Seleccionar **Deploy from a branch**.
5. Elegir la rama `main` y carpeta `/root`.
6. Guardar.

## Dominio personalizado

Si se usará el dominio original, renombrar `CNAME.example` a `CNAME` y mantener dentro el dominio:

```txt
rehabilitacion.hospitalcopiapo.cl
```

Luego configurar DNS apuntando a GitHub Pages desde el proveedor correspondiente.

## Limitaciones estáticas

GitHub Pages no ejecuta WordPress, PHP, MySQL ni Contact Form 7. El formulario fue reemplazado por contacto vía correo institucional. Para formularios reales se requiere un servicio externo o una API.

## Resumen de migración

- Publicaciones reales migradas: 14.
- Categorías generadas: 9.
- Archivos de imagen usados/optimizados: 25.
