import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://localhost:8000',
    namespace: 'api',
    handleResponse (status, headers, payload, requestData) {
        if(status === 500){
            return new DS.Errors([{message: "Internal Server Error"}]);
        } else if(status !== 200 && payload.errors){
            return new DS.Errors(payload.errors);
        } else if(status !== 200){
            return new DS.Errors([{message: "Unknown Server Error"}]);
        }
        return this._super(status, headers, payload, requestData);
    }
});
