Package.describe({
    name: 'codechimp:autoform-masked-input',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'A package that brings masked inputs to Autoform.',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/mbabauer/codechimp-autoform-masked-input.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.2');

    api.use('ecmascript');
    api.use('templating');
    api.use('blaze');
    //api.use('mrt:mask@0.0.1');
    api.use('aldeed:autoform@5.0.0');

    api.addFiles([
        'masked-input.html',
        'masked-input.js'
    ], 'client');
});

Package.onTest(function(api) {
    api.use('ecmascript');
    api.use('tinytest');
    api.use('codechimp:autoform-masked-input');
    api.addFiles('masked-input-tests.js');
});
