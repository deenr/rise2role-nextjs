import { motion, useInView } from 'framer-motion';
import { Files, Hand, Medal } from 'lucide-react';
import { useRef } from 'react';
import { ProcessStep } from './process-step';

const steps = [
  { title: 'Add Applications', description: 'Quickly create job applications as cards on your board.', icon: <Files className="h-full w-full" /> },
  { title: 'Move Applications', description: 'Drag and drop applications between stages as your job search progresses.', icon: <Hand className="h-full w-full" /> },
  {
    title: 'Stay Organized',
    description: 'No more messy notes—everything is in one place.',
    icon: <Medal className="h-full w-full" />
  }
];

export function ProcessSection() {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stepsRef = useRef(steps.map(() => useRef(null)));

  const isHeaderInView = useInView(headerRef, { once: true });
  const isTitleInView = useInView(titleRef, { once: true });
  const isDescriptionInView = useInView(descriptionRef, { once: true });
  const areStepsInView = stepsRef.current.map((ref) => useInView(ref, { once: true }));

  const springTransition = {
    type: 'spring',
    damping: 30,
    stiffness: 400,
    mass: 1
  };

  const headerAnimation = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { ...springTransition, delay: 0.1 }
  };

  const stepAnimation = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { ...springTransition, delay: 0.2 }
  };

  return (
    <section id="process" className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col gap-2">
          <motion.h2
            ref={headerRef}
            initial={headerAnimation.initial}
            animate={isHeaderInView ? headerAnimation.animate : {}}
            transition={headerAnimation.transition}
            className="text-xs font-medium text-muted-foreground sm:text-sm"
          >
            How It Works
          </motion.h2>
          <div className="flex flex-col gap-4 md:flex-row">
            <motion.p
              ref={titleRef}
              initial={headerAnimation.initial}
              animate={isTitleInView ? headerAnimation.animate : {}}
              transition={{ ...headerAnimation.transition, delay: 0.2 }}
              className="flex-1 text-2xl font-semibold sm:text-3xl"
            >
              An easy-to-use kanban board
            </motion.p>
            <motion.p
              ref={descriptionRef}
              initial={headerAnimation.initial}
              animate={isDescriptionInView ? headerAnimation.animate : {}}
              transition={{ ...headerAnimation.transition, delay: 0.3 }}
              className="flex-1 text-sm font-normal text-muted-foreground sm:text-base"
            >
              Rise2Role helps you visually manage your job applications in just a few steps:
            </motion.p>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              ref={stepsRef.current[index]}
              initial={stepAnimation.initial}
              animate={areStepsInView[index] ? stepAnimation.animate : {}}
              transition={{ ...stepAnimation.transition, delay: 0.1 * (index + 1) }}
              className={index === 2 ? 'h-full md:col-span-2' : 'h-full'}
            >
              <ProcessStep className="h-full" number={index + 1} {...step} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
