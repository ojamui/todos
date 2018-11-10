import Route from '@ember/routing/route';

export default Route.extend({
    errorMessages: Ember.inject.service(),
    setupController: function (controller, model) {
        var errors = this.get("errorMessages");
        controller.set("errorToDisplayInTemplate", errors.get("errorMessage"));
    },
    actions:{
        retry: function(){
            this.transitionTo('todos');
        }
    }
});
