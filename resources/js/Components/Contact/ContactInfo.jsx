import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function ContactInfo({ info }) {
    return (
        <div className="space-y-8">
            {info.locations.map((location, index) => (
                <div
                    key={index}
                    className="p-6 bg-white rounded-xl shadow-lg"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                >
                    <h3 className="mb-4 text-xl font-bold text-blue-900">
                        {location.title}
                    </h3>
                    <div className="space-y-3">
                        <div className="flex gap-3 items-center">
                            <FaMapMarkerAlt className="text-blue-900" />
                            <span>{location.address}</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaPhone className="text-blue-900" />
                            <span dir="ltr">{location.phone}</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaEnvelope className="text-blue-900" />
                            <span>{location.email}</span>
                        </div>
                    </div>
                </div>
            ))}

            <div className="grid gap-4 mt-8 md:grid-cols-3">
                {info.departments.map((dept, index) => (
                    <div
                        key={index}
                        className="flex flex-col p-3 bg-white rounded-lg border border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                    >
                        <h4 className="pb-2 font-bold text-center text-blue-900 border-b border-gray-100">{dept.title}</h4>
                        <div className="mt-3 space-y-2 text-sm" dir="ltr">
                            <div className="flex gap-2 items-center">
                                <FaEnvelope className="text-blue-700 min-w-4" />
                                <a href={`mailto:${dept.email}`} className="text-gray-700 truncate">{dept.email}</a>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaPhone className="text-blue-700 min-w-4" />
                                <a href={`tel:${dept.phone}`} className="text-gray-700">{dept.phone}</a>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaMapMarkerAlt className="text-blue-700 min-w-4" />
                                <span className="text-gray-700 truncate">{dept.address}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaClock className="text-blue-700 min-w-4" />
                                <span className="text-gray-700">{dept.working_hours}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
