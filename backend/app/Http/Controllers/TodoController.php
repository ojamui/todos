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
        return response()->json(['todos' => $todos]);
    }

    public function getSingleTodos($id)
    {
        $todo = Todo::find($id);
        return response()->json(['todos' => $todo]);

    }

    public function updateTodos(Request $request, $id) //TODO : refactor to nicer more readable code, reuse more parts; error when id sent but not exists
    {
        $data = $request->json()->all();

        $todo = Todo::find($id);

        $todo->isDone = $data['todo']['isDone'];
        $todo->title = $data['todo']['title'];
        
        $todo->save();

        return $this->getTodos();

    }

    public function addTodos(Request $request){

        $data = $request->json()->all();

        $todo = new Todo();
        $todo->title = $data['todo']['title'];
        $todo->isDone = False;
        $todo->save();

        return response()->json(['todos' => $todo]);
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
