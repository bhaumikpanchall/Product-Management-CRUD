const Pagination = ({ pagination, onPageChange }) => {
  const page = pagination.page || 1;
  const pages = pagination.pages || 1;
  if (pages <= 1) return null;

  const handleChange = (newPage) => {
    if (newPage < 1 || newPage > pages) return;
    onPageChange(newPage);
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
      <div className="text-slate-500">
        Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
        <span className="font-semibold text-slate-900">{pages}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleChange(page - 1)}
          className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 disabled:opacity-50"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handleChange(page + 1)}
          className="rounded-xl border border-slate-200 px-3 py-1 text-slate-600 disabled:opacity-50"
          disabled={page === pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
