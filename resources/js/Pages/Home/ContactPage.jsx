import { useEffect } from "react";
import AOS from "aos";
import ContactHero from "../../Components/Contact/ContactHero";
import ContactForm from "../../Components/Contact/ContactForm";
import ContactInfo from "../../Components/Contact/ContactInfo";
import "aos/dist/aos.css";
import HomeLayout from "@/Layouts/HomeLayout";
import {Head} from "@inertiajs/react"

export default function ContactPage({ header, footer, contactInfo, formFields }) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: true,
        });
    }, []);

    return (
        <HomeLayout header={header} footer={footer} className="pt-24">
            <Head>
                <title>تماس با ما</title>
                <meta name="description" content="تماس با ما" />
            </Head>
                <ContactHero title={contactInfo.title} subtitle={contactInfo.subtitle} />
                <div className="container px-4 py-16 mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div data-aos="fade-left">
                            <ContactForm fields={formFields} />
                        </div>
                        <div data-aos="fade-right">
                            <ContactInfo info={contactInfo} />
                        </div>
                    </div>
                </div>
        </HomeLayout>
    );
}
