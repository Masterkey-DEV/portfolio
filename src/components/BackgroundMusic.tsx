import { useEffect, useRef, useState } from "react";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

type AmbientEngine = {
  ctx: AudioContext;
  master: GainNode;
  oscillators: OscillatorNode[];
  lfo: OscillatorNode;
};

function createAmbient(): AmbientEngine {
  const ctx = new AudioContext();

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.4;
  filter.connect(master);

  const freqs = [110, 164.81, 220, 261.63, 329.63];
  const gains = [0.07, 0.05, 0.06, 0.05, 0.04];

  const oscillators = freqs.map((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = (i - 2) * 4;

    const g = ctx.createGain();
    g.gain.value = gains[i];

    osc.connect(g);
    g.connect(filter);
    osc.start();

    return osc;
  });

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.09;

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.02;
  lfo.connect(lfoGain);
  lfoGain.connect(master.gain);
  lfo.start();

  return { ctx, master, oscillators, lfo };
}

export default function BackgroundMusic() {
  const [playing, setPlaying] = useState(false);
  const engineRef = useRef<AmbientEngine | null>(null);

  useEffect(() => {
    return () => {
      engineRef.current?.ctx.close();
    };
  }, []);

  const toggle = async () => {
    if (playing) {
      const engine = engineRef.current;
      if (engine) {
        engine.master.gain.cancelScheduledValues(engine.ctx.currentTime);
        engine.master.gain.setValueAtTime(engine.master.gain.value, engine.ctx.currentTime);
        engine.master.gain.linearRampToValueAtTime(0.0001, engine.ctx.currentTime + 1.5);

        window.setTimeout(() => {
          engine.oscillators.forEach((osc) => {
            try {
              osc.stop();
            } catch {
              /* ya detenido */
            }
          });
          try {
            engine.lfo.stop();
          } catch {
            /* ya detenido */
          }
          engine.ctx.close();
        }, 1600);
      }
      engineRef.current = null;
      setPlaying(false);
    } else {
      const engine = createAmbient();
      engineRef.current = engine;

      await engine.ctx.resume();
      engine.master.gain.cancelScheduledValues(engine.ctx.currentTime);
      engine.master.gain.setValueAtTime(0.0001, engine.ctx.currentTime);
      engine.master.gain.linearRampToValueAtTime(0.16, engine.ctx.currentTime + 2);

      setPlaying(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Desactivar musica de fondo" : "Activar musica de fondo"}
      title={playing ? "Desactivar musica de fondo" : "Activar musica de fondo"}
      className={`fixed bottom-5 left-4 sm:left-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-full shadow-xl font-medium transition-all duration-300 ${
        playing
          ? "bg-primary text-primary-foreground"
          : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
      }`}
    >
      {playing ? (
        <FaMusic className="w-5 h-5 animate-pulse" />
      ) : (
        <FaVolumeMute className="w-5 h-5" />
      )}
      <span className="text-sm">{playing ? "Musica activa" : "Musica ambiente"}</span>
    </button>
  );
}
