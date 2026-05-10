import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, totalCount, limit } = pagination;
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  // Generate page numbers (show up to 5, with current page centered)
  const getPageNumbers = () => {
    const delta = 2;
    const pages = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const pageBtn = (page, label, disabled, isActive = false) => (
    <button
      key={label ?? page}
      onClick={() => !disabled && typeof page === 'number' && onPageChange(page)}
      disabled={disabled || typeof page !== 'number'}
      className={`
        min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center
        ${isActive
          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30 cursor-default'
          : typeof page !== 'number'
          ? 'text-slate-400 dark:text-slate-600 cursor-default'
          : disabled
          ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
        }
      `}
    >
      {label ?? page}
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">

      {/* ── Result count ── */}
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {startItem}–{endItem}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{totalCount}</span>{' '}
        products
      </p>

      {/* ── Page controls ── */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className={`h-9 px-3 rounded-lg flex items-center gap-1 text-sm font-medium transition-all
            ${!pagination.hasPrevPage
              ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          <FiChevronLeft size={16} />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, i) =>
            page === '...'
              ? pageBtn('...', '···', true, false)
              : pageBtn(page, undefined, false, page === currentPage)
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className={`h-9 px-3 rounded-lg flex items-center gap-1 text-sm font-medium transition-all
            ${!pagination.hasNextPage
              ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;