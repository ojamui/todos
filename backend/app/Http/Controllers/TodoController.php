<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
use App\Http\Requests;

class TodoController extends Controller
{
    //Methods shouldd be routed to here from routes.php

    //Get all todos (GET)

    //Add new Todo (PUT)             ***  MAYBE DECIDE HERE?
    public function putTodos(Request $request)
    {
        $title = $request->input('title');

        if($request->has('id')){ // TODO: AND ID EXISTS
            return 'Should UPDATE';
        }
        
        //NEW TODO
        $todo = new Todo();

        $todo->title = $title;
        $todo->isDone = false;

        $todo->save();

        return 'New TODO saved; Should return new list';

    }
    //Update existing Todo (PUT)     ***
    
    //Delete existing Todo (DELETE)
}
