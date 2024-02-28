import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  children: React.ReactNode;
  to?: string;
  isSelected?: boolean;
}

export const Card = ({ children, to, isSelected }: CardProps): JSX.Element => {
  const content = (
    <article className={`swapi-card${to ? ' link' : ''}${isSelected ? ' selected' : ''}`}>
      {children}
    </article>
  );
  return <>{to ? <Link to={to}>{content}</Link> : content}</>;
};
