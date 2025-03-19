import React from 'react';

/**
 * ActiveFilters component
 * Displays the currently applied filters as clickable chips that can be removed
 */
export default function ActiveFilters({ activeFilters = [], onRemove, onClearAll, shareUrl }) {
    // Safety check for undefined/null activeFilters
    if (!activeFilters || !Array.isArray(activeFilters) || activeFilters.length === 0) {
        return null;
    }

    return (
        <div className="p-3 my-4 bg-white shadow-sm rounded-xl">
            <div className="flex flex-wrap items-center gap-2">
                <span className="ml-2 text-sm font-medium text-gray-700">
                    فیلترهای فعال:
                </span>

                {activeFilters.map((filter, index) => (
                    <div
                        key={`${filter.id || 'شناخته نشده'}-${index}`}
                        className="flex items-center bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm"
                    >
                        <span>{filter.label || 'شناخته نشده'}</span>
                        <button
                            onClick={() => onRemove(filter.id, filter.value)}
                            className="ml-2 text-blue-700 transition-colors hover:text-blue-900"
                            aria-label="حذف فیلتر"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}

                <button
                    onClick={onClearAll}
                    className="mr-1 text-sm text-gray-600 underline transition-colors hover:text-blue-800"
                >
                    پاک کردن همه
                </button>

                {/* Share button */}
                {shareUrl && (
                    <div className="ml-auto">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(shareUrl);
                                // You can add a toast notification here
                                alert('لینک فیلتر در کلیپ‌بورد کپی شد.');
                            }}
                            className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-blue-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            اشتراک‌گذاری فیلترها
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
