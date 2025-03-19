import IconMapper from "../Home/IconMapper";

export default function Values({ title, items }) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-4 mx-auto">
                <h2 className="mb-16 text-3xl font-black text-center text-blue-900" data-aos="fade-up">
                    {title}
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="p-8 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl hover:transform hover:scale-105"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="flex flex-col items-center mb-4">
                                {item.icon_image && (
                                    <div className="mb-4">
                                        <i className="flex items-center justify-center w-16 h-16 text-blue-900"
                                           dangerouslySetInnerHTML={{__html: item.icon_image}}></i>
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-center text-blue-900">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="leading-relaxed text-center text-gray-700">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
