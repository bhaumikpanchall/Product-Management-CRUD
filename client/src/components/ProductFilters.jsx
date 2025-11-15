const ProductFilters = ({ filters, onChange, onReset }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <label className="text-sm font-medium text-slate-700">Search</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          placeholder="Search by name"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Category</label>
        <input
          type="text"
          value={filters.category}
          onChange={(e) => onChange("category", e.target.value)}
          placeholder="Filter by category"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Min Price</label>
        <input
          type="number"
          min="0"
          value={filters.minPrice}
          onChange={(e) => onChange("minPrice", e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700">Max Price</label>
        <input
          type="number"
          min="0"
          value={filters.maxPrice}
          onChange={(e) => onChange("maxPrice", e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>

    <div className="mt-4 flex flex-wrap items-center gap-4">
      <div>
        <label className="text-sm font-medium text-slate-700">
          Items per page
        </label>
        <select
          value={filters.limit || 10}
          onChange={(e) => onChange("limit", Number(e.target.value))}
          className="ml-2 rounded-xl border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onReset}
        className="ml-auto rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
      >
        Reset Filters
      </button>
    </div>
  </div>
);

export default ProductFilters;
