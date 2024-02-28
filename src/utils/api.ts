import axios from 'axios';

import { mapAndSortResponseArrayToItem, mapResponseToData } from './helpers';

export const BASE_URL = 'https://swapi.dev/api';

export enum Category {
  ALL = 'all',
  PEOPLE = 'people',
  PLANETS = 'planets',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles',
}

export interface Item {
  name: string;
  films: string[];
  url: string;
}

export interface Result {
  count: number;
  next?: string;
  previous?: string;
  results: Item[];
}

export interface SwapiResults<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

interface SwapiBase {
  url: string;
  id: string;
  created: string;
  edited: string;
  name: string;
  films: string[];
}

export interface People extends SwapiBase {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  species: string[];
  starships: string[];
  vehicles: string[];
}

export interface Planet extends SwapiBase {
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
}

export interface Starship extends SwapiBase {
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
}

export interface Vehicle extends SwapiBase {
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
}

export interface Film {
  url: string;
  created: string;
  edited: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

export type ItemCategory = People | Planet | Starship | Vehicle;

const getUrl = (params: string[], searchItem?: string): string => {
  const url = new URL(BASE_URL);
  params.forEach((param) => (url.pathname += `/${param}`));

  if (searchItem) {
    url.searchParams.append('search', searchItem);
  }

  return url.toString();
};

export const getStarWarsItemData = async (
  type: Category,
  id?: string
): Promise<{
  item?: ItemCategory;
  itemMovies?: Film[];
}> => {
  const url = getUrl([type, ...(id ? [id] : [])]);

  const item = await getStarWarsSingleItem(url);

  return {
    item,
    itemMovies: item?.films && (await getStarWarsManyItems(item.films)),
  };
};

const getStarWarsSingleItem = async (url: string): Promise<ItemCategory | undefined> => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    throw new Error('Could not get the item.');
  }
};

const getStarWarsManyItems = async (urls: string[]) => {
  try {
    const response = await axios.all(urls.map((url) => axios.get(url)));

    return response.map((item) => item.data);
  } catch (err) {
    throw new Error('Could not get the items.');
  }
};

export const getStarWarsCategoriesData = async (
  type: Category,
  searchItem?: string
): Promise<{
  items: Item[];
  nextPage?: string;
  prevPage?: string;
}> => {
  if (type === Category.ALL) {
    const categories = Object.values(Category).filter((category) => category !== Category.ALL);
    const urls = categories.map((category) => getUrl([category], searchItem));

    return {
      items: (await getStarWarsManyCategories(urls)) ?? [],
    };
  } else {
    const url = getUrl([type], searchItem);

    const data = await getStarWarsSingleCategory(url);

    return {
      items: data?.results ?? [],
      nextPage: data?.next,
      prevPage: data?.previous,
    };
  }
};

const getStarWarsManyCategories = async (urls: string[]): Promise<Item[] | undefined> => {
  try {
    const responseArr = await axios.all(urls.map((url) => axios.get(url)));

    const results = mapAndSortResponseArrayToItem(responseArr);

    return results;
  } catch (err) {
    throw new Error('Could not get the categories.');
  }
};

export const getStarWarsSingleCategory = async (url: string): Promise<Result | undefined> => {
  try {
    const response = await axios.get(url);

    return mapResponseToData(response.data);
  } catch (err) {
    throw new Error('Could not get the category.');
  }
};
