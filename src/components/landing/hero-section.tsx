import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function HeroSection() {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const learnMoreButtonRef = useRef(null);
  const getStartedButtonRef = useRef(null);

  const isBadgeInView = useInView(badgeRef, { once: true });
  const isTitleInView = useInView(titleRef, { once: true });
  const isDescriptionInView = useInView(descriptionRef, { once: true });
  const isLearnMoreButtonRefInView = useInView(learnMoreButtonRef, { once: true });
  const isGetStartedButtonRefInView = useInView(getStartedButtonRef, { once: true });

  const springTransition = {
    type: 'spring',
    damping: 30,
    stiffness: 400,
    mass: 1
  };

  return (
    <section className="bg-muted px-4 pb-16 pt-28 dark:bg-muted/30 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 md:pb-24 md:pt-48 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-4">
          <motion.div ref={badgeRef} initial={{ opacity: 0, y: 20 }} animate={isBadgeInView ? { opacity: 1, y: 0 } : {}} transition={{ ...springTransition, delay: 0.1 }}>
            <Badge variant="outline" className="flex flex-row gap-2 bg-background py-1 pl-1 text-xs font-medium text-muted-foreground sm:text-sm">
              <Badge variant="outline" className="text-xs font-medium text-muted-foreground sm:text-sm">
                <div className="relative mr-1.5 h-1.5 w-1.5">
                  <div className="absolute h-full w-full animate-ping rounded-full bg-primary"></div>
                  <div className="absolute h-full w-full rounded-full bg-primary"></div>
                </div>
                Coming soon
              </Badge>
              <span className="hidden sm:inline">Automatically sync private commits</span>
              <span className="sm:hidden">Auto-sync commits</span>
            </Badge>
          </motion.div>
          <motion.h1
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springTransition, delay: 0.3 }}
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
          >
            A simple way to organize
            <br />
            your <span className="text-primary">job applications</span>
          </motion.h1>
          <motion.p
            ref={descriptionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isDescriptionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springTransition, delay: 0.5 }}
            className="max-w-2xl text-sm font-normal text-muted-foreground sm:text-base md:text-lg lg:text-xl"
          >
            Move applications through different stages effortlessly
            <br />
            —Interested, Applied, Interview, Offer, and more.
          </motion.p>
        </div>
        <div className="xs:flex-row flex w-full flex-col gap-3 sm:w-auto">
          <motion.div ref={learnMoreButtonRef} initial={{ opacity: 0, y: 20 }} animate={isLearnMoreButtonRefInView ? { opacity: 1, y: 0 } : {}} transition={{ ...springTransition, delay: 0.7 }}>
            <Button variant="outline" className="=sm:w-auto w-full" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn more
            </Button>
          </motion.div>
          <motion.div ref={getStartedButtonRef} initial={{ opacity: 0, y: 20 }} animate={isGetStartedButtonRefInView ? { opacity: 1, y: 0 } : {}} transition={{ ...springTransition, delay: 0.9 }}>
            <Link href="/sign-up">
              <Button className="w-full sm:w-auto">
                Get Started
                <ArrowRight />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
