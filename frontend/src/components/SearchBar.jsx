import { useState, useCallback, useRef } from 'react';
import { FiSearch, FiX, FiSliders } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const debounceRef = useRef(null);

  // ── Debounced search trigger ────────────────────────────────────────────────
  const triggerSearch = useCallback(
    (searchVal, minVal, maxVal) => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch({
          search: searchVal.trim(),
          minPrice: minVal || undefined,
          maxPrice: maxVal || undefined,
          page: 1,
        });
      }, 300);
    },
    [onSearch]
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    triggerSearch(val, minPrice, maxPrice);
  };

  const handleMinChange = (e) => {
    setMinPrice(e.target.value);
    triggerSearch(search, e.target.value, maxPrice);
  };

  const handleMaxChange = (e) => {
    setMaxPrice(e.target.value);
    triggerSearch(search, minPrice, e.target.value);
  };

  const handleClear = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    clearTimeout(debounceRef.current);
    onSearch({ search: '', minPrice: undefined, maxPrice: undefined, page: 1 });
  };

  const hasFilters = search || minPrice || maxPrice;

  return (
    <div className="card p-4">
      <div className="flex flex-col sm:flex-row gap-3">

        {/* ── Search input ── */}
        <div className="relative flex-1">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="input-field !pl-9"
          />
        </div>

        {/* ── Price filters ── */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
            <FiSliders size={14} />
          </div>
          <input
            type="number"
            value={minPrice}
            onChange={handleMinChange}
            placeholder="Min $"
            min="0"
            className="input-field !w-24"
          />
          <span className="text-slate-400 dark:text-slate-600 text-sm">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxChange}
            placeholder="Max $"
            min="0"
            className="input-field !w-24"
          />
        </div>

        {/* ── Clear button ── */}
        {hasFilters && (
          <button
            onClick={handleClear}
            className="btn-secondary !py-2 !px-3 whitespace-nowrap"
            title="Clear filters"
          >
            <FiX size={15} />
            Clear
          </button>
        )}
      </div>

      {/* ── Active filter tags ── */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {search && (
            <span className="badge bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
              Search: "{search}"
            </span>
          )}
          {minPrice && (
            <span className="badge bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
              Min: ${minPrice}
            </span>
          )}
          {maxPrice && (
            <span className="badge bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
              Max: ${maxPrice}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;