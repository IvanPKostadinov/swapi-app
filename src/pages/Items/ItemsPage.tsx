import React, { useCallback, useEffect } from 'react';
import {
  Outlet,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { ItemsList } from 'components/Items/ItemsList';
import { RouteParams } from 'App';
import { Category } from 'utils/api';
import { SearchForm } from 'components/Form/SearchForm';
import { Title } from 'components/Title';
import { NavButton } from 'components/NavButton';
import { useItemsData } from 'hooks/useItemsData';
import { ErrorMessage } from 'components/ErrorMessage';
import { LoadingSpinner } from 'components/LoadingSpinner';

export const ItemsPage = (): JSX.Element => {
  const { type, id } = useParams<RouteParams>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchItem = searchParams.get('search');
  const { items, historyUrl, isLoading, error, getData, handleNavigate } = useItemsData({
    type: type as Category,
    searchItem: searchItem ?? undefined,
  });

  useEffect(() => {
    if (!id) {
      getData();
    }
  }, [getData, id]);

  const handleSearch = useCallback(
    async (pathname: string, searchQuery?: string): Promise<void> => {
      navigate({
        pathname,
        ...(searchQuery && { search: createSearchParams({ search: searchQuery }).toString() }),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className='swapi-items-page'>
      <div className='swapi-items-page__content'>
        <Title title='Star Wars' />
        <div className='swapi-items-page__search-container'>
          <SearchForm
            initialType={type as Category}
            initialSearch={searchItem ?? undefined}
            onSearch={handleSearch}
          />
        </div>
        <div className='swapi-items-page__navigation-buttons'>
          {historyUrl?.prevPage && (
            <div className='swapi-items-page__navigation-button-left'>
              <NavButton label='Prev' onClick={() => handleNavigate(historyUrl.prevPage!)} />
            </div>
          )}
          {historyUrl?.nextPage && (
            <div className='swapi-items-page__navigation-button-right'>
              <NavButton label='Next' onClick={() => handleNavigate(historyUrl.nextPage!)} />
            </div>
          )}
        </div>
        {isLoading && !error && <LoadingSpinner />}

        {error && <ErrorMessage text={error} />}

        {items.length > 0 && !isLoading && !error && (
          <div className='swapi-items-page__items-content'>
            <div className='swapi-items-page__items-container'>
              <ItemsList items={items} />
            </div>
            <div className='swapi-items-page__item-container-desktop'>
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
