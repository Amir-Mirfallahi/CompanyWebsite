import { Link } from "@inertiajs/react";


export default function Hero({ title, subtitle, buttons, image_src }) {
    return (
        <section className="pt-32 bg-linear-to-b from-blue-50 to-white" data-aos="fade-up">
            <div className="container flex flex-col items-center gap-16 px-4 mx-auto lg:flex-row">
                {/* متن */}
                <div className="space-y-8 lg:w-1/2" data-aos="zoom-up">
                    <h1 className="text-4xl font-black leading-tight text-blue-900 lg:text-5xl">
                        {title}
                    </h1>
                    <p className="text-xl leading-relaxed text-gray-700">
                        {subtitle}
                    </p>
                    <div className="flex gap-6">
                        <Link href={buttons['primary']['url']} className="px-8 py-4 text-lg text-white transition-all bg-blue-900 rounded-full shadow-xl hover:bg-blue-800">
                            {buttons['primary']['text']}
                        </Link>
                        <Link href={buttons['secondary']['url']} className="px-8 py-4 text-lg text-blue-900 transition-all border-2 border-blue-900 rounded-full hover:bg-blue-50">
                            {buttons['secondary']['text']}
                        </Link>
                    </div>
                </div>

                {/* تصویر */}
                <div className="relative lg:w-1/2" data-aos="zoom-left">
                    <div className="absolute transform bg-blue-100 -inset-8 rounded-3xl -rotate-3"></div>
                    <img
                        src={image_src}
                        className="relative transform shadow-2xl rounded-3xl rotate-1"
                        alt={title}
                    />
                </div>
            </div>
        </section>
    );
}
