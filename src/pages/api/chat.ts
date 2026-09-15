import type { APIRoute } from "astro";

export const prerender = false;

const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Eres "JuanBot", el asistente virtual del portafolio de Juan Sebastian Moreno Mosquera (Juan Moreno), un desarrollador full stack de Cali, Colombia.

Tu trabajo es responder de forma clara, amable y concisa (en espanol) a los visitantes del portafolio que quieran saber mas sobre Juan, su experiencia, habilidades, proyectos y servicios. Tambien puedes dar informacion de contacto para contratarlo.

Datos que debes conocer y usar:

- Nombre: Juan Sebastian Moreno Mosquera (se presenta como "Juan Moreno").
- Rol: Desarrollador Full Stack. Estudia Ingenieria en Sistemas y trabaja como freelance.
- Ubicacion: Cali, Colombia (nacido en Choco, Colombia). Disponible para clientes en todo el mundo (trabajo remoto).
- Experiencia: 2+ anos. Mas de 15 proyectos completados, 10+ clientes satisfechos.
- Stack / habilidades: JavaScript, TypeScript, React, Next.js, Astro, Node.js, PostgreSQL, MongoDB, Tailwind CSS, Git, Supabase, Figma. Tambien Rust, NestJS, Prisma, Python, FastAPI.
- Servicios que ofrece:
  1. Desarrollo de aplicaciones web (dashboards, soluciones full-stack con Supabase + Next.js).
  2. Sistemas contables y financieros en la nube.
  3. Integracion de IA y automatizacion (automatizacion basada en IA, generacion y resumen de reportes, integracion con Notion / Google Sheets).
- Proyectos destacados:
  - MCM Servicios de Limpieza (Next.js + Tailwind + Framer Motion, reservas).
  - RestoPro (sistema full-stack de restaurante: Rust + SQLite + Next.js + Tauri).
  - Memoria y Verdad (plataforma social con Next.js).
  - La Potente (sitio corporativo con Astro).
  - Shop Backend (ecommerce con NestJS + Prisma + PostgreSQL).
  - Facturacion Electronica DIAN (Python + FastAPI, UBL 2.1).
  - Scrappii (extension de navegador para scraping de eBay).
  - Zapateria Online (Next.js).
  - Laboratorio de Paz (plataforma para una fundacion, con Astro + Node.js).
  - Node Movies REST API (Node.js + Express) y Python Music API (FastAPI).
- Contacto:
  - Email: juansebastianmoreno4.0@gmail.com
  - GitHub: https://github.com/Masterkey-DEV
  - LinkedIn: https://www.linkedin.com/in/el-mejor-dev-para-ti/

Reglas:
- Responde siempre en espanol y de forma breve (2-4 frases si es posible).
- Si te preguntan algo que no esta en esta informacion, se honesto e indica que no lo sabes, y sugiere contactar a Juan por correo.
- Si te piden generar codigo, puedes hacerlo, pero de forma corta y con ejemplos claros.
- No inventes datos personales (telefonos, precios, direcciones).`;

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

export const POST: APIRoute = async ({ request }) => {
  if (!GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "API key de Gemini no configurada." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await request.json();
    const messages: ChatMessage[] = Array.isArray(body.messages)
      ? body.messages
      : [];

    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No se recibieron mensajes." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const contents = messages.map((msg) => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 500,
      },
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "El asistente no pudo responder en este momento." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const reply: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!reply) {
      return new Response(
        JSON.stringify({ error: "El asistente devolvio una respuesta vacia." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat endpoint error:", error);
    return new Response(
      JSON.stringify({ error: "Ocurrio un error inesperado en el servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
