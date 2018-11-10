import Route from '@ember/routing/route';
import { set, computed } from '@ember/object';
import { typeOf } from '@ember/utils';

export default Route.extend({
    errorMessages: Ember.inject.service(),
    model: function() {
        return this.store.findAll('todo');
    },
    actions: {
        error(error, transition) {
                let errors = this.get("errorMessages");
                errors.set("errorMessage", error[0].message);
                return this.transitionTo('error');
          }
    },
    setupController(controller, model){
        set(controller,'todos',model);
    },
});
