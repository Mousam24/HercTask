import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  height: 50px;
  width: 98%;
  background: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <h1>Flashcard Learning App</h1>
      <NavLinks>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all-flashcards">All Flashcards</NavLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
