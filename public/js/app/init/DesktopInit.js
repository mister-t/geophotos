require([
  'App',
  'home/HomeApp',
  'sidebar/SidebarApp',
  'searchbar/SearchbarApp',
  'students/StudentsApp',
  'bootstrap',
  'metisMenu',
  'slimscroll',
  'inspinia',
  'pace',
  'toastr'
], function (App, HomeApp, SidebarApp, StudentsApp, SearchbarApp) {
  App.start();
});
