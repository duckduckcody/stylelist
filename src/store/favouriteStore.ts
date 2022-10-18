import { StateCreator } from 'zustand';
import { Clothe } from '../types/Clothe';
import { StoreState } from './useStore';

export interface FavouriteState {
  favourites: Clothe[];
  addFavourite: (clothe: Clothe) => void;
  removeFavourite: (clothe: Clothe) => void;
}

export const favouriteStore: StateCreator<
  StoreState,
  [['zustand/immer', never], ['zustand/persist', unknown]],
  [],
  FavouriteState
> = (set) => ({
  favourites: [],
  addFavourite: (clothe) => {
    set((state) => {
      state.favourites.favourites.push(clothe);
    });
  },
  removeFavourite: (clothe) => {
    set((state) => {
      state.favourites.favourites = state.favourites.favourites.filter(
        (fav) => fav.link !== clothe.link
      );
    });
  },
});
