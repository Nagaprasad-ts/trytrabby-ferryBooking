<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FerryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ThankYouController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// GET route for initial page load
Route::get('/ferry-selection', [FerryController::class, 'showSelectionForm'])->name('ferry.selection.form');

// POST route for form submission
Route::post('/ferry-selection', [FerryController::class, 'ferrySelection'])->name('ferry.selection');

Route::get('/contact-details', [ContactController::class, 'show']);
Route::post('/contact-details', [ContactController::class, 'store']);

Route::get('/thank-you', [ThankYouController::class, 'show']);
Route::post('/thank-you', [ThankYouController::class, 'store']);

Route::get('/trial', function () {
    return Inertia::render('dummy');
})->name('trial');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
