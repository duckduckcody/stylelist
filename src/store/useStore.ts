import create from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { FavouriteState, favouriteStore } from './favouriteStore';
import { FilterState, filterStore } from './filterStore';

export interface StoreState {
  filters: FilterState;
  favourites: FavouriteState;
}

// export const useStore = create<StoreState>()(
//   persist(
//     immer<StoreState>((...storeProps) => ({
//       filters: filterStore(...storeProps),
//       favourites: favouriteStore(...storeProps),
//     }))
//   )
// );

export const useBoundStore = create<StoreState>();
immer<StoreState>((...b) => (
  
)
  persist<StoreState>(
    (...a) => ({
      filters: filterStore(...a),
      favourites: favouriteStore(...a),
    }),
    { name: 'bound-store' }
  )
);

// create<IStateProps>()(persist(immer(set => {})))
