<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FerryController extends Controller
{
    public function showSelectionForm(Request $request)
    {
        //Render the ferry selection page.
        return Inertia::render('ferrySelection', [
            'searchParams' => $request->all(),
        ]);
    }

    public function ferrySelection(Request $request)
    {
        return Inertia::render('ferrySelection', [
            'searchParams' => $request->all(), // Retrieves all data from the request body
        ]);
    }
}