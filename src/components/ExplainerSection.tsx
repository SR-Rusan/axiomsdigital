import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

/** Fired by the hero's "Watch" button: scroll here and start the film. */
export const PLAY_EXPLAINER_EVENT = 'axioms:play-explainer';

const chapters = [
  { time: 0, label: 'The busywork that never stops' },
  { time: 19.3, label: 'What Axioms Digital fixes' },
  { time: 28.4, label: 'A new lead, handled in 90 seconds' },
  { time: 35.8, label: 'A month of content from one call' },
  { time: 41, label: 'When something breaks' },
  { time: 50.7, label: 'From manual to automatic in 14 days' },
];

const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export const ExplainerSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);

  const play = (from?: number) => {
    const video = videoRef.current;
    if (!video) return;
    if (from !== undefined) video.currentTime = from;
    setStarted(true);
    video.play().catch(() => {
      // Some browsers block playback with sound; fall back to muted so it still starts.
      video.muted = true;
      video.play().catch(() => {});
    });
  };

  useEffect(() => {
    const onPlayRequest = () => {
      document.getElementById('explainer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      play(0);
    };
    window.addEventListener(PLAY_EXPLAINER_EVENT, onPlayRequest);
    return () => window.removeEventListener(PLAY_EXPLAINER_EVENT, onPlayRequest);
  }, []);

  const activeChapter = chapters.reduce((acc, c, i) => (current >= c.time ? i : acc), 0);

  return (
    <section
      id="explainer"
      aria-labelledby="explainer-heading"
      className="relative w-full py-14 md:py-16 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-background via-accent/[0.04] to-background border-t border-border/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B6CB8] mb-4">One-minute explainer</p>
          <h2
            id="explainer-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.05]"
          >
            See How It Works,{' '}
            <span className="italic">in 66 Seconds.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            The problem, the fix, and what a working automation looks like, from the first inquiry to a system that runs itself.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Player */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-secondary shadow-dashboard">
              <video
                ref={videoRef}
                src="/axioms-explainer.mp4"
                poster="/axioms-explainer-poster.webp"
                preload="none"
                playsInline
                controls={started}
                onPlay={() => setStarted(true)}
                onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                className="absolute inset-0 h-full w-full object-cover"
                aria-label="Axioms Digital explainer video"
              >
                <track kind="captions" src="/axioms-explainer.vtt" srcLang="en" label="English" />
              </video>

              {!started && (
                <button
                  type="button"
                  onClick={() => play(0)}
                  className="group absolute inset-0 flex items-center justify-center bg-foreground/[0.04] hover:bg-foreground/[0.08] transition-colors cursor-pointer"
                  aria-label="Play the explainer video"
                >
                  <span className="flex items-center gap-2 sm:gap-3 rounded-full bg-primary pl-1.5 sm:pl-2 pr-4 sm:pr-5 py-1.5 sm:py-2 text-primary-foreground shadow-[0_10px_30px_-8px_rgba(30,32,60,0.45)] transition-transform group-hover:scale-[1.03] group-active:scale-[0.98]">
                    <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/15">
                      <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
                    </span>
                    <span className="hidden sm:inline text-sm font-medium">Watch the film</span>
                    <span className="text-xs text-primary-foreground/60 tabular-nums">1:06</span>
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Chapters */}
          <div className="lg:col-span-4 rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Jump to a chapter
            </h3>
            <ol className="mt-3 divide-y divide-border/70">
              {chapters.map((c, i) => {
                const isActive = started && i === activeChapter;
                return (
                  <li key={c.label}>
                    <button
                      type="button"
                      onClick={() => play(c.time)}
                      className={`group w-full flex items-center gap-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span
                        className={`w-9 shrink-0 font-mono text-xs tabular-nums ${
                          isActive ? 'text-accent font-semibold' : 'text-muted-foreground'
                        }`}
                      >
                        {formatTime(c.time)}
                      </span>
                      <span className={isActive ? 'font-medium' : ''}>{c.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <a
              href="#book"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book a free 20-minute call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
