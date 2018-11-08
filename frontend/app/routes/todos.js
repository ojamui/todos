import Route from '@ember/routing/route';
import { set, computed } from '@ember/object';
import { typeOf } from '@ember/utils';


// const { set } = Ember;

export default Route.extend({
    model() {
        return this.store.findAll('todo');
    },
    setupController(controller, model){
        set(controller,'todos',model);
    },
});
