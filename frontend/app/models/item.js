import DS from 'ember-data';

export default DS.Model.extend({
    list: DS.belongsTo('list'),
    id: DS.attr('string'),
    title: DS.attr('string'),
    done: DS.attr('boolean')
});
