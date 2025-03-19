<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;


Route::get("", [HomeController::class, 'home'])->name('home.home');
Route::get("/about", [HomeController::class, 'about'])->name('home.about');
Route::get("/contact", [HomeController::class, 'contact'])->name('home.contact');

Route::get("/products", [ProductController::class, 'index'])->name("product.index");
Route::get("/api/products/load-more", [ProductController::class, 'loadMore'])->name("product.loadMore");
Route::get("/products/{id}", [ProductController::class, 'show'])->name("product.show");

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
