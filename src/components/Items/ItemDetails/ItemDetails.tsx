import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { RouteParams } from 'App';
import { Category, ItemCategory, People, Planet, Starship, Vehicle } from 'utils/api';
import { Card } from 'components/Card';
import { ItemInfo } from './ItemInfo';
import { ItemMovies } from './ItemMovies';
import { useItemDetailsData } from 'hooks/useItemDetailsData';
import { ErrorMessage } from 'components/ErrorMessage';
import { LoadingSpinner } from 'components/LoadingSpinner';

interface ItemDetailsProps {
  isDesktop: boolean;
}

export const ItemDetails = ({ isDesktop }: ItemDetailsProps): JSX.Element => {
  const { type, id } = useParams<RouteParams>();

  const { item, films, isLoading, error, getData } = useItemDetailsData({
    type: type as Category,
    id,
  });

  useEffect(() => {
    getData();
  }, [getData]);

  const renderItemInfo = (item: ItemCategory): JSX.Element | undefined => {
    switch (type) {
      case Category.PEOPLE:
        return (
          <>
            <ItemInfo title='Name' body={(item as People).name} />
            <ItemInfo title='Height' body={(item as People).height} />
            <ItemInfo title='Hair' body={(item as People).hair_color} />
            <ItemInfo title='Skin' body={(item as People).skin_color} />
            <ItemInfo title='Eyes color' body={(item as People).eye_color} />
            <ItemInfo title='Gender' body={(item as People).gender} />
          </>
        );
      case Category.PLANETS:
        return (
          <>
            <ItemInfo title='Name' body={(item as Planet).name} />
            <ItemInfo title='Population' body={(item as Planet).population} />
            <ItemInfo title='Climate' body={(item as Planet).climate} />
            <ItemInfo title='Gravity' body={(item as Planet).gravity} />
            <ItemInfo title='Diameter' body={(item as Planet).diameter} />
            <ItemInfo title='Terrain' body={(item as Planet).terrain} />
          </>
        );
      case Category.STARSHIPS:
        return (
          <>
            <ItemInfo title='Name' body={(item as Starship).name} />
            <ItemInfo title='Model' body={(item as Starship).model} />
            <ItemInfo title='Crew' body={(item as Starship).crew} />
            <ItemInfo title='Cost in credits' body={(item as Starship).cost_in_credits} />
            <ItemInfo title='Manufacturer' body={(item as Starship).manufacturer} />
            <ItemInfo title='Length' body={(item as Starship).length} />
          </>
        );
      case Category.VEHICLES:
        return (
          <>
            <ItemInfo title='Name' body={(item as Vehicle).name} />
            <ItemInfo title='Model' body={(item as Vehicle).model} />
            <ItemInfo title='Crew' body={(item as Vehicle).crew} />
            <ItemInfo title='Cost in credits' body={(item as Vehicle).cost_in_credits} />
            <ItemInfo title='Manufacturer' body={(item as Vehicle).manufacturer} />
            <ItemInfo title='Length' body={(item as Vehicle).length} />
          </>
        );
    }
  };

  const content = isDesktop ? (
    <Card isSelected>
      {item && renderItemInfo(item)}
      {films && films.length > 0 && <ItemMovies films={films} />}
    </Card>
  ) : (
    <div>
      {item && renderItemInfo(item)}
      {films && films.length > 0 && <ItemMovies films={films} />}
    </div>
  );

  return (
    <>
      {isLoading && !error && (
        <div className='swapi-item-details__loading-spinner'>
          <LoadingSpinner />
        </div>
      )}
      {error && <ErrorMessage text={error} />}
      {!isLoading && !error && content}
    </>
  );
};
