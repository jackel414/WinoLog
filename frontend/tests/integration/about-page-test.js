import Ember from 'ember';
import startApp from 'winolog/tests/helpers/start-app';

var App;

module('Integration - About Page', {
	setup: function() {
		App = startApp();
	},
	teardown: function() {
		Ember.run(App, 'destroy');
	}
});

test('Should show About page', function() {
	visit('/about').then(function() {
		equal(find('h3').text(), 'About');
	});
});

test('Should navigate to About page', function() {
	visit('/').then(function() {
		click("a:contains('About')").then(function() {
			equal(find('h3').text(), 'About');
		});
	});
});