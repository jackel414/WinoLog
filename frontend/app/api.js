import Ember from 'ember';
var $ = Ember.$;

var API = {

    token: null,

    login: function(username, password) {
        var self = this;
        
        var payload = {
            username: username,
            password: password
        };
        
        var deferred = $.post('/api/sessions', payload).then(
            function(data) {
                self.token = data.token;
                return data.user;
            },
            function(error) {
                return { status: error.statusText, message: error.responseText };
            }
        );
        
        return Ember.RSVP.resolve(deferred);
    },
    
    logout: function() {
        var self = this;
        
        var settings = { type: 'DELETE', headers: { 'Authorization': 'Token token=' + this.token } };
        
        var deferred = $.ajax('/api/sessions', settings).then(function() {
            self.token = null;
        });
        
        return Ember.RSVP.resolve(deferred);
    },
    
    get: function(resource) {
        var url = '/api/' + resource;
        
        var settings;
        
        if (this.token) {
            settings = { headers: { 'Authorization': 'Token token=' + this.token } };
        } else {
            settings = {};
        }
        
        var deferred = $.ajax(url, settings).then(null, function(error) {
            return { status: error.statusText, message: error.responseText };
        });
        
        return Ember.RSVP.resolve(deferred);
    }
    
};

export default API;
