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
		equal(find('a#title').text(), 'Wino Log');
	});
});

test('Should nagivate to home page from learn page', function() {
	visit('/learn').then(function() {
		click("a:contains('Home')").then(function() {
			equal(find('a#title').text(), 'Wino Log');
		});
	});
});

test('Should nagivate to home page from About page', function() {
	visit('/about').then(function() {
		click("a:contains('Home')").then(function() {
			equal(find('a#title').text(), 'Wino Log');
		});
	});
});