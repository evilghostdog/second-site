import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Sparkles } from 'lucide-react';
import subscriptionBg from '@/assets/subscription-bg.jpg';

export const SubscriptionSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${subscriptionBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Floating sparkles */}
          <div className="absolute -top-4 left-1/4 text-white/30">
            <Sparkles className="w-6 h-6 animate-sparkle" />
          </div>
          <div className="absolute top-8 right-1/4 text-white/20">
            <Sparkles className="w-4 h-4 animate-sparkle" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Header */}
          <div className="mb-12 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              First Taste. First Access.
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join our drops, get early access to flavors and exclusive tastings.
              <br />
              Be the first to experience what's next.
            </p>
          </div>

          {/* Email Form */}
          {!isSubmitted ? (
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                  required
                />
              </div>
              <Button 
                type="submit" 
                variant="cta" 
                size="lg"
                className="h-12 bg-white text-primary hover:bg-white/90 shadow-glow"
              >
                Join the List
              </Button>
            </form>
          ) : (
            <div className="animate-fade-up">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-white text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Welcome to NAVA!</h3>
                  <p className="text-white/80">
                    You're now on the list for early access to new flavors and exclusive events.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-white/70 text-sm">
              No spam. Just the good stuff. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};