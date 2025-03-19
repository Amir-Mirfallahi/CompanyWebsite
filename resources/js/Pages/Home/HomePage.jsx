import { useEffect } from "react";
import AOS from "aos";
import Hero from "../../Components/Home/Hero";
import ProductGrid from "../../Components/Home/ProductGrid";
import StatisticsSection from "../../Components/Home/StatisticsSection";
import ContactBox from "@/Components/Home/ContactBox";
import "aos/dist/aos.css";
import HomeLayout from "@/Layouts/HomeLayout";

export default function HomePage({ header, footer, products, statistics, hero }) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: true,
        });
    }, []);

    return (
        <HomeLayout header={header} footer={footer}>
                <Hero {...hero} />
                <ProductGrid products={products} data-aos="fade-up" />
                <StatisticsSection statistics={statistics} data-aos="fade-up" />
                <ContactBox data-aos="fade-up" />
        </HomeLayout>
    );
}
