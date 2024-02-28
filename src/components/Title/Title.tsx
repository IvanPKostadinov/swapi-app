import React from 'react';

interface TitleProps {
  title: string;
  subtitle?: React.ReactNode;
}

export const Title = ({ title, subtitle }: TitleProps): JSX.Element => (
  <div className='swapi-title'>
    <h1 className='swapi-title__title-text'>{title}</h1>
    {subtitle && <p className='swapi-title__subtitle-text'>{subtitle}</p>}
  </div>
);
