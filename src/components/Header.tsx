'use client';

import Link from 'next/link';
import CloseBtn from '../components/CloseBtn';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const toggleMenu = () => {
    const bodyTag = document.querySelector('body');
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    const navbarToggler = document.querySelector('.navbar-toggler');

    if (bodyTag) {
      bodyTag.classList.toggle('menuOpen');
    }
    if (navbarCollapse) {
      navbarCollapse.classList.toggle('show');
    }
    if (navbarToggler) {
      navbarToggler.classList.toggle('collapsed');
    }
  };

  const closeMenu = () => {
    const bodyTag = document.querySelector('body');
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    const navbarToggler = document.querySelector('.navbar-toggler');

    if (bodyTag) {
      bodyTag.classList.remove('menuOpen');
    }
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
    if (navbarToggler) {
      navbarToggler.classList.add('collapsed');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <Link className="logo" href="/">
            <img src="/logo.svg" alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className={currentPage === 'home' ? 'current-menu-item' : ''}>
                <Link href="/" onClick={closeMenu}>home</Link>
              </li>
              <li className={currentPage === 'holiday-packages' ? 'current-menu-item' : ''}>
                <Link href="/holiday-packages" onClick={closeMenu}>Holiday Packages</Link>
              </li>
              <li className={currentPage === 'about' ? 'current-menu-item' : ''}>
                <Link href="/about" onClick={closeMenu}>About Us</Link>
              </li>
              <li className={currentPage === 'faq' ? 'current-menu-item' : ''}>
                <Link href="/faq" onClick={closeMenu}>FAQ</Link>
              </li>
              <li className={currentPage === 'contact' ? 'current-menu-item' : ''}>
                <Link href="/contact" onClick={closeMenu}>Contact Us</Link>
              </li>
              <li className='border-none'><CloseBtn onClose={closeMenu} /></li>
            </ul>
            {/* <CloseBtn onClose={closeMenu} /> */}
          </div>
        </nav>
      </div>
    </header>
  );
}
