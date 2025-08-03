<?php

use App\Http\Controllers\UserModelController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::withoutMiddleware(VerifyCsrfToken::class)
    ->group(function (Illuminate\Routing\Router $router) {
        foreach ([
            'create' => 'create',
            'create.post' => 'createPost',
            'delete' => 'delete',
            'delete.post' => 'deletePost',
            'read' => 'read',
            'index' => 'index'
        ] as $route => $controller)
            $router->post(
                uri: "/api/$route",
                action: [UserModelController::class, $controller]
            );
    });