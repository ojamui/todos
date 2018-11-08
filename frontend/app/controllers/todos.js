import Controller from '@ember/controller';
import { set, computed } from '@ember/object';

export default Controller.extend({
    todosDone: computed('todos.[]','todos.@each.isDone', function() {
        return  this.get('todos').filterBy('isDone',true).get('length');
    }),
    todosTodo: computed('todos.[]','todos.@each.isDone', function() {
        return  this.get('todos').filterBy('isDone',false).get('length');
    }),
    isEditing: false,

    actions: {
        newTodo: function(){
            let todo = this.store.createRecord('todo', {"title":"2asdadsn"});
            todo.save();
        },
        toggleTodoStatus: function(todo){
            this.store.findRecord('todo', todo.id).then((todo) => {
                let status = todo.get('isDone');
                todo.set('isDone',!status);
                todo.save();
            });
        },
        toggleTodoEdit: function(todo){ 
            let editing = todo.getWithDefault('isEditing', false);
            todo.set('isEditing',!editing);
        },
        acceptTodoEdit: function(todo){
            let title = todo.get('title');
            this.store.findRecord('todo', todo.id).then((todo) => {
                todo.set('title',title);
                todo.save();
                todo.set('isEditing',false);
            });
        },
        deleteTodo: function(todo){
            this.store.findRecord('todo', todo.id, { backgroundReload: false }).then( (todo) => {
                todo.destroyRecord();
            });
        },
    },
    
});
