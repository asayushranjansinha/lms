import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { useLogoutMutation } from '@/state/api';
import { useAppSelector } from '@/state/redux';
import {
  IconLogout,
  IconUserCircle
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
export const SidebarNav = () => {
  const router = useRouter();
  const { user, authenticated } = useAppSelector((state) => state.global);
  const [logout] = useLogoutMutation();

  function handleLogout() {
    logout(undefined);
    router.push('/');
  }

  if (!user) return null;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar>
                <AvatarImage
                  src={user?.profilePicture || ''}
                  alt={user?.name || ''}
                />
                <AvatarFallback className='rounded-lg'>
                  {user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm leading-none font-medium'>{user.name}</p>
                <p className='text-muted-foreground text-xs leading-none'>
                  {user.email}
                </p>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side='bottom'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm leading-none font-medium'>{user.name}</p>
                <p className='text-muted-foreground text-xs leading-none'>
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push('/dashboard/profile')}
              >
                <IconUserCircle className='mr-2 h-4 w-4' />
                Profile
              </DropdownMenuItem>
              {/* <DropdownMenuItem>
                <IconCreditCard className='mr-2 h-4 w-4' />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconBell className='mr-2 h-4 w-4' />
                Notifications
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            {authenticated && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <IconLogout className='mr-2 h-4 w-4' />
                  Sign Out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
