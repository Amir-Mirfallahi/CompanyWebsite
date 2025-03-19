import IconMapper from "./IconMapper";

export default function IndustrySection({ industries }) {
    return (
        <section className="py-20 bg-white" id="industries">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-black text-center pb-3 text-blue-900">
                    صنایع پیشرو
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((industry, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
                        >
                            <div className="text-4xl mb-6 text-blue-900">
                                <IconMapper
                                    icon={industry.icon}
                                    className="h-12 w-12"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-blue-900">
                                {industry.title}
                            </h3>
                            <ul className="space-y-3">
                                {industry.examples.map((example, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-2 text-gray-700 before:content-['•'] before:text-blue-500"
                                    >
                                        {example}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 text-blue-900 hover:text-blue-700 flex items-center gap-2">
                                مشاهده همه
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
