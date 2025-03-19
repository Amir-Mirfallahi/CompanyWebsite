import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import ProductFilter from "../../Components/Products/ProductFilter";
import ProductCard from "../../Components/Products/ProductCard";
import CategoryBar from "../../Components/Products/CategoryBar";
import HomeLayout from "@/Layouts/HomeLayout";
import "aos/dist/aos.css";
import axios from "axios";
import ActiveFilters from "../../Components/Products/ActiveFilters";

export default function ProductsPage({
    header,
    footer,
    categories,
    products,
    filterFields,
    activeCategory,
    currentPage,
    hasMoreProducts,
    totalProducts,
    appliedFilters,
}) {
    // SIMPLE Version without complex handling
    const [displayedProducts, setDisplayedProducts] = useState(Array.isArray(products) ? products : []);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(currentPage || 1);
    const [hasMore, setHasMore] = useState(hasMoreProducts || false);
    const observerTarget = useRef(null);

    // Create empty objects/arrays as defaults to avoid null/undefined errors
    const safeFilters = appliedFilters || {};
    const safeCategories = Array.isArray(categories) ? categories : [];

    // Transform appliedFilters into format for ActiveFilters component
    const getActiveFiltersArray = () => {
        if (!appliedFilters || typeof appliedFilters !== 'object' || !filterFields) {
            return [];
        }

        const result = [];

        // Process each applied filter
        Object.entries(appliedFilters).forEach(([filterId, filterValue]) => {
            // Ignore empty values
            if (filterValue === null || filterValue === undefined || filterValue === '' ||
                (Array.isArray(filterValue) && filterValue.length === 0)) {
                return;
            }

            // Find the filter field definition to get the label
            const filterField = filterFields.find(field => field.id === filterId);
            if (!filterField) return;

            if (Array.isArray(filterValue)) {
                // For checkbox filters
                filterValue.forEach(value => {
                    const option = filterField.options?.find(opt => opt.value === value);
                    result.push({
                        id: filterId,
                        label: `${filterField.label}: ${option?.label || value}`,
                        value
                    });
                });
            } else if (filterField.type === 'select' || filterField.type === 'radio') {
                // For select and radio filters
                const option = filterField.options?.find(opt => opt.value === filterValue);
                result.push({
                    id: filterId,
                    label: `${filterField.label}: ${option?.label || filterValue}`,
                    value: filterValue
                });
            } else if (filterField.type === 'range') {
                // For range filters
                result.push({
                    id: filterId,
                    label: `${filterField.label}: ${filterValue} ${filterField.unit || ''}`,
                    value: filterValue
                });
            } else {
                // Default case
                result.push({
                    id: filterId,
                    label: `${filterField.label}: ${filterValue}`,
                    value: filterValue
                });
            }
        });

        return result;
    };

    // Initialize AOS animation
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    // Update displayed products when props change
    useEffect(() => {
        setDisplayedProducts(Array.isArray(products) ? products : []);
        setPage(currentPage || 1);
        setHasMore(hasMoreProducts || false);
    }, [products, currentPage, hasMoreProducts]);

    // Infinite scroll observer
    useEffect(() => {
        if (!observerTarget.current || !hasMore || loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMoreProducts();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [hasMore, loading, page]);

    // Load more products
    const loadMoreProducts = async () => {
        if (!hasMore || loading) return;
        setLoading(true);

        try {
            const queryParams = new URLSearchParams();
            queryParams.append('page', page + 1);

            if (activeCategory && activeCategory !== 'all') {
                queryParams.append('category', activeCategory);
            }

            const response = await axios.get(`/api/products/load-more?${queryParams.toString()}`);
            const newProducts = response.data.products || [];
            const moreAvailable = response.data.hasMore || false;

            setDisplayedProducts(prev => [...prev, ...newProducts]);
            setHasMore(moreAvailable);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error('Failed to load more products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        const queryParams = {};


        if (activeCategory && activeCategory !== 'all') {
            queryParams.category = activeCategory;
        }

        if (newFilters && typeof newFilters === 'object') {
            Object.keys(newFilters).forEach(key => {
                const value = newFilters[key];
                if (value !== null && value !== undefined && value !== '') {
                    queryParams[key] = value;
                }
            });
        }

        router.get('/products', queryParams, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Handle category change
    const handleCategoryChange = (categoryId) => {
        router.get('/products', {
            category: categoryId === 'all' ? undefined : categoryId
        });
    };

    // Handle filter removal
    const removeFilter = (filterId, filterValue) => {
        if (!filterId) return;

        const queryParams = {};

        // Copy all existing applied filters except the one we're removing
        if (appliedFilters && typeof appliedFilters === 'object') {
            Object.entries(appliedFilters).forEach(([key, value]) => {
                // Skip the filter we want to remove
                if (key !== filterId) {
                    queryParams[key] = value;
                }
                // For array values (like checkboxes), remove just the specific value
                else if (Array.isArray(value) && filterValue !== undefined) {
                    const newValues = value.filter(v => v !== filterValue);
                    if (newValues.length > 0) {
                        queryParams[key] = newValues;
                    }
                }
                // For non-array values where we're not trying to remove a specific value, do nothing
                // (this case shouldn't happen with our current UI, but included for robustness)
                else if (filterValue !== undefined && value !== filterValue) {
                    queryParams[key] = value;
                }
            });
        }

        if (activeCategory && activeCategory !== 'all') {
            queryParams.category = activeCategory;
        }

        router.get('/products', queryParams, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <HomeLayout
            header={header || {}}
            footer={footer || {}}
            className="pt-32 bg-gray-50"
        >
            <Head>
                <title>محصولات</title>
                <meta name="description" content="مشاهده و جستجوی محصولات" />
            </Head>

            <div className="container px-4 mx-auto">
                {/* Hero Section */}
                <div className="mb-8 text-center" data-aos="fade-up">
                    <h1 className="mb-4 text-4xl font-black text-blue-900">
                        محصولات
                    </h1>
                    <div className="text-sm text-gray-500">
                        نمایش {displayedProducts.length} محصول از {totalProducts || 0} محصول
                    </div>
                </div>

                {/* Categories */}
                <CategoryBar
                    categories={safeCategories}
                    activeCategory={activeCategory || 'all'}
                    setActiveCategory={handleCategoryChange}
                />

                {/* Active Filters - Now properly passing the active filters */}
                <ActiveFilters
                    activeFilters={getActiveFiltersArray()}
                    onRemove={removeFilter}
                    onClearAll={() => router.get('/products')}
                    shareUrl={window.location.href}
                />

                {/* Main Content */}
                <div className="grid gap-8 py-8 lg:grid-cols-4">
                    {/* Filters */}
                    <div className="lg:col-span-1">
                        <ProductFilter
                            filterFields={Array.isArray(filterFields) ? filterFields : []}
                            appliedFilters={safeFilters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        {displayedProducts.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {displayedProducts.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        product={product || {}}
                                        data-aos="fade-up"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center bg-white shadow-lg rounded-xl">
                                <h3 className="mb-2 text-xl font-bold text-gray-800">هیچ محصولی یافت نشد</h3>
                                <p className="text-gray-600">لطفا فیلترهای خود را تغییر دهید یا فیلترها را پاک کنید.</p>
                                <button
                                    onClick={() => router.get('/products')}
                                    className="px-4 py-2 mt-4 text-white transition-colors bg-blue-900 rounded-full hover:bg-blue-800"
                                >
                                    پاک کردن همه فیلترها
                                </button>
                            </div>
                        )}

                        {/* Infinite Scroll Observer */}
                        {hasMore && (
                            <div
                                ref={observerTarget}
                                className="flex items-center justify-center p-8 mt-4"
                            >
                                {loading && (
                                    <div className="flex items-center justify-center">
                                        <div className="w-10 h-10 border-b-2 border-blue-900 rounded-full animate-spin"></div>
                                        <span className="mr-3 text-blue-900">در حال بارگذاری...</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* No more products message */}
                        {!hasMore && displayedProducts.length > 0 && (
                            <div className="p-6 text-center text-gray-600">
                                تمام محصولات نمایش داده شده است.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
