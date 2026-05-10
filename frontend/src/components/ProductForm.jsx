import { useState, useEffect } from 'react';
import { FiX, FiPackage, FiDollarSign, FiImage, FiFileText, FiSave } from 'react-icons/fi';

const INITIAL_FORM = { name: '', price: '', imageUrl: '', description: '' };
const INITIAL_ERRORS = { name: '', price: '', imageUrl: '', description: '' };

// ✅ Field component OUTSIDE ProductForm — fixes one-character-at-a-time bug
const Field = ({ icon: Icon, label, name, type = 'text', placeholder, isTextarea, value, onChange, error }) => (
  <div>
    <label className="input-label">
      <span className="flex items-center gap-1.5">
        <Icon size={13} className="text-brand-500" />
        {label}
      </span>
    </label>
    {isTextarea ? (
      <textarea
        name={name} value={value} onChange={onChange}
        placeholder={placeholder} rows={4}
        className={`input-field resize-none ${error ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : ''}`}
      />
    ) : (
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : ''}`}
      />
    )}
    {error && <p className="mt-1 text-xs text-red-500">⚠ {error}</p>}
  </div>
);

const ProductForm = ({ initialData = null, onSubmit, onClose, loading }) => {
  const isEditing = !!initialData;
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        price: initialData.price || '',
        imageUrl: initialData.imageUrl || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = { ...INITIAL_ERRORS };
    let isValid = true;

    if (!form.name.trim()) { newErrors.name = 'Product name is required'; isValid = false; }
    else if (form.name.length > 100) { newErrors.name = 'Name cannot exceed 100 characters'; isValid = false; }

    if (!form.price) { newErrors.price = 'Price is required'; isValid = false; }
    else if (isNaN(form.price) || Number(form.price) < 0) { newErrors.price = 'Enter a valid positive price'; isValid = false; }

    if (form.imageUrl && !/^https?:\/\/.+/.test(form.imageUrl)) {
      newErrors.imageUrl = 'Enter a valid URL (starts with http/https)'; isValid = false;
    }

    if (!form.description.trim()) { newErrors.description = 'Description is required'; isValid = false; }
    else if (form.description.length > 1000) { newErrors.description = 'Description cannot exceed 1000 characters'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      name: form.name.trim(),
      price: Number(form.price),
      imageUrl: form.imageUrl.trim() || undefined,
      description: form.description.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="card w-full max-w-lg animate-scale-in max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-[#1e1e1e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500/10 dark:bg-brand-500/20 rounded-lg flex items-center justify-center">
              <FiPackage className="text-brand-500" size={16} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white text-base">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-[#888]">
                {isEditing ? 'Update product details' : 'Fill in product information'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1a1a1a] transition-all">
            <FiX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 overflow-y-auto">
          <Field icon={FiPackage} label="Product Name" name="name" placeholder="e.g. Wireless Headphones" value={form.name} onChange={handleChange} error={errors.name} />
          <Field icon={FiDollarSign} label="Price (USD)" name="price" type="number" placeholder="e.g. 49.99" value={form.price} onChange={handleChange} error={errors.price} />
          <Field icon={FiImage} label="Image URL (optional)" name="imageUrl" placeholder="https://example.com/image.jpg" value={form.imageUrl} onChange={handleChange} error={errors.imageUrl} />
          <Field icon={FiFileText} label="Description" name="description" placeholder="Describe the product..." isTextarea value={form.description} onChange={handleChange} error={errors.description} />

          {/* Image Preview */}
          <div>
            <p className="input-label flex items-center gap-1.5">
              <FiImage size={13} className="text-brand-500" /> Image Preview
            </p>
            <div className="flex items-start gap-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-[#2a2a2a] bg-slate-100 dark:bg-[#1a1a1a] flex-shrink-0" style={{ width: 150, height: 150 }}>
                <img
                  src={form.imageUrl && /^https?:\/\/.+/.test(form.imageUrl) ? form.imageUrl : 'https://placehold.co/150x150/e2e8f0/94a3b8?text=No+Image'}
                  alt="Preview" className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://placehold.co/150x150/e2e8f0/94a3b8?text=No+Image'; }}
                />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <p className="text-xs text-slate-500 dark:text-[#888]">
                  {form.imageUrl && /^https?:\/\/.+/.test(form.imageUrl) ? '✅ Valid URL — preview loaded' : '💡 Enter a URL above to preview'}
                </p>
                <p className="text-xs text-slate-400 dark:text-[#666]">Recommended: square image (1:1 ratio)</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center" disabled={loading}>Cancel</button>
            <button type="submit" className="btn-primary flex-1 justify-center" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isEditing ? 'Saving...' : 'Creating...'}
                </span>
              ) : (
                <span className="flex items-center gap-2"><FiSave size={14} />{isEditing ? 'Save Changes' : 'Add Product'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;