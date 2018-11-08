import Controller from '@ember/controller';
import { set, computed } from '@ember/object';

export default Controller.extend({
    todosDone: computed('todos.[]','todos.@each.isDone', function() {
        return  this.get('todos').filterBy('isDone',true).get('length');
    }),
    todosTodo: computed('todos.[]','todos.@each.isDone', function() {
        return  this.get('todos').filterBy('isDone',false).get('length');
    }),
    actions: {
        newTodo: function(){
            let todo = this.store.createRecord('todo', {"title":"2asdadsn"});
            todo.save();
        },
        toggleTodoStatus: function(id){
            this.store.findRecord('todo', id).then((todo) => {
                let status = todo.get('isDone');
                todo.set('isDone',!status);
                todo.save();
            });
        },
        editTodo: function(id){ 
            // // alert('SHOULD EDIT ID: ' + id);
            // this.store.findRecord('todos', id).then((todo) => {
            //     // todo.get('title'); // => "Rails is Omakase"
              
            //     todo.set('isDone', !todo.get('isDone'));
              
            //     todo.save(); // => PATCH to '/posts/1'
            //   });
        },
        deleteTodo: function(id){
            this.store.findRecord('todo', id, { backgroundReload: false }).then( (todo) => {
                todo.destroyRecord();
            });
        },
    },
    
});
