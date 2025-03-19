import ProductCard from "../Products/ProductCard";

export default function ProductGrid({ products }) {
    return (
        <section className="py-20 bg-white" id="products" data-aos="fade-up">
            <div className="container px-4 mx-auto">
                <h2 className="mb-16 text-3xl font-black text-center text-blue-900">
                    محصولات
                </h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={product || {}}
                            data-aos="fade-up"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
