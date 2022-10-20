import forEach from 'lodash.foreach';
import { StateCreator } from 'zustand';
import { SortEnum } from '../types/Sort';
import { StoreState } from './useStore';

export enum BooleanFilterId {
  onSale = 'onSale',
}

export interface OnSaleFilter {
  text: 'On Sale';
  selected: boolean;
  setSelected: (value: boolean) => void;
}

export interface SortFilter {
  text: 'Sort';
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

export interface FacetOption {
  id: string;
  text: string;
  options: string[];
  selected: string[];
  setSelected: (value: string) => void;
  clear: VoidFunction;
  type: 'checkbox' | 'range';
}

export interface FilterState {
  facetOptions: FacetOption[];
  addFacetOption: (
    name: string,
    options: string[],
    type: 'checkbox' | 'range'
  ) => void;

  textSearch: string;
  handleTextSearchChange: (value: string) => void;

  onSale: OnSaleFilter;
  sort: SortFilter;

  clearFilters: VoidFunction;
}

export const filterStore: StateCreator<
  StoreState,
  [['zustand/immer', never], ['zustand/persist', unknown]],
  [],
  FilterState
> = (set) => ({
  facetOptions: [],
  addFacetOption: (name, options, type) => {
    set((state) => {
      const alreadySet = state.filters.facetOptions.find(
        (facet) => facet.id === name
      );
      if (!alreadySet) {
        state.filters.facetOptions.push({
          id: name,
          type,
          text: name.toLocaleLowerCase(),
          options: options,
          selected: [],
          clear: () =>
            set((state) => {
              const option = state.filters.facetOptions.find(
                (o) => o.id === name
              );
              if (option) {
                option.selected = [];
              }
            }),
          setSelected: (value) => {
            set((state) => {
              const option = state.filters.facetOptions.find(
                (o) => o.id === name
              );
              if (option) {
                const indexOf = option.selected.indexOf(value);
                if (indexOf !== -1) {
                  option.selected.splice(indexOf, 1);
                } else {
                  option.selected.push(value);
                }
              }
            });
          },
        });
      }
    });
  },

  textSearch: '',
  handleTextSearchChange: (value) => {
    set((state) => {
      state.filters.textSearch = value;
    });
  },

  onSale: {
    text: 'On Sale',
    selected: false,
    setSelected: (value) =>
      set((state) => {
        state.filters.onSale.selected = value;
      }),
  },

  sort: {
    text: 'Sort',
    options: SortEnum.options,
    selected: '',
    setSelected: (value: string) =>
      set((state) => {
        state.filters.sort.selected = value;
      }),
  },

  clearFilters: () =>
    set((state) => {
      forEach(state.filters.facetOptions, (facet) => {
        facet.selected = [];
      });

      state.filters.onSale.selected = false;
    }),
});
