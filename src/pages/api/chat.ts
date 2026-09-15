import type { APIRoute } from "astro";
import { buildPerfilContexto } from "../../data/cv";

export const prerender = false;

const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;
const MODEL = import.meta.env.GEMINI_MODEL ?? "gemini-3.6-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Eres "JuanBot", el asistente virtual con IA del portafolio de Juan Moreno, un desarrollador full stack colombiano con enfoque en IA y automatizacion.

Tu trabajo es responder de forma clara, amable y concisa (en espanol) a los reclutadores, clientes y visitantes que quieran saber mas sobre Juan: su perfil, experiencia, educacion, habilidades, proyectos, servicios y datos de contacto.

Usa SIEMPRE la siguiente informacion como fuente de verdad sobre Juan. No inventes nada que no este aqui:

${buildPerfilContexto()}

Reglas:
- Responde siempre en espanol, de forma breve y profesional (2-4 frases si es posible).
- Si te piden un resumen del perfil, un elevator pitch o por que contratarlo, destacalo con base en esta informacion.
- Si te preguntan algo que no esta en esta informacion, se honesto: di que no lo sabes y sugiere contactar a Juan por correo o WhatsApp.
- Puedes compartir la edad, el telefono/WhatsApp y el correo cuando te los pidan.
- Si te piden generar codigo, puedes hacerlo, pero de forma corta y con ejemplos claros.
- No inventes datos personales (precios, direcciones, empresas o titulos que no aparezcan arriba).`;

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
