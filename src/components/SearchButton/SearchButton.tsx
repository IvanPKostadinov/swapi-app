import React, { ButtonHTMLAttributes } from 'react';

interface SearchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
}

export const SearchButton = ({ icon, ...props }: SearchButtonProps): JSX.Element => {
  return (
    <button className='swapi-search-button' {...props}>
      {icon}
    </button>
  );
};
