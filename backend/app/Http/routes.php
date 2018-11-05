<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use Illuminate\Http\Request;

Route::put('/api/todos', [
    'uses' => 'TodoController@putTodos'
]);
Route::get('/api/todos', [
    'uses' => 'TodoController@getTodos'
]);
Route::delete('/api/todos/{todo}',[
    'uses' => 'TodoController@deleteTodos'
]);
