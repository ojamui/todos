import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { typeOf } from '@ember/utils';


// const { set } = Ember;

export default Route.extend({
    model() {
        return this.store.findAll('todo');
    },
    setupController(controller, model){
        set(controller,'todos',model);
    },
    actions: {
        newTodo: function(){
            // console.log('ADD NEW');
            let todo = this.store.createRecord('todo', {"title":"2asdadsn", "isDone":true});
            
            todo.save(); // => POST to '/posts'

        },
        toggleTodoStatus: function(id){
            this.store.findRecord('todo', id).then((todo) => {
                // todo.get('title'); // => "Rails is Omakase"
                todo.set('title','HELLLLLO');
                let status = todo.get('isDone');
                console.log('status: ' + status + ' !status: ' + !status);
                todo.set('isDone',!status);
                // todo.toggleProperty('isDone');
                todo.save(); // => PATCH to '/posts/1'
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
            // console.log('Should delete id: ' + id);
            this.store.findRecord('todo', id, { reload: true }).then((todo) => {
                todo.destroyRecord(); // => DELETE to /posts/2
            });
        },
    }
});
