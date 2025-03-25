/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

interface Ferry {
    id: string;
    ship_name: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    category: string;
    price: number;
    image?: string; // Optional image URL
}

interface Traveller {
    title: string;
    fullName: string;
    age: number;
    nationality: string;
}

interface FerryItem {
    ferry: Ferry;
    category: string;
    price: number;
}

// Mapping full names to API abbreviations
const LOCATION_MAP: Record<string, string> = {
    pb: 'Port Blair',
    hl: 'Havelock',
    nl: 'Neil Island',
};

interface ContactDetailsProps {
    searchParams: {
        ferries: FerryItem[];
        adults: number;
        children: number;
    };
}

// Define the schema for form validation
const travellerSchema = z.object({
    title: z.string().nonempty('Title is required'),
    fullName: z.string().nonempty('Full name is required').min(3, 'Full name must be at least 3 characters'),
    age: z
        .union([z.string(), z.number()])
        .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
        .refine((num) => !isNaN(num) && num > 0 && num <= 120, {
            message: 'Age must be a number between 1 and 120',
        }),
    nationality: z.string().nonempty('Nationality is required'),
});

const formSchema = z.object({
    travellers: z.array(travellerSchema),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    phone: z.string().nonempty('Phone number is required').min(10, 'Phone number must be at least 10 digits'),
    couponCode: z.string().optional(),
    termsAgreed: z.boolean().refine((val) => val === true, {
        message: 'You must agree to the terms and conditions',
    }),
});

