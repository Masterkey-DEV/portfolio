export type Proyecto = {
  nombre: string;
  categoria: string;
  descripcion: string;
  tecnologias: string[];
  url?: string;
  github?: string;
};

export type Perfil = {
  nombre: string;
  nombreCorto: string;
  titulo: string;
  enfoque: string;
  fechaNacimiento: string;
  edad: number;
  ubicacion: string;
  origen: string;
  nacionalidad: string;
  telefono: string;
  email: string;
  linkedin: string;
  github: string;
  anosExperiencia: string;
  disponibilidad: string;
  educacion: { titulo: string; institucion: string; estado: string }[];
  idiomas: { idioma: string; nivel: string }[];
  habilidades: Record<string, string[]>;
  servicios: { titulo: string; descripcion: string }[];
  experiencia: { cargo: string; lugar: string; periodo: string; descripcion: string }[];
  certificaciones: string[];
  proyectos: Proyecto[];
};

export const perfil: Perfil = {
  nombre: "Juan Sebastián Moreno Mosquera",
  nombreCorto: "Juan Moreno",
  titulo: "Desarrollador Full Stack",
  enfoque: "Ingeniero de IA / Automatización",
  fechaNacimiento: "27 de junio de 2005",
  edad: 21,
  ubicacion: "Cali, Colombia",
  origen: "Chocó, Colombia",
  nacionalidad: "Colombiana",
  telefono: "+57 314 595 8763",
  email: "juansebastianmoreno4.0@gmail.com",
  linkedin: "https://www.linkedin.com/in/el-mejor-dev-para-ti/",
  github: "https://github.com/Masterkey-DEV",
  anosExperiencia: "2 años",
  disponibilidad: "Abierto a escuchar propuestas (remoto, freelance o tiempo completo).",
  educacion: [
    {
      titulo: "Ingeniería en Sistemas",
      institucion: "TODO: nombre de la universidad",
      estado: "En curso",
    },
  ],
  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "Intermedio" },
  ],
  habilidades: {
    Lenguajes: ["JavaScript", "TypeScript", "Python", "Rust"],
    Frontend: ["React", "Next.js", "Astro", "Tailwind CSS", "Framer Motion"],
    Backend: ["Node.js", "NestJS", "Express", "FastAPI"],
    "Bases de datos": ["PostgreSQL", "MongoDB", "SQLite", "Prisma", "Supabase"],
    "IA y automatización": [
      "Integración de modelos de IA (Google Gemini)",
      "Automatización de flujos de trabajo",
      "Generación y resumen de reportes",
    ],
    Herramientas: ["Git", "Figma", "Tauri", "Chrome Extensions"],
  },
  servicios: [
    {
      titulo: "Desarrollo de aplicaciones web",
      descripcion:
        "Software a medida: dashboards, analíticas empresariales y aplicaciones full-stack (Next.js + Supabase).",
    },
    {
      titulo: "Sistemas contables y financieros",
      descripcion:
        "Sistemas contables en la nube con reportes dinámicos, plan de cuentas y lógica de asientos personalizada.",
    },
    {
      titulo: "Integración de IA y automatización",
      descripcion:
        "Integración de modelos de IA y flujos automatizados, generación/resumen de reportes e integración con Notion / Google Sheets.",
    },
  ],
  experiencia: [
    {
      cargo: "Desarrollador Full Stack (Freelance)",
      lugar: "Independiente - Cali, Colombia",
      periodo: "TODO: fechas",
      descripcion:
        "Desarrollo y mantenimiento de sitios web y aplicaciones para emprendedores y organizaciones. TODO: logros y clientes destacados.",
    },
    {
      cargo: "Asesor comercial / Ventas",
      lugar: "TODO: empresa",
      periodo: "más de 3 meses",
      descripcion:
        "Experiencia en ventas que aporta una visión práctica y orientada a resultados al desarrollo web.",
    },
  ],
  certificaciones: [
    // TODO: agrega aquí tus cursos y certificaciones (ej: "Curso de React - Platzi (2024)")
  ],
  proyectos: [
    {
      nombre: "MCM Servicios de Limpieza",
      categoria: "Aplicación Web",
      descripcion:
        "Plataforma web de reservas para una empresa de limpieza, con calendario para agendar servicios.",
      tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      url: "https://clean-service-app-iota.vercel.app/",
      github: "https://github.com/Masterkey-DEV/clean-service-app",
    },
    {
      nombre: "RestoPro - Sistema de Restaurante",
      categoria: "Aplicación Web",
      descripcion:
        "Sistema full-stack de gestión de restaurantes 100% offline-capaz (local-first) con autenticación JWT.",
      tecnologias: ["Next.js", "Rust", "SQLite", "TypeScript", "Tauri"],
      github: "https://github.com/Masterkey-DEV/restaurante",
    },
    {
      nombre: "Memoria y Verdad",
      categoria: "Aplicación Web",
      descripcion:
        "Plataforma social para visibilizar y preservar la memoria de una comunidad, con perfiles y publicaciones.",
      tecnologias: ["Next.js", "TypeScript", "Tailwind CSS"],
      url: "https://memoria-y-verdad.vercel.app/",
      github: "https://github.com/Masterkey-DEV/vitrina-social",
    },
    {
      nombre: "La Potente",
      categoria: "Sitio Web",
      descripcion: "Sitio web corporativo para un negocio local, con animaciones y despliegue en producción.",
      tecnologias: ["Astro", "TypeScript", "Tailwind CSS"],
      url: "https://lapotente.vercel.app/",
      github: "https://github.com/Masterkey-DEV/scrasi",
    },
    {
      nombre: "Shop Backend - Ecommerce",
      categoria: "Backend",
      descripcion:
        "Backend para ecommerce con autenticación JWT y arquitectura modular.",
      tecnologias: ["NestJS", "Prisma", "PostgreSQL", "TypeScript"],
      github: "https://github.com/Masterkey-DEV/shop-backend",
    },
    {
      nombre: "Facturación Electrónica DIAN",
      categoria: "Backend",
      descripcion:
        "API de facturación electrónica colombiana (DIAN) que genera y valida documentos UBL 2.1.",
      tecnologias: ["Python", "FastAPI", "UBL 2.1", "XML"],
      github: "https://github.com/Masterkey-DEV/facturas",
    },
    {
      nombre: "Scrappii - Extensión de Navegador",
      categoria: "Herramienta",
      descripcion:
        "Extensión (Chrome/Firefox) para scrapear productos de eBay, descargar imágenes en alta resolución y prepararlos para reventa en Colombia con conversión de moneda.",
      tecnologias: ["JavaScript", "Chrome Extensions", "Web Scraping"],
      github: "https://github.com/Masterkey-DEV/scrappii",
    },
    {
      nombre: "Zapatería Online",
      categoria: "Sitio Web",
      descripcion: "Tienda en línea de zapatos con catálogo de productos.",
      tecnologias: ["Next.js", "TypeScript", "Tailwind CSS"],
      url: "https://zapateria-nu.vercel.app/",
      github: "https://github.com/Masterkey-DEV/zapateria",
    },
    {
      nombre: "Laboratorio de Paz",
      categoria: "Sitio Web",
      descripcion:
        "Plataforma para la Fundación Laboratorio de Paz, Convivencia y Seguridad Humana, con usuarios, publicaciones y panel de administración.",
      tecnologias: ["Astro", "TypeScript", "Node.js"],
      github: "https://github.com/Masterkey-DEV/laboratorio-de-paz-frontend",
    },
    {
      nombre: "Página About - RestoPro",
      categoria: "Sitio Web",
      descripcion: "Landing/about page para el sistema RestoPro.",
      tecnologias: ["Astro", "TypeScript"],
      url: "https://pagina-about-restapro.vercel.app/",
      github: "https://github.com/Masterkey-DEV/pagina-about-restapro",
    },
    {
      nombre: "Node Movies REST API",
      categoria: "Backend",
      descripcion: "API REST para gestionar un catálogo de películas con base de datos SQL.",
      tecnologias: ["Node.js", "Express", "SQL"],
      github: "https://github.com/Masterkey-DEV/node-movies-rest-api",
    },
    {
      nombre: "Python Music API",
      categoria: "Backend",
      descripcion: "API para servir música con documentación de la interfaz REST.",
      tecnologias: ["Python", "FastAPI"],
      github: "https://github.com/Masterkey-DEV/python-music-API",
    },
  ],
};

