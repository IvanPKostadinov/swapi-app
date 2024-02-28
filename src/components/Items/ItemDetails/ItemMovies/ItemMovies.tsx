import React from 'react';
import { format } from 'date-fns';

import { Film } from 'utils/api';

interface ItemMoviesProps {
  films: Film[];
}

export const ItemMovies = ({ films }: ItemMoviesProps): JSX.Element => (
  <div className='swapi-item-films'>
    <h3 className='swapi-item-movies__title'>Movies</h3>
    <ul>
      {films?.map((film) => (
        <li key={film.episode_id}>
          <span className='swapi-item-movies__text'>
            Ep. {film.episode_id}: {film.title} ({format(film.release_date, 'yyyy')})
          </span>
        </li>
      ))}
    </ul>
  </div>
);