const ContactDetails: React.FC<ContactDetailsProps> = ({ searchParams }) => {
    const { ferries, adults, children } = searchParams;
    const totalTravellers = adults + children;
    const [totalPrice, setTotalPrice] = useState(0);
    const [couponError, setCouponError] = useState<string | undefined>();
    const [serverError, setServerError] = useState<string | null>(null);
    const [formKey, setFormKey] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false); // State to track coupon application

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            travellers: Array(totalTravellers).fill({
                title: '',
                fullName: '',
                age: 0,
                nationality: 'India',
            }),
            email: '',
            phone: '',
            couponCode: '',
            termsAgreed: false,
        },
    });

    useEffect(() => {
        let price = 0;
        searchParams.ferries.forEach((item) => {
            price += item.price;
        });
        setTotalPrice(price * totalTravellers);
    }, [searchParams.ferries, totalTravellers]);

    const titleOptions = ['Mr', 'Mrs', 'Ms', 'Master', 'Miss'];
    const nationalityOptions = ['India', 'USA', 'UK', 'Canada', 'Australia'];

    const handleApplyCoupon = (data: any) => {
        setCouponError(undefined);
        if (data.couponCode === 'DISCOUNT10') {
            setTotalPrice((prevPrice) => prevPrice * 0.9);
            setCouponApplied(true); // Set coupon as applied
        } else {
            setCouponError('Invalid coupon code.');
            setCouponApplied(false); // Make sure it's false when invalid.
        }
    };

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const details: any = { data, ferries };
        router.post('/thank-you', details);
    };

    useEffect(() => {
        reset({
            travellers: Array(totalTravellers).fill({
                title: '',
                fullName: '',
                age: 0,
                nationality: 'India',
            }),
            email: '',
            phone: '',
            couponCode: '',
            termsAgreed: false,
        });
        setFormKey((prevKey) => prevKey + 1);
    }, [adults, children, reset, totalTravellers]);

    return (
        <AppHeaderLayout>
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="space-y-6 md:col-span-2">
                        <h2 className="text-2xl font-semibold text-gray-800">Add Traveller(s) Details</h2>
                        <form key={formKey} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {searchParams.adults + searchParams.children > 0 ? (
                                Array.from({ length: searchParams.adults + searchParams.children }).map((_, index) => (
                                    <div key={index} className="space-y-4 rounded-lg bg-white p-6 shadow-md">
                                        <h3 className="text-lg font-medium text-gray-700">
                                            {index < searchParams.adults ? `Adult ${index + 1}` : `Child ${index - searchParams.adults + 1}`}
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                            <div className="space-y-1">
                                                <label htmlFor={`travellers.${index}.title`} className="block text-sm font-medium text-gray-700">
                                                    Title
                                                </label>
                                                <Controller
                                                    name={`travellers.${index}.title`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Title" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {titleOptions.map((title) => (
                                                                    <SelectItem key={title} value={title}>
                                                                        {title}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.travellers?.[index]?.title && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.travellers[index].title?.message}</p>
                                                )}
                                            </div>

                                            <div className="col-span-2 space-y-1">
                                                <label htmlFor={`travellers.${index}.fullName`} className="block text-sm font-medium text-gray-700">
                                                    Full Name
                                                </label>
                                                <Controller
                                                    name={`travellers.${index}.fullName`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="text"
                                                            placeholder="Full Name"
                                                            {...field}
                                                            disabled={isSubmitting}
                                                            className="w-full"
                                                        />
                                                    )}
                                                />
                                                {errors.travellers?.[index]?.fullName && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.travellers[index].fullName?.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-1">
                                                <label htmlFor={`travellers.${index}.age`} className="block text-sm font-medium text-gray-700">
                                                    Age
                                                </label>
                                                <Controller
                                                    name={`travellers.${index}.age`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="number"
                                                            placeholder="Age"
                                                            {...field}
                                                            disabled={isSubmitting}
                                                            className="w-full"
                                                        />
                                                    )}
                                                />
                                                {errors.travellers?.[index]?.age && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.travellers[index].age?.message}</p>
                                                )}
                                            </div>

                                            <div className="space-y-1">
                                                <label
                                                    htmlFor={`travellers.${index}.nationality`}
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Nationality
                                                </label>
                                                <Controller
                                                    name={`travellers.${index}.nationality`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Nationality" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {nationalityOptions.map((country) => (
                                                                    <SelectItem key={country} value={country}>
                                                                        {country}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.travellers?.[index]?.nationality && (
                                                    <p className="mt-1 text-sm text-red-500">{errors.travellers[index].nationality?.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-lg bg-white p-6 shadow-md">
                                    <p className="text-gray-700">No travellers to add.</p>
                                </div>
                            )}
                            <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
                                <h3 className="text-lg font-medium text-gray-700">Contact Information</h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-1">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="email" placeholder="Email" {...field} disabled={isSubmitting} className="w-full" />
                                            )}
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            render={({ field }) => (
                                                <Input type="tel" placeholder="Phone Number" {...field} disabled={isSubmitting} className="w-full" />
                                            )}
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
                                <h3 className="text-lg font-medium text-gray-700">Total Price: ₹{totalPrice}</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 space-y-1">
                                        <Input
                                            type="text"
                                            placeholder="Add Coupon Code"
                                            {...control.register('couponCode')}
                                            disabled={isSubmitting}
                                            className="max-w-xs"
                                        />
                                        {couponError && <p className="mt-1 text-sm text-red-500">{couponError}</p>}
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() => handleApplyCoupon(control._formValues)}
                                        disabled={isSubmitting || couponApplied} // Disable if submitting or coupon applied
                                    >
                                        Apply
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Controller
                                        name="termsAgreed"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} disabled={isSubmitting} />
                                        )}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I agree with the Terms & Conditions
                                    </label>
                                </div>
                                {errors.termsAgreed && <p className="mt-1 text-sm text-red-500">{errors.termsAgreed.message}</p>}
                                <Button
                                    type="submit"
                                    className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Review and Checkout'}
                                </Button>
                                {serverError && <p className="mt-4 text-center text-sm text-red-500">{serverError}</p>}
                            </div>
                        </form>
                    </div>

                    <div className="space-y-6 md:col-span-1">
                        <h2 className="text-2xl font-semibold text-gray-800">Your Selections</h2>
                        {searchParams.ferries.map((item) => {
                            const ferry = item.ferry;
                            const fromCode = LOCATION_MAP[ferry.from] || 'Not Found';
                            const toCode = LOCATION_MAP[ferry.to] || 'Not Found';
                            return (
                                <div key={ferry.id} className="rounded-lg bg-white p-4 shadow-md">
                                    {ferry.image && (
                                        <img src={ferry.image} alt={ferry.ship_name} className="mb-4 h-42 w-full rounded-md object-cover" />
                                    )}
                                    <h3 className="text-lg font-bold text-gray-700">{ferry.ship_name}</h3>
                                    <p className="text-sm text-gray-600">
                                        From: {fromCode} To: {toCode}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Departure: {ferry.departure} | Arrival: {ferry.arrival}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Category: {item.category} | Price: ₹{item.price}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
};

export default ContactDetails;
