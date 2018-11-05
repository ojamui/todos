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

Route::get('/', function () {
    return view('welcome');
});

// Get All todos
Route::get('/api/todos', function()
{
    $mockList = [ // GET FROM DB
        [
            'id' => 123,
            'title' => 'First Task',
            'isDone' => true      
        ], [
            'id' => 124,
            'title' => '2nd Task',
            'isDone' => false 
        ]
    ];
    return response()->json($mockList);
});

// Add/Update Single todo
Route::put('/api/todos', [
    'uses' => 'TodoController@putTodos'
]);
// Route::put('/api/todos', function (Request $request)
// {
//     //     return response()->json(['title' => $request->title]);
//     if($request->has('id')){  // MAYBE SEND DECISION TO CONTROLLER
//         return 'Should Update';
//     }
//     return 'Should Create';
// });

// Delete Single todo
// Route::delete('/api/todos/{todo}', function($id) 
// {
//     return $id;
// });