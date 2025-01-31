import { Frown, Smile } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { BenefitItem } from './benefit-item';

const benefits = [
  {
    positive: { title: 'Effortless Organization', description: 'Easily track job applications with a visual kanban board.' },
    negative: { title: 'Spreadsheet Overload', description: 'Manually updating rows and columns gets messy fast.' }
  },
  {
    positive: { title: 'Clear Progress', description: 'See exactly where each application stands at a glance.' },
    negative: { title: 'Disorganized Tracking', description: 'Spreadsheets make it hard to spot what needs attention.' }
  },
  {
    positive: { title: 'Drag & Drop Simplicity', description: 'Move applications between stages effortlessly.' },
    negative: { title: 'Manual Updates', description: 'Editing spreadsheet cells is tedious and error-prone.' }
  },
  {
    positive: { title: 'Instant Overview', description: 'Get a structured view without endless scrolling.' },
    negative: { title: 'Scattered Data', description: 'Spreadsheets bury important information in clutter.' }
  }
];

export function BenefitsSection() {
  const sectionAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: {
      type: 'spring',
      time: 0.3,
      bounce: 0.2,
      delay: 0
    }
  };
  const sectionAnimation2 = {
    initial: { scale: 0.8 },
    whileInView: { scale: 1 },
    transition: {
      type: 'spring',
      stiffness: 582,
      damping: 40,
      mass: 1
    }
  };

  const sectionRef = useRef(null);

  const { scrollY } = useScroll();
  const [transformBounderies, setTransformBounderies] = useState<[number, number]>([0, 1000]);
  useMotionValueEvent(scrollY, 'change', () => {
    if (sectionRef.current) {
      const { offsetTop, clientHeight } = sectionRef.current;
      setTransformBounderies([-440, offsetTop + clientHeight]);
    }
  });

  const scale = useTransform(scrollY, transformBounderies, [0.9, 1]);

  const [isAboveMd, setIsAboveMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsAboveMd(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div ref={sectionRef} {...sectionAnimation2}>
      <motion.section {...sectionAnimation} style={isAboveMd ? { scale } : {}} className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12">
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:gap-16">
          <div className="top-[160px] flex flex-col items-center gap-2 pb-12 md:sticky md:pb-48">
            <h2 className="text-xs font-medium text-muted-foreground sm:text-sm">Benefits</h2>
            <p className="flex-1 text-center text-2xl font-semibold sm:text-4xl">Why Use Rise2Role?</p>
          </div>
          {benefits.map((benefit, index) => (
            <div key={index} className="w-full md:sticky md:mx-auto md:max-w-[90%] lg:max-w-[850px]" style={{ top: `${380 + index * 20}px` }}>
              {index === 0 ? (
                <div className="absolute top-[-48px] hidden w-full flex-row gap-12 px-8 pb-6 md:flex">
                  <div className="flex flex-1 flex-row items-center gap-2">
                    <Smile className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
                    <p className="sm:text-md text-sm font-semibold text-primary">With Rise2Role</p>
                  </div>
                  <div></div>
                  <div className="flex flex-1 flex-row items-center gap-2">
                    <Frown className="h-4 w-4 text-destructive sm:h-6 sm:w-6" />
                    <p className="sm:text-md text-sm font-semibold text-destructive">Without</p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <BenefitItem {...benefit} />
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
