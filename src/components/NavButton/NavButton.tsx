import React, { ButtonHTMLAttributes } from 'react';

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: () => void;
}

export const NavButton = ({ label, onClick, ...props }: NavButtonProps): JSX.Element => {
  return (
    <button className='swapi-nav-button' {...props} onClick={onClick}>
      <span className='swapi-nav-button__label'>{label}</span>
    </button>
  );
};
