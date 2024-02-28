import { useCallback, useState } from 'react';

import { Category, Item, getStarWarsCategoriesData, getStarWarsSingleCategory } from 'utils/api';

interface HistoryUrl {
  nextPage?: string;
  prevPage?: string;
}

type UseItemsData = (params: { type: Category; searchItem?: string }) => {
  items: Item[];
  historyUrl?: HistoryUrl;
  isLoading: boolean;
  error?: string;
  getData: () => Promise<void>;
  handleNavigate: (url: string) => Promise<void>;
};

export const useItemsData: UseItemsData = ({ type, searchItem }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [historyUrl, setHistoryUrl] = useState<HistoryUrl>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const getData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    try {
      const data = await getStarWarsCategoriesData(type, searchItem ?? undefined);

      if (data.items.length > 0) {
        setItems(data.items);
        setHistoryUrl({ nextPage: data.nextPage, prevPage: data.prevPage });
      } else {
        setError('Could not find any matching results. Please try again!');
      }

      setIsLoading(false);
    } catch (err) {
      setError('Something went wrong');
    }
  }, [searchItem, type]);

  const handleNavigate = useCallback(async (url: string): Promise<void> => {
    setIsLoading(true);
    setError(undefined);

    try {
      const data = await getStarWarsSingleCategory(url);

      setItems(data?.results ?? []);
      setHistoryUrl({ nextPage: data?.next, prevPage: data?.previous });
      setIsLoading(false);
    } catch (err) {
      setError('Something went wrong');
    }
  }, []);

  return {
    items,
    historyUrl,
    isLoading,
    error,
    getData,
    handleNavigate,
  };
};
