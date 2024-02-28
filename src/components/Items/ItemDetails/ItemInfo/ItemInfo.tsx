import React from 'react';

interface ItemInfoProps {
  title: string;
  body: string;
}

export const ItemInfo = ({ title, body }: ItemInfoProps): JSX.Element => (
  <div className='swapi-item-info'>
    <h3 className='swapi-item-info__title'>{title}</h3>
    <span className='swapi-item-info__text'>{body}</span>
  </div>
);
