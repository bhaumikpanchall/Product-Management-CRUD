const ProductTable = ({ products, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No products found. Try adjusting your filters or add a new product.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Price
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 text-sm font-medium text-slate-900">
                {product.name}
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {product.category}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                ${Number(product.price).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="text-rose-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
