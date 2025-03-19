import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";

export default function Header({ phone, navLinks, logo, site_name, site_slogan }) {
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu when screen size becomes extra-large
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="fixed z-50 w-full bg-white shadow-xs">
            <nav className="container flex flex-row items-center justify-between px-4 py-3 mx-auto">
                {/* لوگو */}
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <img src={logo} alt={site_name} className="w-16 h-16" />
                    </Link>
                    <div className="border-gray-200 border-s-2 ps-4">
                        <span className="text-2xl font-bold text-blue-900" data-aos="zoom-in">
                            {site_name}
                        </span>
                        <p className="text-sm text-gray-600" data-aos="zoom-in">
                            {site_slogan}
                        </p>
                    </div>
                </div>

                {/* منو */}
                <div className="flex items-center gap-4 xl:gap-10" data-aos="fade-up">
                    {/* Hamburger button for mobile */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="xl:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-blue-900 transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-blue-900 transition duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`block w-6 h-0.5 bg-blue-900 transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden gap-10 text-gray-800 xl:flex">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className={`transition-colors font-medium ${
                                    url === link.url
                                        ? "text-blue-700"
                                        : "text-gray-800 hover:text-blue-700"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* <div className="flex items-center gap-4">
                        <Link href='/catalog' className="px-4 py-2 text-sm text-white transition-colors bg-blue-900 rounded-full sm:px-6 hover:bg-blue-800 sm:text-base">
                            کاتالوگ PDF
                        </Link>
                        <div className="hidden w-px h-8 bg-gray-200 sm:block"></div>
                        <span className="hidden text-blue-900 sm:inline"><FaPhone className="inline" /> {phone}</span>
                    </div> */}
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>

            <div
                className={`fixed top-[72px] right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-500 rounded-bl-3xl shadow-xl
                ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
                style={{
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
            >
                <nav className="flex flex-col h-full p-6 overflow-y-auto">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={`py-4 border-b border-gray-100 font-medium text-lg ${
                                url === link.url
                                    ? "text-blue-700"
                                    : "text-gray-800 hover:text-blue-700"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-6 mt-auto">
                        <p className="mb-2 font-bold text-blue-900">📞 {phone}</p>
                    </div>
                </nav>
            </div>
        </header>
    );
}
