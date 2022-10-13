import create from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { PersistedState, persistedStateSchema } from '../types/PersistedState';
import { FavouriteState, favouriteStore } from './favouriteStore';
import { FilterState, filterStore } from './filterStore';

export interface StoreState {
  filters: FilterState;
  favourites: FavouriteState;
}

export const useStore = create<StoreState>()(
  immer(
    persist<StoreState, [['zustand/immer', never]], [], PersistedState>(
      (...storeProps) => ({
        filters: filterStore(...storeProps),
        favourites: favouriteStore(...storeProps),
      }),
      {
        name: 'stylelist',
        partialize: (state) => ({
          favourites: state.favourites.favourites,
        }),
        merge: (persistedState, currentState) => {
          const parse = persistedStateSchema.safeParse(persistedState);

          return {
            ...currentState,
            favourites: {
              ...currentState.favourites,
              favourites: parse.success ? parse.data.favourites : [],
            },
          };
        },
      }
    )
  )
);
