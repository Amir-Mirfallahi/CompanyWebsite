export default function Team({ title, description, members }) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-black text-blue-900 mb-6">{title}</h2>
                    <p className="text-lg text-gray-700">{description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="text-center"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="relative mb-6 mx-auto w-48 h-48">
                                <div className="absolute inset-0 bg-blue-200 rounded-full transform rotate-6"></div>
                                <img
                                    src={member.profile_img_src}
                                    alt={member.name}
                                    className="relative rounded-full w-full h-full object-cover transform -rotate-3 transition-transform hover:rotate-0"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-2">
                                {member.name}
                            </h3>
                            <p className="text-gray-600">{member.position}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
