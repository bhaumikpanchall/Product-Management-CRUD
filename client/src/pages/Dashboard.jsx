import { useCallback, useEffect, useState } from "react";
import api from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import ProductTable from "../components/ProductTable.jsx";
import ProductForm from "../components/ProductForm.jsx";
import Pagination from "../components/Pagination.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import ProductFilters from "../components/ProductFilters.jsx";

const defaultFilters = {
  search: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  limit: 10,
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(() => ({ ...defaultFilters }));
  const [page, setPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 4000);
    return () => clearTimeout(timer);
  }, [alert]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        ...filters,
        page,
        limit: filters.limit,
      };

      const { data } = await api.get("/products", { params });
      setProducts(data.data);
      setPaginationMeta(data.pagination);
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Failed to load products"
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (key, value) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ ...defaultFilters });
    setPage(1);
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSubmitProduct = async (payload) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
        showAlert("success", "Product updated successfully");
      } else {
        await api.post("/products", payload);
        showAlert("success", "Product created successfully");
      }
      setIsFormOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Failed to save product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestDelete = (product) => {
    setDeleteTarget(product);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/products/${deleteTarget._id}`);
      showAlert("success", "Product deleted");
      fetchProducts();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Failed to delete product"
      );
    } finally {
      setDeleteTarget(null);
    }
  };

  const pagination = {
    page,
    pages: paginationMeta.pages,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm text-slate-500">Signed in as</p>
            <p className="font-semibold text-slate-900">{user?.name}</p>
          </div>
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Product Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Manage products, search, filter and paginate with ease.
            </p>
          </div>
          <button
            onClick={openCreateForm}
            className="rounded-2xl bg-primary px-5 py-2 font-semibold text-white shadow hover:bg-blue-600"
          >
            + Add Product
          </button>
        </div>

        {alert && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              alert.type === "error"
                ? "border-rose-100 bg-rose-50 text-rose-600"
                : "border-emerald-100 bg-emerald-50 text-emerald-700"
            }`}
          >
            {alert.message}
          </div>
        )}

        <ProductFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={requestDelete}
          isLoading={isLoading}
        />

        <Pagination pagination={pagination} onPageChange={setPage} />
      </main>

      <ProductForm
        isOpen={isFormOpen}
        initialData={editingProduct}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitProduct}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Ready to logout?"
        description="You will need to log in again to access your dashboard."
        confirmLabel="Logout"
        onCancel={() => setShowLogoutDialog(false)}
        onConfirm={() => {
          setShowLogoutDialog(false);
          logout();
        }}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete product?"
        description={`This will permanently remove "${
          deleteTarget?.name || "this product"
        }".`}
        confirmLabel="Delete"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Dashboard;
