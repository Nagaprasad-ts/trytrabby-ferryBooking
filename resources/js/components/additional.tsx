import { Input } from '@headlessui/react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Calendar } from 'lucide-react';
import { format } from 'path';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

export default function additional() {
    return (
        <div className="rounded-lg border p-5 shadow-md">
            <form className="space-y-4">
                {/* Fixed Adults & Children Fields */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <label className="font-medium">Adults</label>
                        <input
                            type="number"
                            className="w-20 rounded-md border p-2"
                            value={adults}
                            onChange={(e) => setAdults(Number(e.target.value))}
                        />
                    </div>
                    <FormField
                        control={control}
                        name="adults"
                        render={({ field }) => (
                            <FormItem className="mx-auto grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                                <FormLabel className="whitespace-nowrap">Adults</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="rounded-md border p-2"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col">
                        <label className="font-medium">Children</label>
                        <input
                            type="number"
                            className="w-20 rounded-md border p-2"
                            value={children}
                            onChange={(e) => setChildren(Number(e.target.value))}
                        />
                    </div>
                </div>

                {/* Dynamic Sections */}
                {sections.map((section, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-md border p-4">
                        {/* From Field */}
                        <div className="flex flex-col">
                            <label className="font-medium">From</label>
                            <select
                                className="rounded-md border p-2"
                                value={section.from}
                                onChange={(e) => updateSection(index, 'from', e.target.value)}
                            >
                                <option value="">Select</option>
                                {locations.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* To Field */}
                        <div className="flex flex-col">
                            <label className="font-medium">To</label>
                            <select className="rounded-md border p-2" value={section.to} onChange={(e) => updateSection(index, 'to', e.target.value)}>
                                <option value="">Select</option>
                                {locations.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Picker */}
                        <div className="flex flex-col">
                            <label className="font-medium">Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button type="button" className="w-36 rounded-md border p-2 text-left">
                                        {section.departure ? format(section.departure, 'PPP') : 'Pick a date'}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent align="start">
                                    <Calendar
                                        mode="single"
                                        selected={section.departure}
                                        onSelect={(date) => updateSection(index, 'departure', date)}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Remove Section */}
                        {sections.length > 1 && (
                            <button type="button" className="rounded-md bg-red-500 p-2 text-white" onClick={() => removeSection(index)}>
                                Remove
                            </button>
                        )}
                    </div>
                ))}

                {/* Add Section Button */}
                <button type="button" className="rounded-md bg-blue-500 p-2 text-white" onClick={addSection}>
                    Add Section
                </button>

                {/* Submit Button */}
                <button type="submit" className="rounded-md bg-green-500 p-2 text-white">
                    Submit
                </button>
            </form>
        </div>
    );
}
