import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ShoppingCart } from 'lucide-react';
import mangoChiliCan from '@/assets/nava-mango-chili.jpg';
import cucumberLimeCan from '@/assets/nava-cucumber-lime.jpg';
import hibiscusGingerCan from '@/assets/nava-hibiscus-ginger.jpg';
import grapefruitRosemaryCan from '@/assets/nava-grapefruit-rosemary.jpg';

const flavors = [
  {
    id: 'mango-chili',
    name: 'Mango-Chili',
    description: 'Tropical sweetness meets gentle heat',
    notes: ['Sweet Mango', 'Mild Chili', 'Citrus Finish'],
    image: mangoChiliCan,
    gradient: 'bg-gradient-mango-chili'
  },
  {
    id: 'cucumber-lime',
    name: 'Cucumber-Lime',
    description: 'Refreshing garden-to-glass clarity',
    notes: ['Fresh Cucumber', 'Zesty Lime', 'Herbal Notes'],
    image: cucumberLimeCan,
    gradient: 'bg-gradient-cucumber-lime'
  },
  {
    id: 'hibiscus-ginger',
    name: 'Hibiscus-Ginger',
    description: 'Floral elegance with warming spice',
    notes: ['Floral Hibiscus', 'Warm Ginger', 'Berry Hints'],
    image: hibiscusGingerCan,
    gradient: 'bg-gradient-hibiscus-ginger'
  },
  {
    id: 'grapefruit-rosemary',
    name: 'Grapefruit-Rosemary',
    description: 'Citrus brightness with herbal sophistication',
    notes: ['Pink Grapefruit', 'Fresh Rosemary', 'Clean Finish'],
    image: grapefruitRosemaryCan,
    gradient: 'bg-gradient-grapefruit-rosemary'
  }
];

export const FlavorsSection: React.FC = () => {
  const [hoveredFlavor, setHoveredFlavor] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  return (
    <section id="flavors" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Four Bold Flavors
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each can features bold color fields inspired by real ingredients, 
            crafted for those who refuse to compromise on taste.
          </p>
        </div>

        {/* Flavors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {flavors.map((flavor, index) => (
            <div
              key={flavor.id}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-2 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredFlavor(flavor.id)}
              onMouseLeave={() => setHoveredFlavor(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 ${flavor.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative p-6 text-center">
                {/* Product Image */}
                <div className="mb-6 relative">
                  <img 
                    src={flavor.image} 
                    alt={`Mira ${flavor.name}`}
                    className={`w-32 h-auto mx-auto transition-transform duration-500 group-hover:scale-110 ${
                      hoveredFlavor === flavor.id ? 'rotate-12' : ''
                    }`}
                  />
                </div>
                
                {/* Flavor Info */}
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {flavor.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {flavor.description}
                </p>
                
                {/* Taste Notes - Show on hover */}
                <div className={`transition-all duration-300 overflow-hidden ${
                  hoveredFlavor === flavor.id 
                    ? 'max-h-32 opacity-100 mb-4' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-1">
                    {flavor.notes.map((note) => (
                      <span 
                        key={note}
                        className="inline-block bg-background/50 px-3 py-1 rounded-full text-sm text-muted-foreground mx-1"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA Button */}
                <Button 
                  variant="flavor" 
                  size="lg"
                  className="w-full"
                >
                  Try This Flavor
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Shop Now Section */}
        <div className="text-center mt-16">
          <Button 
            variant="cta" 
            size="xl" 
            className="group"
            onClick={() => setLocation('/shop')}
          >
            <ShoppingCart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Shop All Flavors
          </Button>
        </div>
      </div>
    </section>
  );
};