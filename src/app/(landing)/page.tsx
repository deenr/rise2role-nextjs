'use client';

import { BenefitsSection } from '@/components/landing/benefit-section';
import { HeroSection } from '@/components/landing/hero-section';
import { ProcessSection } from '@/components/landing/process-section';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <BenefitsSection />
    </>
  );
}
