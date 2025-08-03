<?php
Illuminate\Support\Facades\Route::
    withoutMiddleware(
        middleware: Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class
    )
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
                action: [
                    App\Http\Controllers\UserModelController::class,
                    $controller
                ]
            );
    });