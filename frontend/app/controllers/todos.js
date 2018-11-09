import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    todosDone: computed('todos.[]','todos.@each.isDone', function() {
        return  this.get('todos').filterBy('isDone',true).get('length');
    }),
    todosTodo: computed('todos.[]','todos.@each.isDone', function() {
        return  this.get('todos').filterBy('isDone',false).get('length');
    }),
    
    isAddingNew: false,
    actions: {

        toggleNewTodo: function(){
            this.set('isAddingNew',true);
        },

        newTodo: function(chain){
            console.log('chain is: ' + chain);
            if(!chain){
                this.set('isAddingNew',false);
            }

            let title = this.get('title');
            if(!title){return;}
            if(!title.trim()){return;}

            let todo = this.store.createRecord('todo', {"title":title});
            todo.save();
            this.set('title','');
        },

        toggleTodoStatus: function(todo){
            this.store.findRecord('todo',todo.id).then((todo) => {
                let status = todo.get('isDone');
                todo.set('isDone',!status);
                todo.save();
            });
        },

        toggleTodoEdit: function(todo){ 
            let editing = todo.getWithDefault('isEditing', false);
            this.set('oldTodoTitle',todo.get('title'));
            todo.set('isEditing',!editing);
        },

        acceptTodoEdit: function(todo){
            if(!todo.get('isEditing')){
                return;
            }
            todo.set('isEditing',false);
            let oTitle = this.get('oldTodoTitle');
            let nTitle = todo.get('title');
            if(nTitle === oTitle){
                return;
            }
            this.store.findRecord('todo', todo.id).then((todo) => {
                todo.set('title',nTitle);
                todo.save();
            });
        },

        deleteTodo: function(todo){
            this.store.findRecord('todo', todo.id, { backgroundReload: false }).then( (todo) => {
                todo.destroyRecord();
            });
        },
    },
    
});
