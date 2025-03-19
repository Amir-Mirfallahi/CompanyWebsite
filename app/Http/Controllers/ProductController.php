<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Spec;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        [$defaultProps, $config] = getDefaultPageConfig('/products');
        $categories = Category::all();

        // Get filter parameters from request
        $category_id = $request->input('category', 'all');
        $page = $request->input('page', 1);
        $perPage = 12; // Items per page

        // Start building the product query
        $productsQuery = Product::query()->with('category', 'specs');

        // Apply category filter if not 'all'
        if ($category_id !== 'all') {
            $productsQuery->where('category_id', $category_id);
        }

        // Get all spec keys for dynamic filter generation
        $specKeys = Spec::select('key')->distinct()->get()->pluck('key');

        // Generate dynamic filter fields based on specs in the database
        $filterFields = $this->generateDynamicFilters($specKeys, $category_id);

        // Apply filters from URL parameters
        foreach ($request->except(['category', 'page']) as $key => $value) {
            if (strpos($key, 'spec_') === 0) {
                $specKey = substr($key, 5); // Remove 'spec_' prefix

                // Handle array values (for checkbox filters)
                if (is_array($value)) {
                    $productsQuery->whereHas('specs', function ($query) use ($specKey, $value) {
                        $query->where('key', $specKey)
                            ->whereIn('value', $value);
                    });
                } else {
                    // Handle range filters
                    if (strpos($value, ',') !== false) {
                        list($min, $max) = explode(',', $value);
                        $productsQuery->whereHas('specs', function ($query) use ($specKey, $min, $max) {
                            $query->where('key', $specKey)
                                ->where('value', '>=', $min)
                                ->where('value', '<=', $max);
                        });
                    } else {
                        // Handle single value filters
                        $productsQuery->whereHas('specs', function ($query) use ($specKey, $value) {
                            $query->where('key', $specKey)
                                ->where('value', $value);
                        });
                    }
                }
            } else if ($key === 'in_stock' && $value !== 'all') {
                $inStock = $value === 'true' || $value === '1';
                $productsQuery->where('in_stock', $inStock);
            }
        }

        // Get total count before pagination
        $totalCount = $productsQuery->count();

        // Get paginated products
        $products = $productsQuery->take($perPage * $page)->get();

        // Check if there are more products to load
        $hasMore = $totalCount > ($perPage * $page);

        return Inertia::render('Products/ProductsPage', [
            ...$defaultProps,
            'categories' => $categories,
            'products' => $products,
            'filterFields' => $filterFields,
            'activeCategory' => $category_id,
            'currentPage' => $page,
            'hasMoreProducts' => $hasMore,
            'totalProducts' => $totalCount,
            'appliedFilters' => $request->except(['page']),
        ]);
    }

    /**
     * Generate dynamic filter fields based on specs in the database
     */
    private function generateDynamicFilters($specKeys, $categoryId)
    {
        $filterFields = [];

        // Add basic filters
        $filterFields[] = [
            'id' => 'in_stock',
            'type' => 'radio',
            'label' => 'وضعیت موجودی',
            'options' => [
                ['value' => 'all', 'label' => 'همه'],
                ['value' => 'true', 'label' => 'موجود'],
                ['value' => 'false', 'label' => 'ناموجود']
            ]
        ];

        // Generate dynamic filters based on spec keys
        foreach ($specKeys as $key) {
            // Get all unique values for this spec key
            $specQuery = Spec::where('key', $key);

            // If category is selected, only show relevant specs for that category
            if ($categoryId !== 'all') {
                $productsInCategory = Product::where('category_id', $categoryId)->pluck('id');
                $specQuery->whereHas('product', function ($query) use ($productsInCategory) {
                    $query->whereIn('product_id', $productsInCategory);
                });
            }

            $uniqueValues = $specQuery->distinct()->pluck('value')->toArray();

            // Skip if no values found
            if (empty($uniqueValues)) {
                continue;
            }

            // Determine filter type based on values
            $isNumeric = true;
            $min = PHP_FLOAT_MAX;
            $max = PHP_FLOAT_MIN;

            foreach ($uniqueValues as $value) {
                if (!is_numeric($value)) {
                    $isNumeric = false;
                    break;
                }

                $valueFloat = floatval($value);
                $min = min($min, $valueFloat);
                $max = max($max, $valueFloat);
            }

            if ($isNumeric && count($uniqueValues) > 5) {
                // Use range slider for numeric values with many options
                $step = ($max - $min) / 10;
                $step = max(0.1, round($step, 1));

                $filterFields[] = [
                    'id' => 'spec_' . $key,
                    'type' => 'range',
                    'label' => $key,
                    'min' => $min,
                    'max' => $max,
                    'step' => $step,
                    'count' => count($uniqueValues)
                ];
            } else if (count($uniqueValues) <= 6) {
                // Use checkbox for few options
                $options = [];
                foreach ($uniqueValues as $value) {
                    $options[] = [
                        'value' => $value,
                        'label' => $value,
                    ];
                }

                $filterFields[] = [
                    'id' => 'spec_' . $key,
                    'type' => 'checkbox',
                    'label' => $key,
                    'options' => $options,
                    'count' => count($uniqueValues)
                ];
            } else {
                // Use select dropdown for many non-numeric options
                $options = [];
                foreach ($uniqueValues as $value) {
                    $options[] = [
                        'value' => $value,
                        'label' => $value,
                    ];
                }

                $filterFields[] = [
                    'id' => 'spec_' . $key,
                    'type' => 'select',
                    'label' => $key,
                    'options' => $options,
                    'count' => count($uniqueValues)
                ];
            }
        }

        return $filterFields;
    }

    /**
     * API endpoint to load more products for infinite scroll
     */
    public function loadMore(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = 12;
        $category_id = $request->input('category', 'all');

        // Build product query (similar to index method)
        $productsQuery = Product::query()->with('category', 'specs');

        // Apply category filter if not 'all'
        if ($category_id !== 'all') {
            $productsQuery->where('category_id', $category_id);
        }

        // Apply filters from request parameters
        foreach ($request->except(['category', 'page']) as $key => $value) {
            if (strpos($key, 'spec_') === 0) {
                $specKey = substr($key, 5); // Remove 'spec_' prefix

                // Handle array values
                if (is_array($value)) {
                    $productsQuery->whereHas('specs', function ($query) use ($specKey, $value) {
                        $query->where('key', $specKey)
                            ->whereIn('value', $value);
                    });
                } else {
                    // Handle range filters
                    if (strpos($value, ',') !== false) {
                        list($min, $max) = explode(',', $value);
                        $productsQuery->whereHas('specs', function ($query) use ($specKey, $min, $max) {
                            $query->where('key', $specKey)
                                ->where('value', '>=', $min)
                                ->where('value', '<=', $max);
                        });
                    } else {
                        // Handle single value filters
                        $productsQuery->whereHas('specs', function ($query) use ($specKey, $value) {
                            $query->where('key', $specKey)
                                ->where('value', $value);
                        });
                    }
                }
            } else if ($key === 'in_stock' && $value !== 'all') {
                $inStock = $value === 'true' || $value === '1';
                $productsQuery->where('in_stock', $inStock);
            }
        }

        // Get total count before pagination
        $totalCount = $productsQuery->count();

        // Get products for the requested page
        $offset = ($page - 1) * $perPage;
        $products = $productsQuery->skip($offset)->take($perPage)->get();

        // Check if there are more products to load
        $hasMore = $totalCount > ($offset + $perPage);

        return response()->json([
            'products' => $products,
            'hasMore' => $hasMore,
            'totalCount' => $totalCount
        ]);
    }

    public function show($id)
    {
        [$defaultProps, $config] = getDefaultPageConfig('');
        
        $product = Product::findOrFail($id);
        $product->load('category', 'specs', 'features', 'applications', 'documents', 'images');

        // Get related products
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $id)
            ->take(3)
            ->get();

        $product->relatedProducts = $relatedProducts;

        return Inertia::render('Products/ProductDetailPage', [
            ...$defaultProps,
            'product' => $product
        ]);
    }
}