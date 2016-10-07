Package.describe({
  name: "profile-pic-upload",
  summary: "File upload for AutoForm using ostrio:files",
  description: "File upload for AutoForm using ostrio:files",
  version: "1.0.0",
  git: "https://github.com/VeliovGroup/meteor-autoform-file.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.4');

  api.use([
    'check',
    'underscore',
    'reactive-var',
    'templating',
    'aldeed:autoform@5.8.1',
    'ostrio:files@1.7.3'
  ]);

  api.addFiles([
    'lib/client/autoform.js',
    'lib/client/picFileUpload.html',
    'lib/client/picFileUpload.js',
    'lib/client/picFileUpload.css'
  ], 'client');
});
