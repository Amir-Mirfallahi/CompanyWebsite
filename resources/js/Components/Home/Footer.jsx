import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "@inertiajs/react";

export default function Footer({contact, social, quickLinks, site_name, site_slogan}) {
    return (
        <footer className="text-white bg-blue-900" data-aos="fade-up">
            <div className="container px-4 py-12 mx-auto">
                <div className="grid gap-8 pb-12 border-b border-blue-800 md:grid-cols-3">
                    {/* درباره شرکت */}
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold">{site_name}</h4>
                        <p className="text-blue-200">
                            {site_slogan}
                        </p>
                    </div>

                    {/* محصولات */}
                    <div>
                        <h4 className="mb-4 text-xl font-bold">دسترسی سریع</h4>
                        <ul className="space-y-2 text-blue-200">
                            {quickLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.url}
                                        className="transition-colors hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* تماس */}
                    <div>
                        <h4 className="mb-4 text-xl font-bold">ارتباط با ما</h4>
                        <div className="space-y-3 text-blue-200">
                            <p>{contact.address}</p>
                            <p>تلفن: {contact.phone}</p>
                            <p>ایمیل: {contact.email}</p>
                            <div className="flex gap-4 mt-4">
                                {social.map(item => item.name === "instagram" ? <Link
                                    href={item.url}
                                    key={item.name}
                                    className="p-2 transition-colors bg-blue-800 rounded-full hover:bg-blue-700"
                                >
                                    <FaInstagram size={20} />
                                </Link> : item.name === "linkedin" ? <Link
                                    href={item.url}
                                    key={item.name}
                                    className="p-2 transition-colors bg-blue-800 rounded-full hover:bg-blue-700"
                                >
                                    <FaLinkedin size={20} />
                                </Link> : '')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* کپی رایت */}
                <div className="pt-8 text-center text-blue-300">
                    <p>
                        © {new Date().getFullYear()} کلیه حقوق برای {site_name + " "}
                        محفوظ است
                    </p>
                </div>
            </div>
        </footer>
    );
}
