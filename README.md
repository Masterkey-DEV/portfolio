# 🌐 Portafolio Profesional — <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="30"> Juan Sebastián Moreno Mosquera

## 🧭 Descripción General

 
 este proyecto es mi **portafolio personal profesional** desarrollado con [Astro](https://astro.build/), utilizando **TailwindCSS** para un diseño rapido, responsivo y limpio.  
El sitio está optimizado para mostrar información personal, servicios, proyectos y formas de contacto de manera moderna, rápida y con soporte para **modo oscuro** y **transiciones entre páginas**.

---

## ⚙️ Tecnologías Principales

- **Astro** → Framework principal para renderizado estático híbrido.
- **TailwindCSS** → Framework de estilos utilitarios.
- **React Icons** → Iconografía adaptable y escalable.
- **Modo oscuro persistente** con `localStorage`.


---

## 📸 Características del Portafolio

### ✔ Diseño modular
Cada sección está construida como un componente independiente, permitiendo mantener y escalar el proyecto fácilmente en el futuro.

### ✔ Optimización con Astro
escogi Astro para realizar este proeycto porque me permite entregar HTML estático por defecto, garantizando **alta velocidad**, **SEO sólido** y **carga eficiente** de recursos.

### ✔ Animaciones y UI moderna
Uso de estilos globales y un diseño limpio para mejorar la experiencia del usuario en general los componentes no hacen uso de librerias.

### ✔ Modo oscuro/claro
Implementado a nivel global.

---

## 📄 Componentes Principales

### **Header**
Encabezado del sitio con navegación y elementos introductorios.

### **Main**
Sección central del portafolio: presentación, descripción profesional e introducción del perfil.

### **perfilProfesional**
Descripción más profunda del perfil profesional, habilidades y enfoque de trabajo.

### **ProjectOverlay / ProjectTags**
Elementos dedicados a mostrar proyectos, etiquetas de tecnologías y efectos interactivos.

### **Social**
Enlaces a redes sociales.

### **Footer**
Información final, contacto y créditos.

---

# 📄 documentacion componentes reutilizables

## 📄 Componente de Enlace Botón (AncordButton)

## 🧩 Props del Componente

### **`href`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** URL o ruta a la cual redirige el enlace.


### **`content`**
- **Tipo:** `string | AstroComponent | HTML`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Contenido interno del botón (texto, ícono o componente).


### **`extraClass`**
- **Tipo:** `string`
- **Obligatorio:** ✘ No  
- **Descripción:** Clases adicionales de TailwindCSS para personalizar estilos.
  
---

## 📄 Componente de Sección de Información (LemaSection)

## 🧩 Props del Componente

### **`title`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Título principal que se muestra en la parte superior de la sección. Puede incluir textos largos o cortos.

### **`content`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Párrafo descriptivo que acompaña el título. Usado para explicar información relevante, detalles personales, descripción profesional o cualquier contenido informativo.

---

## 📄 Componente de Tags (ProjectTags)

## 🧩 Props del Componente

### **`tags`**
- **Tipo:** `string[]`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Lista de etiquetas que se renderizan como pequeños badges estilizados. Cada elemento del array se muestra dentro de un `<span>`.

----
## 📄 Componente de Overlay de Proyecto

## 🧩 Props del Componente

### **`detailsUrl`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Enlace hacia la página con información detallada del proyecto.

### **`liveUrl`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** URL hacia la versión en vivo del proyecto. Se abre en una nueva pestaña.

----



## 📄 Componente de Imagen Personal (ProfileImg)

## 🧩 Props del Componente

### **`img`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Ruta o URL de la imagen que se mostrará dentro del contenedor redondeado y con animación *bounce*.

----
## 📄 Componente de Tarjeta de Servicio (ServiceCard)

## 🧩 Props del Componente

### **`title`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Título principal de la tarjeta.

### **`description`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Texto descriptivo del servicio o elemento destacado.

### **`features`**
- **Tipo:** `string[]`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Lista de características o beneficios que se mostrarán como puntos dentro del componente.

### **`icon`**
- **Tipo:** `AstroComponent`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Componente de ícono que se renderiza en la parte superior (acepta íconos importados como componentes).

### **`link`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Enlace al cual dirige el botón inferior del componente.

----
## 📄 Componente de presentacion about (UserCard)

## 🧩 Props del Componente

### **`name`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Nombre que se mostrará como encabezado principal.

### **`description`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Texto descriptivo o rol que acompaña al nombre en el encabezado.

----
## 📄 Componente de Enlace Social (Social)

## 🧩 Props del Componente

### **`href`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Enlace al perfil o red social correspondiente.

### **`social`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Nombre de la red social o etiqueta visible dentro del botón.

### **`Logo`**
- **Tipo:** `AstroComponent`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Icono o componente visual que representa la red social.

----
## 📄 Componente de Tarjeta de Proyecto (ProyectsCard)

## 🧩 Props del Componente

### **`title`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Título principal del proyecto mostrado en la tarjeta.

### **`description`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Breve descripción o contexto del proyecto.

### **`href`**
- **Tipo:** `string`
- **Obligatorio:** ✔ Sí  
- **Descripción:** Enlace al detalle, repositorio o demo del proyecto.

### **`img`**
- **Tipo:** `string`  
- **Obligatorio:** ✘ No  
- **Descripción:** Ruta o URL de una imagen asociada al proyecto (aunque no se usa en el markup actual).


---

## 📬 Contacto

Si deseas ponerte en contacto conmigo, puedes hacerlo mediante mis redes sociales o correo.

---

## 📄 Licencia

Este proyecto es de uso personal. Si deseas usar partes del diseño o estructura, siéntete libre de hacerlo con la debida atribución.

