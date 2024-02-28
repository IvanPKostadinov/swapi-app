import React, { useCallback } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { SearchForm } from 'components/Form/SearchForm';
import { Title } from 'components/Title';

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleSearch = useCallback(
    async (pathname: string, searchQuery?: string): Promise<void> => {
      navigate({
        pathname,
        ...(searchQuery && { search: createSearchParams({ search: searchQuery }).toString() }),
      });
    },
    [navigate]
  );

  return (
    <div className='swapi-home-page'>
      <section className='swapi-home-page__content'>
        <Title
          title='Star Wars'
          subtitle={
            <>
              Want to find something about the Star Wars Universe?
              <br />
              We've got you covered!
              <br />
              Just type anything in the Search field, select a Category, and press Enter.
            </>
          }
        />
        <SearchForm onSearch={handleSearch} />
      </section>
    </div>
  );
};
