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
    // Try new keys first
    let hasCompletedOnboarding = localStorage.getItem('mira-onboarding-completed');
    let hasSkippedOnboarding = localStorage.getItem('mira-onboarding-skipped');
    
    // Migrate from old keys if new keys don't exist
    if (!hasCompletedOnboarding && !hasSkippedOnboarding) {
      const oldCompleted = localStorage.getItem('nava-onboarding-completed');
      const oldSkipped = localStorage.getItem('nava-onboarding-skipped');
      
      if (oldCompleted) {
        localStorage.setItem('mira-onboarding-completed', oldCompleted);
        localStorage.removeItem('nava-onboarding-completed');
        hasCompletedOnboarding = oldCompleted;
        console.log('Migrated onboarding completed status');
      }
      
      if (oldSkipped) {
        localStorage.setItem('mira-onboarding-skipped', oldSkipped);
        localStorage.removeItem('nava-onboarding-skipped');
        hasSkippedOnboarding = oldSkipped;
        console.log('Migrated onboarding skipped status');
      }
    }
    
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
    localStorage.setItem('mira-onboarding-completed', 'true');
    localStorage.removeItem('mira-onboarding-skipped');
  };

  const skipTour = () => {
    setShowTour(false);
    localStorage.setItem('mira-onboarding-skipped', 'true');
  };

  const resetTour = () => {
    localStorage.removeItem('mira-onboarding-completed');
    localStorage.removeItem('mira-onboarding-skipped');
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