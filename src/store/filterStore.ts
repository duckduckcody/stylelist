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
  setSelected: (value: unknown) => void;
}

export interface CheckboxFacetOption {
  type: 'checkbox';
  id: string;
  text: string;
  options: string[];
  selected: string[];
  setSelected: (value: unknown) => void;
  clear: VoidFunction;
  createValueText: (options: string[]) => string;
}

export interface RangeFacetOption {
  type: 'range';
  id: string;
  text: string;
  options: string[];
  selected: string[];
  setSelected: (value: unknown) => void;
  clear: VoidFunction;
  createValueText: (options: string[]) => string;
}

export interface FilterState {
  facetOptions: (CheckboxFacetOption | RangeFacetOption)[];
  addFacetOption: (
    name: string,
    options: string[],
    type: 'checkbox' | 'range',
    createValueText?: (options: string[]) => string
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
  addFacetOption: (name, options, type, createValueText) => {
    set((state) => {
      const alreadySet = state.filters.facetOptions.find(
        (facet) => facet.id === name
      );
      if (!alreadySet) {
        const defaultCreateValueText = (options: string[]) =>
          options.join(', ');

        state.filters.facetOptions.push({
          id: name,
          type,
          text: name.toLocaleLowerCase(),
          options: options,
          selected: [],
          createValueText: createValueText ?? defaultCreateValueText,
          clear: () =>
            set((state) => {
              const option = state.filters.facetOptions.find(
                (o) => o.id === name
              );
              if (option) {
                option.selected = [];
              }
            }),
          setSelected: (value: unknown) => {
            set((state) => {
              const option = state.filters.facetOptions.find(
                (o) => o.id === name
              );

              if (
                option &&
                option.type === 'checkbox' &&
                typeof value === 'string'
              ) {
                const indexOf = option.selected.indexOf(value);
                if (indexOf !== -1) {
                  option.selected.splice(indexOf, 1);
                } else {
                  option.selected.push(value);
                }
              } else if (
                option &&
                option.type === 'range' &&
                Array.isArray(value)
              ) {
                if (value[0] === undefined) {
                  option.selected = ['0', value[1]];
                } else {
                  option.selected = value;
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
    setSelected: (value: unknown) =>
      set((state) => {
        if (typeof value === 'string') {
          state.filters.sort.selected = value;
        }
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
