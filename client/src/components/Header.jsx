import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  NavbarLink,
  Button,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
} from 'flowbite-react';
import Avatar from 'react-avatar';

import { useState, useRef, useEffect } from 'react';
import anyImage from '../assets/any.png';
import api from '../api/urls';
import Navbarsb from './Navbar';
import { Save, Sun, Moon, CircleUser } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Component() {
  const { appConsts, theme, toggleTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const { user, isAuth } = useAuth();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <Navbar
      ref={navRef}
      className="sticky bg-primary dark:bg-primary text-white top-0 z-5 shadow-md"
    >
      <NavbarBrand to="/" as={Link}>
        <Save className="size-10 mr-5 stroke-white" />
        <span className="hidden md:block self-center text-white whitespace-nowrap text-2xl font-semibold">
          {appConsts.appName}
        </span>
      </NavbarBrand>

      <div className="flex items-center gap-4 md:order-2">
        <button onClick={toggleTheme} className="nav-link clickable">
          {theme === 'dark' ? (
            <Moon className="stroke-white  stroke-2" />
          ) : (
            <Sun className=" stroke-white stroke-2" />
          )}
        </button>
        {isAuth && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                size="40"
                src={anyImage}
                email={user.email}
                round={true}
                className="text-white bg-primary"
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">
                {user.fname + ' ' + user.lname}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </DropdownHeader>
            <DropdownItem>
              <Link to={api.folderById(user.rootFolder.id)}>My Files</Link>
            </DropdownItem>
            <DropdownItem>
              <Link to={'my-shares'}>My Shares</Link>
            </DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>
              <Link to={'logout'}>Sign out</Link>
            </DropdownItem>
          </Dropdown>
        )}
        <NavbarToggle
          className="text-white "
          onClick={() => setIsOpen(!isOpen)}
        />{' '}
      </div>

      <NavbarCollapse className={isOpen ? 'block' : 'hidden'}>
        <Navbarsb onLinkClick={() => setIsOpen(false)} />
      </NavbarCollapse>
    </Navbar>
  );
}
