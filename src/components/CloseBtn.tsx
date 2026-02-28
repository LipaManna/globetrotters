
'use client'; // This directive makes it a Client Component

import React from 'react';

interface CloseBtnProps {
  onClose?: () => void;
}

const CloseBtn = ({ onClose }: CloseBtnProps) => {
  const handleClose = () => {
    console.log('CloseBtn clicked');
    if (onClose) {
      onClose();
    } else {
      // Fallback logic if onClose is not provided
      const bodyTag = document.querySelector<HTMLDivElement>('body');
      if (bodyTag) {
        bodyTag.classList.remove('menuOpen');
      }
      const navbarToggler = document.querySelector<HTMLDivElement>('.navbar-toggler');
      if (navbarToggler) {
        navbarToggler.classList.add('collapsed');
      }
      const navbarCollapse = document.querySelector<HTMLDivElement>('.navbar-collapse');
      if (navbarCollapse) {
        navbarCollapse.classList.remove('show');
      }
    }
  };

  return (
    <button type="button" className="closebtn" onClick={handleClose} aria-label="Close menu">
      <img src="/closeicon.png" alt="Close" />
    </button>
  );
};

export default CloseBtn;