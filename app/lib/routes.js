/*Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});


Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  where: 'client'
});*/


FlowRouter.route('/', {
    action: function() {
        FlowRouter.go('/home');
    }
});

FlowRouter.route('/home', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "home"});
    }
});

FlowRouter.route('/pagina2', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "pagina2"});
    }
});
