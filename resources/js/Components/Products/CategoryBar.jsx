import { useRef, useEffect, useState } from 'react';

export default function CategoryBar({ categories, activeCategory, setActiveCategory }) {
    const scrollContainerRef = useRef(null);
    const [showScrollLeft, setShowScrollLeft] = useState(false);
    const [showScrollRight, setShowScrollRight] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isRTL, setIsRTL] = useState(true); // Default to RTL mode

    // Check if scroll controls are needed and detect RTL mode
    useEffect(() => {
        // Detect RTL mode from document or HTML dir attribute
        const documentDir = document.dir || document.documentElement.dir;
        setIsRTL(documentDir === 'rtl' || window.getComputedStyle(document.body).direction === 'rtl');

        const checkScroll = () => {
            const container = scrollContainerRef.current;
            if (!container) return;

            if (isRTL) {
                // RTL scrolling logic (reversed)
                const maxScrollRight = container.scrollWidth - container.clientWidth;
                setShowScrollRight(container.scrollLeft < -10); // Negative in RTL
                setShowScrollLeft(Math.abs(container.scrollLeft) < maxScrollRight - 10);
            } else {
                // LTR scrolling logic
                setShowScrollLeft(container.scrollLeft > 0);
                setShowScrollRight(
                    container.scrollLeft < container.scrollWidth - container.clientWidth - 10
                );
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            checkScroll();
            container.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);

            return () => {
                container.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            };
        }
    }, [categories, isRTL]);

    // Scroll to active category when it changes
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const activeButton = container.querySelector(`button[data-category="${activeCategory}"]`);
        if (activeButton) {
            const containerRect = container.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            // Center the active button if it's not fully visible
            if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
                const scrollPosition =
                    activeButton.offsetLeft -
                    (container.clientWidth / 2) +
                    (activeButton.clientWidth / 2);

                container.scrollTo({
                    left: isRTL ? -scrollPosition : Math.max(0, scrollPosition), // Negative for RTL
                    behavior: 'smooth'
                });
            }
        }
    }, [activeCategory, isRTL]);

    // Handle scroll buttons
    const handleScroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container || isScrolling) return;

        setIsScrolling(true);

        // Adaptive scroll amount based on container width
        const scrollAmount = container.clientWidth * 0.6;

        // Adjust direction for RTL
        const effectiveDirection = isRTL ? (direction === 'left' ? 'right' : 'left') : direction;

        const newPosition =
            effectiveDirection === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        });

        // Prevent rapid consecutive scrolls
        setTimeout(() => setIsScrolling(false), 500);
    };

    return (
        <div className="relative p-4 mb-8 bg-white shadow-lg rounded-xl" data-aos="fade-up">
            {/* Left edge gradient indicator - appears on right side in RTL */}
            {showScrollRight && (
                <div
                    className={`absolute top-0 bottom-0 ${isRTL ? 'right-0' : 'left-0'} z-10 w-12 pointer-events-none`}
                    style={{
                        background: isRTL
                            ? 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
                            : 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
                    }}
                />
            )}

            {/* Left scroll button - appears on right side in RTL */}
            {showScrollRight && (
                <button
                    onClick={() => handleScroll('left')}
                    className={`absolute z-20 flex items-center justify-center w-8 h-8 text-blue-900 transition-all duration-300 transform -translate-y-1/2 bg-white rounded-full shadow-md ${isRTL ? 'right-2' : 'left-2'} top-1/2 hover:bg-blue-50 hover:scale-110 active:scale-95`}
                    aria-label={isRTL ? "Scroll right" : "Scroll left"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                    </svg>
                </button>
            )}

            {/* Categories container with horizontal scroll */}
            <div
                dir={isRTL ? "rtl" : "ltr"}
                ref={scrollContainerRef}
                className="flex gap-3 px-1 py-1 overflow-x-auto hide-scrollbar scroll-smooth"
            >
                <button
                    data-category="all"
                    onClick={() => setActiveCategory('all')}
                    className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
                        activeCategory === 'all'
                            ? 'bg-blue-900 text-white shadow-md transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                    }`}
                >
                    همه محصولات
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        data-category={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${
                            activeCategory == category.id
                                ? 'bg-blue-900 text-white shadow-md transform scale-105'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Right scroll button - appears on left side in RTL */}
            {showScrollLeft && (
                <button
                    onClick={() => handleScroll('right')}
                    className={`absolute z-20 flex items-center justify-center w-8 h-8 text-blue-900 transition-all duration-300 transform -translate-y-1/2 bg-white rounded-full shadow-md ${isRTL ? 'left-2' : 'right-2'} top-1/2 hover:bg-blue-50 hover:scale-110 active:scale-95`}
                    aria-label={isRTL ? "Scroll left" : "Scroll right"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                    </svg>
                </button>
            )}

            {/* Right edge gradient indicator - appears on left side in RTL */}
            {showScrollLeft && (
                <div
                    className={`absolute top-0 bottom-0 ${isRTL ? 'left-0' : 'right-0'} z-10 w-12 pointer-events-none`}
                    style={{
                        background: isRTL
                            ? 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
                            : 'linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
                    }}
                />
            )}

            {/* Add some style to hide scrollbar but keep functionality */}
            <style jsx="true">{`
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;  /* Chrome, Safari, Opera */
                }
                .scroll-smooth {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}
