export default function ContactHero({ title, subtitle }) {
    return (
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
            <div className="container mx-auto px-4 text-center" data-aos="fade-up">
                <h1 className="text-4xl lg:text-5xl font-black text-blue-900 mb-4">
                    {title}
                </h1>
                <p className="text-xl text-gray-700">{subtitle}</p>
            </div>
        </section>
    );
}
