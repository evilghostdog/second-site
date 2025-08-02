import React, { useState, useEffect } from 'react';
import { AgeGate } from '@/components/AgeGate';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { FlavorsSection } from '@/components/FlavorsSection';
import { StorySection } from '@/components/StorySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { SubscriptionSection } from '@/components/SubscriptionSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [showAgeGate, setShowAgeGate] = useState(true);
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  // Check if user has already verified age in this session
  useEffect(() => {
    const ageVerified = sessionStorage.getItem('nava-age-verified');
    if (ageVerified === 'true') {
      setShowAgeGate(false);
      setIsAgeVerified(true);
    }
  }, []);

  const handleAgeVerification = (isOfAge: boolean) => {
    if (isOfAge) {
      sessionStorage.setItem('nava-age-verified', 'true');
      setShowAgeGate(false);
      setIsAgeVerified(true);
    } else {
      // Redirect to a "sorry" page or close tab
      window.location.href = 'https://www.google.com';
    }
  };

  const handleEnter = () => handleAgeVerification(true);
  const handleExit = () => handleAgeVerification(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Age Gate Overlay */}
      {showAgeGate && (
        <AgeGate 
          onEnter={handleEnter}
          onExit={handleExit}
        />
      )}
      
      {/* Main Content - Only show after age verification */}
      {isAgeVerified && (
        <>
          <Navigation />
          <section id="hero">
            <HeroSection />
          </section>
          <section id="benefits">
            <BenefitsSection />
          </section>
          <section id="flavors">
            <FlavorsSection />
          </section>
          <section id="story">
            <StorySection />
          </section>
          <section id="testimonials">
            <TestimonialsSection />
          </section>
          <section id="subscription">
            <SubscriptionSection />
          </section>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
