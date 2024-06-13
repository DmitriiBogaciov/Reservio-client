'use client';

import React, { useState } from 'react';
import { Container, Nav,NavLink,DropdownToggle, NavItem, Navbar, Collapse, NavbarToggler, NavbarBrand, Dropdown, DropdownMenu } from 'reactstrap';

import { FaCalendar, FaHome } from 'react-icons/fa';
import TokenModal from './TokenModal';

const NavBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md" className="min-h-[100px] flex justify-between p-2 lg:m-4 m-2 mt-0 rounded-lg rounded-t-none bg-gray-800 drop-shadow-sm" data-testid="navbar">
      <NavbarBrand href="/">Reservio</NavbarBrand>
      <NavbarToggler onClick={toggle} className="w-auto" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-flex align-items-center">
            <NavLink href="/" className="d-flex align-items-center mr-4">
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink href="/reservation" className="d-flex align-items-center">
              <FaCalendar className="mr-2" />
              Reservation
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBarComponent;
