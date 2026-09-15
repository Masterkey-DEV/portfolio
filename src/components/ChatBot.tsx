import { useState, useRef, useEffect } from "react";
import { FaRobot, FaRegPaperPlane } from "react-icons/fa";
import { IoClose, IoChatbubbleEllipses } from "react-icons/io5";

type Message = {
  role: "user" | "model";
  content: string;
};

const WELCOME: Message = {
  role: "model",
  content:
    "Hola! Soy JuanBot, el asistente de IA de este portafolio. Preguntame sobre la experiencia, habilidades, proyectos o servicios de Juan Moreno. En que puedo ayudarte?",
};

const QUICK_PROMPTS = [
  "Que experiencia tiene Juan?",
  "Que tecnologias maneja?",
  "Cuales son sus proyectos mas destacados?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content },
    ];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const history = nextMessages
        .filter((m) => m !== WELCOME)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Error al contactar el asistente.");
      }

      setMessages((prev) => [...prev, { role: "model", content: data.reply }]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No pude conectar con el asistente. Intentalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Panel del chat */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] max-w-sm flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground">
          <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <FaRobot className="w-5 h-5" />
          </div>
          <div className="flex-1 leading-tight">
            <p className="font-semibold text-sm">JuanBot</p>
            <p className="text-xs opacity-80">Asistente con IA (Gemini)</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar chat"
            className="p-1.5 rounded-lg hover:bg-primary-foreground/20 transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Mensajes */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-secondary text-secondary-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-bl-sm text-sm bg-red-500/10 text-red-500">
                {error}
              </div>
            </div>
          )}
        </div>

        {/* Sugerencias rapidas */}
        {messages.length === 1 && !loading && (
          <div className="px-4 pb-2 flex flex-wrap gap-2 bg-background">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3 border-t border-border bg-card"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Enviar mensaje"
            className="p-2.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors"
          >
            <FaRegPaperPlane className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Boton flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir asistente de IA"
        className={`fixed bottom-5 right-4 sm:right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-full shadow-xl font-medium transition-all duration-300 ${
          open
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {open ? (
          <IoClose className="w-5 h-5" />
        ) : (
          <IoChatbubbleEllipses className="w-5 h-5" />
        )}
        <span className="text-sm">{open ? "Cerrar" : "Hablar con IA"}</span>
      </button>
    </>
  );
}
