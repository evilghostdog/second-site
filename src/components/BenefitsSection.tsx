import React from 'react';
import { Leaf, Zap, Droplets } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: 'Real Ingredients',
    description: 'No artificial nonsense — just flavor you feel.',
    gradient: 'from-green-400 to-emerald-600'
  },
  {
    icon: Zap,
    title: 'Light Kick, No Crash',
    description: '5% alcohol. Chill, not chaos.',
    gradient: 'from-orange-400 to-red-500'
  },
  {
    icon: Droplets,
    title: 'Zero Sugar',
    description: 'Clean taste, clean conscience.',
    gradient: 'from-blue-400 to-cyan-500'
  }
];

export const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={benefit.title}
                className="group text-center p-8 rounded-2xl bg-card shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon with gradient background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${benefit.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};