/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CalendarIcon, Plus, Search, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { router } from '@inertiajs/react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const allLocations = ['Select', 'Port Blair', 'Havelock', 'Neil Island'];

const sectionSchema = z.object({
    departure: z.date({
        required_error: 'Please select a date',
        invalid_type_error: 'Please select a valid date',
    }),
    from: z.string().min(1, { message: 'Please select a departure location' }),
    to: z.string().min(1, { message: 'Please select a destination location' }),
});

const formSchema = z.object({
    sections: z.array(sectionSchema).min(1, 'At least one section is required'),
    adults: z.number().min(1, { message: 'Please select at least one adult' }),
    children: z.number().min(0, { message: 'Please select at least one child' }),
});

interface FerryBookingProps {
    multiple?: string;
}

export default function FerryBooking({ multiple }: FerryBookingProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sections: [{ departure: new Date(), from: '', to: '' }],
            adults: 1,
            children: 0,
        },
        shouldUnregister: false,
    });

    const { control, handleSubmit, watch, setValue } = form;
    const { fields, append, remove } = useFieldArray({ control, name: 'sections' });

    const [availableToLocations, setAvailableToLocations] = useState<string[][]>([]);

    useEffect(() => {
        const updatedLocations = fields.map((_, index) => {
            const fromValue = watch(`sections.${index}.from`);
            return allLocations.filter((loc) => loc !== fromValue && loc !== 'Select');
        });
        setAvailableToLocations(updatedLocations);
    }, [watch, fields.length]);

    const handleFromChange = (index: number, value: string) => {
        setValue(`sections.${index}.from`, value);

        const newAvailableLocations = allLocations.filter((loc) => loc !== value && loc !== 'Select');
        setAvailableToLocations((prevAvailableLocations) => {
            const updatedAvailableLocations = [...prevAvailableLocations];
            updatedAvailableLocations[index] = newAvailableLocations;
            return updatedAvailableLocations;
        });

        const toValue = watch(`sections.${index}.to`);
        if (toValue && !newAvailableLocations.includes(toValue)) {
            setValue(`sections.${index}.to`, '');
        }

        if (fields.length > index + 1) {
            const currentToValue = watch(`sections.${index}.to`);
            const nextFromOptions = allLocations.filter((location) => location !== value && location !== 'Select');
            if (currentToValue && nextFromOptions.includes(currentToValue)) {
                setValue(`sections.${index + 1}.from`, currentToValue);
            } else {
                setValue(`sections.${index + 1}.from`, '');
            }
        }
    };

    const handleToChange = (index: number, value: string) => {
        setValue(`sections.${index}.to`, value);
        if (fields.length > index + 1) {
            const selectedTo = watch(`sections.${index}.to`);
            setValue(`sections.${index + 1}.from`, selectedTo);
        }
    };

    const onSubmit = (data: any) => {
        router.post('/ferry-selection', data);
    };

    return (
        <div className="mb-8 rounded-tr-2xl border-2 border-gray-200 shadow-md shadow-gray-100">
            <div className="rounded-b-2xl bg-slate-50 p-5 shadow-xl shadow-gray-200">
                <Form {...form}>
                    {/* use handleSubmit from react-hook-form here */}
                    <form method="POST" action={'/ferry-selection'} className={'space-y-4'} onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="flex flex-row gap-x-4">
                                <FormField
                                    control={control}
                                    name="adults"
                                    render={({ field }) => (
                                        <FormItem className="basis-1/2">
                                            <FormLabel>Adults</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="rounded-md border p-2"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="children"
                                    render={({ field }) => (
                                        <FormItem className="basis-1/2">
                                            <FormLabel>Children</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    className="rounded-md border p-2"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex flex-wrap items-center gap-4 rounded-md border p-4">
                                    <FormField
                                        control={control}
                                        name={`sections.${index}.from`}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-40">
                                                <FormLabel>From</FormLabel>
                                                <Select onValueChange={(value) => handleFromChange(index, value)} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {allLocations.map((location) => (
                                                            <SelectItem key={location} value={location}>
                                                                {location}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name={`sections.${index}.to`}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-40">
                                                <FormLabel>To</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        handleToChange(index, value);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {availableToLocations[index]?.map((location) => (
                                                            <SelectItem key={location} value={location}>
                                                                {location}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name={`sections.${index}.departure`}
                                        render={({ field }) => (
                                            <FormItem className="w-full md:w-40">
                                                <FormLabel>Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant="outline" className="w-full text-left">
                                                                {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                                                                <CalendarIcon className="ml-auto h-4 w-4" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={(date) => field.onChange(date || new Date())}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        )}
                                    />
                                    {fields.length > 1 && (
                                        <Button className="cursor-pointer" type="button" onClick={() => remove(index)} variant="destructive">
                                            <Trash2 /> Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-row items-start justify-start gap-4">
                            {multiple === 'true' && fields.length < 3 && (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        append({ departure: new Date(), from: '', to: '' });
                                        setAvailableToLocations((prev) => [...prev, allLocations.filter((loc) => loc !== 'Select')]);
                                    }}
                                    variant="outline"
                                    className="mt-3 cursor-pointer border-[#29339B] text-[#29339B] transition-transform duration-200 hover:scale-110 hover:bg-[#29339B]/5 hover:text-[#29339B] md:mt-0"
                                >
                                    <Plus /> Add Section
                                </Button>
                            )}
                            <Button
                                type="submit"
                                className="mt-3 cursor-pointer bg-[#29339B]/90 transition-transform duration-200 hover:scale-110 hover:bg-[#29339B] md:mt-0"
                            >
                                <Search /> Search
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
