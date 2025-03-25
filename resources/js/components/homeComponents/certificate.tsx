import { Calendar, ShoppingCart, User } from 'lucide-react';

export default function Certificate() {
    const stats = [
        {
            icon: <ShoppingCart size={40} color="#29339B" className="transition-transform duration-200 hover:scale-125" />,
            value: '500+',
            label: 'Products Online',
        },
        {
            icon: <Calendar size={40} color="#29339B" className="transition-transform duration-200 hover:scale-125" />,
            value: '15',
            label: 'Years of Experience',
        },
        {
            icon: <User size={40} color="#29339B" className="transition-transform duration-200 hover:scale-125" />,
            value: '3000+',
            label: 'Happy Clients',
        },
    ];

    return (
        <div className="mx-auto flex max-w-7xl flex-row items-stretch justify-center gap-1 rounded-2xl bg-[rgba(41,51,155,.1)] px-6 py-5 md:items-center md:gap-6">
            {stats.map((item, index) => (
                <div key={index} className="relative flex w-full flex-col items-center justify-center rounded-lg p-4 text-center sm:w-1/3">
                    {/* Icon with White Background */}
                    <div className="flex items-center justify-center rounded-full bg-white p-4 shadow-md">{item.icon}</div>

                    {/* Value */}
                    <h3 className="text-md mt-4 font-extrabold text-[#29339B] md:text-xl">{item.value}</h3>

                    {/* Label */}
                    <p className="text-sm font-semibold text-[#29339B]">{item.label}</p>

                    {/* Vertical Line */}
                    {index !== stats.length - 1 && (
                        <div className="absolute top-1/2 right-0 hidden h-16 w-[2px] -translate-y-1/2 transform bg-[#29339B] md:block"></div>
                    )}
                </div>
            ))}
        </div>
    );
}
