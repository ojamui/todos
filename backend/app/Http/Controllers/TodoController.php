<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
use App\Http\Requests;

class TodoController extends Controller
{

    public function getTodos()
    {
        $todos = Todo::all();
        return $todos->toJson(JSON_PRETTY_PRINT);
    }

    public function putTodos(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255'
        ]);

        $title = $request->input('title');

        if($request->has('id') ){

            $todo = Todo::find($request->input('id'));
            if($todo){
                if($request->has('isDone') && $todo->isDone !== $request->input('isDone')){
                    $todo->isDone = $request->input('isDone');
                }
                if($todo->title !== $request->input('title')){
                    $todo->title = $request->input('title');
                }
            }

        } else {
            $todo = new Todo();
            $todo->title = $title;
            $todo->isDone = false;
        }
        
        $todo->save();

        return $this->getTodos();

    }
    
    public function deleteTodos($id){
        
        // delete all
        // Todo::truncate();

        $todo = Todo::find($id);
        if($todo){
            $todo->delete();
        }

        return $this->getTodos();
    }

}
