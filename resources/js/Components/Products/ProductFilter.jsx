// ProductFilter.jsx
import { useState, useEffect } from 'react';

export default function ProductFilter({ filterFields, appliedFilters = {}, onFilterChange }) {
    const [filterValues, setFilterValues] = useState({});
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    useEffect(() => {
        // Initialize filter values from URL params or defaults
        const initialValues = {};
        filterFields.forEach(field => {
            // Check if appliedFilters exists and if this filter exists in it
            if (appliedFilters && typeof appliedFilters === 'object' && appliedFilters[field.id] !== undefined) {
                initialValues[field.id] = appliedFilters[field.id];
            } else {
                // Set default values
                if (field.type === 'range') {
                    initialValues[field.id] = field.min;
                } else if (field.type === 'checkbox') {
                    initialValues[field.id] = [];
                } else if (field.type === 'radio') {
                    initialValues[field.id] = field.options[0].value;
                } else if (field.type === 'select') {
                    initialValues[field.id] = '';
                }
            }
        });
        setFilterValues(initialValues);
    }, [filterFields, appliedFilters]);

    const handleFilterChange = (fieldId, value) => {
        const newValues = {
            ...filterValues,
            [fieldId]: value
        };
        setFilterValues(newValues);
        onFilterChange(newValues);
    };

    // Group filter fields by type for better organization
    const groupedFilters = filterFields.reduce((groups, field) => {
        const key = field.type === 'range' ? 'range' : 'options';
        if (!groups[key]) groups[key] = [];
        groups[key].push(field);
        return groups;
    }, {});

    const renderFilterField = (field) => {
        const fieldValue = filterValues[field.id];

        switch (field.type) {
            case 'range':
                return (
                    <div className="mb-6" key={field.id}>
                        <div className="flex justify-between mb-2">
                            <h4 className="font-medium">{field.label}</h4>
                            <span className="text-sm text-gray-600">
                                {fieldValue !== undefined ? fieldValue : field.min} {field.unit}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            value={fieldValue !== undefined ? fieldValue : field.min}
                            onChange={(e) => handleFilterChange(field.id, parseFloat(e.target.value))}
                            className="w-full accent-blue-900"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>{field.min} {field.unit}</span>
                            <span>{field.max} {field.unit}</span>
                        </div>
                    </div>
                );

            case 'checkbox':
                return (
                    <div className="mb-6" key={field.id}>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{field.label}</h4>
                            {field.count && <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">{field.count}</span>}
                        </div>
                        <div className="space-y-2">
                            {field.options.map((option) => (
                                <label key={option.value} className="flex items-center gap-2 p-1 transition-colors rounded cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={Array.isArray(fieldValue) && fieldValue.includes(option.value)}
                                        onChange={(e) => {
                                            const currentValues = Array.isArray(fieldValue) ? fieldValue : [];
                                            const newValues = e.target.checked
                                                ? [...currentValues, option.value]
                                                : currentValues.filter(v => v !== option.value);
                                            handleFilterChange(field.id, newValues);
                                        }}
                                        className="text-blue-900 rounded"
                                    />
                                    <span className="text-gray-700">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );

            case 'select':
                return (
                    <div className="mb-6" key={field.id}>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{field.label}</h4>
                            {field.count && <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">{field.count}</span>}
                        </div>
                        <select
                            value={fieldValue || ''}
                            onChange={(e) => handleFilterChange(field.id, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
                        >
                            <option value="">همه</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );

            case 'radio':
                return (
                    <div className="mb-6" key={field.id}>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{field.label}</h4>
                            {field.count && <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">{field.count}</span>}
                        </div>
                        <div className="space-y-2">
                            {field.options.map((option) => (
                                <label key={option.value} className="flex items-center gap-2 p-1 transition-colors rounded cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name={field.id}
                                        value={option.value}
                                        checked={fieldValue === option.value}
                                        onChange={(e) => handleFilterChange(field.id, e.target.value)}
                                        className="text-blue-900"
                                    />
                                    <span className="text-gray-700">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {/* Mobile filter toggle */}
            <div className="mb-4 lg:hidden">
                <button
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-blue-900 bg-white shadow rounded-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    {isFilterVisible ? 'مخفی کردن فیلترها' : 'نمایش فیلترها'}
                </button>
            </div>

            {/* Filter container - responsive */}
            <div className={`bg-white p-6 rounded-xl shadow-lg ${isFilterVisible ? 'block' : 'hidden lg:block'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-blue-900">فیلترها</h3>
                    <span className="text-sm text-gray-500">{filterFields.length} فیلتر</span>
                </div>

                {/* Range filters section */}
                {groupedFilters.range && groupedFilters.range.length > 0 && (
                    <div className="mb-6">
                        <h4 className="pb-2 mb-4 font-semibold text-gray-800 border-b text-md">مقادیر</h4>
                        {groupedFilters.range.map(field => renderFilterField(field))}
                    </div>
                )}

                {/* Options filters section */}
                {groupedFilters.options && groupedFilters.options.length > 0 && (
                    <div>
                        <h4 className="pb-2 mb-4 font-semibold text-gray-800 border-b text-md">گزینه‌ها</h4>
                        {groupedFilters.options.map(field => renderFilterField(field))}
                    </div>
                )}

                {/* Reset Filters Button */}
                <button
                    onClick={() => {
                        const initialValues = {};
                        filterFields.forEach(field => {
                            if (field.type === 'range') {
                                initialValues[field.id] = field.min;
                            } else if (field.type === 'checkbox') {
                                initialValues[field.id] = [];
                            } else if (field.type === 'radio') {
                                initialValues[field.id] = field.options[0].value;
                            } else if (field.type === 'select') {
                                initialValues[field.id] = '';
                            }
                        });
                        setFilterValues(initialValues);
                        onFilterChange(initialValues);
                    }}
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-8 text-blue-900 transition-colors border border-blue-900 rounded-full hover:bg-blue-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    پاک کردن فیلترها
                </button>
            </div>
        </>
    );
}
