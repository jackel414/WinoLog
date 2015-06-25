import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        goToCellar: function() {
            this.transitionToRoute('cellar');
        },
        goToLibrary: function() {
            this.transitionToRoute('library');
        }
    }
});
