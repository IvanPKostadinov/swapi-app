import React from 'react';

interface ErrorMessageProps {
  text: string;
}

export const ErrorMessage = ({ text }: ErrorMessageProps): JSX.Element => <span className='swapi-error-message'>{text}</span>;
