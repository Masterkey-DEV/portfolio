# 🌐 Portafolio Profesional — Juan Sebastián Moreno Mosquera

## 🧭 Descripción general

Este proyecto es mi **portafolio profesional** desarrollado con [Astro](https://astro.build/) y **Tailwind CSS**.
Su objetivo es presentar de forma clara mis servicios, proyectos y datos de contacto, con una interfaz moderna, rápida y adaptable a **modo oscuro**.

## ⚙️ Tecnologías principales

- **Astro**: framework principal con enfoque en rendimiento y contenido estático.
- **Tailwind CSS**: sistema de estilos utilitarios para construir una UI consistente.
- **React Icons**: librería de iconografía para componentes visuales.
- **Modo oscuro persistente** usando `localStorage`.

## ✨ Características

- **Diseño modular** basado en componentes reutilizables.
- **Buen rendimiento y SEO** gracias al renderizado estático de Astro.
- **Interfaz limpia** con transiciones y secciones organizadas por propósito.
- **Escalabilidad** para agregar nuevos proyectos o servicios sin reestructurar todo el sitio.

## 🧩 Componentes principales

- **Header**: navegación principal, menú móvil y control de tema.
- **Main**: presentación profesional y descripción general.
- **PerfilProfesional**: sección ampliada con habilidades, enfoque y contacto.
- **ProjectOverlay / ProjectTags**: elementos visuales para tarjetas de proyectos.
- **Social**: enlaces de redes y contacto.
- **Footer**: cierre del sitio con ubicación y enlaces externos.

## 📄 Documentación de componentes reutilizables

### `AncordButton`

- `href` (`string`, requerido): URL o ruta de destino.
- `content` (`string | AstroComponent | HTML`, requerido): contenido visible del botón.
- `extraClass` (`string`, opcional): clases adicionales para personalización.

### `LemaSection`

- `title` (`string`, requerido): título principal de la sección.
- `content` (`string`, requerido): texto descriptivo de apoyo.

### `ProjectTags`

- `tags` (`string[]`, requerido): lista de etiquetas mostradas como badges.

### `ProjectOverlay`

- `detailsUrl` (`string`, requerido): enlace al detalle del proyecto.
- `liveUrl` (`string`, requerido): enlace a la demo en vivo.

### `ProfileImg`

- `img` (`string`, requerido): ruta o URL de la imagen de perfil.

### `ServiceCard`

- `title` (`string`, requerido): título de la tarjeta.
- `description` (`string`, requerido): descripción breve del servicio.
- `features` (`string[]`, requerido): lista de características.
- `icon` (`AstroComponent`, requerido): icono principal.
- `link` (`string`, requerido): enlace de acción.

### `UserCard`

- `name` (`string`, requerido): nombre principal.
- `description` (`string`, requerido): rol o descripción corta.

### `Social`

- `href` (`string`, requerido): URL de la red o medio de contacto.
- `social` (`string`, requerido): etiqueta visible.
- `Logo` (`AstroComponent`, requerido): icono representativo.

### `ProyectsCard`

- `title` (`string`, requerido): título del proyecto.
- `description` (`string`, requerido): resumen del proyecto.
- `href` (`string`, requerido): enlace al proyecto.
- `img` (`string`, opcional): imagen asociada (actualmente no renderizada).

## 📬 Contacto

Si deseas colaborar conmigo o conocer más sobre mi trabajo, puedes escribirme por correo o por redes sociales.

## 📄 Licencia

Proyecto de uso personal. Si deseas reutilizar partes del diseño o estructura, agradezco atribución.
