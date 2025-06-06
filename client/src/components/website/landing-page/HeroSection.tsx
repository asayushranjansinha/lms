'use client';
/**
 * Package & Library Imports
*/
import { ChevronRight, Play, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
/**
 * Components Imports
 */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * Constants Imports
 */
import heroContent from '@/constants/hero-content.json';

const iconMap = {
  Star: <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />,
  TrendingUp: <TrendingUp className='h-5 w-5 text-green-500' />,
  Users: <Users className='h-5 w-5 text-blue-500' />
};

export const HeroSection = () => {
  return (
    <section
      id='hero-section'
      className='container mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32'
    >
      <div className='grid gap-12 lg:grid-cols-2 lg:gap-16'>
        {/* Left Content */}
        <motion.div
          className='space-y-8'
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className='space-y-4'>
            <Badge variant='outline' className='inline-flex w-fit items-center'>
              <Zap className='mr-1 h-3 w-3' />
              {heroContent.badge}
            </Badge>
            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl'>
              {heroContent.heading.before_highlight}{' '}
              <span className='text-primary'>
                {heroContent.heading.highlight}
              </span>
            </h1>
            <p className='text-muted-foreground max-w-[600px] text-base sm:text-lg md:text-xl'>
              {heroContent.subtext}
            </p>
          </div>

          <div className='flex flex-col gap-4 sm:flex-row'>
            <Button size='lg' className='w-full text-base sm:w-auto'>
              {heroContent.primary_button}
              <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='w-full text-base sm:w-auto'
            >
              <Play className='mr-2 h-4 w-4' />
              {heroContent.secondary_button}
            </Button>
          </div>

          <div className='text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-2 text-sm'>
            {heroContent.stats.map((stat, idx) => (
              <div key={idx} className='flex items-center space-x-1'>
                {stat.icon && iconMap[stat.icon as keyof typeof iconMap]}
                <span className='font-medium'>{stat.text}</span>
                {stat.extra && (
                  <span className='text-muted-foreground'>{stat.extra}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          className='relative w-full'
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className='bg-background relative rounded-xl border p-2 shadow-2xl'>
            <Image
              src={'/assets/hero-image.jpg'}
              alt='Learnova LMS Preview'
              width={600}
              height={400}
              className='h-auto w-full rounded-lg dark:hidden'
            />
            <Image
              src={'/assets/hero-image-dark.jpg'}
              alt='Learnova LMS Preview'
              width={600}
              height={400}
              className='h-auto w-full rounded-lg dark:block hidden'
            />
            {/* Bottom-left card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className='bg-background absolute -bottom-4 left-0 w-[80%] max-w-xs rounded-lg border p-4 shadow-lg sm:-bottom-4 sm:-left-4'
            >
              <div className='flex items-center space-x-2'>
                {
                  iconMap[
                    heroContent.illustration.bottom_left_card
                      .icon as keyof typeof iconMap
                  ]
                }
                <div>
                  <p className='text-sm font-medium'>
                    {heroContent.illustration.bottom_left_card.title}
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    {heroContent.illustration.bottom_left_card.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Top-right card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
              className='bg-background absolute -top-4 right-0 w-[80%] max-w-xs rounded-lg border p-4 shadow-lg sm:-top-4 sm:-right-4'
            >
              <div className='flex items-center space-x-2'>
                {
                  iconMap[
                    heroContent.illustration.top_right_card
                      .icon as keyof typeof iconMap
                  ]
                }
                <div>
                  <p className='text-sm font-medium'>
                    {heroContent.illustration.top_right_card.title}
                  </p>
                  <p className='text-muted-foreground text-xs'>
                    {heroContent.illustration.top_right_card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
