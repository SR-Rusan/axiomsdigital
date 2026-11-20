import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { buttonVariants } from './ui/button';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'consultancy', label: 'Consultancy' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
] as const;

/** Highlights the nav link for the section currently in view. */
const useActiveSection = () => {
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const ids = [...NAV_LINKS.map((l) => l.id), 'explainer', 'book'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id === 'explainer' ? 'home' : visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
};

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full font-body bg-white/80 backdrop-blur-md border-b border-border/50">
      <nav
        aria-label="Main"
        className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-4 sm:py-5 max-w-7xl mx-auto"
      >
        <a href="#home" className="flex items-center gap-2.5 group transition-opacity hover:opacity-90">
          <span className="relative block h-8 sm:h-9">
            <img
              src="/axioms-digital-horizontal.png"
              alt="Axioms Digital, home"
              width={650}
              height={160}
              className={`h-8 sm:h-9 w-auto object-contain transition-all duration-300 ease-out ${
                scrolled ? 'opacity-0 -translate-y-1 pointer-events-none' : 'opacity-100 translate-y-0'
              }`}
            />
            <img
              src="/axioms-mark.png"
              alt=""
              aria-hidden="true"
              width={302}
              height={280}
              className={`absolute left-0 top-0 h-8 sm:h-9 w-auto object-contain transition-all duration-300 ease-out group-hover:scale-[1.04] ${
                scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            />
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-sm">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative py-1 transition-colors ${
                      isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#book"
            className={buttonVariants({
              className:
                'rounded-full px-5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all flex items-center gap-1.5 group',
            })}
          >
            <span>Book a call</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Mobile: quick CTA + menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="#book"
            className={buttonVariants({
              size: 'sm',
              className: 'rounded-full px-4 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90',
            })}
          >
            Book a call
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground/80 hover:text-foreground rounded-md hover:bg-secondary/60 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-lg px-6 py-3 flex flex-col z-50"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={active === link.id ? 'location' : undefined}
              className={`text-sm py-3 border-b border-border/60 last:border-0 ${
                active === link.id ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
