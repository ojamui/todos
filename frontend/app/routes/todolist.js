import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        /*
            TODO: CONNECT TO API: GET INITIAL LIST
            Method: Promise ? 
            Oject: {id:int, title: str, done: bool}
            Functionality: Delete Item, Mark as Done/Todo, Edit Title
        */
        // return this.store.findAll('item');
        return [
            {id: 1, title:'משימה A', done: false},
            {id: 2, title:'משימה B', done: false},
            {id: 3, title:'משימה C', done: false},
            {id: 4, title:'משימה D', done: false},
            {id: 5, title:'משימה E', done: true},
            {id: 1, title:'משימה F', done: false},
            {id: 2, title:'משימה G', done: false},
            {id: 3, title:'משימה H', done: true},
            {id: 4, title:'משימה I', done: false},
            {id: 5, title:'משימה J', done: false}
        ];
    }
});
