/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronLeft, Ship, Star, Tornado, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Ferry {
    id: number;
    ship_name: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    prices: { category: string; price: number; pmb: number }[];
    image?: string;
}

// Mapping full names to API abbreviations
const LOCATION_MAP: Record<string, string> = {
    'Port Blair': 'pb',
    Havelock: 'hl',
    'Neil Island': 'nl',
};

interface SelectedFerry {
    ferry: Ferry;
    category: string;
    price: number;
    [key: string]: any; // Add this index signature
}

export default function FerrySelection() {
    const { props } = usePage<{ searchParams: Record<string, string[]> }>();

    // Debug searchParams
    console.log('Received searchParams:', props?.searchParams);

    // Extract search parameters with robust handling
    const sections = useMemo(() => {
        if (!props?.searchParams || typeof props.searchParams !== 'object') {
            console.log('searchParams is not an object or is null');
            return [];
        }

        const { sections } = props.searchParams;

        if (!Array.isArray(sections)) {
            console.log('sections is not an array');
            return [];
        }

        if (sections.length === 0) {
            console.log('sections is empty');
            return [];
        }

        const validSections = sections
            .map((section: any, index) => {
                // Change type of section to any
                if (section && section.from && section.to && section.departure) {
                    const trimmedFrom = section.from.trim();
                    const trimmedTo = section.to.trim();
                    const trimmedDeparture = section.departure.trim();
                    return {
                        from: trimmedFrom,
                        to: trimmedTo,
                        departure: trimmedDeparture,
                    };
                } else {
                    console.warn(`Missing parameter in section ${index + 1}`);
                    return null; // Or throw an error, depending on how you want to handle missing data
                }
            })
            .filter((section) => section !== null); // Filter out any null sections

        console.log('Parsed sections:', validSections);
        return validSections;
    }, [props?.searchParams]);

    // Step state
    const [step, setStep] = useState(0);
    const [ferries, setFerries] = useState<Ferry[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFerry, setSelectedFerry] = useState<Ferry | null>(null);

    // Extract adults and children from props (POST data)
    const adults = useMemo(() => {
        const adultsParam = props?.searchParams?.adults;
        const parsedAdults = parseInt(Array.isArray(adultsParam) ? adultsParam[0] || '0' : adultsParam || '0', 10);
        console.log('Adults:', parsedAdults);
        return parsedAdults;
    }, [props?.searchParams?.adults]);

    const children = useMemo(() => {
        const childrenParam = props?.searchParams?.children;
        const parsedChildren = parseInt(Array.isArray(childrenParam) ? childrenParam[0] || '0' : childrenParam || '0', 10);
        console.log('Children:', parsedChildren);
        return parsedChildren;
    }, [props?.searchParams?.children]);

    // Use Inertia form
    const { data, setData, errors } = useForm<{
        selectedFerries: (SelectedFerry | null)[];
    }>({
        selectedFerries: Array(sections.length).fill(null), // Initialize with nulls
    });

    // Fetch ferry data
    useEffect(() => {
        async function fetchFerries() {
            if (!sections[step]) {
                console.log(`No sections for step: ${step}`);
                setFerries([]); // Clear any previous ferries
                return;
            }

            try {
                const response = await fetch('http://shop.trytrabby.test/api/v1/ferries');
                const result = await response.json();

                if (!result || result.status !== 'success' || !Array.isArray(result.data)) {
                    console.error('Invalid API response:', result);
                    setFerries([]);
                    return;
                }

                const currentSection = sections[step];
                const fromCode = LOCATION_MAP[currentSection.from] || 'Not Found';
                const toCode = LOCATION_MAP[currentSection.to] || 'Not Found';
                console.log(`Filtering ferries for from: ${fromCode}, to: ${toCode}`);

                const availableFerries = result.data.filter((ferry: Ferry) => {
                    const matches = ferry.from.toLowerCase() === fromCode.toLowerCase() && ferry.to.toLowerCase() === toCode.toLowerCase();
                    if (matches) {
                        console.log('Found matching ferry:', ferry);
                    }
                    return matches;
                });

                console.log('Available ferries:', availableFerries);
                setFerries(availableFerries);
            } catch (error) {
                console.error('Error fetching ferries:', error);
                setFerries([]);
            }
        }

        if (sections.length > 0) {
            fetchFerries();
        }
    }, [step, sections]);

    // Handle ferry selection - opens the modal
    const handleSelectFerry = (ferry: Ferry) => {
        setSelectedFerry(ferry);
        setIsModalOpen(true);
    };

    // Handle category selection and store ferry details
    const handleCategorySelect = (category: string, price: number) => {
        if (!selectedFerry) return;

        const selected: SelectedFerry = {
            ferry: selectedFerry,
            category,
            price,
        };

        setData((prevData) => ({
            ...prevData,
            selectedFerries: prevData.selectedFerries.map((item, index) => (index === step ? selected : item)),
        }));

        setIsModalOpen(false);
        setSelectedFerry(null);

        if (step < sections.length - 1) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const handleProceedToBooking = () => {
        if (!data.selectedFerries || !Array.isArray(data.selectedFerries)) {
            console.error('selectedFerries is not an array or is undefined:', data.selectedFerries);
            return;
        }

        const validFerries = data.selectedFerries.filter((ferry) => ferry !== null);

        if (validFerries.length !== sections.length) {
            console.error('Some ferry selections are missing:', data.selectedFerries);
            return;
        }

        // Ensure at least 1 adult is selected
        if (adults < 1) {
            console.error('At least one adult is required.');
            alert('Please select at least one adult.');
            return;
        }

        console.log('Sending payload:', {
            selectedFerries: data.selectedFerries,
            adults: adults,
            children: children,
        });

        const bookingData = {
            selectedFerries: validFerries,
            adults: adults,
            children: children,
        };

        // Use Inertia's post method to send data
        router.post('/contact-details', bookingData);
    };

    // If no sections found, show error
    if (!sections.length) {
        return (
            <AppHeaderLayout>
                <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
                    <XCircle size={64} className="mb-4 text-red-500" />
                    <h2 className="text-2xl text-red-500">Invalid search parameters.</h2>
                    <p className="mt-2 text-gray-500">Please ensure you have provided valid 'From', 'To', and 'Departure' locations.</p>
                    <Button onClick={() => window.history.back()} className="mt-4">
                        Go Back
                    </Button>
                </div>
            </AppHeaderLayout>
        );
    }

    return (
        <AppHeaderLayout breadcrumbs={[{ title: 'Ferry Selection', href: '/ferry-selection' }]}>
            <Head title="Ferry Selection" />
            <div className="p-4 md:p-6">
                <div className="mb-4 flex w-full px-4 md:px-6">
                    <a className="rounded-2xl border-2 px-4 py-3 text-left" onClick={() => window.history.back()}>
                        <ChevronLeft className="size-6" />
                    </a>
                    <h1 className="mt-1.5 basis-2/3 text-center text-2xl font-bold md:ml-26 md:text-center md:text-3xl">Choose a Ferry</h1>
                </div>

                <h1 className="mb-4 text-center text-2xl font-bold">
                    {sections.length > 1
                        ? `Step ${step + 1}: Select ${step === 0 ? 'First' : step === 1 ? 'Second' : 'Third'} Journey`
                        : 'Select Journey'}
                </h1>

                {/* Display Previous Selections */}
                {sections.slice(0, step).map((section, index) => {
                    const selected = data.selectedFerries[index];
                    return (
                        <div key={`prev-${index}`} className="mb-4 rounded-lg border bg-gray-100 p-4">
                            <h3 className="font-semibold">Previous Selection ({index + 1})</h3>
                            <div>
                                <p>
                                    <strong>From:</strong> {section.from}
                                </p>
                                <p>
                                    <strong>To:</strong> {section.to}
                                </p>
                                <p>
                                    <strong>Departure:</strong> {section.departure}
                                </p>
                            </div>
                            {selected && (
                                <div className="mt-2">
                                    <p>
                                        <strong>Selected Ferry: </strong>
                                        {selected.ferry.ship_name}
                                    </p>
                                    <p>
                                        <strong>Selected Category: </strong>
                                        {selected.category}
                                    </p>
                                    <p>
                                        <strong>Price: </strong>₹{selected.price}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}

                <div className="mb-4 rounded-lg border p-4">
                    <div>
                        <p>
                            <strong>From:</strong> {sections[step].from}
                        </p>
                        <p>
                            <strong>To:</strong> {sections[step].to}
                        </p>
                        <p>
                            <strong>Departure:</strong> {sections[step].departure}
                        </p>
                    </div>
                    {data.selectedFerries[step] && (
                        <div className="mt-2">
                            <p>
                                <strong>Selected Category: </strong>
                                {data.selectedFerries[step]!.category}
                            </p>
                            <p>
                                <strong>Price: </strong>₹{data.selectedFerries[step]!.price}
                            </p>
                        </div>
                    )}
                </div>

                {/* Show available ferries */}
                {ferries.length > 0 ? (
                    ferries.map((ferry, index) => (
                        <div
                            key={`${ferry.ship_name}-${index}`}
                            className="my-5 flex flex-col rounded-2xl border bg-white p-5 shadow-lg md:flex-row md:p-6"
                        >
                            <div className="basis-1/3 md:basis-1/4">
                                <img
                                    src={ferry.image || '/images/default-ferry.jpg'}
                                    alt={ferry.ship_name}
                                    className="w-full rounded-lg object-fill"
                                />
                            </div>

                            <div className="mt-4 basis-2/3 text-center md:mt-0 md:ml-6 md:basis-3/4 md:text-left">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold md:text-2xl">{ferry.ship_name}</h2>
                                    <div className="flex items-center text-yellow-400">
                                        {[...Array(4)].map((_, i) => (
                                            <Star key={i} size={18} fill="currentColor" stroke="none" />
                                        ))}
                                        <Star size={18} fill="none" stroke="currentColor" />
                                    </div>
                                </div>

                                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                                    <Badge className="bg-green-100 text-green-600">Instant Booking</Badge>
                                    <Badge className="bg-blue-100 text-[#29339B]">Economical</Badge>
                                </div>

                                <div className="mt-4 flex items-center justify-between space-x-4">
                                    <div className="text-center">
                                        <p className="text-lg font-bold">{ferry.departure}</p>
                                        <p>{sections[step].from}</p>
                                    </div>
                                    {/* Line before the Ship icon */}
                                    <div className="flex-1 border-t-2 border-gray-200"></div>

                                    {/* Ship Icon */}
                                    <Ship size={32} className="text-[#29339B]" />

                                    {/* Line after the Ship icon */}
                                    <div className="flex-1 border-t-2 border-gray-200"></div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold">{ferry.arrival}</p>
                                        <p>{sections[step].to}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-x-16">
                                    <div>
                                        <p className="pt-4 text-xl font-bold text-[#29339B] md:text-3xl">
                                            ₹{ferry.prices?.[0]?.price || 0 + ferry.prices?.[0]?.pmb || 0}
                                        </p>
                                        <p className="text-sm text-gray-500 md:ml-5">Per Pax</p>
                                    </div>
                                    <Button
                                        className="mt-4 w-full cursor-pointer rounded-full bg-[#29339B]/90 px-4 py-6 text-lg font-bold text-white hover:bg-[#29339B] md:mt-0 md:w-auto md:px-6 md:py-8 md:text-2xl"
                                        onClick={() => handleSelectFerry(ferry)}
                                    >
                                        Select
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
                        <div className="mb-6 flex flex-row items-center justify-center gap-x-5">
                            {/* Spinning Tornado */}
                            <motion.div
                                animate={{
                                    rotate: [0, 20, -20, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: 'easeInOut',
                                    repeatType: 'mirror',
                                }}
                            >
                                <Tornado size={48} className="mb-4 text-gray-500" />
                            </motion.div>
                            {/* Floating Ship */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: 'easeInOut',
                                }}
                            >
                                <Ship size={48} className="text-text-[#29339B] mb-4" />
                            </motion.div>
                            {/* Spinning Tornado Again */}
                            <motion.div
                                animate={{
                                    rotate: [0, 20, -20, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: 'easeInOut',
                                    repeatType: 'mirror',
                                }}
                            >
                                <Tornado size={48} className="mb-4 text-gray-500" />
                            </motion.div>
                        </div>

                        <h2 className="text-2xl text-gray-500">No ferries found matching your search criteria.</h2>
                    </div>
                )}

                <div className="fixed bottom-0 left-0 w-full shadow-md md:right-6 md:bottom-6 md:left-auto md:w-auto md:rounded-lg">
                    {step < sections.length - 1 ? (
                        <Button
                            className="w-full rounded-none py-6 text-2xl md:w-auto md:rounded-lg md:px-8 md:text-lg"
                            disabled={!data.selectedFerries[step] || !!errors.selectedFerries?.[step]} // Disable if no selection or error
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            className="w-full rounded-none bg-green-500 py-6 text-xl md:w-auto md:rounded-lg md:px-8 md:text-lg"
                            disabled={
                                data.selectedFerries.length !== sections.length ||
                                data.selectedFerries.some((item) => item === null) ||
                                Object.keys(errors).length > 0
                            }
                            onClick={handleProceedToBooking}
                        >
                            Proceed to Booking
                        </Button>
                    )}
                </div>

                {/* Modal for Category Selection */}
                {isModalOpen && selectedFerry && (
                    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50">
                        <div className="mx-5 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                            <div className="flex items-center justify-around">
                                <h2 className="mb-4 text-xl font-bold">Select Category for {selectedFerry.ship_name}</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setSelectedFerry(null);
                                    }}
                                    className="mb-4 rounded-full hover:bg-gray-200"
                                >
                                    <XCircle size={32} className="text-gray-600" />
                                </Button>
                            </div>
                            {selectedFerry.prices.map((price) => (
                                <div
                                    key={price.category}
                                    className="flex items-center justify-between border-b border-gray-200 py-2 last:border-none"
                                >
                                    <span>{price.category}</span>
                                    <span>₹{price.price + price.pmb}</span>
                                    <Button
                                        onClick={() => handleCategorySelect(price.category, price.price + price.pmb)}
                                        className="rounded-full bg-[#29339B]/90 px-4 py-2 text-sm text-white hover:bg-[#29339B]"
                                    >
                                        Select
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppHeaderLayout>
    );
}
