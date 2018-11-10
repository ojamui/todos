import Route from '@ember/routing/route';
import { set, computed } from '@ember/object';
import { typeOf } from '@ember/utils';


// const { set } = Ember;

export default Route.extend({
    model() {
        return this.store.findAll('todo');
    },
    actions: {
        error(error, transition) {
            console.log(transition);
            console.log('ERROR IN ROUTE',error)
            //TODO ITERATE OVER ERRORS AND ADD TO ERROR LIST
            switch(error[0].code){
                case 403:
                case 404:
                case 405:
                    console.log('found case');
                    break;
                default:
                    return true;
            }
          }
    },
    setupController(controller, model){
        set(controller,'todos',model);
    },
});
