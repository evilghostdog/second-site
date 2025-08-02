import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';
import mangoChiliCan from '@/assets/nava-mango-chili.jpg';

export const HeroSection: React.FC = () => {
  const [, setLocation] = useLocation();
  return (
    <section className="min-h-screen relative bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-sparkle" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary/20 rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-primary/25 rounded-full animate-sparkle" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Product Image */}
          <div className="mb-12 relative">
            <div className="inline-block animate-float">
              <img 
                src={mangoChiliCan} 
                alt="NAVA Mango-Chili Seltzer" 
                className="w-64 h-auto mx-auto drop-shadow-2xl"
              />
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-mango-chili/20 rounded-full blur-3xl scale-150 -z-10" />
          </div>
          
          {/* Main Headline with Banner Background */}
          <div className="relative mb-8">
            {/* Banner Background */}
            <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-premium -mx-8 py-8"></div>
            <h1 className="relative text-5xl md:text-7xl font-bold text-foreground leading-tight animate-fade-up py-8">
              Vivid Taste.
              <br />
              <span className="text-primary">Barely Sugar.</span>
              <br />
              Fully You.
            </h1>
          </div>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Lightly sparkling. Naturally flavored. 5% alcohol. Zero compromise.
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="premium" 
              size="xl" 
              className="group"
              onClick={() => setLocation('/shop')}
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 text-primary/20">
            <Sparkles className="w-6 h-6 animate-float" />
          </div>
          <div className="absolute bottom-20 right-10 text-primary/20">
            <Sparkles className="w-4 h-4 animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};