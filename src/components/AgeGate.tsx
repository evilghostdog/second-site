import React from 'react';
import { Button } from '@/components/ui/button';
import ageGateBg from '@/assets/age-gate-bg.jpg';

interface AgeGateProps {
  onEnter: () => void;
  onExit: () => void;
}

export const AgeGate: React.FC<AgeGateProps> = ({ onEnter, onExit }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: `url(${ageGateBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(0px)'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Are you 18 or older?
        </h1>
        
        <div className="space-y-4">
          <Button 
            variant="age-gate" 
            size="xl" 
            className="w-full text-white border-white/30 hover:bg-white/20"
            onClick={onEnter}
          >
            Yes, Enter
          </Button>
          
          <Button 
            variant="age-gate" 
            size="xl" 
            className="w-full text-white/80 border-white/20 hover:bg-white/10"
            onClick={onExit}
          >
            No, Exit
          </Button>
        </div>
        
        <p className="text-white/70 text-sm mt-8 leading-relaxed">
          You must be of legal drinking age in your country to enter.
          <br />
          Please drink responsibly.
        </p>
      </div>
    </div>
  );
};