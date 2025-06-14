
import React from 'react';
import StarField from '@/components/StarField';
import ParticleEffect from '@/components/ParticleEffect';
import NovaChat from '@/components/NovaChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-cosmic-dark relative overflow-hidden">
      <StarField />
      <ParticleEffect />
      
      <div className="relative z-10">
        <NovaChat />
      </div>
    </div>
  );
};

export default Index;
