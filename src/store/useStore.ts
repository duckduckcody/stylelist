import pull from 'lodash.pull';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

enum FilterId {
  gender = 'gender',
  size = 'size',
  category = 'category',
  brand = 'brand',
  price = 'price',
  onSale = 'onSale',
  sort = 'sort',
}

type FilterOption =
  | CheckboxDropdownFilterOption
  | RadioDropdownFilterOption
  | BooleanFilterOption;

interface CheckboxDropdownFilterOption {
  type: 'checkboxDropdown';
  id: FilterId;
  options: string[];
  selected: string[];
}

interface RadioDropdownFilterOption {
  type: 'radioDropdown';
  id: FilterId;
  options: string[];
  selected: string;
}

interface BooleanFilterOption {
  type: 'boolean';
  id: FilterId;
  options?: string[];
  selected: boolean;
}

interface FilterOptionsActions {
  setOption: (id: FilterId, val: string[] | string | boolean) => void;
  toggleOption: (id: FilterId, val: string | string | boolean) => void;
  clearOptions: (id: FilterId) => void;
}

interface FilterState {
  activeFilterId: string;
  setActiveFilerId: (filterId: string) => void;
  filterClick: (id: string) => void;

  selectedGenders: string[];
  setSelectedGenders: (genders: string[]) => void;

  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;

  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;

  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;

  selectedPrices: string[];
  setSelectedPrices: (prices: string[]) => void;

  selectedSort: string;
  setSelectedSort: (sort: string) => void;

  onSale: boolean;
  setOnSale: (onSale: boolean) => void;

  clearFilters: VoidFunction;

  filterOptions: Record<FilterId, FilterOption> & FilterOptionsActions;
}

interface StoreState {
  filters: FilterState;
}

export const useStore = create(
  immer<StoreState>((set) => ({
    filters: {
      filterOptions: {
        setOption: (id, val) =>
          set((state) => {
            state.filters.filterOptions[id].selected = val;
          }),
        toggleOption: (id, val) =>
          set((state) => {
            let something = state.filters.filterOptions[id];
            if (
              something.type === 'checkboxDropdown' &&
              typeof val === 'string'
            ) {
              if (something.selected?.includes(val)) {
                pull(something.selected, val);
              } else {
                something.selected.push(val);
              }
            } else {
              state.filters.filterOptions[id].selected = val;
            }
          }),
        clearOptions: (id) =>
          set((state) => {
            state.filters.filterOptions[id].selected = [];
          }),

        gender: {
          type: 'checkboxDropdown',
          id: FilterId.gender,
          options: ['mens', 'womens', 'unisex'],
          selected: [],
        },
        size: {
          type: 'checkboxDropdown',
          id: FilterId.size,
          options: ['12', '13', '14'],
          selected: [],
        },
        category: {
          type: 'checkboxDropdown',
          id: FilterId.category,
          options: ['hoodies', 'jeans', 'shorts'],
          selected: [],
        },
        brand: {
          type: 'checkboxDropdown',
          id: FilterId.brand,
          options: ['nike', 'gucci', 'adidas'],
          selected: [],
        },
        price: {
          type: 'checkboxDropdown',
          id: FilterId.price,
          options: ['$10 max', '$20 max', '$30 max'],
          selected: [],
        },
        onSale: {
          type: 'boolean',
          id: FilterId.onSale,
          selected: false,
        },
        sort: {
          type: 'radioDropdown',
          id: FilterId.sort,
          options: ['popular', 'newest', 'oldest'],
          selected: '',
        },
      },

      activeFilterId: '',

      setActiveFilerId: (filterId: string) =>
        set((state) => {
          state.filters.activeFilterId = filterId;
        }),

      filterClick: (id: string) =>
        set((state) => {
          if (state.filters.activeFilterId === id) {
            state.filters.activeFilterId = '';
          } else {
            state.filters.activeFilterId = id;
          }
        }),

      selectedGenders: [],
      setSelectedGenders: (genders: string[]) =>
        set((state) => ({
          filters: { ...state.filters, selectedGenders: genders },
        })),

      selectedSizes: [],
      setSelectedSizes: (sizes: string[]) =>
        set((state) => ({
          filters: { ...state.filters, selectedSizes: sizes },
        })),

      selectedCategories: [],
      setSelectedCategories: (categories: string[]) =>
        set((state) => ({
          filters: { ...state.filters, selectedCategories: categories },
        })),

      selectedBrands: [],
      setSelectedBrands: (brands: string[]) =>
        set((state) => ({
          filters: { ...state.filters, selectedBrands: brands },
        })),

      selectedPrices: [],
      setSelectedPrices: (genders: string[]) =>
        set((state) => ({
          filters: { ...state.filters, selectedBrands: genders },
        })),

      selectedSort: '',
      setSelectedSort: (sort: string) =>
        set((state) => ({
          filters: { ...state.filters, selectedSort: sort },
        })),

      onSale: false,
      setOnSale: (onSale: boolean) =>
        set((state) => ({
          filters: { ...state.filters, onSale: onSale },
        })),

      clearFilters: () =>
        set((state) => ({
          filters: {
            ...state.filters,
            selectedGenders: [],
            selectedSizes: [],
            selectedCategories: [],
            selectedBrands: [],
            selectedPrices: [],
            onSale: false,
            selectedSort: '',
          },
        })),
    },
  }))
);
