export default function TermsAndPolicies() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-6 bg-gray-100 py-6 md:flex-row md:gap-x-8" id="tandc">
            {/* Terms & Conditions Card */}
            <div className="w-full max-w-2xl p-6 md:rounded-lg md:bg-white md:shadow-md">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold text-[#29339B]">Terms & Conditions</h2>
                <ul className="list-disc space-y-3 pl-5 text-gray-700">
                    <li>At the time of check-in on the ship, passengers must have a valid photo ID card.</li>
                    <li>One hour before departure, please report.</li>
                    <li>15 minutes prior to departure, the check-in counter shuts.</li>
                    <li>10 minutes before departure, boarding closes.</li>
                    <li>
                        After purchase, the customer will receive the booking voucher on their registered email ID and it will also be visible on the
                        profile page after successful payment.
                    </li>
                    <li>
                        After the purchase, the customer care executive of TryTrabby will contact you to confirm your travel plan and discuss any
                        extra requirements.
                    </li>
                </ul>
                <p className="mt-5 text-center text-lg font-medium text-[#29339B]">You choose and You book. We serve and We deliver.</p>
            </div>

            {/* Cancellation Policy Card */}
            <div className="w-full max-w-2xl p-6 md:rounded-lg md:bg-white md:shadow-md">
                <h2 className="mb-4 border-b pb-2 text-2xl font-semibold text-red-600">Cancellation Policy</h2>
                <ul className="list-disc space-y-3 pl-5 text-gray-700">
                    <li>
                        <span className="font-semibold text-gray-900">Before 48 hours of departure</span> – ₹100 per person will be charged as a
                        cancellation fee.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Between 24 to 48 hours of departure</span> – 50% of the ticket price will be
                        deducted.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">Within 24 hours of departure</span> – No refund will be provided.
                    </li>
                    <li>
                        <span className="font-semibold text-gray-900">No-Show Policy</span> – If a passenger fails to report at the boarding time, the
                        ticket will be considered void with no refund.
                    </li>
                </ul>
            </div>
        </div>
    );
}
