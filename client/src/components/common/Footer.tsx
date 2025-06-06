import { FooterNavigation } from '@/constants/data';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='bg-background relative border-t'>
      <div className='container mx-auto px-4 py-12 md:px-0'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div className='space-y-4'>
            <Link href='/' className='flex items-center space-x-2'>
              <Image
                src='/logo.png'
                alt='Learnova Logo'
                width={40}
                height={40}
              />
              {/* Brand Name */}
              <span className='text-xl font-bold'>Learnova</span>
            </Link>
            <p className='text-muted-foreground text-sm'>
              Empowering educators with cutting-edge LMS technology.
            </p>
          </div>

          {FooterNavigation.map(({ title, url, items }) => (
            <div key={title} className='space-y-4'>
              <h4 className='text-sm font-semibold'>{title}</h4>
              <ul className='text-muted-foreground space-y-2 text-sm'>
                {items?.map(({ title, url }) => (
                  <li key={title}>
                    <Link href={url} className='footer-link'>
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='text-muted-foreground mt-8 border-t pt-8 text-center text-sm'>
          <p>
            &copy; {new Date().getFullYear()} Learnova. All rights reserved.
          </p>
          <p>
            Crafted by{' '}
            <Link
              href='https://github.com/asayushranjan'
              target='_blank'
              rel='noreferrer'
            >
              Ayush Ranjan
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
