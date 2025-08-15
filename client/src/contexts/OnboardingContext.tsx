import React, { createContext, useContext, useState, useEffect } from 'react';

interface OnboardingContextType {
  showTour: boolean;
  isFirstVisit: boolean;
  startTour: () => void;
  completeTour: () => void;
  skipTour: () => void;
  resetTour: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [showTour, setShowTour] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('nava-onboarding-completed');
    const hasSkippedOnboarding = localStorage.getItem('nava-onboarding-skipped');
    
    if (!hasCompletedOnboarding && !hasSkippedOnboarding) {
      setIsFirstVisit(true);
      // Start tour after a short delay to let the page load
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => {
    setShowTour(true);
  };

  const completeTour = () => {
    setShowTour(false);
    localStorage.setItem('nava-onboarding-completed', 'true');
    localStorage.removeItem('nava-onboarding-skipped');
  };

  const skipTour = () => {
    setShowTour(false);
    localStorage.setItem('nava-onboarding-skipped', 'true');
  };

  const resetTour = () => {
    localStorage.removeItem('nava-onboarding-completed');
    localStorage.removeItem('nava-onboarding-skipped');
    setIsFirstVisit(true);
    setShowTour(true);
  };

  const value = {
    showTour,
    isFirstVisit,
    startTour,
    completeTour,
    skipTour,
    resetTour,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};