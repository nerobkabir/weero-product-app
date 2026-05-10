import { useState } from 'react';
import { FiEdit2, FiTrash2, FiUser, FiAlertTriangle } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const FALLBACK_IMG = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=No+Image';

// ── Confirm Delete Modal ──────────────────────────────────────────────────────
const DeleteModal = ({ productName, onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div className="card p-6 w-full max-w-sm animate-scale-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <FiAlertTriangle className="text-red-500" size={18} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Delete Product</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">This action cannot be undone</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
        Are you sure you want to delete{' '}
        <span className="font-semibold text-slate-900 dark:text-white">"{productName}"</span>?
      </p>
      <div className="flex gap-2">
        <button onClick={onCancel} className="btn-secondary flex-1 justify-center" disabled={loading}>
          Cancel
        </button>
        <button onClick={onConfirm} className="btn-danger flex-1 justify-center" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Deleting...
            </span>
          ) : 'Delete'}
        </button>
      </div>
    </div>
  </div>
);

// ── ProductCard ───────────────────────────────────────────────────────────────
const ProductCard = ({ product, onEdit, onDelete, deleteLoading }) => {
  const { user, isAuthenticated } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isOwner =
    isAuthenticated && user?._id === (product.createdBy?._id || product.createdBy);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const shortDesc =
    product.description?.length > 90
      ? product.description.slice(0, 90) + '...'
      : product.description;

  const handleDelete = async () => {
    await onDelete(product._id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="card group flex flex-col overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60 hover:-translate-y-1 transition-all duration-300">

        {/* ── Image ── */}
        <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800 h-48">
          <img
            src={imgError ? FALLBACK_IMG : (product.imageUrl || FALLBACK_IMG)}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Price badge */}
          <div className="absolute top-3 right-3">
            <span className="badge bg-brand-500 text-white shadow-lg shadow-brand-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {formattedPrice}
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              {shortDesc}
            </p>
          </div>

          {/* Owner info */}
          {product.createdBy?.name && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <FiUser size={11} />
              <span>{product.createdBy.name}</span>
            </div>
          )}

          {/* ── Actions (owner only) ── */}
          {isOwner && (
            <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onEdit(product)}
                className="btn-secondary flex-1 justify-center !py-2 !text-xs"
              >
                <FiEdit2 size={13} />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="btn-danger flex-1 justify-center !py-2 !text-xs"
              >
                <FiTrash2 size={13} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          productName={product.name}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={deleteLoading}
        />
      )}
    </>
  );
};

export default ProductCard;