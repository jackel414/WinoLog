define('winolog/api', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    var $ = Ember['default'].$;

    var API = {

        token: null,

        login: function (username, password) {
            var self = this;

            var payload = {
                username: username,
                password: password
            };

            var deferred = $.post("/api/sessions", payload).then(function (data) {
                self.token = data.token;
                return data.user;
            }, function (error) {
                return { status: error.statusText, message: error.responseText };
            });

            return Ember['default'].RSVP.resolve(deferred);
        },

        logout: function () {
            var self = this;

            var settings = { type: "DELETE", headers: { Authorization: "Token token=" + this.token } };

            var deferred = $.ajax("/api/sessions", settings).then(function () {
                self.token = null;
            });

            return Ember['default'].RSVP.resolve(deferred);
        },

        get: function (resource) {
            var url = "/api/" + resource;

            var settings;

            if (this.token) {
                settings = { headers: { Authorization: "Token token=" + this.token } };
            } else {
                settings = {};
            }

            var deferred = $.ajax(url, settings).then(null, function (error) {
                return { status: error.statusText, message: error.responseText };
            });

            return Ember['default'].RSVP.resolve(deferred);
        }

    };

    exports['default'] = API;

});
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
define('winolog/controllers/login', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend();

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
define('winolog/initializers/inject-session', ['exports', 'ember'], function (exports, Ember) {

    'use strict';

    exports['default'] = {
        name: "inject-session",

        initialize: function initialize(container, application) {
            container.register("service:session", Ember['default'].Object);

            application.inject("route", "session", "service:session");
            application.inject("controller", "session", "service:session");
        }
    };

});
define('winolog/router', ['exports', 'ember', 'winolog/config/environment'], function (exports, Ember, config) {

	'use strict';

	var Router = Ember['default'].Router.extend({
		location: config['default'].locationType
	});

	Router.map(function () {
		this.route("cellar");
		this.route("library");
		this.route("profile");
		this.route("login");
	});

	exports['default'] = Router;

});
define('winolog/routes/application', ['exports', 'ember', 'winolog/api'], function (exports, Ember, API) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        actions: {
            logout: function () {
                var route = this;

                API['default'].logout().then(function () {
                    route.session.set("user", null);
                    route.transitionTo("index");
                });
            },

            error: function (error, transition) {
                if (error.status === "Unauthorized") {
                    var loginController = this.controllerFor("login");

                    loginController.setProperties({
                        message: error.message,
                        transition: transition
                    });

                    this.transitionTo("login");
                } else {
                    return true;
                }
            }
        }
    });

});
define('winolog/routes/cellar', ['exports', 'ember', 'winolog/api'], function (exports, Ember, API) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        beforeModel: function () {
            if (!this.session.get("user")) {
                return Ember['default'].RSVP.reject({ status: "Unauthorized", message: "Please login to access this page" });
            }
        },

        model: function () {
            return API['default'].get("cellar");
        }
    });

});
define('winolog/routes/library', ['exports', 'ember', 'winolog/api'], function (exports, Ember, API) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        model: function () {
            return API['default'].get("library");
        }
    });

});
define('winolog/routes/login', ['exports', 'ember', 'winolog/api'], function (exports, Ember, API) {

    'use strict';

    exports['default'] = Ember['default'].Route.extend({
        actions: {
            submit: function () {
                var route = this;
                var controller = this.get("controller");
                var username = controller.get("username");
                var password = controller.get("password");

                controller.set("message", null);

                API['default'].login(username, password).then(function (user) {
                    if (user) {
                        var transition = controller.get("transition");

                        route.session.set("user", user);

                        if (transition) {
                            transition.retry();
                        } else {
                            route.transitionTo("index");
                        }
                    } else {
                        route.transitionTo("error");
                    }
                }, function (error) {
                    controller.set("message", error.message);
                });
            },
            cancel: function () {
                this.transitionTo("index");
            }
        },

        beforeModel: function () {
            API['default'].token = null;
            this.session.set("user", null);
        },

        resetController: function (controller) {
            controller.setProperties({
                username: null,
                password: null,
                message: null,
                transition: null
            });
        }
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
    
    
    data.buffer.push("The Cellar");
    }

  function program7(depth0,data) {
    
    
    data.buffer.push("The Library");
    }

  function program9(depth0,data) {
    
    var buffer = '', stack1, helper, options;
    data.buffer.push("\n            <li>");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "profile", options) : helperMissing.call(depth0, "link-to", "profile", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</li>\n        ");
    return buffer;
    }
  function program10(depth0,data) {
    
    
    data.buffer.push("My Profile");
    }

  function program12(depth0,data) {
    
    var buffer = '', stack1, helper, options;
    data.buffer.push("\n            <li>");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "login", options) : helperMissing.call(depth0, "link-to", "login", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</li>\n        ");
    return buffer;
    }
  function program13(depth0,data) {
    
    
    data.buffer.push("Login");
    }

    data.buffer.push("<div class=\"container navbar navbar-default\">\n    <div class=\"navbar-header\">\n        ");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
      'class': ("navbar-brand"),
      'id': ("title")
    },hashTypes:{'class': "STRING",'id': "STRING"},hashContexts:{'class': depth0,'id': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "application", options) : helperMissing.call(depth0, "link-to", "application", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n            <span class=\"sr-only\">Toggle Navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n        </button>\n    </div>\n    <ul class=\"nav navbar-nav navbar-right collapse navbar-collapse\">\n        <li>");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
      'class': ("active")
    },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "application", options) : helperMissing.call(depth0, "link-to", "application", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</li>\n        <li>");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "cellar", options) : helperMissing.call(depth0, "link-to", "cellar", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</li>\n        <li>");
    stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "library", options) : helperMissing.call(depth0, "link-to", "library", options));
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</li>\n        ");
    stack1 = helpers['if'].call(depth0, "session.user", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    </ul>\n</div>	\n<div class=\"jumbotron\">\n</div>\n\n<div class=\"container\">\n    ");
    stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n</div>\n");
    return buffer;
    
  });

});
define('winolog/templates/cellar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<h2>Your Wine Cellar</h2>\n\n<div>\n    &nbsp;\n</div>\n\n<div class=\"col-sm-10 col-sm-offset-1\">\n    <table class=\"table table-condensed table-bordered table-hover\">\n        <thead>\n            <tr>\n                <th>Wine Name</th>\n                <th>Grapes</th>\n                <th>Region / Country</th>\n                <th>Bottles</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>14 Hands</td>\n                <td>Merlot</td>\n                <td>Washington State, USA</td>\n                <td>1</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n    \n<div class=\"col-sm-12\">\n    <a href=\"#\">View History</a> &nbsp;|&nbsp; <a href=\"#\">Add Wine</a>\n</div>");
    
  });

});
define('winolog/templates/error', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var stack1, self=this;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n<h3>");
    stack1 = helpers._triageMustache.call(depth0, "message", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</h3>\n");
    return buffer;
    }

  function program3(depth0,data) {
    
    
    data.buffer.push("\n<h3>This is the error page.</h3>\n");
    }

    stack1 = helpers['if'].call(depth0, "message", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    else { data.buffer.push(''); }
    
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
define('winolog/templates/library', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<h3>Pair</h3>");
    
  });

});
define('winolog/templates/login', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = '', stack1;
    data.buffer.push("\n        <p>");
    stack1 = helpers._triageMustache.call(depth0, "message", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("</p>\n    ");
    return buffer;
    }

    data.buffer.push("<div class=\"col-sm-4 col-sm-offset-4\">\n    ");
    stack1 = helpers['if'].call(depth0, "message", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
    if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
    data.buffer.push("\n    <h3>Please Login</h3>\n    \n    <div class=\"form-group\">\n        <label for=\"exampleInputEmail1\">Email address</label>\n        ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'name': ("username"),
      'value': ("username"),
      'class': ("form-control"),
      'id': ("exampleInputEmail1"),
      'placeholder': ("Enter email"),
      'type': ("email")
    },hashTypes:{'name': "STRING",'value': "ID",'class': "STRING",'id': "STRING",'placeholder': "STRING",'type': "STRING"},hashContexts:{'name': depth0,'value': depth0,'class': depth0,'id': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n    </div>\n    <div class=\"form-group\">\n        <label for=\"exampleInputPassword1\">Password</label>\n        ");
    data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
      'name': ("password"),
      'value': ("password"),
      'class': ("form-control"),
      'id': ("exampleInputPassword1"),
      'placeholder': ("Password"),
      'type': ("password")
    },hashTypes:{'name': "STRING",'value': "ID",'class': "STRING",'id': "STRING",'placeholder': "STRING",'type': "STRING"},hashContexts:{'name': depth0,'value': depth0,'class': depth0,'id': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
    data.buffer.push("\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type=\"checkbox\"> Remember me\n        </label>\n    </div>\n    <button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "submit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">Submit</button>\n    <button ");
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
    data.buffer.push(">Cancel</button>\n</div>\n");
    return buffer;
    
  });

});
define('winolog/templates/profile', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
  helpers = this.merge(helpers, Ember['default'].Handlebars.helpers); data = data || {};
    


    data.buffer.push("<h3>About</h3>");
    
  });

});
define('winolog/tests/api.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('api.js should pass jshint', function() { 
    ok(true, 'api.js should pass jshint.'); 
  });

});
define('winolog/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('winolog/tests/controllers/login.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/login.js should pass jshint', function() { 
    ok(true, 'controllers/login.js should pass jshint.'); 
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
define('winolog/tests/initializers/inject-session.jshint', function () {

  'use strict';

  module('JSHint - initializers');
  test('initializers/inject-session.js should pass jshint', function() { 
    ok(true, 'initializers/inject-session.js should pass jshint.'); 
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
define('winolog/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('winolog/tests/routes/cellar.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/cellar.js should pass jshint', function() { 
    ok(true, 'routes/cellar.js should pass jshint.'); 
  });

});
define('winolog/tests/routes/library.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/library.js should pass jshint', function() { 
    ok(true, 'routes/library.js should pass jshint.'); 
  });

});
define('winolog/tests/routes/login.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/login.js should pass jshint', function() { 
    ok(true, 'routes/login.js should pass jshint.'); 
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
  require("winolog/app")["default"].create({"name":"winolog","version":"0.0.0.3b5beb3f"});
}

/* jshint ignore:end */
//# sourceMappingURL=winolog.map