export function buildPerfilContexto(): string {
  const p = perfil;

  const educacion = p.educacion
    .map((e) => `- ${e.titulo} — ${e.institucion} (${e.estado})`)
    .join("\n");

  const idiomas = p.idiomas.map((i) => `- ${i.idioma}: ${i.nivel}`).join("\n");

  const habilidades = Object.entries(p.habilidades)
    .map(([area, items]) => `- ${area}: ${items.join(", ")}`)
    .join("\n");

  const servicios = p.servicios
    .map((s) => `- ${s.titulo}: ${s.descripcion}`)
    .join("\n");

  const experiencia = p.experiencia
    .map((e) => `- ${e.cargo} en ${e.lugar} (${e.periodo}): ${e.descripcion}`)
    .join("\n");

  const certificaciones = p.certificaciones.length
    ? p.certificaciones.map((c) => `- ${c}`).join("\n")
    : "- (Sin certificaciones registradas todavía)";

  const proyectos = p.proyectos
    .map((pr) => {
      const links = [
        pr.url ? `Demo: ${pr.url}` : null,
        pr.github ? `Código: ${pr.github}` : null,
      ]
        .filter(Boolean)
        .join(" | ");
      return `- ${pr.nombre} (${pr.categoria}): ${pr.descripcion} Tecnologías: ${pr.tecnologias.join(", ")}.${links ? " " + links : ""}`;
    })
    .join("\n");

  return `## Datos de ${p.nombreCorto} (${p.nombre})
- Título profesional: ${p.titulo} (enfoque en ${p.enfoque}).
- Fecha de nacimiento: ${p.fechaNacimiento} (${p.edad} años).
- Ubicación: ${p.ubicacion}. Origen: ${p.origen}. Nacionalidad: ${p.nacionalidad}.
- Teléfono / WhatsApp: ${p.telefono}.
- Correo: ${p.email}.
- GitHub: ${p.github}.
- LinkedIn: ${p.linkedin}.
- Experiencia: ${p.anosExperiencia} como desarrollador.
- Disponibilidad: ${p.disponibilidad}

## Educación
${educacion}

## Idiomas
${idiomas}

## Habilidades técnicas
${habilidades}

## Servicios que ofrece
${servicios}

## Experiencia laboral
${experiencia}

## Certificaciones y cursos
${certificaciones}

## Proyectos
${proyectos}`;
}
