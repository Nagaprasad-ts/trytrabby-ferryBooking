'use client';

import FerryBooking from '@/components/homeComponents/FerryBooking';
import Carasoul from '@/components/homeComponents/carasoul';
import Certificate from '@/components/homeComponents/certificate';
import Faq from '@/components/homeComponents/faq';
import Offers from '@/components/homeComponents/offers';
import OperatorsAndRoute from '@/components/homeComponents/operatorsAndRoute';
import TermsAndConditions from '@/components/homeComponents/termsAndConditions';
import WhyChoose from '@/components/homeComponents/whychoose';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'TryTrabby',
        href: '/',
    },
];

export default function welcome() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedFerry, setSelectedFerry] = useState('single-ferry');

    return (
        <div className="container">
            <Head title="Ferry Booking">
                <link rel="css" href="/css/my.css" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {/* Navbar */}
            <AppHeaderLayout breadcrumbs={breadcrumbs}>
                <div>
                    {/* Hero Section */}
                    <div className="relative z-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg">
                        {/* Background Image */}
                        <div className="absolute inset-0 h-full w-fit md:h-[350px] md:w-full">
                            <img src="/images/ferry-banner.png" alt="Ferry Banner" className="h-full w-full object-cover" />
                        </div>

                        {/* Hero Text */}
                        <div className="relative top-0 left-0 z-20 px-6 py-10 text-center text-black sm:px-10 md:top-16 md:left-[-120px] md:px-16 lg:w-3/4 lg:text-left">
                            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Book Your Andaman Ferry Tickets Online Instantly!</h1>
                            <p className="mt-2 text-sm sm:text-base md:text-lg">
                                Live Seat Availability, Choose Your Own Seats & Get e-Ticket with PNR Instantly.
                            </p>
                        </div>
                    </div>

                    {/* Tabs for Ferry Selection */}
                    <div className="relative top-[-35px] mx-auto mt-6 w-full max-w-7xl px-5 md:top-28">
                        <div className="relative z-[50] w-fit rounded-t-2xl bg-slate-50 p-5 shadow-xl shadow-gray-200">
                            <div className="flex cursor-pointer flex-row items-start space-x-4 md:items-center md:space-y-0 md:space-x-4">
                                {/* Single Ferry Option */}
                                <label className="flex cursor-pointer items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="ferry-type"
                                        value="single-ferry"
                                        checked={selectedFerry === 'single-ferry'}
                                        onChange={() => setSelectedFerry('single-ferry')}
                                        className="h-4 w-4 cursor-pointer bg-[#29339B] focus:ring-[#29339B]"
                                    />
                                    <span className="text-div font-bold">Single Trip</span>
                                </label>

                                {/* Divider */}
                                <div className="h-6 w-px bg-gray-500 md:block"></div>

                                {/* Multiple Ferry Option */}
                                <label className="flex cursor-pointer items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="ferry-type"
                                        value="multiple-ferry"
                                        checked={selectedFerry === 'multiple-ferry'}
                                        onChange={() => setSelectedFerry('multiple-ferry')}
                                        className="h-4 w-4 cursor-pointer text-[#29339B] focus:ring-[#29339B]"
                                    />
                                    <span className="font-bold text-black">Multiple Trips</span>
                                </label>
                            </div>
                        </div>

                        {/* Conditionally render FerryBooking based on selected option */}
                        <div className="relative z-[50]">
                            {selectedFerry === 'single-ferry' && <FerryBooking />}
                            {selectedFerry === 'multiple-ferry' && <FerryBooking multiple="true" />}
                        </div>
                        <Certificate />
                    </div>
                </div>
                <Carasoul />
                <Offers />
                <WhyChoose />
                <OperatorsAndRoute />
                <Faq />
                <TermsAndConditions />
            </AppHeaderLayout>
        </div>
    );
}
