import React from 'react';
import { ArrowUp } from 'lucide-react';

const LINKS = [
  { href: '#explainer', label: 'Explainer' },
  { href: '#services', label: 'Services' },
  { href: '#consultancy', label: 'Consultancy' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#book', label: 'Book a call' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-border py-10 px-6 md:px-12 lg:px-20 font-body text-xs text-muted-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <a href="#home" className="transition-opacity hover:opacity-90">
            <img
              src="/axioms-digital-horizontal.png"
              alt="Axioms Digital, back to top"
              width={650}
              height={160}
              className="h-7 w-auto object-contain"
            />
          </a>
          <p className="max-w-xs leading-relaxed">Practical AI automation for small and growing businesses.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-foreground transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-xs">© {new Date().getFullYear()} Axioms Digital</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 rounded-full border border-border hover:bg-secondary text-foreground transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
