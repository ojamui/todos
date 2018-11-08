import Component from '@ember/component';

export default Component.extend({
    store: Ember.inject.service(),
    actions: {
        newItem(){
            alert('NEW ITEM REQUESTED');
            let todo = this.get('store').createRecord('todo', {
                title: 'Rails is Omakase'
            });
            todo.save();
        }
    }
    
});
