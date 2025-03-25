import { CheckCircle, MoveRight, Ship } from 'lucide-react'; // Importing Lucide icons
import { useState } from 'react';

const ferries = [
    {
        name: 'Green Ocean',
        description:
            'The M.V. Green Ocean offers an affordable and comfortable ferry experience for travelers exploring the Andaman Islands. Designed to accommodate more passengers than government ferries, it provides a spacious and relaxed journey.',
        details: [
            'Lower Deck – Economy & Executive',
            'Upper Deck – Luxury & Royal Class',
            'Open deck with sea breeze and panoramic views',
            'Onboard pantry, entertainment screens, and music',
        ],
        image: '/images/green-ocean.png',
    },
    {
        name: 'Makruzz',
        description:
            'Makruzz Gold is a high-speed catamaran-style ferry offering a world-class travel experience between Port Blair, Havelock (Swaraj Dweep), and Neil Island. It was the first high-speed ferry service launched in the Andaman Islands in 2012 and is known for its punctuality, comfort, and top-tier service standards.',
        details: ['High-speed catamaran ferry', 'Multiple daily trips for seamless connectivity', 'TryTrabby offers advance online booking'],
        image: '/images/makruzz.webp',
    },
    {
        name: 'Nautika',
        description:
            'Nautika, the newest addition to Andaman’s ferry services, is a state-of-the-art catamaran that combines speed, luxury, and innovation. Designed by the renowned Incat Crowther and built at Penguin Shipyard, this 33-meter-long vessel was launched in October 2021 and officially joined the Sealink fleet in 2022.',
        details: [
            'Lower Deck – Luxury Class',
            'Upper Deck – Royal Class',
            'Cruises at 30 knots, one of the fastest in Andaman',
            'Modern interiors with plush seating and entertainment',
        ],
        image: '/images/nautika.png',
    },
    {
        name: 'Route',
        description:
            'TryTrabby helps you book ferry tickets online easily between the stunning Andaman Islands than ever. Our ferries cover major key destinations, including Port Blair (Sri Vijaya Puram), Havelock ( Swaraj Dweep), and Neil Island (Shaheed Dweep).',
        details: [
            'Port Blair to Havelock – 14 ferries/day',
            'Havelock to Port Blair – 8 ferries/day',
            'Neil Island to Port Blair – 7 ferries/day',
            'Havelock to Neil Island – 7 ferries/day',
        ],
        image: '/images/Route.png',
    },
];

export default function OperatorsAndRoute() {
    const [selectedFerry, setSelectedFerry] = useState(ferries[0]);

    return (
        <div className="bg-white px-4 py-10 md:px-16" id="operators-routes">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">Popular Ferries & Routes</h2>

                {/* Ferry Selection Tabs */}
                <div className="mb-6 flex flex-wrap justify-center gap-3 md:gap-4">
                    {ferries.map((ferry, index) => (
                        <button
                            key={index}
                            className={`flex items-center gap-2 rounded-full px-5 py-2 text-base font-medium transition-all duration-300 md:text-lg ${
                                selectedFerry.name === ferry.name
                                    ? 'bg-[#29339B] text-white shadow-md'
                                    : 'border border-[#29339B] text-[#29339B] hover:bg-[#29339B] hover:text-white'
                            }`}
                            onClick={() => setSelectedFerry(ferry)}
                        >
                            <Ship className="h-5 w-5" />
                            <span>{ferry.name}</span>
                        </button>
                    ))}
                </div>

                {/* Ferry Details */}
                <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
                    {/* Ferry Image */}
                    <div className="flex w-full justify-center md:w-1/3">
                        <img
                            src={selectedFerry.image}
                            alt={selectedFerry.name}
                            className={`${selectedFerry.name === 'Route' ? 'h-full' : 'h-32'} ${selectedFerry.name === 'Route' ? 'w-full' : 'w-fit'} rounded-2xl shadow-lg md:h-auto ${selectedFerry.name === 'Route' ? 'md:w-full' : 'md:w-56'}`}
                        />
                    </div>

                    {/* Ferry Information */}
                    <div className="flex w-full flex-col items-start justify-center rounded-2xl bg-gray-50 p-5 shadow-lg md:w-2/3 md:p-6">
                        <h3 className="mb-3 text-xl font-semibold text-gray-900 md:text-2xl">{selectedFerry.name}</h3>
                        <p className="mb-4 text-sm text-gray-700 md:text-base">{selectedFerry.description}</p>
                        <ul className="space-y-2 text-sm text-gray-800 md:text-base">
                            {selectedFerry.details.map((detail, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                                    {detail}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <button className="mt-5 flex items-center space-x-2 rounded-full bg-[#29339B] px-5 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 md:mt-6 md:text-lg">
                            <span>Book a ferry</span>
                            <div className="ml-5 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                                <MoveRight color="#29339B" size={20} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
