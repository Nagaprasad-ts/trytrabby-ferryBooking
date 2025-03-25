/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BreadcrumbItem {
    title: string;
    href: string;
}

const ThankYouPage = ({ details }: { details: any }) => {
    const { travellers, email, phone, couponCode, termsAgreed, ferries } = details;

    const [parsedTravellers, setParsedTravellers] = useState<any[]>([]);
    const parsedFerries = Array.isArray(ferries) ? ferries : JSON.parse(ferries || '[]');

    const [loading, setLoading] = useState(true);

    // Parse travellers safely
    useEffect(() => {
        try {
            setParsedTravellers(Array.isArray(travellers) ? travellers : JSON.parse(travellers));
        } catch (error) {
            console.error('Error parsing travellers:', error);
            setParsedTravellers([]);
        }
    }, [travellers]);

    // Simulate loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mx-12 w-full max-w-md md:mx-0">
            <motion.div style={{ perspective: 800 }} className="relative">
                <motion.div
                    style={{ z: 100 }}
                    drag
                    dragElastic={0.2}
                    dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                    className="relative rounded-2xl border border-[#29339B] bg-gray-300 p-6 shadow-2xl backdrop-blur-md"
                >
                    {loading ? (
                        <div className="flex h-48 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-[#29339B]" />
                        </div>
                    ) : (
                        <div className="space-y-6 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                                className="flex items-center justify-center"
                            >
                                <CheckCircle className="h-16 w-16 text-[#29339B]" />
                            </motion.div>
                            <h2 className="text-3xl font-semibold text-[#29339B] sm:text-4xl">Thank You!</h2>
                            <p className="text-base text-gray-800 sm:text-lg">Your submission has been received.</p>
                            <Button
                                asChild
                                className="w-full rounded-full bg-gradient-to-r from-[#29339B]/50 to-[#29339B] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[#29339B]/20"
                            >
                                <a href="/">
                                    <span>Back to Homepage</span>
                                    <ArrowRight className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
                <h1 className="text-center text-2xl font-bold text-green-600">Thank You for Your Submission!</h1>

                <div className="mt-4">
                    <p>
                        <strong>Email:</strong> {email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {phone}
                    </p>
                    <p>
                        <strong>Coupon Code:</strong> {couponCode || 'N/A'}
                    </p>
                    <p>
                        <strong>Terms Agreed:</strong> {termsAgreed ? 'Yes' : 'No'}
                    </p>

                    <h2 className="mt-4 text-xl font-semibold">Travellers Information:</h2>
                    {parsedTravellers.map((traveller, index) => (
                        <div key={index} className="mt-2 rounded border p-3">
                            <p>
                                <strong>Title:</strong> {traveller.title}
                            </p>
                            <p>
                                <strong>Full Name:</strong> {traveller.fullName}
                            </p>
                            <p>
                                <strong>Age:</strong> {traveller.age}
                            </p>
                            <p>
                                <strong>Nationality:</strong> {traveller.nationality}
                            </p>
                        </div>
                    ))}

                    <h2 className="mt-4 text-xl font-semibold">Ferries Information:</h2>
                    {parsedFerries.map((ferryObj: any, index: number) => {
                        const { ferry, category, price } = ferryObj;
                        return (
                            <div key={index} className="mt-2 rounded border p-3">
                                <p>
                                    <strong>From:</strong> {ferry.from}
                                </p>
                                <p>
                                    <strong>To:</strong> {ferry.to}
                                </p>
                                <p>
                                    <strong>Ship Name:</strong> {ferry.ship_name}
                                </p>
                                <p>
                                    <strong>Departure:</strong> {ferry.departure}
                                </p>
                                <p>
                                    <strong>Arrival:</strong> {ferry.arrival}
                                </p>
                                <p>
                                    <strong>Category:</strong> {category}
                                </p>
                                <p>
                                    <strong>Price:</strong> {price}
                                </p>
                                <img src={ferry.image} alt="Ferry" className="mt-2 w-full rounded-md shadow-md" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ThankYouPageWrapper = ({ searchParams }: { searchParams: any }) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Thank You', href: '/thank-you' }];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
                <ThankYouPage details={searchParams} />
            </div>
        </AppHeaderLayout>
    );
};

export default ThankYouPageWrapper;
