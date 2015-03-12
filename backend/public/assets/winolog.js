define('winolog/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'winolog/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  var App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('winolog/initializers/app-version', ['exports', 'winolog/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;

  exports['default'] = {
    name: "App Version",
    initialize: function (container, application) {
      var appName = classify(application.toString());
      Ember['default'].libraries.register(appName, config['default'].APP.version);
    }
  };

});
define('winolog/initializers/export-application-global', ['exports', 'ember', 'winolog/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  };

  exports['default'] = {
    name: "export-application-global",

    initialize: initialize
  };

});
define('winolog/router', ['exports', 'ember', 'winolog/config/environment'], function (exports, Ember, config) {

	'use strict';

	var Router = Ember['default'].Router.extend({
		location: config['default'].locationType
	});

	Router.map(function () {
		this.route("about");
		this.route("learn");
		this.route("pair");
	});

	exports['default'] = Router;

});
define('winolog/templates/about', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<h3>About</h3>");
    
  });

});
define('winolog/templates/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

  function program1(depth0,data) {
    
    
    data.buffer.push("Wino Log");
    }

  function program3(depth0,data) {
    
    
    data.buffer.push("Home");
    }

  function program5(depth0,data) {
    
    
    data.buffer.push("Learn");
    }

  function program7(depth0,data) {
    
    
    data.buffer.push("Pair");
    }

  function program9(depth0,data) {
    
    
    data.buffer.push("About");
    }

    data.buffer.push("<div class=\"container navbar navbar-default\">\n	<div class=\"navbar-header\">\n		");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
      'class': ("navbar-brand"),
      'id': ("title")
    },hashTypes:{'class': "STRING",'id': "STRING"},hashContexts:{'class': depth0,'id': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "application", options) : helperMissing.call(depth0, "link-to", "application", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n		<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n			<span class=\"sr-only\">Toggle Navigation</span>\n			<span class=\"icon-bar\"></span>\n			<span class=\"icon-bar\"></span>\n			<span class=\"icon-bar\"></span>\n		</button>\n	</div>\n	<ul class=\"nav navbar-nav navbar-right collapse navbar-collapse\">\n		<li>\n			");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
      'class': ("active")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "application", options) : helperMissing.call(depth0, "link-to", "application", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n		</li>\n		<li>\n			");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "learn", options) : helperMissing.call(depth0, "link-to", "learn", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n		</li>\n		<li>\n			");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "pair", options) : helperMissing.call(depth0, "link-to", "pair", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n		</li>\n		<li>\n			");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "about", options) : helperMissing.call(depth0, "link-to", "about", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n		</li>\n	</ul>\n</div>	\n<div class=\"jumbotron\">\n</div>\n\n<div class=\"container\">\n	");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>");
    return buffer;
    
  });

});
define('winolog/templates/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<h3>Welcome!</h3>\n<p>Welcome to Wino Log, your one stop for all things wine. You can track wine in your cellar, figure out the perfect wine pairing, and even learn a thing or two about growing regions around the world.</p>\n<p>All this is coming soon, so stay tuned!</p>");
    
  });

});
define('winolog/templates/learn', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<h3>Learn</h3>");
    
  });

});
define('winolog/templates/pair', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<h3>Pair</h3>");
    
  });

});
define('winolog/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('winolog/tests/helpers/resolver', ['exports', 'ember/resolver', 'winolog/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('winolog/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('winolog/tests/helpers/start-app', ['exports', 'ember', 'winolog/app', 'winolog/router', 'winolog/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('winolog/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('winolog/tests/integration/about-page-test', ['ember', 'winolog/tests/helpers/start-app'], function (Ember, startApp) {

	'use strict';

	var App;

	module("Integration - About Page", {
		setup: function () {
			App = startApp['default']();
		},
		teardown: function () {
			Ember['default'].run(App, "destroy");
		}
	});

	test("Should show About page", function () {
		visit("/about").then(function () {
			equal(find("h3").text(), "About");
		});
	});

	test("Should navigate to About page", function () {
		visit("/").then(function () {
			click("a:contains('About')").then(function () {
				equal(find("h3").text(), "About");
			});
		});
	});

});
define('winolog/tests/integration/about-page-test.jshint', function () {

  'use strict';

  module('JSHint - integration');
  test('integration/about-page-test.js should pass jshint', function() { 
    ok(true, 'integration/about-page-test.js should pass jshint.'); 
  });

});
define('winolog/tests/integration/home-page-test', ['ember', 'winolog/tests/helpers/start-app'], function (Ember, startApp) {

	'use strict';

	var App;

	module("Integration - Home Page", {
		setup: function () {
			App = startApp['default']();
		},
		teardown: function () {
			Ember['default'].run(App, "destroy");
		}
	});

	test("Should welcome users to Wino Log", function () {
		visit("/").then(function () {
			equal(find("a#title").text(), "Wino Log");
		});
	});

	test("Should nagivate to home page from learn page", function () {
		visit("/learn").then(function () {
			click("a:contains('Home')").then(function () {
				equal(find("a#title").text(), "Wino Log");
			});
		});
	});

	test("Should nagivate to home page from About page", function () {
		visit("/about").then(function () {
			click("a:contains('Home')").then(function () {
				equal(find("a#title").text(), "Wino Log");
			});
		});
	});

});
define('winolog/tests/integration/home-page-test.jshint', function () {

  'use strict';

  module('JSHint - integration');
  test('integration/home-page-test.js should pass jshint', function() { 
    ok(true, 'integration/home-page-test.js should pass jshint.'); 
  });

});
define('winolog/tests/integration/learn-page-test', ['ember', 'winolog/tests/helpers/start-app'], function (Ember, startApp) {

	'use strict';

	var App;

	module("Integration - Learn Page", {
		setup: function () {
			App = startApp['default']();
		},
		teardown: function () {
			Ember['default'].run(App, "destroy");
		}
	});

	test("Should show Learn page", function () {
		visit("/learn").then(function () {
			equal(find("h3").text(), "Learn");
		});
	});

	test("Should navigate to Learn page", function () {
		visit("/").then(function () {
			click("a:contains('Learn')").then(function () {
				equal(find("h3").text(), "Learn");
			});
		});
	});

});
define('winolog/tests/integration/learn-page-test.jshint', function () {

  'use strict';

  module('JSHint - integration');
  test('integration/learn-page-test.js should pass jshint', function() { 
    ok(true, 'integration/learn-page-test.js should pass jshint.'); 
  });

});
define('winolog/tests/integration/pair-page-test', ['ember', 'winolog/tests/helpers/start-app'], function (Ember, startApp) {

	'use strict';

	var App;

	module("Integration - Pair Page", {
		setup: function () {
			App = startApp['default']();
		},
		teardown: function () {
			Ember['default'].run(App, "destroy");
		}
	});

	test("Should show Pair page", function () {
		visit("/pair").then(function () {
			equal(find("h3").text(), "Pair");
		});
	});

	test("Should naviagte to Pair page", function () {
		visit("/").then(function () {
			click("a:contains('Pair')").then(function () {
				equal(find("h3").text(), "Pair");
			});
		});
	});

});
define('winolog/tests/integration/pair-page-test.jshint', function () {

  'use strict';

  module('JSHint - integration');
  test('integration/pair-page-test.js should pass jshint', function() { 
    ok(true, 'integration/pair-page-test.js should pass jshint.'); 
  });

});
define('winolog/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('winolog/tests/test-helper', ['winolog/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('winolog/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

define('winolog/config/environment', ['ember'], function(Ember) {
  var prefix = 'winolog';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("winolog/tests/test-helper");
} else {
  require("winolog/app")["default"].create({"name":"winolog","version":"0.0.0.c3463877"});
}

/* jshint ignore:end */
//# sourceMappingURL=winolog.map