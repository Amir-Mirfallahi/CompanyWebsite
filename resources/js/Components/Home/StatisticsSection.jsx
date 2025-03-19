import React, { useEffect, useState, useRef } from "react";
import IconMapper from "./IconMapper";

export default function StatisticsSection({ statistics }) {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState(statistics.map(() => 0));

    // Animation duration in milliseconds
    const animationDuration = 2000;

    // Function to animate number counting
    const animateNumbers = () => {
        const startTime = Date.now();
        const targetValues = statistics.map(stat => parseInt(stat.value, 10));

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            // Easing function for smoother animation (easeOutQuad)
            const easedProgress = 1 - (1 - progress) * (1 - progress);

            const newCounts = targetValues.map(target =>
                Math.floor(target * easedProgress)
            );

            setCounts(newCounts);

            if (progress >= 1) {
                clearInterval(interval);
            }
        }, 16); // ~60fps
    };

    // Check if element is in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    animateNumbers();
                }
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isVisible]);

    return (
        <section
            className="py-24 bg-blue-50"
            id="statistics"
            ref={sectionRef}
            data-aos="fade-up"
        >
            <div className="container px-4 mx-auto">
                <h2 className="mb-4 text-3xl font-black text-center text-blue-900" data-aos="fade-up">
                    آمار و ارقام
                </h2>
                <p className="mb-16 text-xl text-center text-gray-700" data-aos="fade-up" data-aos-delay="100">
                    عملکرد ما در نگاهی کوتاه
                </p>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {statistics.map((stat, index) => (
                        <div
                            key={index}
                            className="relative p-8 text-center transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-xl"
                            data-aos="zoom-in"
                            data-aos-delay={100 + index * 100}
                        >
                            <div className="absolute flex items-center justify-center w-16 h-16 text-white transform -translate-x-1/2 bg-blue-900 rounded-full shadow-lg -top-8 left-1/2">
                                <IconMapper
                                    icon={stat.icon}
                                    className="w-8 h-8"
                                />
                            </div>
                            <div className="pt-6">
                                <h3 className="flex items-end justify-center mb-2 text-5xl font-bold text-blue-900">
                                    <span className="tabular-nums">{isVisible ? counts[index] : 0}</span>
                                    <span className="ml-1 text-3xl">{stat.suffix}</span>
                                </h3>
                                <p className="text-lg font-medium text-gray-700">{stat.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
