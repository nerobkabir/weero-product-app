import { useState } from 'react';
import { FiEdit2, FiTrash2, FiUser, FiAlertTriangle, FiDollarSign } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';

const FALLBACK_IMG = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=No+Image';

// Delete Modal
const DeleteModal = ({ productName, onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
    <div className="card p-6 w-full max-w-sm animate-scale-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
          <FiAlertTriangle className="text-red-500" size={18} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Delete Product</h3>
          <p className="text-xs text-slate-400 dark:text-[#666]">This cannot be undone</p>
        </div>
      </div>
      <p className="text-sm text-slate-500 dark:text-[#888] mb-5 leading-relaxed">
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

// ProductCard 
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
    product.description?.length > 85
      ? product.description.slice(0, 85) + '...'
      : product.description;

  const handleDelete = async () => {
    await onDelete(product._id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#0f0f0f] border border-slate-200/80 dark:border-[#1e1e1e] hover:border-brand-300 dark:hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/8 dark:hover:shadow-brand-500/5 hover:-translate-y-1.5 transition-all duration-300">

        <div className="relative overflow-hidden bg-slate-100 dark:bg-[#1a1a1a] h-48">
          <img
            src={imgError ? FALLBACK_IMG : (product.imageUrl || FALLBACK_IMG)}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
            style={{ '--tw-scale-x': 'group-hover:1.08', '--tw-scale-y': 'group-hover:1.08' }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 bg-white/95 dark:bg-black/80 backdrop-blur-sm text-slate-800 dark:text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-lg border border-white/50 dark:border-white/10">
              <FiDollarSign size={11} className="text-brand-500" />
              {formattedPrice.replace('$', '')}
            </div>
          </div>

          {isOwner && (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-semibold bg-brand-500 text-white px-2 py-1 rounded-full">
                Mine
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4">

          <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 dark:text-[#666] leading-relaxed flex-1">
            {shortDesc}
          </p>

          {product.createdBy?.name && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-[#1a1a1a]">
              <div className="w-5 h-5 bg-brand-500/10 dark:bg-brand-500/20 rounded-full flex items-center justify-center">
                <FiUser size={10} className="text-brand-500" />
              </div>
              <span className="text-[11px] text-slate-400 dark:text-[#666]">
                {product.createdBy.name}
              </span>
            </div>
          )}

          {isOwner && (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold
                           bg-slate-50 hover:bg-brand-50 dark:bg-[#1a1a1a] dark:hover:bg-brand-500/10
                           text-slate-600 hover:text-brand-600 dark:text-[#888] dark:hover:text-brand-400
                           border border-slate-200 hover:border-brand-300 dark:border-[#2a2a2a] dark:hover:border-brand-500/30
                           transition-all duration-200"
              >
                <FiEdit2 size={12} />
                Edit
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold
                           bg-slate-50 hover:bg-red-50 dark:bg-[#1a1a1a] dark:hover:bg-red-500/10
                           text-slate-600 hover:text-red-600 dark:text-[#888] dark:hover:text-red-400
                           border border-slate-200 hover:border-red-300 dark:border-[#2a2a2a] dark:hover:border-red-500/30
                           transition-all duration-200"
              >
                <FiTrash2 size={12} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

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