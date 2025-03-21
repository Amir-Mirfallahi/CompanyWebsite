import React, { useEffect, useState, useMemo } from 'react';
import { Head, Link } from "@inertiajs/react";
import AOS from "aos";
import { FaTruck, FaShieldAlt, FaDownload, FaCartPlus } from "react-icons/fa";
import "aos/dist/aos.css";
import HomeLayout from '@/Layouts/HomeLayout';

const ProductDetailPage = ({ product, header, footer }) => {
    const [selectedImage, setSelectedImage] = useState('');
    const [activeTab, setActiveTab] = useState('specs');
    const [isLoading, setIsLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    console.log(header);


    // Validate product data
    const isValidProduct = useMemo(() => {
        return product &&
            product.title &&
            // product.category &&
            product.price;
    }, [product]);

    // Set default selected image once product data is available
    useEffect(() => {
        if (product && product.image) {
            setSelectedImage(product.image);
            setIsLoading(false);
        }
    }, [product]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    // Handle image loading error
    const handleImageError = (e) => {
        e.target.src = '/placeholder.png'; // Replace with your placeholder image
        setImageError(true);
    };

    if (!isValidProduct) {
        return (
            <HomeLayout header={header || {}}
            footer={footer || {}} className="pt-32 pb-20">
                <div className="container px-4 mx-auto text-center" data-aos="fade-up">
                    <h1 className="mb-4 text-2xl font-bold text-red-600">محصول یافت نشد</h1>
                    <p className="mb-8 text-gray-600">اطلاعات محصول درخواستی در دسترس نیست.</p>
                    <Link
                        href="/products"
                        className="px-6 py-3 text-white bg-blue-900 rounded-xl hover:bg-blue-800"
                    >
                        بازگشت به لیست محصولات
                    </Link>
                </div>
            </HomeLayout>
        );
    }
    console.log(header);

    return (
        <HomeLayout
        header={header || {}}
        footer={footer || {}}
            className="min-h-screen font-yekan bg-gray-50"
        >
            <div className="container px-4 mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm" aria-label="مسیر دسترسی">
                    <ol className="flex gap-2 text-gray-600">
                        <li><Link href="/" className="hover:text-blue-700">خانه</Link></li>
                        <li aria-hidden="true">/</li>
                        <li><Link href="/products" className="hover:text-blue-700">محصولات</Link></li>
                        <li aria-hidden="true">/</li>
                        <li><Link href={`/products/category/${product.category?.id || ""}`} className="hover:text-blue-700">{product.category?.name || "?????????"}</Link></li>
                        <li aria-hidden="true">/</li>
                        <li className="text-blue-900" aria-current="page">{product.title}</li>
                    </ol>
                </nav>

                {/* Product Overview */}
                <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
                    <div className="grid gap-12 lg:grid-cols-2">
                        {/* Product Images */}
                        <div className="space-y-4" data-aos="fade-left">
                            <div className="overflow-hidden border border-gray-200 aspect-square rounded-xl">
                                {isLoading ? (
                                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                                        <span className="text-gray-400">در حال بارگذاری تصویر...</span>
                                    </div>
                                ) : (
                                    <img
                                        src={selectedImage}
                                        alt={`تصویر ${product.title}`}
                                        className="object-cover w-full h-full"
                                        onError={handleImageError}
                                        loading="eager"
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images && product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(img)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === img ? 'border-blue-600' : 'border-gray-200'
                                        }`}
                                        aria-label={`انتخاب تصویر ${index + 1} محصول`}
                                        aria-pressed={selectedImage === img}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.title} - تصویر ${index + 1}`}
                                            className="object-cover w-full h-full"
                                            onError={handleImageError}
                                            loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6" data-aos="fade-right">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-black text-blue-900">{product.title}</h1>
                                <p className="text-gray-600">{product.shortDescription || 'توضیحات محصول'}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-blue-900">{product.price.toLocaleString('fa-IR')} تومان</span>
                                {product.inStock ? (
                                    <span className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                                        موجود در انبار
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 text-sm text-red-800 bg-red-100 rounded-full">
                                        ناموجود
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    className={`flex items-center justify-center gap-2 px-6 py-3 text-white transition-colors rounded-xl ${
                                        product.in_stock
                                            ? 'bg-blue-900 hover:bg-blue-800'
                                            : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={!product.in_stock}
                                    aria-label="افزودن به سبد خرید"
                                >
                                    <FaCartPlus aria-hidden="true" />
                                    افزودن به سبد خرید
                                </button>
                                <a
                                    href={product.catalogUrl || '#'}
                                    className="flex items-center justify-center gap-2 px-6 py-3 text-blue-900 transition-colors border-2 border-blue-900 rounded-xl hover:bg-blue-50"
                                    download={product.catalogFilename || true}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="دانلود کاتالوگ محصول"
                                >
                                    <FaDownload aria-hidden="true" />
                                    دانلود کاتالوگ
                                </a>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <span className="p-2 text-blue-900 rounded-lg bg-blue-50">
                                        <FaTruck className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    ارسال رایگان
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <span className="p-2 text-blue-900 rounded-lg bg-blue-50">
                                        <FaShieldAlt className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    گارانتی ۲۴ ماهه
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="overflow-hidden bg-white shadow-lg rounded-2xl" data-aos="fade-up">
                    <div className="border-b border-gray-200">
                        <div className="flex" role="tablist">
                            {['specs', 'features', 'applications'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-4 text-sm font-medium transition-colors ${
                                        activeTab === tab
                                            ? 'border-b-2 border-blue-900 text-blue-900'
                                            : 'text-gray-600 hover:text-blue-900'
                                    }`}
                                    role="tab"
                                    aria-selected={activeTab === tab}
                                    aria-controls={`${tab}-panel`}
                                    id={`${tab}-tab`}
                                >
                                    {tab === 'specs' && 'مشخصات فنی'}
                                    {tab === 'features' && 'ویژگی‌ها'}
                                    {tab === 'applications' && 'کاربردها'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8">
                        <div
                            id="specs-panel"
                            role="tabpanel"
                            aria-labelledby="specs-tab"
                            hidden={activeTab !== 'specs'}
                        >
                            {product.specs && product.specs.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2">
                                    {product.specs.map((spec, index) => (
                                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">{spec.key}</span>
                                            <span className="font-medium text-gray-900">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">اطلاعات مشخصات فنی در دسترس نیست.</p>
                            )}
                        </div>

                        <div
                            id="features-panel"
                            role="tabpanel"
                            aria-labelledby="features-tab"
                            hidden={activeTab !== 'features'}
                        >
                            {product.features && product.features.length > 0 ? (
                                <ul className="space-y-4">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-700">
                                            <span className="flex-shrink-0 text-blue-500" aria-hidden="true">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">اطلاعات ویژگی‌ها در دسترس نیست.</p>
                            )}
                        </div>

                        <div
                            id="applications-panel"
                            role="tabpanel"
                            aria-labelledby="applications-tab"
                            hidden={activeTab !== 'applications'}
                        >
                            {product.applications && product.applications.length > 0 ? (
                                <ul className="space-y-4">
                                    {product.applications.map((app, index) => (
                                        <li key={index} className="flex items-center gap-3 text-gray-700">
                                            <span className="flex-shrink-0 text-blue-500" aria-hidden="true">•</span>
                                            {app}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">اطلاعات کاربردها در دسترس نیست.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {product.relatedProducts && product.relatedProducts.length > 0 && (
                    <div className="mt-12" data-aos="fade-up">
                        <h2 className="mb-8 text-2xl font-bold text-blue-900">محصولات مرتبط</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {product.relatedProducts.map((relatedProduct, index) => (
                                <Link
                                    key={index}
                                    href={`/products/${relatedProduct.id}`}
                                    className="p-6 transition-all bg-white shadow-lg group rounded-xl hover:shadow-xl"
                                >
                                    <div className="mb-4 overflow-hidden rounded-lg aspect-square">
                                        <img
                                            src={relatedProduct.image}
                                            alt={relatedProduct.title}
                                            className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                            onError={handleImageError}
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-blue-900">{relatedProduct.title}</h3>
                                    <p className="text-gray-900">{(relatedProduct.price || 0).toLocaleString('fa-IR')} تومان</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
};

export default ProductDetailPage;

