import {
    FaIndustry,
    FaBuilding,
    FaTruck,
    FaCogs,
    FaCertificate,
    FaPhoneAlt,
    FaUsers,
    FaCalendarAlt,
    FaClipboardCheck,
    FaCube,
    FaStar,
    FaChartBar,
    FaGlobe,
    FaCheckCircle,
    FaHeart,
    FaBriefcase,
    FaLightbulb,
    FaClock
} from "react-icons/fa";

const iconMap = {
    industry: FaIndustry,
    building: FaBuilding,
    truck: FaTruck,
    gears: FaCogs,
    certificate: FaCertificate,
    phone: FaPhoneAlt,
    users: FaUsers,
    calendar: FaCalendarAlt,
    "clipboard-check": FaClipboardCheck,
    cube: FaCube,
    star: FaStar,
    "chart-bar": FaChartBar,
    globe: FaGlobe,
    "badge-check": FaCheckCircle,
    heart: FaHeart,
    briefcase: FaBriefcase,
    "light-bulb": FaLightbulb,
    clock: FaClock
};

export default function IconMapper({ icon, className }) {
    const IconComponent = iconMap[icon];

    if (!IconComponent) {
        console.warn(`Icon "${icon}" not found in IconMapper`);
        return null;
    }

    return <IconComponent className={className} />;
}
