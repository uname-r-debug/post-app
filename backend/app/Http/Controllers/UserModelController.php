<?php

namespace App\Http\Controllers;

use App\Models\PostModel;
use App\Models\UserModel;
use Illuminate\Http\Request;
class UserModelController extends Controller
{
    public function create(Request $request)
    {
        $r = null;
        if (
            UserModel::insert(values: [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => password_hash(
                    password: $request->input('password'),
                    algo: PASSWORD_DEFAULT
                ),
            ])
        )
            $r = response(
                status: 200
            );
        else
            $r = response(
                status: 400
            );
        return $r;
    }
    public function createPost(Request $request)
    {
        $content = $request->input("content");
        $uid = $request->input("user_id");
        $subject = $request->input("subject");
        return PostModel::insert([
            'content' => $content,
            'subject' => $subject,
            'user_id' => $uid
        ]) ? response(status: 200) : response(status: 403);
    }
    public function deletePost(Request $request)
    {
        $ok = PostModel::where('subject', '=', $request->input('subject'))
            ->first()
            ->delete();
        return $ok ? response(status: 200) : response(status: 400);
    }
    public function delete(Request $request)
    {
        $email = $request->input('email');
        $stat = UserModel::where(
            column: 'email',
            operator: '=',
            value: $email
        )->first()->delete() && PostModel::where('user_id', '=', $request->input('user_id'))->delete();
        $r = $stat ? response(status: 200) : response(
            status: 404
        );
        return $r;
    }
    public function read(Request $request)
    {
        $pass = $request->input('password');
        $user = UserModel::select(['password', 'id'])
            ->where('email', '=', $request->input('email'))
            ->first();
        if (!$user)
            $r = response(status: 404);
        elseif (password_verify($pass, $user->password))
            $r = response([
                'uid' => $user->id
            ], 200);
        else
            response(status: 403);
        return $r;
    }
    public function index(Request $request)
    {
        $user = UserModel::where('id', '=', $request->input('user_id'))->first();
        if (!$user)
            return response(status: 404);
        $posts = PostModel::where(
            'user_id',
            '=',
            $user->id
        )
            ->get();
        return response()->json($posts);
    }
    public function update(Request $request)
    {

    }
}
