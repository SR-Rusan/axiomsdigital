import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { AutomationDashboard } from './AutomationDashboard';
import { PLAY_EXPLAINER_EVENT } from './ExplainerSection';

const BACKGROUND_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4';

/** Skip the decorative 18 MB background film for reduced-motion users and data-saver connections. */
const shouldPlayBackground = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
};

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBackground] = useState(shouldPlayBackground);

  // Play the muted background loop only while the hero is on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [showBackground]);

  return (
    <section className="relative flex-1 w-full flex flex-col items-center justify-start overflow-hidden pt-8 sm:pt-12 pb-10 sm:pb-14">
      {/* Decorative background film */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" aria-hidden="true">
        {showBackground && (
          <video
            ref={videoRef}
            src={BACKGROUND_VIDEO}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          />
        )}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[1.5px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[350px] bg-gradient-to-b from-white/90 via-accent/5 to-transparent blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-4 md:px-6 mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B6CB8]"
        >
          AI automation studio for growing businesses
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-center font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.0] sm:leading-[0.95] tracking-tight text-foreground max-w-3xl"
        >
          Automate the Work.{' '}
          <span className="italic">Amplify the Business.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-5 text-center text-base md:text-lg text-muted-foreground max-w-[620px] leading-relaxed px-2"
        >
          I build practical AI automations that take repetitive work off your team, connect the tools you already use, and keep running quietly in the background.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#book"
            className="rounded-full px-6 py-3.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px transition-all shadow-[0_4px_16px_-4px_rgba(30,32,60,0.25)] inline-flex items-center gap-2 group"
          >
            <span>Book a free call</span>
            <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(PLAY_EXPLAINER_EVENT))}
            className="rounded-full pl-1.5 pr-5 py-1.5 text-sm font-medium bg-white/90 text-foreground border border-border hover:border-foreground/20 active:translate-y-px transition-all shadow-xs inline-flex items-center gap-2.5 group cursor-pointer"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary group-hover:bg-accent/10 transition-colors">
              <Play className="h-3.5 w-3.5 fill-foreground text-foreground ml-0.5" aria-hidden="true" />
            </span>
            <span>
              Watch the explainer <span className="text-muted-foreground tabular-nums">· 1 min</span>
            </span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-xs text-muted-foreground"
        >
          Live in 7–14 days · Built in your own accounts · No lock-in
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 sm:mt-10 w-full max-w-5xl"
        >
          <AutomationDashboard />
        </motion.div>
      </div>
    </section>
  );
};
