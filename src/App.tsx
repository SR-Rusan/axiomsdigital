import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExplainerSection } from './components/ExplainerSection';
import { ServicesSection } from './components/ServicesSection';
import { ConsultancySection } from './components/ConsultancySection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { Reveal } from './components/Reveal';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-body text-foreground">
      <Navbar />

      <main id="main" className="flex-1 flex flex-col">
        <div id="home" className="relative w-full">
          <Hero />
        </div>

        {/* 60-second explainer film (#explainer) */}
        <Reveal><ExplainerSection /></Reveal>

        <Reveal><ServicesSection /></Reveal>
        <Reveal><ConsultancySection /></Reveal>
        <Reveal><ProcessSection /></Reveal>
        <Reveal><AboutSection /></Reveal>
        <Reveal><BookingSection /></Reveal>
      </main>

      <Footer />
    </div>
  );
};

export default App;
