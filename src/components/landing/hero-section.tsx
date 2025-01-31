import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, useAnimationControls, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Building2, Globe2, Grab, Hand, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function HeroSection() {
  const springTransition = {
    type: 'spring',
    damping: 30,
    stiffness: 400,
    mass: 1
  };

  return (
    <section className="overflow-hidden bg-muted px-4 pb-56 pt-28 dark:bg-muted/30 xs:pb-64 sm:px-6 sm:pt-32 md:px-8 md:pb-36 md:pt-48 lg:px-12">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:flex-row md:gap-12">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12">
          <div className="flex flex-col items-start gap-4">
            <motion.div viewport={{ once: true }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.1 }}>
              <Badge variant="outline" className="flex flex-row gap-2 bg-background py-1 pl-1 text-xs font-medium text-muted-foreground sm:text-sm">
                <Badge variant="outline" className="text-xs font-medium text-muted-foreground sm:text-sm">
                  <div className="relative mr-1.5 h-1.5 w-1.5">
                    <div className="absolute h-full w-full animate-ping rounded-full bg-primary"></div>
                    <div className="absolute h-full w-full rounded-full bg-primary"></div>
                  </div>
                  Coming soon
                </Badge>
                <span>Follow-up notifications</span>
              </Badge>
            </motion.div>
            <motion.h1
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.3 }}
              className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            >
              A simple way to organize
              <br />
              your <span className="text-primary">job applications</span>
            </motion.h1>
            <motion.p
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.5 }}
              className="max-w-2xl text-sm font-normal text-muted-foreground sm:text-base md:text-lg lg:text-xl"
            >
              Move applications through different stages effortlessly
              <br />
              —Interested, Applied, Interview, Offer, and more.
            </motion.p>
          </div>
          <div className="relative z-10 flex w-full flex-col gap-3 xs:flex-row sm:w-auto">
            <motion.div viewport={{ once: true }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.7 }}>
              <Button variant="outline" className="=sm:w-auto w-full" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn more
              </Button>
            </motion.div>
            <motion.div viewport={{ once: true }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.9 }}>
              <Link href="/sign-up">
                <Button className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute -bottom-[640px] -left-[98px] scale-75 xs:-bottom-[680px] xs:-left-[52px] xs:scale-90 sm:-right-32 sm:left-auto sm:top-64 sm:scale-100 lg:-right-8 xl:top-32">
          <KanbanBoardDemo />
        </div>
      </div>
    </section>
  );
}

function KanbanBoardDemo({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [isInInterview, setIsInInterview] = useState(false);
  const x = useMotionValue(0);
  const progress = useTransform(x, [0, 344], [0, 1]);
  const y = useTransform(progress, [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1], [0, 5, 10, 15, 10, 5, 0]);
  const scale = useTransform(progress, [0, 0.25, 0.75, 1], [1, 1.05, 1.05, 1]);

  const springProgress = useSpring(progress, {
    stiffness: 100,
    damping: 10,
    mass: 0.5
  });
  const iconX = useTransform(springProgress, [-0.02, 1], [0, 354]);
  const iconY = useTransform(springProgress, [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1], [0, 7, 11, 17, 12, 6, 0]);
  const iconProgress = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);

  const controls = useAnimationControls();

  useEffect(() => {
    let isCancelled = false;

    const animate = async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));

      while (!isCancelled) {
        await controls.start({
          x: 344,
          transition: { duration: 3, ease: 'easeInOut' }
        });
        setIsInInterview(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await controls.start({
          x: 0,
          transition: { duration: 3, ease: 'easeInOut' }
        });
        setIsInInterview(false);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    };

    animate();

    return () => {
      isCancelled = true;
    };
  }, [controls]);

  const springTransition = {
    type: 'spring',
    damping: 30,
    stiffness: 400,
    mass: 1
  };

  return (
    <div className={cn('flex h-fit flex-row gap-6', className)} {...props} style={{ transform: 'rotateX(-18deg) rotateY(20deg)' }}>
      <div className="flex w-[320px] flex-1 flex-col gap-4">
        <motion.header
          className="relative flex min-h-10 flex-row items-center rounded-lg border bg-card px-3"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.5 }}
        >
          <span className="text-card-foreground">Applied </span>
          <Badge className="ml-2 px-1.5" style={{ backgroundColor: '#0284c7' }}>
            {isInInterview ? 0 : 1}
          </Badge>
        </motion.header>
        <motion.section
          className="relative flex min-h-[640px] flex-1 flex-col gap-2 rounded-lg border bg-background/60 p-2"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.6 }}
        >
          <motion.div className="absolute right-8 top-8 z-50 p-4" style={{ x: iconX, y: iconY }}>
            <motion.div style={{ opacity: iconProgress, position: 'absolute', top: 0, right: 0 }}>
              <Grab className="text-muted-foreground" />
            </motion.div>
            <motion.div style={{ opacity: useTransform(iconProgress, (v) => 1 - v), position: 'absolute', top: 0, right: 0 }}>
              <Hand className="text-muted-foreground" />
            </motion.div>
          </motion.div>
          <motion.div className="w-full" animate={controls} style={{ x, y, scale }}>
            <Card className="group relative overflow-hidden rounded-md">
              <div className="absolute left-0 h-full w-1 opacity-20 transition-colors group-hover:opacity-100" style={{ backgroundColor: '#0284c7' }} />
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="mb-1 line-clamp-2 text-lg font-semibold transition-colors">Software Engineer</CardTitle>
                    <CardDescription className="flex items-center">
                      <Building2 className="h-4 w-4" />
                      <span className="ml-1.5 font-medium text-foreground/90">TechCorp</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-4 pt-2">
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>New York, NY</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe2 className="h-3.5 w-3.5" />
                    <span>Remote</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">GraphQL</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </div>
      <div className="flex w-[320px] flex-1 flex-col gap-4">
        <motion.header
          className="relative flex min-h-10 flex-row items-center rounded-lg border bg-card px-3"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.7 }}
        >
          <span className="text-card-foreground">Interview</span>
          <Badge className="ml-2 px-1.5" style={{ backgroundColor: '#f97316' }}>
            {isInInterview ? 1 : 0}
          </Badge>
        </motion.header>
        <motion.section
          className="flex h-[174px] flex-1 flex-col gap-2 rounded-lg border bg-background/60 p-2"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.8 }}
        >
          {/* move the card here */}
        </motion.section>
      </div>
    </div>
  );
}
