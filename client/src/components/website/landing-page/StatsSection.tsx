'use client';
/**
 * Components & Utilities
 */
import { AnimatedCounter } from '@/components/ui/animated-counter';

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export const StatsSection = () => {
  return (
    <section
      id='stats'
      className='bg-muted/50 border-y px-4 py-24 md:px-0'
      style={{ scrollMarginTop: 80 }}
    >
      <div className='container mx-auto grid gap-8 md:grid-cols-4'>
        <div className='text-center'>
          <div className='flex items-center justify-center text-3xl font-bold'>
            <AnimatedCounter value={50} />
            <div
              className='bg-card text-card-foreground flex items-center rounded-r-md pr-2'
              style={{ height }}
            >
              K+
            </div>
          </div>
          <div className='text-muted-foreground text-sm'>Students Managed</div>
        </div>
        <div className='text-center'>
          <div className='flex items-center justify-center text-3xl font-bold'>
            <AnimatedCounter value={1200} />
            <div
              className='bg-card text-card-foreground flex items-center rounded-r-md pr-2'
              style={{ height }}
            >
              +
            </div>
          </div>
          <div className='text-muted-foreground text-sm'>Courses Created</div>
        </div>
        <div className='text-center'>
          <div className='flex items-center justify-center text-3xl font-bold'>
            <AnimatedCounter value={99} />
            <div
              className='bg-card text-card-foreground flex items-center rounded-r-md pr-2'
              style={{ height }}
            >
              %
            </div>
          </div>
          <div className='text-muted-foreground text-sm'>Uptime Guarantee</div>
        </div>
        <div className='text-center'>
          <div className='text-3xl font-bold' style={{ height }}>
            <span className='bg-card text-card-foreground mx-auto flex w-fit items-center justify-center rounded-md px-2'>
              24/7
            </span>
          </div>
          <div className='text-muted-foreground text-sm'>Expert Support</div>
        </div>
      </div>
    </section>
  );
};
