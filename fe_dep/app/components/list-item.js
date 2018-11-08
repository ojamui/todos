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
            console.log('Should delete item with id: ' + itemId);
            this.get('store').findRecord('todo', itemId, { backgroundReload: false }).then(function(todo) {
                todo.destroyRecord();
            });
            // console.log(this.get('store').delete('todo',itemId));
            // this.get('store').deleteRecord(itemId);
        }
    }
});
