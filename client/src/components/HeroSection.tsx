import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';
import mangoChiliCan from '@/assets/nava-mango-chili.jpg';

export const HeroSection: React.FC = () => {
  const [, setLocation] = useLocation();
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Multi-layered colorful background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-hero-vibrant opacity-50" />
      
      {/* Animated color orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-mango-chili rounded-full opacity-20 blur-xl animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-cucumber-lime rounded-full opacity-25 blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-hibiscus-ginger rounded-full opacity-20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-grapefruit-rosemary rounded-full opacity-30 blur-xl animate-float" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Enhanced sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-sparkle shadow-lg" />
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-sparkle shadow-lg" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-sparkle shadow-lg" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-sparkle shadow-lg" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-sparkle shadow-lg" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Product Image */}
          <div className="mb-12 relative">
            <div className="inline-block animate-float">
              <img 
                src={mangoChiliCan} 
                alt="NAVA Mango-Chili Seltzer" 
                className="w-64 h-auto mx-auto drop-shadow-2xl relative z-10"
              />
            </div>
            {/* Enhanced rainbow glow effects */}
            <div className="absolute inset-0 bg-gradient-mango-chili/30 rounded-full blur-3xl scale-150 -z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-full blur-2xl scale-125 -z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-emerald-400/15 to-yellow-400/15 rounded-full blur-xl scale-110 -z-10 animate-pulse" />
          </div>
          
          {/* Main Headline with Colorful Banner Background */}
          <div className="relative mb-8">
            {/* Colorful Banner Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border-2 border-transparent bg-clip-border shadow-premium -mx-8 py-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur-sm"></div>
            </div>
            <h1 className="relative text-5xl md:text-7xl font-bold leading-tight animate-fade-up py-8">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Vivid Taste.
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Barely Sugar.
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Fully You.
              </span>
            </h1>
          </div>
          
          {/* Colorful Subtext */}
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up bg-gradient-to-r from-slate-700 via-purple-600 to-slate-700 bg-clip-text text-transparent font-semibold" style={{ animationDelay: '0.2s' }}>
            Lightly sparkling. Naturally flavored. 5% alcohol. Zero compromise.
          </p>
          
          {/* Colorful CTA Button */}
          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="premium" 
              size="xl" 
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => setLocation('/shop')}
            >
              <span className="relative z-10">Shop Now</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-orange-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </Button>
          </div>
          
          {/* Colorful Floating elements */}
          <div className="absolute top-20 left-10 text-purple-400">
            <Sparkles className="w-6 h-6 animate-float drop-shadow-lg" />
          </div>
          <div className="absolute bottom-20 right-10 text-pink-400">
            <Sparkles className="w-4 h-4 animate-float drop-shadow-lg" style={{ animationDelay: '1.5s' }} />
          </div>
          <div className="absolute top-32 right-16 text-cyan-400">
            <Sparkles className="w-5 h-5 animate-float drop-shadow-lg" style={{ animationDelay: '0.8s' }} />
          </div>
          <div className="absolute bottom-32 left-16 text-yellow-400">
            <Sparkles className="w-3 h-3 animate-float drop-shadow-lg" style={{ animationDelay: '2.2s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};