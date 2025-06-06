'use client';
/**
 * Packages & Libraries
 */
import Link from 'next/link';

/**
 * Components & Utilities
 */
import { Button } from '@/components/ui/button';
import { HeaderNavItems } from '@/constants/data';
import { useAppSelector } from '@/state/redux';
import Image from 'next/image';
import { UserNav } from '../layout/UserNav';

export const Header = () => {
  const { authenticated } = useAppSelector((state) => state.global);
  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4 md:px-0'>
        {/* Brand Logo & Name */}
        <Link href='/' className='flex items-center space-x-2'>
          <Image src='/logo.png' alt='Learnova Logo' width={64} height={64} />
          {/* Brand Name */}
          <span className='text-xl font-bold'>Learnova</span>
        </Link>

        <nav className='hidden items-center space-x-6 md:flex'>
          {HeaderNavItems.map(({ url, title }) => (
            <Link
              key={title}
              href={url}
              className='hover:text-primary text-sm font-medium transition-colors'
            >
              {title}
            </Link>
          ))}
        </nav>

        {!authenticated ? (
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='sm'>
              Sign In
            </Button>
            <Button size='sm' asChild>
              <Link href='/signup'>Get Started</Link>
            </Button>
          </div>
        ) : (
          <div className='flex items-center space-x-4'>
            <UserNav />
            <Button size='sm' asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
