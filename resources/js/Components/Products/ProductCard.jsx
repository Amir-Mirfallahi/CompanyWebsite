import { Link } from "@inertiajs/react";

export default function ProductCard({ product }) {
    // Safety check to ensure product is not null or undefined
    if (!product) {
        return <div className="p-4 bg-white border rounded-xl">هیچ داده ای در دسترس نیست.</div>;
    }

    // Get a limited number of specs to display
    const displaySpecs = product.specs ? product.specs.slice(0, 3) : [];
    const hasMoreSpecs = product.specs && product.specs.length > 3;

    return (
        <div className="flex flex-col h-full p-4 transition-all bg-white border border-gray-200 shadow-lg group rounded-xl hover:shadow-xl">
            {/* Image */}
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.title || 'Product image'}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                )}

                {typeof product.in_stock !== 'undefined' && (
                    product.in_stock ? (
                        <span className="absolute px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full shadow-sm top-2 right-2">
                            موجود
                        </span>
                    ) : (
                        <span className="absolute px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full shadow-sm top-2 right-2">
                            ناموجود
                        </span>
                    )
                )}

                {product.category && (
                    <span className="absolute px-3 py-1 text-xs text-white bg-blue-900 rounded-lg bottom-2 right-2 bg-opacity-80">
                        {product.category.name}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow space-y-3">
                <h3 className="text-lg font-bold text-blue-900 line-clamp-2">{product.title || 'Unnamed Product'}</h3>

                {/* Short description */}
                {product.short_description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{product.short_description}</p>
                )}

                {/* Specifications */}
                {displaySpecs.length > 0 && (
                    <ul className="space-y-1 text-sm text-gray-700">
                        {displaySpecs.map((spec, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <span className="text-blue-500">•</span>
                                <span className="line-clamp-1">
                                    {spec.key}: {spec.value}
                                </span>
                            </li>
                        ))}
                        {hasMoreSpecs && (
                            <li className="text-xs text-blue-600">
                                ...و {product.specs.length - 3} مشخصات دیگر
                            </li>
                        )}
                    </ul>
                )}

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-3 mt-auto border-t">
                    <div className="flex flex-col">
                        <span className="font-bold text-blue-900">{product.price || 'تماس بگیرید'}</span>
                        {product.old_price && (
                            <span className="text-xs text-gray-500 line-through">{product.old_price}</span>
                        )}
                    </div>
                    {product.id && (
                        <Link
                            href={route("product.show", product.id)}
                            className="px-4 py-2 text-sm text-white transition-colors bg-blue-900 rounded-full hover:bg-blue-800"
                        >
                            جزئیات بیشتر
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
