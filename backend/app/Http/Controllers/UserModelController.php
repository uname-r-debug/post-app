<?php

namespace App\Http\Controllers;

use App\Models\PostModel;
use App\Models\UserModel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
class UserModelController extends Controller
{
    public function create(Request $request): Response
    {
        $response = new Response(status: 404);
        $sessionKey = uuid_create();
        $ok = UserModel::insert([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => password_hash(
                password: $request->input('password'),
                algo: PASSWORD_DEFAULT
            ),
            'uuid' => $sessionKey
        ]);
        if ($ok)
            $response
                ->setStatusCode(200)
                ->setContent(json_encode([
                    'sessionKey' => $sessionKey
                ]));
        return $response;
    }
    public function createPost(Request $request): Response
    {
        return PostModel::insert([
            'content' => $request->input('content'),
            'subject' => $request->input('subject'),
            'user_id' => $request->input('user')
        ]) ? response(
            content: true,
            status: 200
        ) : response(status: 404);
    }
    public function deletePost(Request $request)
    {
        $response = new Response(status: 404);
        $ok = PostModel::where(
            [
                'subject' => $request->input('subject')
            ]
        )
            ->first() // may not need this call since PostModel.subject is a unique field
            ->delete();
        if ($ok)
            $response
                ->setStatusCode(200)
                ->setContent(true);
        return $response;
    }
    public function delete(Request $request)
    {
        $response = new Response(status: 404);
        [$user, $sessionKey] = [
            $request->input('user'),
            $request->input('sessionKey')
        ];
        $state = UserModel::where([
            'sessionKey' => $sessionKey
        ])
            ->first()
            ->delete() ?
            (
                PostModel::where([
                    'user_id' => $user
                ])
                    ->delete() ? 0 : 1
            ) : 2;
        if ($state === 0)
            $response
                ->setStatusCode(200)
                ->setContent(true);
        return $response;
    }
    public function read(Request $request)
    {
        $response = new Response(status: 404);
        [$sessionKey, $email, $password] = [
            $request->input('sessionKey'),
            $request->input('email'),
            $request->input('password')
        ];
        $record = UserModel::select(['id', 'password'])
            ->where([
                'email' => $email,
                'uuid' => $sessionKey
            ])
            ->first();
        if ($record === null) {/**null */
        } elseif (password_verify(password: $password, hash: $record->password))
            $response
                ->setStatusCode(200)
                ->setContent(json_encode([
                    'user' => $record->id
                ]));
        return $response;
    }
    public function index(Request $request)
    {
        $response = new Response(status: 404);
        $user = $request->input('user');
        $records = PostModel::where([
            'user_id' => $user
        ])
            ->select(['subject', 'content']);
        if ($records !== null)
            $response
                ->setContent(json_encode($records))
                ->setStatusCode(200);
        return $response;
    }
    public function update(Request $request)
    {
        $subject = $request->input('subject');
        $content = $request->input('content');
    }
}
