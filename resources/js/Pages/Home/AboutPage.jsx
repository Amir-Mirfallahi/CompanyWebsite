import { useEffect } from "react";
import AOS from "aos";
import AboutHero from "../../Components/About/AboutHero";
import Story from "../../Components/About/Story";
import Values from "../../Components/About/Values";
import Team from "../../Components/About/Team";
import Certifications from "../../Components/About/Certifications";
import "aos/dist/aos.css";
import HomeLayout from "@/Layouts/HomeLayout";

export default function AboutPage({ header, footer, hero, story, values, team, certifications }) {
    console.log(hero);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: true,
        });
    }, []);

    return (

        <HomeLayout header={header} footer={footer}>
            <AboutHero {...hero} />
            <Story {...story} />
            <Values {...values} />
            <Team {...team} />
            <Certifications {...certifications} />
        </HomeLayout>
    );
}
