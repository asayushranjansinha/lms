'use client';

/**
 * Packages and Libraries
 */
import { motion } from 'framer-motion';
import { ChevronRight, Rocket } from 'lucide-react';

/**
 * Components & Utilities
 */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 *
 * @returns CallToAction section for landing page
 */
export function CallToAction() {
  return (
    <section
      id='call-to-action'
      className='container mx-auto px-4 py-24 md:px-0'
    >
      <motion.div
        className=''
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className='bg-muted flex flex-col items-center gap-6 rounded-md p-6 text-center sm:p-14'
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <Badge variant='outline' className='mx-auto w-fit'>
              <Rocket className='mr-1 h-4 w-4 sm:h-3 sm:w-3' />
              Get Started
            </Badge>
          </motion.div>

          <motion.div
            className='flex max-w-lg flex-col gap-3 sm:max-w-4xl'
            variants={itemVariants}
          >
            <h2 className='text-2xl font-bold tracking-tight sm:text-4xl'>
              Empower your students and streamline your LMS today
            </h2>
            <p className='text-muted-foreground text-base sm:text-xl'>
              From advanced admin controls to personalized student learning, our
              platform is built to make education management simple, engaging,
              and effective. Start your journey with tools that support both
              teaching and learning — all in one place.
            </p>
          </motion.div>

          <motion.div
            className='flex w-full max-w-md flex-col gap-4 sm:w-auto sm:flex-row sm:gap-4'
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full sm:w-auto'
            >
              <Button
                size='lg'
                variant='outline'
                className='w-full text-base sm:w-auto'
              >
                Start Free Trial
                <ChevronRight className='ml-2 h-4 w-4' />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full sm:w-auto'
            >
              <Button
                size='lg'
                variant='outline'
                className='border-primary-foreground/20 hover:bg-primary-foreground hover:text-primary text-primary/80 w-full text-base sm:w-auto'
              >
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            className='mt-2 max-w-xs text-sm sm:max-w-none'
            variants={itemVariants}
          >
            No credit card required • 14-day free trial • Cancel anytime
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren'
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};
