import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Zap, Clock, ShieldCheck } from 'lucide-react';

interface ServiceItem {
  id: string;
  /** Short name for the selector tab. */
  tab: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  tools: string[];
  metrics: { label: string; value: string }[];
  steps: { role: string; desc: string; tool: string }[];
}

const services: ServiceItem[] = [
  {
    id: 'lead-qualification',
    tab: 'Lead qualification',
    badge: 'Growth Operations',
    title: 'Lead Qualification & CRM Sync',
    tagline: 'Every new inquiry read, scored and logged, with a reply drafted, in under 90 seconds.',
    description:
      'I build a triage system that reads each incoming inquiry, pulls out the details that matter, scores it against your own criteria, and updates your CRM with a personal reply ready for you to send.',
    tools: ['Make / n8n', 'OpenAI / Claude', 'Airtable / HubSpot', 'Gmail'],
    metrics: [
      { label: 'Response time', value: '< 90 sec' },
      { label: 'Typical time saved', value: '8–12 hrs/wk' },
      { label: 'Leads missed', value: 'None' },
    ],
    steps: [
      { role: 'Trigger', desc: 'New inquiry submitted on your website form', tool: 'Webhook' },
      { role: 'AI analysis', desc: 'Check budget, timeline and company size', tool: 'Claude' },
      { role: 'Sync', desc: 'Create the deal, set priority and owner', tool: 'CRM / Sheets' },
      { role: 'Action', desc: 'Draft a personal follow-up email in Gmail', tool: 'Gmail' },
    ],
  },
  {
    id: 'client-onboarding',
    tab: 'Client onboarding',
    badge: 'Fulfilment & Operations',
    title: 'Hands-Off Client Onboarding',
    tagline: 'The 15 setup steps after every signed deal, done automatically and the same way every time.',
    description:
      'When a client signs or pays, the system creates their contract and shared folder, invites them to a private Slack channel, and sends a welcome pack with your booking link. Nobody has to remember a checklist.',
    tools: ['Zapier / n8n', 'Google Drive', 'Slack', 'DocuSign / PandaDoc'],
    metrics: [
      { label: 'Setup time', value: 'Minutes' },
      { label: 'Missed steps', value: 'None' },
      { label: 'First impression', value: 'Polished' },
    ],
    steps: [
      { role: 'Trigger', desc: 'Invoice paid or agreement signed', tool: 'Stripe' },
      { role: 'Set-up', desc: 'Create the client’s shared Drive folder', tool: 'Google Drive' },
      { role: 'Collaboration', desc: 'Open a private Slack channel and invite them', tool: 'Slack' },
      { role: 'Welcome', desc: 'Send the onboarding pack with a calendar link', tool: 'Email' },
    ],
  },
  {
    id: 'content-engine',
    tab: 'Content pipeline',
    badge: 'Marketing',
    title: 'Content Pipeline & Repurposing',
    tagline: 'One recorded call or voice note becomes a week of drafts, ready for your approval.',
    description:
      'Raw recordings, client demos or founder videos are turned into LinkedIn posts, newsletter drafts, X threads and documentation, written in your own voice and queued in Notion for you to approve.',
    tools: ['Gemini / Claude', 'Whisper', 'Notion', 'Buffer'],
    metrics: [
      { label: 'Drafts per recording', value: '4–6' },
      { label: 'Your review', value: 'Every draft' },
      { label: 'Publishing rhythm', value: 'Weekly' },
    ],
    steps: [
      { role: 'Trigger', desc: 'Upload a video or voice note', tool: 'Drive / Loom' },
      { role: 'Transcription', desc: 'Accurate speech-to-text with timestamps', tool: 'Whisper' },
      { role: 'Drafting', desc: 'Write the newsletter, LinkedIn post and summary', tool: 'Gemini' },
      { role: 'Queue', desc: 'Place drafts in Notion for your approval', tool: 'Notion' },
    ],
  },
  {
    id: 'internal-copilot',
    tab: 'Knowledge assistant',
    badge: 'Team Productivity',
    title: 'Internal Knowledge Assistant',
    tagline: 'Your team gets instant answers from your own documents, right inside Slack.',
    description:
      'Stop answering the same questions again and again. I connect your Notion pages, Google Docs and past tickets so your team can ask a question in Slack and get an answer with links to the source.',
    tools: ['Claude', 'Vector database', 'Slack', 'Google Docs / Notion'],
    metrics: [
      { label: 'Answers', value: 'In seconds' },
      { label: 'Sources', value: 'Linked' },
      { label: 'Your data', value: 'Stays yours' },
    ],
    steps: [
      { role: 'Trigger', desc: 'A team member asks in #ask-sop', tool: 'Slack' },
      { role: 'Search', desc: 'Find the matching sections in your docs', tool: 'Vector DB' },
      { role: 'Answer', desc: 'Write a reply with links to the sources', tool: 'Claude' },
      { role: 'Feedback', desc: 'Team confirms the answer or flags a gap', tool: 'Slack' },
    ],
  },
];

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const activeService = services.find((s) => s.id === activeTab) || services[0];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full py-14 md:py-16 px-6 md:px-12 lg:px-20 bg-background border-t border-border/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B6CB8] mb-4">Core Capabilities</p>

          <h2
            id="services-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.05]"
          >
            Engineered Automations,{' '}
            <span className="italic">Not Gimmicks.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Practical AI workflows built around your real bottlenecks. Each one connects to the tools you already use, so your team doesn’t have to change how it works.
          </p>
        </div>

        {/* Service selector */}
        <div
          role="tablist"
          aria-label="Services"
          className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-secondary/60 border border-border w-fit max-w-full mx-auto mb-10"
        >
          {services.map((service) => {
            const isActive = service.id === activeTab;
            return (
              <button
                key={service.id}
                id={`tab-${service.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="service-panel"
                onClick={() => setActiveTab(service.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-white text-foreground shadow-xs border-border'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-white/50'
                }`}
              >
                {service.tab}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeService.id}
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeService.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-white shadow-dashboard overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Details */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                  {activeService.badge}
                </span>

                <h3 className="mt-4 font-display text-3xl md:text-4xl text-foreground tracking-tight leading-tight">
                  {activeService.title}
                </h3>

                <p className="mt-2 text-sm sm:text-base font-medium text-foreground/80">{activeService.tagline}</p>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{activeService.description}</p>
              </div>

              <dl className="grid grid-cols-3 gap-3 py-4 border-y border-border/80">
                {activeService.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <dt className="text-xs text-muted-foreground">{m.label}</dt>
                    <dd className="text-base sm:text-lg font-semibold text-foreground tracking-tight mt-0.5 tabular-nums">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div>
                <span className="text-xs font-medium text-muted-foreground block mb-2">Works with your stack:</span>
                <ul className="flex flex-wrap gap-2">
                  {activeService.tools.map((tool) => (
                    <li
                      key={tool}
                      className="px-2.5 py-1 rounded-md bg-secondary text-foreground text-xs font-medium border border-border"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <a
                  href="#book"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:translate-y-px transition-all shadow-xs group"
                >
                  <span>Build this for my team</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Workflow visual */}
            <div className="lg:col-span-6 rounded-xl bg-secondary/40 border border-border p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-border/70 text-xs">
                <span className="font-medium text-foreground">How the workflow runs</span>
                <span className="text-muted-foreground">Built and handed over</span>
              </div>

              <ol className="relative space-y-3 my-5">
                {/* connecting rail */}
                <span aria-hidden="true" className="absolute left-[1.45rem] top-6 bottom-6 w-px bg-gradient-to-b from-accent/40 via-border to-accent/40" />
                {activeService.steps.map((step, idx) => (
                  <motion.li
                    key={step.role}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 * idx }}
                    className="relative flex items-start gap-3 p-3 rounded-lg bg-white border border-border/80 shadow-xs"
                  >
                    <div className="relative h-6 w-6 rounded-md bg-secondary text-foreground flex items-center justify-center font-semibold text-xs shrink-0 border border-border">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-foreground">{step.role}</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/60 whitespace-nowrap">
                          {step.tool}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>

              <div className="pt-3 border-t border-border/70 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  <span>Runs in your own accounts</span>
                </span>
                <span className="font-medium text-foreground">Retries and alerts built in</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: Zap,
              title: 'Built Not to Break Quietly',
              body: 'Every workflow has retries, a fallback queue and instant Slack alerts, so an API timeout never silently drops data.',
            },
            {
              icon: Database,
              title: 'You Own Everything',
              body: 'Every scenario, script and connection lives in your own accounts. No lock-in, no licences held hostage.',
            },
            {
              icon: Clock,
              title: 'Live in 7–14 Days',
              body: 'No months of committee meetings. I build, test and launch directly with your team.',
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
