import { AxiosResponse } from 'axios';

import { Item, ItemCategory, Result, SwapiResults } from 'utils/api';

export const mapResponseToData = ({
  count,
  next,
  previous,
  results,
}: SwapiResults<ItemCategory>): Result => ({
  count,
  next,
  previous,
  results: results.map(({ name, films, url }) => ({
    name,
    films,
    url,
  })),
});

export const mapAndSortResponseArrayToItem = (
  responseArr: AxiosResponse<SwapiResults<ItemCategory>>[]
): Item[] => {
  const dataArr = responseArr.map((response) => mapResponseToData(response.data));
  const sortedDataArr = dataArr.sort((a, b) => b.count - a.count);

  return sortedDataArr.map((data) => data.results).flat();
};

export const capitalizeString = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
