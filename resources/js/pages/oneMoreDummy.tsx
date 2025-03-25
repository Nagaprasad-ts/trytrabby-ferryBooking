/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface Traveller {
    title: string;
    fullName: string;
    age: number;
    nationality: string;
}

interface Ferry {
    from: string;
    to: string;
    ship_name: string;
    departure: string;
    arrival: string;
    category: string;
    price: string;
    image: string;
}

interface SubmissionDetails {
    travellers: Traveller[] | string;
    email: string;
    phone: string;
    couponCode?: string;
    termsAgreed: boolean;
    ferries: Ferry[] | string;
}

const ThankYouPage = ({ details }: { details: SubmissionDetails }) => {
    const [parsedTravellers, setParsedTravellers] = useState<Traveller[]>([]);
    const [parsedFerries, setParsedFerries] = useState<Ferry[]>([]);
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false); // State for confetti

    // Parse travellers and ferries safely
    useEffect(() => {
        try {
            setParsedTravellers(Array.isArray(details.travellers) ? details.travellers : JSON.parse(details.travellers || '[]'));
            setParsedFerries(Array.isArray(details.ferries) ? details.ferries : JSON.parse(details.ferries || '[]'));
        } catch (error) {
            console.error('Error parsing data:', error);
            setParsedTravellers([]);
            setParsedFerries([]);
        }
    }, [details.travellers, details.ferries]);

    // Simulate loading effect and show confetti
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setShowConfetti(true); // Show confetti after loading
            setTimeout(() => setShowConfetti(false), 5000);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Increased stagger
                delayChildren: 0.3, // Add a delay to the start
            },
        },
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0, scale: 0.8 }, // More pronounced initial state
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 110, // Slightly reduced stiffness
                damping: 22, // Adjusted damping
                duration: 0.6,
            },
        },
        exit: { opacity: 0, scale: 0.7, y: -30, transition: { duration: 0.4 } }, // Added y-axis exit
    };

    const mainCardVariants = {
        hidden: { opacity: 0, scale: 0.9, rotate: -12 }, // More dramatic entry
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 80,
                damping: 18,
            },
        },
        hover: { scale: 1.05, rotate: 3, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)' }, // Stronger hover effect
        tap: { scale: 0.95, rotate: -4, boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.05)' }, // More pronounced tap
    };

    // Confetti animation variants
    const confettiVariants = {
        initial: {
            opacity: 0,
            y: -50,
            x: [-100, 100], // Random horizontal spread
            scale: [0.5, 1.5], // Random scale
        },
        animate: {
            opacity: [1, 0],
            y: window.innerHeight, // Fall to bottom
            x: [Math.random() * window.innerWidth - 50, Math.random() * window.innerWidth - 50],
            scale: [1, 0.1],
            transition: {
                duration: 3, // Longer duration
                ease: 'easeOut',
            },
        },
    };

    const generateConfetti = () => {
        const confettiPieces = [];
        for (let i = 0; i < 50; i++) {
            // Increased number of pieces
            confettiPieces.push(
                <motion.div
                    key={i}
                    variants={confettiVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                        // Random color
                        backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                        width: 8, // Smaller size
                        height: 8,
                        borderRadius: '50%', // Make it round
                        position: 'absolute',
                        top: 0,
                        left: Math.random() * window.innerWidth, // Random initial x position
                    }}
                />,
            );
        }
        return confettiPieces;
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-sky-50 py-12">
            {' '}
            {/* New gradient */}
            <div className="flex w-full flex-col items-center">
                <motion.div
                    style={{ perspective: 1200 }} // Increased perspective
                    className="relative w-full max-w-2xl"
                >
                    <motion.div
                        style={{ z: 100 }}
                        drag
                        dragElastic={0.25} // Slightly more elastic
                        dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }} // Increased drag
                        initial="hidden"
                        animate="visible"
                        variants={mainCardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className={cn(
                            'shadow-3xl relative rounded-3xl p-10 backdrop-blur-md', // More pronounced shadow
                            'border border-white/20 bg-white/80', // Glassmorphism
                            'transition-all duration-400', // Increased transition
                            'shadow-purple-300/30', // New shadow color
                            'transform-style: preserve-3d',
                            'overflow: hidden', // Added to contain confetti
                        )}
                    >
                        {loading ? (
                            <div className="flex h-64 items-center justify-center">
                                {' '}
                                {/* Increased height */}
                                <Loader2 className="h-12 w-12 animate-spin text-blue-500" /> {/* Larger loader */}
                            </div>
                        ) : (
                            <div className="space-y-10 text-center">
                                {' '}
                                {/* Increased spacing */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.3, rotate: 360 }} // Start from very small
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        type: 'spring',
                                        stiffness: 160, // Even more springy
                                        damping: 20,
                                        ease: 'easeInOut',
                                    }}
                                    className="flex items-center justify-center"
                                >
                                    <CheckCircle className="h-24 w-24 text-green-400" /> {/* Even larger checkmark */}
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl" // Gradient text
                                >
                                    Success!
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="mx-auto max-w-xl text-xl leading-relaxed text-gray-700 sm:text-2xl" // Increased max-width
                                >
                                    Your submission has been received, and we're processing it. Thank you for your time and participation!
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <Button
                                        asChild
                                        className={cn(
                                            'w-full rounded-full px-10 py-5 text-xl font-semibold text-white', // Even larger button
                                            'bg-gradient-to-r from-green-500 to-green-600', // New button gradient
                                            'shadow-2xl transition-all duration-300',
                                            'hover:scale-107 hover:shadow-green-500/70', // Stronger hover
                                            'focus:ring-opacity-60 focus:ring-4 focus:ring-green-300 focus:outline-none',
                                            'active:scale-97',
                                        )}
                                    >
                                        <a href="/">
                                            <span className="flex items-center gap-3">
                                                Return to Homepage
                                                <ArrowRight className="h-7 w-7" /> {/* Larger arrow */}
                                            </span>
                                        </a>
                                    </Button>
                                </motion.div>
                            </div>
                        )}
                        <AnimatePresence>{showConfetti && generateConfetti()}</AnimatePresence>
                    </motion.div>
                </motion.div>

                <h1 className="mb-5 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-center text-3xl font-bold tracking-tight text-blue-800">
                    {' '}
                    {/* New heading gradient */}
                    Submission Details
                </h1>

                <motion.div
                    className="mt-16 flex w-full max-w-7xl gap-x-12" // Increased margin
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="basis-1/4">
                        <h2 className="text-2xl font-semibold text-gray-900">Contact Details:</h2>
                        <motion.div
                            className="rounded-2xl border border-white/30 bg-white/90 p-7 shadow-md backdrop-blur-md" // More rounded
                            variants={itemVariants}
                        >
                            <p className="text-lg text-gray-800">
                                <strong className="font-medium text-blue-700">Email:</strong> <span className="text-gray-900">{details.email}</span>
                            </p>
                            <p className="mt-3 text-lg text-gray-800">
                                <strong className="font-medium text-blue-700">Phone:</strong> <span className="text-gray-900">{details.phone}</span>
                            </p>
                            <p className="mt-3 text-lg text-gray-800">
                                <strong className="font-medium text-blue-700">Coupon Code:</strong>{' '}
                                <span className="text-gray-900">{details.couponCode || 'N/A'}</span>
                            </p>
                            <p className="mt-3 text-lg text-gray-800">
                                <strong className="font-medium text-blue-700">Terms Agreed:</strong>{' '}
                                <span className="text-gray-900">{details.termsAgreed ? 'Yes' : 'No'}</span>
                            </p>
                        </motion.div>
                    </div>

                    <div className="basis-1/4">
                        <h2 className="text-2xl font-semibold text-gray-900">Travellers Information:</h2>
                        <AnimatePresence>
                            {parsedTravellers.length > 0 ? (
                                parsedTravellers.map((traveller, index) => (
                                    <motion.div
                                        key={index}
                                        className="rounded-2xl border bg-white/90 p-7 shadow-sm backdrop-blur-md" // More rounded
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <p className="text-lg text-gray-800">
                                            <strong className="font-medium text-blue-700">Title:</strong>{' '}
                                            <span className="text-gray-900">{traveller.title}</span>
                                        </p>
                                        <p className="mt-3 text-lg text-gray-800">
                                            <strong className="font-medium text-blue-700">Full Name:</strong>{' '}
                                            <span className="text-gray-900">{traveller.fullName}</span>
                                        </p>
                                        <p className="mt-3 text-lg text-gray-800">
                                            <strong className="font-medium text-blue-700">Age:</strong>{' '}
                                            <span className="text-gray-900">{traveller.age}</span>
                                        </p>
                                        <p className="mt-3 text-lg text-gray-800">
                                            <strong className="font-medium text-blue-700">Nationality:</strong>{' '}
                                            <span className="text-gray-900">{traveller.nationality}</span>
                                        </p>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.p className="text-lg text-gray-500" variants={itemVariants} initial="hidden" animate="visible">
                                    No traveller information available.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="basis-3/4">
                        <h2 className="text-2xl font-semibold text-gray-900">Ferries Information:</h2>
                        <AnimatePresence>
                            {parsedFerries.length > 0 ? (
                                parsedFerries.map((ferryObj: any, index: number) => {
                                    const { ferry, category, price } = ferryObj;
                                    return (
                                        <motion.div
                                            key={index}
                                            className="rounded-2xl border bg-white/90 p-7 shadow-sm backdrop-blur-md"
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                                <div>
                                                    <p className="text-lg text-gray-800">
                                                        <strong className="font-medium text-blue-700">From:</strong>{' '}
                                                        <span className="text-gray-900">{ferry.from}</span>
                                                    </p>
                                                    <p className="mt-3 text-lg text-gray-800">
                                                        <strong className="font-medium text-blue-700">To:</strong>{' '}
                                                        <span className="text-gray-900">{ferry.to}</span>
                                                    </p>
                                                    <p className="mt-3 text-lg text-gray-800">
                                                        <strong className="font-medium text-blue-700">Ship Name:</strong>{' '}
                                                        <span className="text-gray-900">{ferry.ship_name}</span>
                                                    </p>
                                                    <p className="mt-3 text-lg text-gray-800">
                                                        <strong className="font-medium text-blue-700">Departure:</strong>{' '}
                                                        <span className="text-gray-900">{ferry.departure}</span>
                                                    </p>
                                                    <p className="mt-3 text-lg text-gray-800">
                                                        <strong className="font-medium text-blue-700">Arrival:</strong>{' '}
                                                        <span className="text-gray-900">{ferry.arrival}</span>
                                                    </p>
                                                    <p className="mt-3 text-lg text-gray-800">
                                                        <strong className="font-medium text-blue-700">Category:</strong>{' '}
                                                        <span className="text-gray-900">{category}</span>
                                                    </p>
                                                    <p className="mt-3 text-lg text-gray-800">
                                                        <strong className="font-medium text-blue-700">Price:</strong>{' '}
                                                        <span className="text-gray-900">{price}</span>
                                                    </p>
                                                </div>
                                                {ferry.image && (
                                                    <div className="mt-6 flex items-center justify-center md:mt-0">
                                                        <img
                                                            src={ferry.image}
                                                            alt="Ferry"
                                                            className="max-h-72 rounded-xl border border-gray-300 shadow-md"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <motion.p className="text-lg text-gray-500" variants={itemVariants} initial="hidden" animate="visible">
                                    No ferry information available.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ThankYouPageWrapper = ({ searchParams }: { searchParams: any }) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Thank You', href: '/thank-you' }];

    // Convert searchParams to a more usable format.  Important for nested data.
    const details = searchParams;

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <ThankYouPage details={details} />
        </AppHeaderLayout>
    );
};

export default ThankYouPageWrapper;
