export default function Certifications({ title, items }) {
    return (
        <section className="py-20 bg-blue-50">
            <div className="container px-4 mx-auto">
                <h2 className="mb-16 text-3xl font-black text-center text-blue-900" data-aos="fade-up">
                    {title}
                </h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {items.map((cert, index) => (
                        <div
                            key={cert.id || index}
                            className="px-8 py-4 bg-white rounded-full shadow-lg"
                            data-aos="zoom-in"
                            data-aos-delay={index * 100}
                        >
                            <span className="font-bold text-blue-900">{cert.cerificate}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
