import { useEffect, useRef, useState } from "react";
import { FaMusic, FaVolumeMute } from "react-icons/fa";

type AmbientEngine = {
  ctx: AudioContext;
  master: GainNode;
};

function createAmbient(): AmbientEngine {
  const ctx = new AudioContext();

  const master = ctx.createGain();
  master.gain.value = 0.0001;
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1600;
  filter.Q.value = 0.5;

  const breathe = ctx.createGain();
  breathe.gain.value = 1;

  filter.connect(breathe);
  breathe.connect(master);

  const notes = [
    { freq: 110.0, gain: 0.16, detune: 0 },
    { freq: 164.81, gain: 0.11, detune: 3 },
    { freq: 220.0, gain: 0.13, detune: -3 },
    { freq: 261.63, gain: 0.1, detune: 2 },
    { freq: 329.63, gain: 0.1, detune: -2 },
    { freq: 493.88, gain: 0.04, detune: 0 },
  ];

  notes.forEach((n) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = n.freq;
    osc.detune.value = n.detune;

    const g = ctx.createGain();
    g.gain.value = n.gain;

    osc.connect(g);
    g.connect(filter);
    osc.start();
  });

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.12;

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.28;

  lfo.connect(lfoGain);
  lfoGain.connect(breathe.gain);
  lfo.start();

  return { ctx, master };
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
        const now = engine.ctx.currentTime;
        engine.master.gain.cancelScheduledValues(now);
        engine.master.gain.setValueAtTime(engine.master.gain.value, now);
        engine.master.gain.linearRampToValueAtTime(0.0001, now + 1);
        window.setTimeout(() => {
          engine.ctx.close().catch(() => {});
        }, 1100);
      }
      engineRef.current = null;
      setPlaying(false);
    } else {
      const engine = createAmbient();
      engineRef.current = engine;

      await engine.ctx.resume();

      const now = engine.ctx.currentTime;
      engine.master.gain.cancelScheduledValues(now);
      engine.master.gain.setValueAtTime(0.0001, now);
      engine.master.gain.linearRampToValueAtTime(0.5, now + 2);

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
