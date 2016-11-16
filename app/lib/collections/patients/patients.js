Patients = new Mongo.Collection('patients');

Patients.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Patients.attachSchema(new SimpleSchema(patientSchema));

Patients.addPicture = function(picture, patientId) {
  Images.write(new Buffer(picture, 'base64'), {
    fileName: 'cam.jpg',
    type: 'image/jpg'
  }, function(error, fileRef){
    if(fileRef) {
      Patients.update(patientId, {$set:{
        picture: fileRef._id
      }});
    }
  });
};

if (Meteor.isServer) {
  Patients.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });

  // Patients.deny({
  //   insert: function (userId, doc) {
  //     return true;
  //   },

  //   update: function (userId, doc, fieldNames, modifier) {
  //     return true;
  //   },

  //   remove: function (userId, doc) {
  //     return true;
  //   }
  // });
}
