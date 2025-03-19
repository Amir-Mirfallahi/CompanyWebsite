export default function Story({ title, content, milestones }) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-black text-blue-900 mb-6">{title}</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">{content}</p>
                </div>
                
                <div className="relative">
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-blue-200"></div>
                    <div className="space-y-16">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className="relative"
                                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                            >
                                <div className={`flex items-center gap-8 ${
                                    index % 2 === 0 ? "flex-row-reverse" : ""
                                }`}>
                                    <div className="w-1/2">
                                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                            <span className="text-2xl font-bold text-blue-900 block mb-3">
                                                {milestone.year}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-gray-700">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-4 h-4 bg-blue-900 rounded-full relative z-10"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}