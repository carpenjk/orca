import { HTMLProps } from 'react';
import NavItem from './NavItem';
import {HomeIcon, SquaresPlusIcon, TableCellsIcon, UserIcon, ArrowsRightLeftIcon} from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge';
import { useGetUserDetailsQuery } from 'app/services/auth';
import NavText from './Navtext';
import { useSidebarToggle } from 'features/sidebar';

type Props = {
  className?: HTMLProps<HTMLElement>["className"];
}

const Navbar = ({className}: Props) => {
  const {isCollapsed, toggleSidebar} = useSidebarToggle();
  const {data: user, status} = useGetUserDetailsQuery();
  const isLoggedIn = user?.email && status === "fulfilled";

  return (
    <>
      <div className={twMerge(`fixed bottom-0 md:top-0 md:left-0 w-screen md:h-screen md:pl-4 md:pt-28 md:pr-8 md:flex 
          md:flex-col md:w-auto bg-gradient-to-r from-secondary-3/20 via-secondary-3/20 to-primary-8/20
          dark:from-dk-secondary-8/20 dark:via-dk-secondary-9/20 dark:to-dk-primary-9 from-10% via-30%`
          , className)}>
        <nav className='relative w-full'>
          <ul className="flex justify-between w-full md:space-y-6 md:flex-col ">
            <NavItem collapsed={isCollapsed} to="/" >
              <HomeIcon className='flex-none w-5 h-5 fill '/><NavText>Dashboard</NavText></NavItem>
            <NavItem collapsed={isCollapsed} to="/workflow" >
              <SquaresPlusIcon className='flex-none w-5 h-5'/>
              <span className='flex space-x-1.5'>
                <NavText>Workflows</NavText>
              </span>
            </NavItem>
            <NavItem collapsed={isCollapsed} to="/manage" >
              <TableCellsIcon className='flex-none w-5 h-5'/>
              <span className='flex space-x-1.5'>
                <NavText>Deployments</NavText>
              </span>
            </NavItem>
            {!isLoggedIn && 
              <NavItem collapsed={isCollapsed} to="/login" ><UserIcon className='flex-none w-5 h-5'/>
                <NavText>Login</NavText>
              </NavItem>
            }
            {isLoggedIn && 
            <NavItem collapsed={isCollapsed} to="/logout" >
              <UserIcon className='flex-none w-5 h-5'/><NavText>Logout</NavText>
            </NavItem>
            }
          </ul>
          <button onClick={toggleSidebar} className='absolute hidden p-1 border rounded-md md:flex text-text-normal dark:text-dk-text-normal slate-400 w-7 h-7 -right-11 top-3 hover:animate-bounce-once border-primary-6 dark:border-dk-primary-6'><ArrowsRightLeftIcon/></button>
        </nav>
      </div> 
  </>
  );
}
 
export default Navbar;