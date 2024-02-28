import React from 'react';

import { Card } from 'components/Card';
import { ItemDetails } from '../ItemDetails';

interface SingleItemProps {
  path: string;
  name: string;
  filmIds: string[];
  isSelected?: boolean;
}

export const SingleItem = ({ path, name, filmIds, isSelected }: SingleItemProps): JSX.Element => (
  <Card to={path} isSelected={isSelected}>
    <h2 className='swapi-single-item__name'>{name}</h2>{' '}
    {filmIds && filmIds.length > 0 && (
      <span className='swapi-single-item__text'>(Appears in Episodes {filmIds.join(', ')})</span>
    )}
    {isSelected && (
      <div className='swapi-single-item__details'>
        <hr />
        <h3 className='swapi-single-item__details-title'>Details:</h3>
        <ItemDetails isDesktop={false} />
      </div>
    )}
  </Card>
);
