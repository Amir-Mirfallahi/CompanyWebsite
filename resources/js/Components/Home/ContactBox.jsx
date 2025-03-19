import IconMapper from "./IconMapper";
import { Link } from '@inertiajs/react';

export default function ContactBox() {
    return (
        <section className="py-20 bg-gray-50" data-aos="fade-up" data-aos-duration="1000">
            <div className="container px-4 mx-auto">
                <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
                    <div className="grid lg:grid-cols-2">
                        {/* متن */}
                        <div className="p-12 space-y-8">
                            <h2 className="text-3xl font-black text-blue-900">
                                تماس با ما
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                با کارشناسان ما در ارتباط باشید. ما آماده‌ایم تا به سوالات شما پاسخ دهیم
                                و در مورد نیازهای صنعتی شما مشاوره ارائه دهیم
                            </p>
                            <li className="flex items-center gap-3">
                                <span className="p-2 text-blue-900 bg-blue-100 rounded-full">
                                    <IconMapper
                                        icon="phone"
                                        className="w-5 h-5"
                                    />
                                </span>
                                پاسخگویی سریع به تمامی پرسش‌های شما
                            </li>
                            <li className="flex items-center gap-3" >
                                <span className="p-2 text-blue-900 bg-blue-100 rounded-full">
                                    <IconMapper
                                        icon="users"
                                        className="w-5 h-5"
                                    />
                                </span>
                                مشاوره تخصصی با کارشناسان مجرب
                            </li>
                            <Link href="/contact" className="inline-block px-8 py-3 text-white transition-colors bg-blue-900 rounded-full hover:bg-blue-800">
                                ارتباط با ما
                            </Link>
                        </div>

                        {/* تصویر */}
                        <div className="flex items-center justify-center p-12 bg-linear-to-br from-blue-900 to-blue-700" >
                            <img
                                src="/image/contact-phone.jpg"
                                className="shadow-2xl rounded-xl"
                                alt="تماس با ما"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}