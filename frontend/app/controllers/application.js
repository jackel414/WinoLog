import Ember from 'ember';

export default Ember.Controller.extend({
    isCurrentRouteIndex: Ember.computed.equal('currentRouteName', 'index')
});