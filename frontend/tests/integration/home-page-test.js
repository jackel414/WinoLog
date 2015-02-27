import Ember from 'ember';
import startApp from 'winolog/tests/helpers/start-app';

var App;

module('Integration - Home Page', {
	setup: function() {
		App = startApp();
	},
	teardown: function() {
		Ember.run(App, 'destroy');
	}
});

test('Should welcome users to Wino Log', function() {
	visit('/').then(function() {
		equal(find('h2#title').text(), 'Wino Log');
	});
});