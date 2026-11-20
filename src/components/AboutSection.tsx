import React from 'react';
import { Check, X, ShieldCheck, Terminal } from 'lucide-react';

const comparison = [
  {
    topic: 'Communication',
    agency: 'Account managers and slow email chains',
    axioms: 'You talk to the person building it',
  },
  {
    topic: 'Delivery time',
    agency: '6–12 weeks of scoping meetings',
    axioms: 'First workflow live in 7–14 days',
  },
  {
    topic: 'Ownership',
    agency: 'Locked into their platform or retainer',
    axioms: 'Everything lives in your own accounts',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full py-14 md:py-16 px-6 md:px-12 lg:px-20 bg-background border-t border-border/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B6CB8] mb-4">Behind the Studio</p>

          <h2
            id="about-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.05]"
          >
            Built by an Engineer,{' '}
            <span className="italic">Not a Middleman.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Why growing businesses choose a hands-on builder over big agencies and fragile freelance set-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Founder note */}
          <div className="lg:col-span-7 space-y-5 text-foreground/90 leading-relaxed">
            <figure className="p-6 sm:p-7 rounded-2xl bg-secondary/40 border border-border/80 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/axioms-mark.png"
                  alt=""
                  width={302}
                  height={280}
                  className="h-10 w-10 object-contain rounded-lg bg-white p-1 border border-border shadow-2xs"
                />
                <div>
                  <div className="font-semibold text-foreground text-sm">Axioms Digital</div>
                  <span className="text-xs text-muted-foreground">AI automation and systems studio</span>
                </div>
              </div>

              <blockquote className="space-y-4 text-[15px] text-foreground/80 leading-relaxed">
                <p>
                  “I started Axioms Digital after seeing small businesses stuck between two bad options: consulting firms that charge a fortune and hand the work to juniors, or quick scripts that quietly break the moment an app changes.”
                </p>
                <p>
                  “I build practical AI automations that connect the tools you already use, take repetitive work off your team, and keep running in the background. There are no account managers in between, just direct engineering and clean systems you can maintain.”
                </p>
              </blockquote>
              <figcaption className="text-xs text-muted-foreground">Founder, Axioms Digital</figcaption>
            </figure>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border bg-white shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <Terminal className="h-4 w-4 text-accent" aria-hidden="true" />
                  <h3 className="font-semibold text-sm text-foreground">Predictable by Design</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  No fragile chains of prompts. Every AI step returns structured data that is checked before anything moves on.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-white shadow-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                  <h3 className="font-semibold text-sm text-foreground">Private by Default</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  I use business API access, where providers don’t train their models on your data, and your records stay in your own tools.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-border p-6 shadow-dashboard space-y-5">
            <div className="pb-3 border-b border-border">
              <h3 className="font-display text-2xl text-foreground">The Working Difference</h3>
              <p className="text-xs text-muted-foreground">How working with Axioms Digital compares to a typical agency</p>
            </div>

            <dl className="space-y-4 text-xs">
              {comparison.map((row, idx) => (
                <div key={row.topic} className={idx < comparison.length - 1 ? 'pb-4 border-b border-border/60' : ''}>
                  <dt className="font-semibold block mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {row.topic}
                  </dt>
                  <dd className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg bg-secondary/40 text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium text-foreground/70 mb-1">
                        <X className="h-3.5 w-3.5 text-rose-500 shrink-0" aria-hidden="true" />
                        Typical agency
                      </span>
                      {row.agency}
                    </div>
                    <div className="p-2.5 rounded-lg bg-accent/5 border border-accent/20 text-foreground">
                      <span className="flex items-center gap-1 font-semibold text-accent mb-1">
                        <Check className="h-3.5 w-3.5 text-accent shrink-0" aria-hidden="true" />
                        Axioms Digital
                      </span>
                      {row.axioms}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="pt-1 text-xs text-muted-foreground text-center">
              Built for growing businesses that value speed and reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
