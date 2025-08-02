<?php

use App\Http\Controllers\UserModelController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

[$userController, $middleware] = [UserModelController::class, VerifyCsrfToken::class];

Route::post(
    uri: '/api/create',
    action: [$userController, 'create']
)
    ->withoutMiddleware(
        $middleware
    );

Route::post(
    uri: '/api/delete',
    action: [$userController, 'delete']
)
    ->withoutMiddleware(
        $middleware
    );

Route::post(
    uri: '/api/read',
    action: [$userController, 'read']
)
    ->withoutMiddleware(
        $middleware
    );

Route::post(
    uri: '/api/index',
    action: [$userController, 'index']
)
    ->withoutMiddleware(
        $middleware
    );

Route::post(
    uri: '/api/create.post',
    action: [$userController, 'createPost']
)
    ->withoutMiddleware(
        $middleware
    );

Route::post(
    uri: '/api/delete.post',
    action:
    [$userController, 'deletePost']
)
    ->withoutMiddleware(
        $middleware
    );