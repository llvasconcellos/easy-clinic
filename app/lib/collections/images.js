Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client,
  storagePath: process.env.PWD + '/pictures', // #TODO: make this a config setting
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return TAPi18n.__('common_imageUploadMaxSize');
    }
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.collection.find({});
  });
}

if (Meteor.isServer) {
  //var Images = new FilesCollection({/* ... */});
  Images.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });

  /* Equal shortcut: */
  Images.denyClient();
}