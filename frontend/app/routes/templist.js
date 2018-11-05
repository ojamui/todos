import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        return [{id: 1, title:'TEMP 1'},{id: 2, title:'TEMP 2'}];
    }
});
