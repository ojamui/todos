import Component from '@ember/component';

export default Component.extend({
    classNameBindings: ['isDone:done'],
    isDone:false,
    actions: {
        toggleItemStatus(itemId){
            alert('ITEM CLICKED: ' + itemId);
        },
        deleteItem(itemId){
            alert('DELETE ITEM: ' + itemId);
        }
    }
});
