import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Share2, Compass, ArrowRight, CheckCircle2, MessageSquareText } from 'lucide-react';

interface AdvisoryTrack {
  id: string;
  tab: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  /** Short, honest summary of format or timing, shown on the visual card. */
  format: string;
  flow: { title: string; desc: string }[];
  quote: string;
  icon: React.ElementType;
}

const advisoryTracks: AdvisoryTrack[] = [
  {
    id: 'strategic-roadmap',
    tab: 'AI strategy',
    badge: 'Founder Advisory',
    title: '1-on-1 AI Strategy & Stack Planning',
    subtitle: 'Cut through tool fatigue and leave with a clear, prioritised AI plan for your business.',
    description:
      'Stop paying for overlapping subscriptions and half-used AI tools. In focused sessions we walk through how your team actually works, find where AI saves real time, and turn it into a plan your team can follow without creating a mess to clean up later.',
    deliverables: [
      'Tool stack and overlap review',
      'Prioritised 90-day roadmap',
      'Model and vendor choice (OpenAI, Claude or local)',
      'Data and security guidelines',
    ],
    format: 'Direct with the founder',
    flow: [
      { title: 'Map how work happens today', desc: 'Your tools, hand-offs and the tasks that eat the week' },
      { title: 'Find the real leverage', desc: 'Rank ideas by hours saved against effort to build' },
      { title: 'Choose the stack', desc: 'Keep what works, cut overlap, pick models that fit your data' },
      { title: 'Leave with a 90-day plan', desc: 'Clear steps your team can run, with or without me' },
    ],
    quote: 'The best AI plan is usually smaller than you expect, and starts with the task your team hates most.',
    icon: Compass,
  },
  {
    id: 'interactive-touchpoints',
    tab: 'Website assistant',
    badge: 'Conversion & Engagement',
    title: 'Website Assistants & Lead Magnets',
    subtitle: 'Turn passive visitors into well-informed inquiries, at any hour.',
    description:
      'A plain contact form answers nothing. I build lightweight website assistants, pricing or ROI calculators and short diagnostic tools that answer visitor questions from your real offers and pre-qualify people before they book a call.',
    deliverables: [
      'Website assistant trained on your offers',
      'Interactive ROI or audit calculator',
      'Automatic CRM tagging for every lead',
      'Clear hand-off rules to a human',
    ],
    format: 'Live in 7–14 days',
    flow: [
      { title: 'Collect what you already know', desc: 'Offers, pricing, FAQs and the questions buyers ask' },
      { title: 'Build the assistant or tool', desc: 'Answers only from your content, in your tone' },
      { title: 'Qualify and tag', desc: 'Each conversation lands in your CRM with context' },
      { title: 'Hand off to you', desc: 'Warm, informed leads book a call when they’re ready' },
    ],
    quote: 'Visitors who get a straight answer at 11 pm are the ones who book a call in the morning.',
    icon: Globe,
  },
  {
    id: 'omnichannel-growth',
    tab: 'Content system',
    badge: 'Content & Thought Leadership',
    title: 'A Content System in Your Own Voice',
    subtitle: 'Turn 30 minutes of founder insight into a month of posts, newsletters and articles.',
    description:
      'Staying visible is hard when writing content is exhausting. I set up a pipeline that takes your raw thoughts, recorded calls or case studies and turns them into LinkedIn posts, newsletters and articles, written in your tone, without the generic AI feel.',
    deliverables: [
      'Voice and tone guide built from your writing',
      'Audio or video to multi-channel pipeline',
      'Approval queue in Notion or Airtable',
      'Formats for LinkedIn, X and newsletters',
    ],
    format: 'Set up in about two weeks',
    flow: [
      { title: 'Capture your expertise', desc: 'A short call, voice note or case study each week' },
      { title: 'Match your voice', desc: 'Strict rules from your own writing, no generic output' },
      { title: 'Draft every format', desc: 'Posts, newsletter and article drafts, ready to edit' },
      { title: 'You approve, it publishes', desc: 'Nothing goes out without your sign-off' },
    ],
    quote: 'Clients don’t buy generic AI output. They buy your expertise, shared consistently.',
    icon: Share2,
  },
];

