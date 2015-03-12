import Ember from 'ember';
import startApp from 'winolog/tests/helpers/start-app';

var App;

module('Integration - Pair Page', {
	setup: function() {
		App = startApp();
	},
	teardown: function() {
		Ember.run(App, 'destroy');
	}
});

test('Should show Pair page', function() {
	visit('/pair').then(function() {
		equal(find('h3').text(), 'Pair');
	});
});

test('Should naviagte to Pair page', function() {
	visit('/').then(function() {
		click("a:contains('Pair')").then(function() {
			equal(find('h3').text(), 'Pair');
		});
	});
});