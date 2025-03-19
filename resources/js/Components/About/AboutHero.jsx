export default function AboutHero({ title, subtitle, image }) {
    return (
        <section className="pt-32 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-8" data-aos="fade-up">
                        <h1 className="text-4xl lg:text-5xl font-black text-blue-900 leading-tight">
                            {title}
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            {subtitle}
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative" data-aos="fade-left">
                        <div className="absolute -inset-8 bg-blue-100 rounded-3xl transform -rotate-3"></div>
                        <img
                            src={image}
                            alt={title}
                            className="relative w-full h-auto rounded-2xl shadow-lg"
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}
