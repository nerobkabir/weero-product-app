import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiPackage, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import SkeletonGrid from '../components/SkeletonGrid';
import useProducts from '../hooks/useProducts';
import useAuth from '../hooks/useAuth';

const ProductListPage = () => {
  const {
    products,
    pagination,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const { isAuthenticated } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [queryParams, setQueryParams] = useState({ page: 1, limit: 8 });

  // ── Fetch on mount and when params change ──────────────────────────────────
  useEffect(() => {
    fetchProducts(queryParams);
  }, [queryParams]); // eslint-disable-line

  const handleSearch = useCallback((filters) => {
    setQueryParams((prev) => ({ ...prev, ...filters, page: 1 }));
  }, []);

  const handlePageChange = (page) => {
    setQueryParams((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Open edit form ─────────────────────────────────────────────────────────
  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  // ── Close form ─────────────────────────────────────────────────────────────
  const handleCloseForm = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  // ── Submit form (create or update) ────────────────────────────────────────
  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    let result;
    if (editProduct) {
      result = await updateProduct(editProduct._id, data);
    } else {
      result = await createProduct(data);
    }
    setFormLoading(false);
    if (result.success) {
      handleCloseForm();
      fetchProducts(queryParams);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeleteLoadingId(id);
    const result = await deleteProduct(id);
    setDeleteLoadingId(null);
    if (result.success) {
      fetchProducts(queryParams);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Products
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {pagination?.totalCount
                ? `${pagination.totalCount} products found`
                : 'Browse all products'}
            </p>
          </div>

          {isAuthenticated && (
            <button
              onClick={() => { setEditProduct(null); setShowForm(true); }}
              className="btn-primary sm:self-start"
            >
              <FiPlus size={16} />
              Add Product
            </button>
          )}
        </div>

        {/* ── Search Bar ── */}
        <div className="mb-6 animate-slide-up">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* ── Skeleton Loading ── */}
        {loading && <SkeletonGrid count={8} />}

        {/* ── Error State ── */}
        {!loading && error && (
          <div className="card p-8 text-center animate-fade-in">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="text-red-500" size={24} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
              Failed to load products
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">{error}</p>
            <button
              onClick={() => fetchProducts(queryParams)}
              className="btn-secondary mx-auto"
            >
              <FiRefreshCw size={14} />
              Try Again
            </button>
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && !error && products.length === 0 && (
          <div className="card p-12 text-center animate-fade-in">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiPackage className="text-brand-500" size={28} />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
              No products found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs mx-auto">
              {queryParams.search
                ? `No results for "${queryParams.search}". Try a different keyword.`
                : 'No products yet. Add your first product to get started.'}
            </p>
            {isAuthenticated && (
              <button
                onClick={() => { setEditProduct(null); setShowForm(true); }}
                className="btn-primary mx-auto"
              >
                <FiPlus size={16} />
                Add First Product
              </button>
            )}
          </div>
        )}

        {/* ── Product Grid ── */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-fade-in">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  deleteLoading={deleteLoadingId === product._id}
                />
              ))}
            </div>

            {/* ── Pagination ── */}
            <div className="mt-8">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </main>

      {/* ── Product Form Modal ── */}
      {showForm && (
        <ProductForm
          initialData={editProduct}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
          loading={formLoading}
        />
      )}
    </div>
  );
};

export default ProductListPage;