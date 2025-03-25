import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';

const faqs = {
    'Prior Booking': [
        {
            id: 1,
            question: 'Can I book ferry tickets in advance through TryTrabby?',
            answer: 'Yes, advance booking is available and recommended.',
        },
        {
            id: 2,
            question: 'How early should I book my ferry ticket?',
            answer: 'At least a few weeks in advance, especially between October to May.',
        },
        {
            id: 3,
            question: 'Do I need to create an account to book a ticket?',
            answer: 'No, but having an account helps manage bookings.',
        },
        {
            id: 4,
            question: 'What details are required for ferry booking?',
            answer: 'Passenger details, travel date, route, and contact information.',
        },
        {
            id: 5,
            question: 'Can I book ferry tickets last-minute?',
            answer: 'Possible but not recommended due to high demand.',
        },
        {
            id: 6,
            question: 'What is the policy for infants?',
            answer: 'Infants (under 2 years) may travel free or at a discount with an adult.',
        },
        {
            id: 7,
            question: 'Can I carry luggage on the ferry?',
            answer: 'Yes, usually 15-25 kg per passenger. Extra luggage may incur charges.',
        },
    ],
    'During Booking': [
        {
            id: 8,
            question: 'How do I check ferry availability before booking?',
            answer: 'Check real-time availability by selecting your route, travel date, and preferred ferry operator.',
        },
        {
            id: 9,
            question: 'Can I choose my seat while booking?',
            answer: 'Yes, seat selection is available for different classes like Economy, Premium, Business, or VIP.',
        },
        {
            id: 10,
            question: 'What details do I need to provide while booking a ferry?',
            answer: 'Full name, age, gender, nationality, ID proof details, and contact information.',
        },
        {
            id: 11,
            question: 'Do I need to upload my ID proof while booking?',
            answer: 'Not required during booking but needed for boarding.',
        },
        {
            id: 12,
            question: 'What payment methods are accepted for ferry bookings?',
            answer: 'Credit/Debit Cards, UPI, Digital Wallets, and Net Banking.',
        },
        {
            id: 13,
            question: 'Will I receive a confirmation after booking?',
            answer: 'Yes, you will receive an email and SMS with your e-ticket and travel details.',
        },
        {
            id: 14,
            question: 'What should I do if I don’t receive my ticket after booking?',
            answer: 'Check your spam/junk folder. If missing, contact TryTrabby support.',
        },
        {
            id: 15,
            question: 'Can I book a ferry for someone else?',
            answer: 'Yes, enter their correct details during booking. The passenger must carry the same ID proof.',
        },
        {
            id: 16,
            question: 'Is it possible to make group bookings?',
            answer: 'Yes, group bookings are available. Booking in advance is recommended.',
        },
        {
            id: 17,
            question: 'What should I do if I make a mistake while entering my details?',
            answer: 'Minor errors might be corrected by contacting customer support, but ID details must match for boarding.',
        },
    ],
    'After Booking': [
        {
            id: 18,
            question: 'How do I get my ferry ticket after booking?',
            answer: "Your e-ticket will be sent via email and SMS, and can be downloaded from 'My Bookings'.",
        },
        {
            id: 19,
            question: 'What should I do if I don’t receive my e-ticket?',
            answer: 'Check spam/junk folder. If still missing, contact TryTrabby support.',
        },
        {
            id: 20,
            question: 'Do I need to print my ticket, or can I show a digital copy?',
            answer: 'Most ferries accept both, but carrying a printed copy is recommended in case of network issues.',
        },
        {
            id: 21,
            question: 'Can I change my travel date after booking?',
            answer: 'Changes depend on the ferry operator’s policy, and may involve additional fees.',
        },
        {
            id: 22,
            question: 'How do I cancel my ferry ticket?',
            answer: "Go to 'My Bookings' on TryTrabby and follow the cancellation process if allowed.",
        },
        {
            id: 23,
            question: 'Will I get a full refund if I cancel my booking?',
            answer: 'Refund policies vary. Some operators deduct a cancellation fee, while others may not offer refunds.',
        },
        {
            id: 24,
            question: 'Can I transfer my ferry ticket to another person?',
            answer: 'No, ferry tickets are non-transferable.',
        },
        {
            id: 25,
            question: 'What should I do if I miss my ferry?',
            answer: 'Missed tickets are usually non-refundable. You may need to purchase a new ticket.',
        },
        {
            id: 26,
            question: 'What happens if my ferry is delayed or canceled?',
            answer: 'The operator may offer rescheduling or a refund, depending on their policy.',
        },
        {
            id: 27,
            question: 'Can I upgrade my seat after booking?',
            answer: 'Seat upgrades depend on availability and ferry operator policies.',
        },
        {
            id: 28,
            question: 'What time should I arrive at the ferry terminal?',
            answer: 'Arrive at least 1 hour before departure for security checks and boarding.',
        },
        {
            id: 29,
            question: 'What documents do I need for boarding?',
            answer: 'Your ferry ticket (digital or printed) and a valid government ID proof matching the booking details.',
        },
    ],
};

export default function Faq() {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof faqs>('Prior Booking');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    return (
        <div className="flex flex-col items-start justify-around bg-[#29339B] p-4 text-white sm:p-6 md:flex-row md:p-8" id="faq">
            {/* Left Section (Title) */}
            <div className="text-center md:mt-12 md:basis-1/5 md:text-left">
                <h2 className="text-sm font-bold text-yellow-400">ASK ANYTHING</h2>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">FAQs About Andaman Ferry Booking</h1>
            </div>

            {/* Right Section (Tabs & FAQs) */}
            <div className="mt-6 w-full md:mt-8 md:basis-3/5">
                {/* Tabs */}
                <div className="mt-4 flex space-x-4 overflow-x-auto pb-2 whitespace-nowrap md:justify-start">
                    {Object.keys(faqs).map((category) => (
                        <button
                            key={category}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-6 sm:py-3 sm:text-lg ${
                                selectedCategory === category
                                    ? 'bg-white text-[#29339B]'
                                    : 'border-2 border-white text-white hover:bg-white hover:text-[#29339B]'
                            }`}
                            onClick={() => setSelectedCategory(category as keyof typeof faqs)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="mt-6 sm:mt-8">
                    {faqs[selectedCategory].map((faq) => (
                        <div key={faq.id} className="my-4 border-b-2 border-white p-3 sm:p-4">
                            <button
                                className="flex w-full items-center justify-between text-left text-sm font-medium sm:text-lg"
                                onClick={() => toggleFaq(faq.id)}
                            >
                                {faq.question}
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#29339B] sm:h-8 sm:w-8">
                                    {openFaq === faq.id ? (
                                        <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
                                    ) : (
                                        <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
                                    )}
                                </span>
                            </button>
                            {openFaq === faq.id && <p className="mt-2 text-sm text-gray-300 sm:text-base">{faq.answer}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
