import React from 'react';

import { RouteParams } from 'App';
import { SingleItem } from '../SingleItem/SingleItem';
import { useParams } from 'react-router-dom';
import { BASE_URL, Item } from 'utils/api';

interface ItemsListProps {
  items: Item[];
}

export const ItemsList = ({ items }: ItemsListProps): JSX.Element => {
  const { type, id } = useParams<RouteParams>();

  return (
    <ul className='swapi-items-list'>
      {items.map((item, index) => {
        const filmIds = item.films.map((film) => {
          return film.match(/\d+/g)?.join('') ?? '';
        });

        const path = item.url.replace(BASE_URL, '');

        return (
          <li key={`${item.name}-${index}`}>
            <SingleItem
              path={path}
              name={item.name}
              filmIds={filmIds}
              isSelected={`/${type}/${id}/` === path}
            />
          </li>
        );
      })}
    </ul>
  );
};
