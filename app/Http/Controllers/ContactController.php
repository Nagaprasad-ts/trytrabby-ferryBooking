<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function show(Request $request)
    {
        //Render the contact details page.
        return Inertia::render('ContactDetails', [
            'searchParams' => $request->all(),
        ]);
    }

    public function store(Request $request)
    {
        // Manually decode the JSON request
        $data = json_decode($request->getContent(), true);

        // Extract values
        $adults = $request->json('adults');
        $children = $request->json('children');
        $selectedFerries = $request->json('selectedFerries');

        return Inertia::render('ContactDetails', [
            'searchParams' => [
                'ferries' => $selectedFerries,
                'adults' => $adults,
                'children' => $children,
            ],
        ]);
    }
}

