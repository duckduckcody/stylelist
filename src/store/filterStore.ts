import forEach from 'lodash.foreach';
import { ChangeEvent } from 'react';
import { StateCreator } from 'zustand';
import { StoreState } from './useStore';

enum CheckboxFilterId {
  gender = 'gender',
  size = 'size',
  category = 'category',
  brand = 'brand',
  price = 'price',
}

enum RadioFilterId {}

enum SortOption {
  priceLowToHigh = 'Price Low To High',
  priceHighToLow = 'Price High To Low',
}

enum BooleanFilterId {
  onSale = 'onSale',
}

export interface CheckboxFilter {
  id: CheckboxFilterId;
  text: string;
  options: string[];
  selected: string[];
  setSelected: (value: string) => void;
  clear: VoidFunction;
}

interface RadioFilterOption {
  id: RadioFilterId;
  text: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

interface BooleanFilterOption {
  id: BooleanFilterId;
  text: string;
  selected: boolean;
  setSelected: (value: boolean) => void;
}

export interface FilterState {
  textSearch: string;
  handleTextSearchChange: (
    event: ChangeEvent<HTMLInputElement> | undefined
  ) => void;

  toggleCheckbox: (id: CheckboxFilterId, value: string) => void;

  checkboxes: Record<CheckboxFilterId, CheckboxFilter>;
  radios: Record<RadioFilterId, RadioFilterOption>;
  booleans: Record<BooleanFilterId, BooleanFilterOption>;

  sort: {
    text: 'Sort';
    options: string[];
    selected: string;
    setSelected: (value: string) => void;
  };

  clearFilters: VoidFunction;
}

export const filterStore: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  FilterState
> = (set, get) => ({
  textSearch: '',
  handleTextSearchChange: (event) => {
    set((state) => {
      state.filters.textSearch = event?.target.value ?? '';
    });
  },
  toggleCheckbox: (id, value) => {
    set((state) => {
      let selected = state.filters.checkboxes[id].selected;
      const indexOf = selected.indexOf(value);
      if (indexOf !== -1) {
        selected.splice(indexOf, 1);
      } else {
        selected.push(value);
      }
    });
  },

  checkboxes: {
    gender: {
      id: CheckboxFilterId.gender,
      text: 'Gender',
      options: ['mens', 'womens', 'unisex'],
      selected: [],
      clear: () =>
        set((s) => {
          s.filters.checkboxes.gender.selected = [];
        }),
      setSelected: (value) =>
        get().filters.toggleCheckbox(CheckboxFilterId.gender, value),
    },
    size: {
      id: CheckboxFilterId.size,
      text: 'Size',
      options: ['12', '13', '14'],
      selected: [],
      clear: () =>
        set((s) => {
          s.filters.checkboxes.size.selected = [];
        }),
      setSelected: (value) =>
        get().filters.toggleCheckbox(CheckboxFilterId.size, value),
    },
    category: {
      id: CheckboxFilterId.category,
      text: 'Category',
      options: ['hoodies', 'jeans', 'shorts'],
      selected: [],
      clear: () =>
        set((s) => {
          s.filters.checkboxes.category.selected = [];
        }),
      setSelected: (value) =>
        get().filters.toggleCheckbox(CheckboxFilterId.category, value),
    },
    brand: {
      id: CheckboxFilterId.brand,
      text: 'Brand',
      options: ['nike', 'gucci', 'adidas'],
      selected: [],
      clear: () =>
        set((s) => {
          s.filters.checkboxes.brand.selected = [];
        }),
      setSelected: (value) =>
        get().filters.toggleCheckbox(CheckboxFilterId.brand, value),
    },
    price: {
      id: CheckboxFilterId.price,
      text: 'Price',
      options: ['$10 max', '$20 max', '$30 max'],
      selected: [],
      clear: () =>
        set((s) => {
          s.filters.checkboxes.price.selected = [];
        }),
      setSelected: (value) =>
        get().filters.toggleCheckbox(CheckboxFilterId.price, value),
    },
  },
  radios: {},
  booleans: {
    onSale: {
      id: BooleanFilterId.onSale,
      text: 'On sale',
      selected: false,
      setSelected: (value) =>
        set((state) => {
          state.filters.booleans.onSale.selected = value;
        }),
    },
  },

  sort: {
    text: 'Sort',
    options: [SortOption.priceHighToLow, SortOption.priceLowToHigh],
    selected: '',
    setSelected: (value: string) =>
      set((state) => {
        state.filters.sort.selected = value;
      }),
  },

  clearFilters: () =>
    set((state) => {
      forEach(state.filters.checkboxes, (checkbox) => {
        checkbox.selected = [];
      });

      forEach(state.filters.radios, (radio) => {
        radio.selected = '';
      });

      forEach(state.filters.booleans, (boolean) => {
        boolean.selected = false;
      });
    }),
});
