import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { FilterState, filterStore } from './filterStore';

export interface StoreState {
  filters: FilterState;
}

export const useStore = create(
  immer<StoreState>((...storeProps) => ({
    filters: filterStore(...storeProps),
  }))
);
