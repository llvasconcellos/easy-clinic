Package.describe({
  name: 'fullcalendar:scheduler',
  version: '2.8.0',
  summary: 'Full-sized drag & drop event calendar',
  git: 'https://github.com/rgnevashev/fullcalendar.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use(['fullcalendar:fullcalendar']);
  api.addAssets(["dist/fullcalendar.print.css"], 'client');
  api.addFiles([
    "dist/fullcalendar.css",
    "dist/fullcalendar.js",
    "dist/lang-all.js",
    "dist/gcal.js",
    "head.html"
  ], 'client');
});