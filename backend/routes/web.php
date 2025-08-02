<?php

use App\Http\Controllers\UserModelController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;
Route::post('/api/create', [UserModelController::class, 'create'])->withoutMiddleware(
    VerifyCsrfToken::class
);
Route::post('/api/delete', [UserModelController::class, 'delete'])->withoutMiddleware(
    VerifyCsrfToken::class
);
Route::post('/api/read', [UserModelController::class, 'read'])->withoutMiddleware(
    VerifyCsrfToken::class
);
Route::post('/api/index', [UserModelController::class, 'index'])->withoutMiddleware(VerifyCsrfToken::class);
Route::post('/api/create.post', [UserModelController::class, 'createPost'])->withoutMiddleware(VerifyCsrfToken::class);
Route::post('/api/delete.post', [UserModelController::class, 'deletePost'])->withoutMiddleware(VerifyCsrfToken::class);