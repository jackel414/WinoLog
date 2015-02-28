import Ember from 'ember';
import startApp from 'winolog/tests/helpers/start-app';

var App;

module('Integration - Learn Page', {
	setup: function() {
		App = startApp();
	},
	teardown: function() {
		Ember.run(App, 'destroy');
	}
});

test('Should show Learn page', function() {
	visit('/learn').then(function() {
		equal(find('h3').text(), 'Learn');
	});
});

test('Should navigate to Learn page', function() {
	visit('/').then(function() {
		click("a:contains('Learn')").then(function() {
			equal(find('h3').text(), 'Learn');
		});
	});
});