import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    text: "Finally something I want to bring to a picnic and a party.",
    author: "Zoë",
    location: "Antwerp",
    rating: 5
  },
  {
    id: 2,
    text: "No sugar, all vibes. Yes please.",
    author: "Milan",
    location: "Brussels",
    rating: 5
  },
  {
    id: 3,
    text: "This is what I've been looking for — clean ingredients that don't taste clean.",
    author: "Emma",
    location: "Ghent",
    rating: 5
  },
  {
    id: 4,
    text: "Perfect for when you want something special but not heavy.",
    author: "Lucas",
    location: "Leuven",
    rating: 5
  },
  {
    id: 5,
    text: "Love that I can read and pronounce every ingredient.",
    author: "Sophie",
    location: "Bruges",
    rating: 5
  }
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What People Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real reviews from people who've made the switch.
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {/* Main Testimonial Card */}
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-premium relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-8 leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {currentTestimonial.author}
                  </span>
                  <span>•</span>
                  <span>{currentTestimonial.location}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full hover:bg-secondary"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dots indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-6' 
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full hover:bg-secondary"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};