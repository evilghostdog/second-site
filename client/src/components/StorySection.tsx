import React from 'react';
import lifestoryImage from '@/assets/lifestyle-story.jpg';

export const StorySection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Mira?
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 animate-fade-up">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Minimalist living meets controlled indulgence.
              </h3>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We believe that what you drink should reflect who you are — 
                  someone who values quality over quantity, intention over impulse.
                </p>
                
                <p>
                  Mira isn't just another sparkling drink. It's a new category entirely. 
                  We've reimagined what a modern alcoholic beverage can be: clean, 
                  sophisticated, and unapologetically bold.
                </p>
                
                <p>
                  Every can represents a choice — to drink consciously, 
                  to taste authentically, and to live fully. No sugar crashes. 
                  No artificial aftertastes. Just pure, intentional flavor.
                </p>
              </div>
              
              <div className="pt-4">
                <blockquote className="text-xl font-medium text-foreground italic border-l-4 border-primary pl-6">
                  "Finally, a drink that fits my lifestyle instead of forcing me to compromise."
                </blockquote>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden rounded-2xl shadow-premium">
                <img 
                  src={lifestoryImage} 
                  alt="People enjoying Mira at sunset"
                  className="w-full h-[500px] object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-premium">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5%</div>
                  <div className="text-sm text-muted-foreground">Alcohol Content</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-card rounded-2xl p-6 shadow-premium">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">0g</div>
                  <div className="text-sm text-muted-foreground">Added Sugar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};