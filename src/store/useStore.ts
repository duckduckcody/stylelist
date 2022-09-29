import create from 'zustand';

// const [activeFilterId, setActiveFilterId] = useState('');
// const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
// const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
// const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
// const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
// const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
// const [onSale, setOnSale] = useState(false);
// const [selectedSort, setSelectedSort] = useState('');

interface FilterState {
  activeFilterId: string;
  clearActiveFilerId: VoidFunction;
  filterClick: (id: string) => void;
  selectedGenders: string[];
  clearSelectedGenders: VoidFunction;
  selectedSizes: string[];
  clearSelectedSizes: VoidFunction;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedPrices: string[];
  onSale: boolean;
  selectedSort: string;
  clearFilters: VoidFunction;
}

interface StoreState {
  filters: FilterState;
}

export const useStore = create<StoreState>((set) => ({
  filters: {
    activeFilterId: '',
    clearActiveFilerId: () =>
      set((state) => ({ filters: { ...state.filters, activeFilterId: '' } })),
    filterClick: (id: string) =>
      set((state) => {
        if (state.filters.activeFilterId === id) {
          return { filters: { ...state.filters, activeFilterId: '' } };
        } else {
          return { filters: { ...state.filters, activeFilterId: id } };
        }
      }),

    selectedGenders: [],
    clearSelectedGenders: () =>
      set((state) => ({ filters: { ...state.filters, selectedGenders: [] } })),

    selectedSizes: [],
    clearSelectedSizes: () =>
      set((state) => ({ filters: { ...state.filters, selectedSizes: [] } })),

    selectedCategories: [],
    selectedBrands: [],
    selectedPrices: [],
    onSale: false,
    selectedSort: '',

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
}));
