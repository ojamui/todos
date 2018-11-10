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
                let message = Ember.isArray(error) && error[0].message ? error[0].message : "Unknown Error";
                errors.set("errorMessage", message);
                return this.transitionTo('error');
          }
    },
    setupController(controller, model){
        set(controller,'todos',model);
    },
});