export const ConsultancySection: React.FC = () => {
  const [activeTrackId, setActiveTrackId] = useState(advisoryTracks[0].id);
  const activeTrack = advisoryTracks.find((t) => t.id === activeTrackId) || advisoryTracks[0];
  const TrackIcon = activeTrack.icon;

  return (
    <section
      id="consultancy"
      aria-labelledby="consultancy-heading"
      className="relative w-full py-14 md:py-16 px-6 md:px-12 lg:px-20 bg-background border-t border-border/80 font-body"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B6CB8] mb-4">AI Consultancy & Digital Growth</p>

          <h2
            id="consultancy-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.05]"
          >
            Strategic AI Advice,{' '}
            <span className="italic">Practical Next Steps.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Beyond day-to-day automations, I work directly with founders and small teams on where AI fits, how to stay visible, and how to turn website visitors into qualified inquiries.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Consultancy tracks"
          className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-secondary/60 border border-border w-fit max-w-full mx-auto mb-10"
        >
          {advisoryTracks.map((track) => {
            const isActive = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                id={`track-${track.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="track-panel"
                onClick={() => setActiveTrackId(track.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-white text-foreground shadow-xs border-border'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-white/50'
                }`}
              >
                {track.tab}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTrack.id}
          id="track-panel"
          role="tabpanel"
          aria-labelledby={`track-${activeTrack.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-white shadow-dashboard overflow-hidden p-6 sm:p-8 lg:p-10 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                  {activeTrack.badge}
                </span>

                <h3 className="mt-4 font-display text-3xl md:text-4xl text-foreground tracking-tight leading-tight">
                  {activeTrack.title}
                </h3>

                <p className="mt-2 text-sm sm:text-base font-medium text-foreground/80">{activeTrack.subtitle}</p>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{activeTrack.description}</p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80 block mb-2.5">
                  What you get
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeTrack.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:translate-y-px transition-all shadow-xs group"
                >
                  <span>Talk this through on a call</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* How this track works */}
            <div className="lg:col-span-5 rounded-xl bg-secondary/40 border border-border p-5 sm:p-6 flex flex-col justify-between space-y-5">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/70 text-xs">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <TrackIcon className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span>How it works</span>
                </div>
                <span className="text-xs text-accent bg-accent/10 px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                  {activeTrack.format}
                </span>
              </div>

              <ol className="space-y-2.5">
                {activeTrack.flow.map((step, idx) => {
                  const isLast = idx === activeTrack.flow.length - 1;
                  return (
                    <motion.li
                      key={step.title}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 * idx }}
                      className={`p-3 rounded-lg border shadow-xs flex items-center gap-3 ${
                        isLast ? 'bg-accent/5 border-accent/30' : 'bg-white border-border/80'
                      }`}
                    >
                      <div
                        className={`h-7 w-7 rounded-md flex items-center justify-center font-semibold text-xs shrink-0 ${
                          isLast ? 'bg-accent text-accent-foreground' : 'bg-secondary text-foreground border border-border'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <span className="font-semibold text-foreground block text-xs">{step.title}</span>
                        <span className="text-xs text-muted-foreground">{step.desc}</span>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>

              <p className="pt-3 border-t border-border/70 text-xs text-muted-foreground leading-relaxed italic">
                “{activeTrack.quote}”
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Share2,
              title: 'Your Voice, Protected',
              body: 'No low-effort robotic content. Every system is built from your past writing, vocabulary and standards, so it sounds like you.',
            },
            {
              icon: MessageSquareText,
              title: 'Honest Advice',
              body: 'If a tool or automation isn’t worth it for your size yet, I’ll say so. The goal is fewer, better systems, not more software.',
            },
            {
              icon: Compass,
              title: 'Advice from a Builder',
              body: 'No theory from consultants who don’t build. You talk to the person who will design, build and measure the system.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="p-6 rounded-xl bg-white border border-border shadow-xs hover:border-accent/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-secondary text-accent flex items-center justify-center mb-4">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
