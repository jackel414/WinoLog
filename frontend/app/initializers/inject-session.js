import Ember from 'ember';

export default {
    name: 'inject-session',

    initialize: function initialize(container, application) {

        container.register('service:session', Ember.Object);

        application.inject('route', 'session', 'service:session');
        application.inject('controller', 'session', 'service:session');
    }
};
