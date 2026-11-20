import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  Shield,
  Calculator,
  Loader2,
  Check,
  AlertCircle,
} from 'lucide-react';

const faqs = [
  {
    q: 'Do we need an in-house developer or technical team?',
    a: 'No. Every automation is delivered ready to use. I build, test and check the whole set-up, then hand over short video walkthroughs and clear documentation so a non-technical team can run it with confidence.',
  },
  {
    q: 'Which tools and platforms do you build with?',
    a: 'Make, Zapier, n8n, OpenAI, Claude, Gemini, Airtable, Notion, Slack, HubSpot and Google Workspace. Everything connects to the software you already use.',
  },
  {
    q: 'How do you protect our data and our clients’ privacy?',
    a: 'I use business API access, where the AI providers don’t train their models on your data. Records are processed in transit and stored only in your own databases and accounts, not in mine.',
  },
  {
    q: 'How long does a project take, and how is it priced?',
    a: 'Most single automations, like lead qualification or client onboarding, are built and live within 7 to 14 days. Work is done in fixed-scope sprints, so you know the price before anything starts.',
  },
  {
    q: 'What happens if one of the connected tools changes?',
    a: 'Every workflow sends an alert to a private channel the moment something fails, and retries automatically where it can. The first 30 days after launch include monitoring and fixes at no extra cost.',
  },
];

type Status = 'idle' | 'submitting' | 'sent' | 'error';

const inputClass =
  'w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-secondary/30 text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all';

