import { CheckCircle, Phone, Ship, Tag } from 'lucide-react';

const features = [
    {
        icon: <Ship className="h-8 w-8 text-[#29339B]" />,
        title: 'Hassle-Free Andaman Ferry Booking',
        points: [
            'Instant Bookings – No waiting, no delays.',
            'Secure Payments – Pay online with trusted gateways.',
            'Real-Time Availability – Know your seat status before booking.',
        ],
    },
    {
        icon: <Tag className="h-8 w-8 text-[#29339B]" />,
        title: 'Best Discounts on Ferry Tickets',
        points: ["Use Code 'FERRY15' – Get a 15% discount instantly.", 'Sign Up & Save 25% – No coupon required, just register and book!'],
    },
    {
        icon: <Ship className="h-8 w-8 text-[#29339B]" />,
        title: 'Trusted & Comfortable Ferry Options',
        points: [
            'Makruzz – Luxury and premium seating available.',
            'Nautika – Modern, fast, and spacious ferries.',
            'Green Ocean – Open deck with stunning ocean views.',
        ],
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-[#29339B]" />,
        title: 'Live Schedule & Easy Rescheduling',
        points: [
            'Real-time ferry schedules – Stay updated on departures.',
            'Flexible changes – Modify your booking without hassle.',
            'Guaranteed seats – Book in advance to secure your spot.',
        ],
    },
    {
        icon: <Phone className="h-8 w-8 text-[#29339B]" />,
        title: 'Dedicated Customer Support',
        points: ['Email us – Quick responses to all your queries.', 'Call us – Get real-time help from our experts.'],
    },
];

export default function WhyChoose() {
    return (
        <div className="bg-gray-100 px-6 py-7 md:px-16" id="why-choose">
            <h2 className="mb-5 text-center text-2xl font-bold text-gray-800 md:text-4xl">Why Book Your Andaman Ferry with TryTrabby?</h2>
            <div className="overflow-x-auto">
                <div className="mx-auto my-5 flex max-w-7xl gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="min-w-[300px] rounded-xl bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3 className="mb-3 text-center text-lg font-semibold text-gray-800 md:text-xl">{feature.title}</h3>
                            <ul className="hidden space-y-2 text-sm text-gray-600 md:block">
                                {feature.points.map((point, i) => (
                                    <div key={i} className="flex items-start space-x-2">
                                        <li>
                                            <CheckCircle className="mt-1 mr-2 h-5 w-5 text-green-500" />
                                        </li>
                                        <li>{point}</li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
