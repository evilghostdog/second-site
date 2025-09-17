import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft, Sparkles, ShoppingCart, Info, Star } from 'lucide-react';

interface TourStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon?: React.ReactNode;
}

interface OnboardingTourProps {
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    target: 'hero-section',
    title: 'Welcome to Mira!',
    content: 'Discover premium sparkling beverages with bold flavors and zero sugar. Let us show you around!',
    position: 'bottom',
    icon: <Sparkles className="w-5 h-5 text-purple-500" />
  },
  {
    id: 'navigation',
    target: 'main-navigation',
    title: 'Easy Navigation',
    content: 'Use our menu to explore benefits, flavors, our story, and reviews. Everything you need is here.',
    position: 'bottom',
    icon: <Info className="w-5 h-5 text-blue-500" />
  },
  {
    id: 'flavors',
    target: 'flavors-section',
    title: 'Four Unique Flavors',
    content: 'Explore our signature flavors: Mango-Chili, Cucumber-Lime, Hibiscus-Ginger, and Grapefruit-Rosemary.',
    position: 'top',
    icon: <Star className="w-5 h-5 text-orange-500" />
  },
  {
    id: 'shopping',
    target: 'shop-button',
    title: 'Start Shopping',
    content: 'Ready to try Mira? Click here to browse our products and add them to your cart.',
    position: 'top',
    icon: <ShoppingCart className="w-5 h-5 text-green-500" />
  }
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ 
  isVisible, 
  onComplete, 
  onSkip 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);

  const currentTourStep = TOUR_STEPS[currentStep];

  useEffect(() => {
    if (!isVisible || !currentTourStep) return;

    const positionTooltip = () => {
      const targetElement = document.querySelector(`[data-tour="${currentTourStep.target}"]`);
      if (!targetElement) {
        // If target not found, position in center
        setTooltipPosition({ 
          top: window.innerHeight / 2, 
          left: window.innerWidth / 2 
        });
        setIsPositioned(true);
        return;
      }

      const rect = targetElement.getBoundingClientRect();
      const tooltipWidth = 320;
      const tooltipHeight = 200;
      const offset = 20;

      let top = 0;
      let left = 0;

      switch (currentTourStep.position) {
        case 'top':
          top = rect.top - tooltipHeight - offset;
          left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
          break;
        case 'bottom':
          top = rect.bottom + offset;
          left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
          break;
        case 'left':
          top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
          left = rect.left - tooltipWidth - offset;
          break;
        case 'right':
          top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
          left = rect.right + offset;
          break;
      }

      // Ensure tooltip stays within viewport
      const padding = 20;
      top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));
      left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));

      setTooltipPosition({ top, left });
      setIsPositioned(true);

      // Add highlight to target element
      targetElement.classList.add('tour-highlight');
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(positionTooltip, 100);

    return () => {
      clearTimeout(timer);
      // Remove highlight from all elements
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [currentStep, isVisible, currentTourStep]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setIsPositioned(false);
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setIsPositioned(false);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Remove highlights
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });
    onComplete();
  };

  const handleSkip = () => {
    // Remove highlights
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });
    onSkip();
  };

  if (!isVisible || !currentTourStep) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
      
      {/* Tooltip */}
      <div
        className={`fixed z-50 transition-all duration-300 ${
          isPositioned ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          width: '320px'
        }}
      >
        <Card className="shadow-2xl border-2 border-purple-200/50 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {currentTourStep.icon}
                <h3 className="font-bold text-lg text-gray-900">
                  {currentTourStep.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700"
                data-testid="tour-close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {currentTourStep.content}
            </p>

            {/* Progress */}
            <div className="flex items-center space-x-2 mb-6">
              {TOUR_STEPS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-purple-500 w-8'
                      : index < currentStep
                      ? 'bg-purple-300 w-2'
                      : 'bg-gray-200 w-2'
                  }`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {currentStep + 1} of {TOUR_STEPS.length}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    data-testid="tour-previous"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  data-testid="tour-next"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? (
                    'Finish Tour'
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Skip option */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                data-testid="tour-skip"
              >
                Skip tour
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Pointer/Arrow */}
        <div
          className={`absolute w-0 h-0 ${
            currentTourStep.position === 'bottom'
              ? 'border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white -top-2 left-1/2 transform -translate-x-1/2'
              : currentTourStep.position === 'top'
              ? 'border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white -bottom-2 left-1/2 transform -translate-x-1/2'
              : currentTourStep.position === 'right'
              ? 'border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white -left-2 top-1/2 transform -translate-y-1/2'
              : 'border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white -right-2 top-1/2 transform -translate-y-1/2'
          }`}
        />
      </div>
    </>
  );
};