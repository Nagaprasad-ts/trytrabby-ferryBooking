<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ThankYouController extends Controller
{
    public function show(Request $request)
    {
        //Render the contact details page.
        return Inertia::render('oneMoreDummy', [
            'searchParams' => $request->all(),
        ]);
    }

    public function store(Request $request)
    {
        \Log::info('Incoming Request Data:', $request->all());

        return Inertia::render('oneMoreDummy', [
            'searchParams' => [
                'travellers' => $request->input('data.travellers', []), // Extracting from nested "data"
                'email' => $request->input('data.email'),
                'phone' => $request->input('data.phone'),
                'couponCode' => $request->input('data.couponCode', ''),
                'termsAgreed' => $request->input('data.termsAgreed', false),
                'ferries' => $request->input('ferries', []), // Extracting "ferries"
            ],
        ]);
    }
}
