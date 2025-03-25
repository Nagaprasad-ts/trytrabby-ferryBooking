import { CirclePercent, Headset, TicketSlash, Zap } from 'lucide-react';

export default function Carousel() {
    return (
        <div className="mt-[-55px] w-full overflow-x-auto py-5 md:mt-25">
            <div className="scrolling-text flex min-w-max items-center space-x-6 bg-[#29339B] md:min-w-full md:justify-center">
                <div className="flex flex-row space-x-3 px-4 py-2 font-semibold whitespace-nowrap text-white">
                    <Zap />
                    <span>Instant Tickets</span>
                </div>
                <div className="h-10 w-px bg-white"></div>
                <div className="flex flex-row space-x-3 px-4 py-2 font-semibold whitespace-nowrap text-white">
                    <Headset />
                    <span>Friendly Support</span>
                </div>
                <div className="h-10 w-px bg-white"></div>
                <div className="flex flex-row space-x-3 px-4 py-2 font-semibold whitespace-nowrap text-white">
                    <TicketSlash />
                    <span>Easy Refunds</span>
                </div>
                <div className="h-10 w-px bg-white"></div>
                <div className="flex flex-row space-x-3 px-4 py-2 font-semibold whitespace-nowrap text-white">
                    <CirclePercent />
                    <span>Best Price Guarantee</span>
                </div>
            </div>
        </div>
    );
}
