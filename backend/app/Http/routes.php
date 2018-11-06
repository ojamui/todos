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


Route::get('/api/todos', [
    'middleware' => 'cors',
    'uses' => 'TodoController@getTodos'
]);

Route::put('/api/todos', [
    'middleware' => 'cors',
    'uses' => 'TodoController@putTodos'
]);

Route::delete('/api/todos/{todo}', [
    'middleware' => 'cors'
    'uses' => 'TodoController@deleteTodos'
]);