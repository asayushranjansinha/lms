/**
 * Package and Libraries Imports
 */
import React from 'react';

/**
 * Component Imports
 */
import { Button } from '@/components/ui/button';
import { IconBrandGithub } from '@tabler/icons-react';

/**
 * The call to action button to redirect the user to my GitHub.
 * @returns JSX.Element
 */

export default function CTAGithub() {
  return (
    <Button variant='ghost' asChild size='sm' className='hidden sm:flex'>
      <a
        href='https://github.com/asayushranjansinha/'
        rel='noopener noreferrer'
        target='_blank'
        className='dark:text-foreground'
      >
        <IconBrandGithub />
      </a>
    </Button>
  );
}
