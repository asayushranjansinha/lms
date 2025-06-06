/**
 * Package and Libraries Imports
 */

/**
 * Component Imports
 */
import { BreadcrumbsComponent } from '@/components/common/BreadCrumbsComponent';
import SearchInput from '@/components/kbar/SearchInput';
import { ThemeSelector } from '@/components/layout/theme/ThemeSelector';
import { ThemeToggleButton } from '@/components/layout/theme/ThemeToggle';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import CTAGithub from './CTA-Github';
import { UserNav } from '../layout/UserNav';

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <BreadcrumbsComponent />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <CTAGithub />
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNav />
        <ThemeToggleButton />
        <ThemeSelector />
      </div>
    </header>
  );
}