export const BookingSection: React.FC = () => {
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [teamSize, setTeamSize] = useState(3);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', tasks: '', website: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Assumes about 75% of repetitive hours can be automated, over ~4.3 weeks a month.
  const monthlyHoursRecovered = Math.round(weeklyHours * 4.3 * 0.75 * teamSize);
  const leverage =
    monthlyHoursRecovered >= 60 ? 'High leverage' : monthlyHoursRecovered >= 20 ? 'Worth automating' : 'Start small';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      tasks: formData.tasks.trim(),
      website: formData.website, // honeypot: real people leave this empty
      timestamp: new Date().toISOString(),
      source: 'Axioms Digital discovery form',
    };

    let delivered = false;

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      delivered = res.ok;
    } catch {
      delivered = false;
    }

    // Optional Google Apps Script backup. Its response can't be read (no-cors), so it only counts if the request goes out.
    const webhookUrl = import.meta.env.VITE_LEADS_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.trim() !== '') {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
        delivered = true;
      } catch {
        // keep the result from the API call
      }
    }

    setStatus(delivered ? 'sent' : 'error');
  };

  const firstName = formData.name.trim().split(' ')[0];

  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="relative w-full py-14 md:py-16 px-6 md:px-12 lg:px-20 bg-secondary/30 border-t border-border/80 font-body"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#8B6CB8] mb-4">Direct Founder Access</p>

          <h2
            id="book-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.05]"
          >
            Ready to Automate?{' '}
            <span className="italic">Let’s Talk.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Book a free 20-minute discovery call. We’ll look at your biggest time sinks together and map out the automations worth building first.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          {/* Estimator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl bg-white border border-border p-6 sm:p-8 shadow-dashboard">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Calculator className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground leading-tight">Time-Saved Estimator</h3>
                  <p className="text-xs text-muted-foreground">A rough idea of the hours your team could get back each month</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center gap-4 text-sm font-medium text-foreground">
                  <label htmlFor="est-hours">Hours per person, per week, on manual admin</label>
                  <output htmlFor="est-hours" className="font-mono text-accent font-semibold tabular-nums whitespace-nowrap">
                    {weeklyHours} hrs
                  </output>
                </div>
                <input
                  id="est-hours"
                  type="range"
                  min={1}
                  max={30}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center gap-4 text-sm font-medium text-foreground">
                  <label htmlFor="est-team">People doing this work</label>
                  <output htmlFor="est-team" className="font-mono text-accent font-semibold tabular-nums whitespace-nowrap">
                    {teamSize} {teamSize === 1 ? 'person' : 'people'}
                  </output>
                </div>
                <input
                  id="est-team"
                  type="range"
                  min={1}
                  max={15}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border/80 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground block font-medium">
                    Estimated time recovered
                  </span>
                  <div className="text-3xl font-display text-foreground tracking-tight mt-0.5 tabular-nums" aria-live="polite">
                    ~{monthlyHoursRecovered.toLocaleString()}{' '}
                    <span className="text-xs font-body text-muted-foreground">hours / month</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  {leverage}
                </span>
              </div>

              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Assumes about three-quarters of this admin can be automated, which is typical for lead triage, onboarding, reporting and content work. Your call will give a real number.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-white shadow-xs space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Shield className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>No-pressure discovery call</span>
              </div>
              <p>
                The call is about your workflow, not a sales pitch. If automation isn’t worth it at your current volume, I’ll tell you directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 rounded-2xl bg-white border border-border p-6 sm:p-8 shadow-dashboard">
            {status === 'sent' ? (
              <div className="py-8 sm:py-10 flex flex-col items-center text-center space-y-4" role="status">
                <div className="h-14 w-14 rounded-full bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-3xl text-foreground">
                    Thanks{firstName ? `, ${firstName}` : ''}. Your request is in.
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-1 mx-auto">
                    I’ll read it personally before we speak.
                  </p>
                </div>

                <div className="w-full bg-secondary/40 border border-border rounded-xl p-4 text-left space-y-2 text-sm">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <span>What happens next</span>
                  </div>
                  <ul className="text-muted-foreground space-y-1.5 pl-5 list-disc">
                    <li>I review your tasks and the tools you mentioned.</li>
                    <li>
                      You’ll get a reply at <span className="font-medium text-foreground">{formData.email || 'your email'}</span> within one business day.
                    </li>
                    <li>We pick a time for a 20-minute call.</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({ name: '', email: '', company: '', tasks: '', website: '' });
                    setStatus('idle');
                  }}
                  className="text-sm text-accent font-medium hover:underline pt-2 cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display text-3xl text-foreground">Book a Discovery Call</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    A direct conversation with the person who builds your system. No salespeople.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-medium text-foreground mb-1">
                      Your name <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      required
                      type="text"
                      autoComplete="name"
                      maxLength={120}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nadia Karim"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-email" className="block text-xs font-medium text-foreground mb-1">
                      Work email <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      required
                      type="email"
                      autoComplete="email"
                      maxLength={200}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nadia@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-company" className="block text-xs font-medium text-foreground mb-1">
                    Company or website
                  </label>
                  <input
                    id="lead-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    maxLength={200}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="company.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="lead-tasks" className="block text-xs font-medium text-foreground mb-1">
                    Which repetitive tasks would you like to automate? <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="lead-tasks"
                    name="tasks"
                    required
                    rows={4}
                    minLength={10}
                    maxLength={3000}
                    value={formData.tasks}
                    onChange={(e) => setFormData({ ...formData, tasks: e.target.value })}
                    placeholder="e.g. qualifying new leads, onboarding clients, syncing Airtable and Slack, invoice follow-ups…"
                    className={`${inputClass} resize-y min-h-[96px]`}
                  />
                </div>

                {/* Honeypot: hidden from people, filled in by spam bots. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="lead-website">Leave this empty</label>
                  <input
                    id="lead-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-800"
                  >
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Your request didn’t go through. Please check your connection and try again in a minute.</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:translate-y-px transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Request my 20-minute call</span>
                        <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Usually replies within one business day</span>
                  </div>
                  <span>Your details are only used to reply to you.</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-border/80">
          <div className="text-center mb-8">
            <h3 className="font-display text-3xl sm:text-4xl text-foreground">Frequently Asked Questions</h3>
            <p className="text-sm text-muted-foreground mt-1">Straight answers about working with a small AI automation studio</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="rounded-xl border border-border bg-white overflow-hidden shadow-2xs">
                  <h4>
                    <button
                      type="button"
                      id={`faq-q-${idx}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${idx}`}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-foreground' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h4>

                  {isOpen && (
                    <div
                      id={`faq-a-${idx}`}
                      role="region"
                      aria-labelledby={`faq-q-${idx}`}
                      className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
