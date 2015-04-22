import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('cellar');
	this.route('library');
	this.route('profile');
	this.route('login');
});

export default Router;
