import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    errorMessages: Ember.inject.service(),
    todosDone: computed('todos.[]','todos.@each.isDone', function() {
        return  this.get('todos').filterBy('isDone',true).get('length');
    }),
    todosTodo: computed('todos.[]','todos.@each.isDone', function() {
        return  this.get('todos').filterBy('isDone',false).get('length');
    }),
    
    isAddingNew: false,
    saveAndHandle: function(todo, isNew){
        todo.save().then(
            (res) => {
                console.log('save(): Success',res);
            }
        ).catch(
            (err) => {
                console.log('save(): Error',err);
                if(isNew){
                    this.store.unloadRecord(todo);
                } else {
                    console.log('EDIT failed: ' + todo.get('id') + ' ; ' + todo.get('title') + ' ; ' + todo.get('isDone'));
                    todo.rollbackAttributes();
                }
                this.sendToError(err);
            }
        )
    },
    sendToError: function(error){
        let errors = this.get("errorMessages");
        errors.set("errorMessage", error[0].message);
        return this.get('target').send('error', error);
    },
    actions: {
        toggleNewTodo: function(){
            this.set('isAddingNew',true);
        },
        newTodo: function(chain){
            if(!chain){
                this.set('isAddingNew',false);
            }

            let title = this.get('title');

            if(!title || !title.trim()){
                return;
            }
            
            let todo = this.store.createRecord('todo', {"title":title});
            this.set('title','');
            this.saveAndHandle(todo,true);
        },
        toggleTodoStatus: function(todo){
            this.store.findRecord('todo',todo.id, { backgroundReload: true } ).then((todo) => {
                let status = todo.get('isDone');
                todo.set('isDone',!status);
                this.saveAndHandle(todo);
            }).catch( (err) => { 
                this.sendToError(err) 
            } );
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

            if(Ember.isEmpty(nTitle)){ 
                todo.set('title',oTitle);
                return;
            }
            if(nTitle === oTitle){
                return;
            }
            this.store.findRecord('todo', todo.id).then((todo) => {
                todo.set('title',nTitle);
                this.saveAndHandle(todo);
            }).catch( (err) => { 
                this.sendToError(err) 
            } );
        },
        deleteTodo: function(todo){
            this.store.findRecord('todo', todo.id, { reload:true, backgroundReload: true }).then( (todo) => {
                todo.destroyRecord().then(
                    (res) => {
                        console.log('destroyRecord(): Success',res);
                    }
                ).catch(
                    (err) => {
                        console.log('destroyRecord(): Error',err);
                        this.sendToError(err);
                    }
                )
            }).catch( (err) => { 
                this.sendToError(err);
            } );
        },
        handleError: function(error){
            let errors = this.get("errorMessages");
            errors.set("errorMessage", error[0].message);
            return this.transitionTo('error');
        },
    }
});
