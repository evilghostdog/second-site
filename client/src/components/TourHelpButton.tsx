import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

export const TourHelpButton: React.FC = () => {
  const { startTour } = useOnboarding();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={startTour}
      className="fixed bottom-20 right-4 z-30 bg-white/90 backdrop-blur-sm border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 shadow-lg"
      data-testid="tour-help-button"
    >
      <HelpCircle className="w-4 h-4 mr-2" />
      Take Tour
    </Button>
  );
};