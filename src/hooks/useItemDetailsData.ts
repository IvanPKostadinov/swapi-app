import { useCallback, useState } from 'react';

import { Category, Film, ItemCategory, getStarWarsItemData } from 'utils/api';

type UseItemDetailsData = (params: { type: Category; id?: string }) => {
  item?: ItemCategory;
  films?: Film[];
  isLoading: boolean;
  error?: string;
  getData: () => Promise<void>;
};

export const useItemDetailsData: UseItemDetailsData = ({ type, id }) => {
  const [item, setItem] = useState<ItemCategory>();
  const [films, setMovies] = useState<Film[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const getData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    try {
      const data = await getStarWarsItemData(type, id);

      if (data.item) {
        setItem(data.item);
        setMovies(data.itemMovies);
      } else {
        setError('Something went wrong. Please try again!');
      }

      setIsLoading(false);
    } catch (err) {
      setError('Something went wrong');
    }
  }, [id, type]);

  return {
    item,
    films,
    isLoading,
    error,
    getData,
  };
};
