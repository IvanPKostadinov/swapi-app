import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

export const LoadingSpinner = (): JSX.Element => (
  <RotatingLines width='70' strokeColor='#495057' ariaLabel='loading' />
);
