import { useState, useCallback } from 'react';
import { productAPI } from '../utils/api';
import { toast } from 'react-toastify';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch all products (with search/filter/pagination) ────────────────────
  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productAPI.getAll(params);
      setProducts(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load products';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Create product ────────────────────────────────────────────────────────
  const createProduct = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await productAPI.create(data);
      setProducts((prev) => [res.data.data, ...prev]);
      toast.success('Product created successfully! 🎉');
      return { success: true, data: res.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create product';
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Update product ────────────────────────────────────────────────────────
  const updateProduct = useCallback(async (id, data) => {
    setLoading(true);
    try {
      const res = await productAPI.update(id, data);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data.data : p))
      );
      toast.success('Product updated successfully! ✅');
      return { success: true, data: res.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update product';
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Delete product ────────────────────────────────────────────────────────
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    try {
      await productAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Product deleted successfully! 🗑️');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete product';
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    pagination,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;