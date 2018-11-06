import Component from '@ember/component';

export default Component.extend({
    store: Ember.inject.service(),
    classNameBindings: ['isDone:done'],
    isDone:false,
    actions: {
        toggleItemStatus(itemId){
            alert('ITEM CLICKED: ' + itemId);
        },
        deleteItem(itemId){
            store: Ember.inject.service(),
            console.log('Should delete item with id: ' + itemId);
            store.findRecord('todo', itemId, { backgroundReload: false }).then(function(todo) {
                todo.destroyRecord();
            });
        }
    }
});
