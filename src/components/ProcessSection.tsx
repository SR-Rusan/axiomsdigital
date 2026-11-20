import React from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Workflow, CheckCircle, FileCheck, Shield, ArrowRight } from 'lucide-react';

const phases = [
  {
    phase: 'Phase 01',
    days: [1, 3],
    icon: Search,
    title: 'Workflow Audit & Bottleneck Mapping',
    description:
      'We look at your team’s daily manual tasks, your current software and the friction points that come up most, to find the automations that will save the most time.',
    deliverables: ['Visual workflow map', 'Tool compatibility check', 'Prioritised build plan'],
    tag: 'Discovery',
  },
  {
    phase: 'Phase 02',
    days: [4, 7],
    icon: Code2,
    title: 'Sandbox Build & Prompt Engineering',
    description:
      'I build the workflows in a separate test environment using your real sample data, and test the AI steps until their output is consistent and correctly structured.',
    deliverables: ['Working prototype', 'Output validation rules', 'Edge cases and fallbacks'],
    tag: 'Engineering',
  },
  {
    phase: 'Phase 03',
    days: [8, 11],
    icon: Workflow,
    title: 'Live Connection & Side-by-Side Testing',
    description:
      'I connect your real accounts, set up error alerts in Slack, and run the automation alongside your current process so we can check every result before switching over.',
    deliverables: ['Live production sync', 'Automatic error alerts', 'Side-by-side data checks'],
    tag: 'Launch',
  },
  {
    phase: 'Phase 04',
    days: [12, 14],
    icon: CheckCircle,
    title: 'Walkthroughs, Ownership & Handover',
    description:
      'Everything moves into your own accounts. Your team gets short video guides and clear documentation, and I monitor the system for the first 30 days.',
    deliverables: ['Everything in your accounts', 'Video walkthroughs for staff', '30 days of monitoring'],
    tag: 'Handover',
  },
];

/** One shade of the accent per phase, getting stronger towards handover. */
const PHASE_SHADES = ['bg-accent/30', 'bg-accent/50', 'bg-accent/75', 'bg-accent'];

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative w-full py-14 md:py-16 px-6 md:px-12 lg:px-20 bg-secondary/30 border-t border-border/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B6CB8] mb-4">How It Works</p>

          <h2
            id="process-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.05]"
          >
            From Bottleneck to System{' '}
            <span className="italic">in 14 Days.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            No endless discovery calls or layers of management. A clear, four-step build focused on working automations and real time saved.
          </p>
        </div>

        {/* 14-day timeline */}
        <div className="mb-10 rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-xs" aria-label="14-day timeline">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <span className="font-medium text-foreground">Day 1</span>
            <span>Typical single-workflow project</span>
            <span className="font-medium text-foreground">Day 14</span>
          </div>
          <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => {
              const phaseIdx = phases.findIndex((p) => i + 1 >= p.days[0] && i + 1 <= p.days[1]);
              return (
                <motion.span
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`h-2.5 rounded-sm origin-left ${PHASE_SHADES[phaseIdx]}`}
                />
              );
            })}
          </div>
          <ol className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-xs">
            {phases.map((p, idx) => (
              <li key={p.phase} className="flex flex-col">
                <span className="flex items-center gap-1.5 font-semibold text-foreground">
                  <span className={`h-2 w-2 rounded-sm ${PHASE_SHADES[idx]}`} aria-hidden="true" />
                  {p.tag}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  Days {p.days[0]}–{p.days[1]}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {phases.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.phase}
                className="relative rounded-2xl bg-white border border-border p-6 sm:p-8 shadow-xs hover:shadow-dashboard transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center border border-border/80 group-hover:border-accent/40 transition-colors">
                        <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-foreground tracking-tight block">{item.phase}</span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          Days {item.days[0]}–{item.days[1]}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/60">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl text-foreground tracking-tight leading-tight">{item.title}</h3>

                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-border/60">
                  <span className="text-xs font-semibold text-foreground/80 uppercase tracking-wider block mb-2.5">
                    You receive
                  </span>
                  <ul className="space-y-1.5">
                    {item.deliverables.map((del) => (
                      <li key={del} className="flex items-center gap-2 text-sm text-foreground/80">
                        <FileCheck className="h-3.5 w-3.5 text-accent shrink-0" aria-hidden="true" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-xl bg-white border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <Shield className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-foreground">Built Until It Works</h3>
              <p className="text-sm text-muted-foreground mt-0.5 max-w-xl">
                You work with me directly from the first map to the final handover. If a workflow doesn’t perform as agreed during testing, I keep refining it until it does.
              </p>
            </div>
          </div>

          <a
            href="#book"
            className="rounded-full px-6 py-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px transition-all shrink-0 flex items-center gap-2 group"
          >
            <span>Book a discovery call</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
