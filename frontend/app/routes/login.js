import Ember from 'ember';
import API from '../api';
import ResetScroll from "../mixins/reset-scroll";

export default Ember.Route.extend(ResetScroll, {
    actions: {
        submit: function() {
            var route = this;
            var controller = this.get('controller');
            var username = controller.get('username');
            var password = controller.get('password');

            controller.set('message', null);

            API.login(username, password).then(
                function(user) {
                    if (user) {
                        var transition = controller.get('transition');

                        route.session.set('user', user);

                        if (transition) {
                            transition.retry();
                        } else {
                            route.transitionTo('index');
                        }
                    } else {
                        route.transitionTo('error');
                    }
                },
                function(error) {
                    controller.set('message', error.message);
                }
            );
        },
        cancel: function() {
            this.transitionTo('index');
        }
    },

    beforeModel: function() {
        API.token = null;
        this.session.set('user', null);
    },

    resetController: function(controller) {
        controller.setProperties({
            username: null,
            password: null,
            message: null,
            transition: null
        });
    }
});
