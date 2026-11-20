import React from 'react';
import {
  Search,
  Bell,
  Plus,
  Play,
  Share2,
  Activity,
  Layers,
  CheckCircle2,
  ChevronDown,
  LayoutDashboard,
  Cpu,
  CheckSquare,
  Users,
  GitBranch,
  BarChart3,
  Settings,
  Sparkles,
  Zap,
} from 'lucide-react';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

/** Decorative product mock-up. Hidden from screen readers; the copy around it says the same thing. */
export const AutomationDashboard: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="w-full rounded-xl sm:rounded-2xl overflow-hidden p-2 sm:p-3 md:p-4 select-none pointer-events-none text-[11px]"
      style={{
        background: 'rgba(255, 255, 255, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: 'var(--shadow-dashboard)',
      }}
    >
      {/* Dashboard Window Header / Chrome */}
      <div className="rounded-lg sm:rounded-xl bg-white border border-border/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden text-[11px] text-foreground">
        
        {/* AUTOMATION DASHBOARD TOP BAR */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2 sm:py-2.5 border-b border-border bg-white">
          {/* Left: Logo/icon mark + "Axioms Digital" + small chevron */}
          <div className="flex items-center gap-2">
            <img 
              src="/axioms-mark.png" 
              alt="Axioms Digital" 
              className="h-5 w-5 object-contain shrink-0"
            />
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1 font-semibold text-foreground">
                <span className="text-[11px] sm:text-xs">Axioms</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </div>
              <span className="text-[8px] text-muted-foreground font-medium tracking-wider uppercase mt-0.5">Digital</span>
            </div>
          </div>

          {/* Center/left: Search field - hidden on mobile, visible on sm+ */}
          <div className="hidden sm:flex items-center w-52 md:w-80 px-2.5 py-1 rounded-md bg-secondary/70 border border-border/80 text-muted-foreground">
            <Search className="h-3.5 w-3.5 text-muted-foreground mr-2 shrink-0" />
            <span className="flex-1 text-muted-foreground/90 font-normal truncate">Search automations...</span>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-medium bg-background text-muted-foreground rounded border border-border">
              ⌘K
            </kbd>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] font-medium shadow-xs">
              <Plus className="h-3 w-3" />
              <span className="hidden sm:inline">New automation</span>
              <span className="sm:hidden">New</span>
            </div>
            
            <div className="relative p-1 text-muted-foreground hidden sm:block">
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-white"></span>
            </div>

            <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-secondary border border-border flex items-center justify-center font-semibold text-[9px] sm:text-[10px] text-foreground shrink-0">
              A
            </div>
          </div>
        </div>

        {/* WORKSPACE BODY: SIDEBAR (hidden on mobile, visible on md+) + MAIN CONTENT */}
        <div className="flex bg-background">
          
          {/* SIDEBAR: w-40 (hidden on mobile to make dashboard compact and fully responsive) */}
          <aside className="hidden md:flex w-40 border-r border-border bg-white/80 p-2.5 flex-col justify-between shrink-0">
            <div className="space-y-3">
              {/* Main Navigation Items */}
              <div className="space-y-0.5">
                {/* Active item: Overview */}
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-secondary text-foreground font-medium">
                  <LayoutDashboard className="h-3.5 w-3.5 text-accent" />
                  <span>Overview</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Automations</span>
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 rounded-md text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-3.5 w-3.5" />
                    <span>Tasks</span>
                  </div>
                  <span className="text-[9px] font-medium px-1.5 py-px rounded-full bg-secondary text-muted-foreground border border-border">
                    07
                  </span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>Clients</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground">
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>Integrations</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground">
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>Analytics</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-muted-foreground">
                  <Settings className="h-3.5 w-3.5" />
                  <span>Settings</span>
                </div>
              </div>

              {/* Section: "WORKFLOWS" */}
              <div className="pt-2 border-t border-border/80">
                <div className="px-2 py-1 text-[9px] font-semibold text-muted-foreground/80 uppercase tracking-wider">
                  WORKFLOWS
                </div>
                <div className="space-y-0.5 mt-1 text-muted-foreground">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                    <span className="truncate">Lead Follow-up</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                    <span className="truncate">Client Onboarding</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                    <span className="truncate">Content Pipeline</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                    <span className="truncate">Invoice Follow-up</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"></span>
                    <span className="truncate">Notifications</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Instance Pill */}
            <div className="pt-2 border-t border-border/70 px-2 text-[10px] text-muted-foreground/80 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-accent shrink-0" />
              <span className="truncate">Axioms Digital</span>
            </div>
          </aside>

          {/* MAIN CONTENT: bg-secondary/30 */}
          <div className="flex-1 bg-secondary/30 p-2.5 sm:p-3 md:p-4 overflow-hidden flex flex-col gap-2.5 sm:gap-3">
            
            {/* GREETING & STATUS */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
              <div>
                <div className="text-xs sm:text-sm md:text-base font-semibold text-foreground tracking-tight">
                  {greeting()}, team
                </div>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                  Your automation systems are running smoothly.
                </p>
              </div>

              {/* ACTION ROW: small pill buttons */}
              <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 pb-0.5">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-accent text-accent-foreground font-medium shadow-xs shrink-0 text-[10px]">
                  <Plus className="h-2.5 w-2.5" />
                  <span>New automation</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white border border-border text-foreground font-medium shadow-xs shrink-0 text-[10px]">
                  <Play className="h-2 w-2 fill-foreground text-foreground" />
                  <span>Run Test</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-border text-foreground font-medium shadow-xs shrink-0">
                  <Share2 className="h-2.5 w-2.5 text-muted-foreground" />
                  <span>Connect App</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-border text-foreground font-medium shadow-xs shrink-0">
                  <Activity className="h-2.5 w-2.5 text-muted-foreground" />
                  <span>View Activity</span>
                </div>
              </div>
            </div>

            {/* MAIN AUTOMATION CARDS: Two equal-width cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
              
              {/* CARD 1 — AUTOMATION OVERVIEW */}
              <div className="rounded-lg bg-white border border-border p-2.5 sm:p-3 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="font-semibold text-foreground text-[10px] sm:text-[11px] flex items-center gap-1.5">
                      <Layers className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-accent" />
                      Automation Overview
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground">Live Telemetry</span>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-1 sm:py-1.5 border-y border-border/60">
                    <div>
                      <div className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">Active</div>
                      <div className="text-sm sm:text-base font-semibold text-foreground tracking-tight mt-0.5">07</div>
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">Running</div>
                      <div className="text-sm sm:text-base font-semibold text-accent tracking-tight mt-0.5">
                        05
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">Needs Attention</div>
                      <div className="text-sm sm:text-base font-semibold text-foreground/80 tracking-tight mt-0.5">02</div>
                    </div>
                  </div>
                </div>

                {/* Custom SVG/visual activity chart with smooth cubic Bézier path */}
                <div className="mt-1.5 sm:mt-2 pt-1">
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-muted-foreground mb-1">
                    <span>Automation Activity Over Time</span>
                    <span className="font-medium text-foreground">1,248 tasks</span>
                  </div>
                  <div className="w-full h-11 sm:h-16 relative">
                    <svg
                      viewBox="0 0 300 70"
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="automationActivityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Subtle Gridlines */}
                      <line x1="0" y1="18" x2="300" y2="18" stroke="hsl(var(--border))" strokeDasharray="3 3" strokeWidth="0.75" />
                      <line x1="0" y1="42" x2="300" y2="42" stroke="hsl(var(--border))" strokeDasharray="3 3" strokeWidth="0.75" />
                      <line x1="0" y1="66" x2="300" y2="66" stroke="hsl(var(--border))" strokeWidth="0.75" />

                      {/* Bézier Area Fill */}
                      <path
                        d="M 0 52 
                           C 25 48, 50 34, 75 36 
                           C 100 38, 120 18, 145 16 
                           C 170 14, 190 28, 215 22 
                           C 240 16, 260 8, 280 12 
                           C 290 14, 296 10, 300 9 
                           L 300 70 
                           L 0 70 Z"
                        fill="url(#automationActivityGradient)"
                      />

                      {/* Smooth Cubic Bézier Stroke Line */}
                      <path
                        d="M 0 52 
                           C 25 48, 50 34, 75 36 
                           C 100 38, 120 18, 145 16 
                           C 170 14, 190 28, 215 22 
                           C 240 16, 260 8, 280 12 
                           C 290 14, 296 10, 300 9"
                        fill="none"
                        stroke="hsl(var(--accent))"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Current pulse dot */}
                      <circle cx="280" cy="12" r="3" fill="hsl(var(--accent))" />
                      <circle cx="280" cy="12" r="5.5" stroke="hsl(var(--accent))" strokeWidth="1" fill="none" opacity="0.4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CARD 2 — RECENT WORKFLOWS */}
              <div className="rounded-lg bg-white border border-border p-2.5 sm:p-3 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="font-semibold text-foreground text-[10px] sm:text-[11px] flex items-center gap-1.5">
                      <Zap className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-accent" />
                      Recent Workflows
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground">Connected</span>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    {/* Row 1: Lead Qualification */}
                    <div className="flex items-center justify-between p-1 sm:p-1.5 rounded-md border border-border/50 bg-secondary/20">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground text-[10px] sm:text-[11px]">Lead Qualification</span>
                        <span className="text-[9px] text-muted-foreground">AI + CRM</span>
                      </div>
                      <span className="inline-flex items-center text-[9px] sm:text-[10px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        Running
                      </span>
                    </div>

                    {/* Row 2: Client Onboarding */}
                    <div className="flex items-center justify-between p-1 sm:p-1.5 rounded-md border border-border/50 bg-secondary/20">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground text-[10px] sm:text-[11px]">Client Onboarding</span>
                        <span className="text-[9px] text-muted-foreground">Forms + Email</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        Completed
                      </span>
                    </div>

                    {/* Row 3: Content Repurposing */}
                    <div className="flex items-center justify-between p-1 sm:p-1.5 rounded-md border border-border/50 bg-secondary/20">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground text-[10px] sm:text-[11px]">Content Repurposing</span>
                        <span className="text-[9px] text-muted-foreground">AI + Social</span>
                      </div>
                      <span className="inline-flex items-center text-[9px] sm:text-[10px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        Running
                      </span>
                    </div>

                    {/* Row 4: Invoice Follow-up (hidden on mobile to keep card short, shown on sm+) */}
                    <div className="hidden sm:flex items-center justify-between p-1.5 rounded-md border border-border/50 bg-secondary/20">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground text-[11px]">Invoice Follow-up</span>
                        <span className="text-[10px] text-muted-foreground">Email + Sheets</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AUTOMATION ACTIVITY: Desktop Table (hidden on mobile) */}
            <div className="hidden md:block rounded-lg bg-white border border-border p-3 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground text-[11px] flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-accent" />
                  Recent Activity
                </span>
                <span className="text-[10px] text-muted-foreground">Auto-updating</span>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-[10px] font-medium text-muted-foreground">
                      <th className="pb-1.5 font-medium">Time</th>
                      <th className="pb-1.5 font-medium">Workflow</th>
                      <th className="pb-1.5 font-medium">Trigger</th>
                      <th className="pb-1.5 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-[11px]">
                    <tr>
                      <td className="py-1.5 text-muted-foreground font-mono text-[10px]">09:42</td>
                      <td className="py-1.5 font-medium text-foreground">Lead Qualification</td>
                      <td className="py-1.5 text-muted-foreground">New form submission</td>
                      <td className="py-1.5 text-right">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-muted-foreground font-mono text-[10px]">09:18</td>
                      <td className="py-1.5 font-medium text-foreground">Client Onboarding</td>
                      <td className="py-1.5 text-muted-foreground">New client added</td>
                      <td className="py-1.5 text-right">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-muted-foreground font-mono text-[10px]">08:51</td>
                      <td className="py-1.5 font-medium text-foreground">Content Pipeline</td>
                      <td className="py-1.5 text-muted-foreground">New content request</td>
                      <td className="py-1.5 text-right">
                        <span className="inline-flex items-center text-[10px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          Running
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-muted-foreground font-mono text-[10px]">08:24</td>
                      <td className="py-1.5 font-medium text-foreground">Invoice Follow-up</td>
                      <td className="py-1.5 text-muted-foreground">Payment reminder</td>
                      <td className="py-1.5 text-right">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* AUTOMATION ACTIVITY: Mobile Compact Summary (short, clean, responsive) */}
            <div className="md:hidden rounded-lg bg-white border border-border p-2 sm:p-2.5 shadow-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-foreground text-[10px] flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-accent" />
                  Recent Activity
                </span>
                <span className="text-[9px] text-muted-foreground">Live Telemetry</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] py-0.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-mono text-[9px] text-muted-foreground">09:42</span>
                    <span className="font-medium text-foreground truncate">Lead Qualification</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-px rounded-full shrink-0">
                    <CheckCircle2 className="h-2 w-2 text-emerald-600" />
                    Done
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] py-0.5 border-t border-border/40">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-mono text-[9px] text-muted-foreground">09:18</span>
                    <span className="font-medium text-foreground truncate">Client Onboarding</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-px rounded-full shrink-0">
                    <CheckCircle2 className="h-2 w-2 text-emerald-600" />
                    Done
                  </span>
                </div>
              </div>
            </div>

            {/* AI STACK / TECHNOLOGY AREA */}
            <div className="pt-1.5 sm:pt-2 border-t border-border flex items-center justify-between flex-wrap gap-1.5 text-[9px] sm:text-[10px]">
              <div className="flex items-center gap-1 text-muted-foreground font-medium uppercase tracking-wider text-[8px] sm:text-[9px]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
                <span>Tools I build with</span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {['OpenAI', 'Claude', 'Gemini', 'Google', 'Make', 'Zapier', 'n8n'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full bg-white border border-border/80 text-foreground font-medium text-[8px] sm:text-[10px] shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
