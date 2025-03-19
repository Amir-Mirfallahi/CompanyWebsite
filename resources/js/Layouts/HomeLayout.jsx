import { Head } from "@inertiajs/react";
import Header from "@/Components/Home/Header";
import Footer from "@/Components/Home/Footer";

export default function HomeLayout({
    children,
    header,
    footer,
    className = "rtl-grid-layout",
}) {
    return (
        <div className="font-yekan">
            <Head title={header.site_name} />
            <Header {...header} />

            <main className={className}>{children}</main>

            <Footer {...footer} />
        </div>
    );
}
