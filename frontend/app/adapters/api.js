import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://localhost:8000',
    namespace: 'api',
    handleResponse (status, headers, payload, requestData) {

        // if(status === 400 && payload.errors){
        //     console.log(status + ': CAUGHT: ', payload.errors);

        //   return new DS.InvalidError(payload.errors);
        // }
        if(status !== 200 && payload.errors){
            return new DS.Errors(payload.errors);
        }
        
        return this._super(status, headers, payload, requestData);
    }
});
