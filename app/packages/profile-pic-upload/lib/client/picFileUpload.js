Template.picFileUpload.onCreated(function () {
  var self = this;

  if (!this.data) {
    this.data = {
      atts: {}
    };
  }

  this.collection      = Meteor.connection._mongo_livedata_collections[this.data.atts.collection];
  this.uploadTemplate  = this.data.atts.uploadTemplate || null;
  this.previewTemplate = this.data.atts.previewTemplate || null;

  if (!this.collection) {
    throw new Meteor.Error(404, '[meteor-autoform-files] No such collection "' + this.data.atts.collection + '"');
  }

  this.collectionName = function () {
    return self.data.atts.collection;
  };

  this.currentUpload  = new ReactiveVar(false);
  this.inputName      = this.data.name;
  this.fileId         = new ReactiveVar(this.data.value || false);
  return;
});

Template.picFileUpload.onRendered(function () {
  $('.patient-pic').parent().parent().css('float', 'left');
});

Template.picFileUpload.helpers({
  previewTemplate: function () {
    return Template.instance().previewTemplate;
  },
  uploadTemplate: function () {
    return Template.instance().uploadTemplate;
  },
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  fileId: function () {
    return Template.instance().fileId.get();
  },
  imgPath: function() {
    var img = global[Template.instance().collectionName()].findOne({
      _id: Template.instance().fileId.get()
    });
    if(img) {
      return img.link();
    }
    else {
      return '/images/default-user-image.png';
    }
  },
  uploadedFile: function () {
    return global[Template.instance().collectionName()].findOne({
      _id: Template.instance().fileId.get()
    });
  }
});

Template.picFileUpload.events({
  'click [data-reset-file]': function (e, template) {
    e.preventDefault();
    template.fileId.set(false);
    return false;
  },
  'click [data-remove-file]': function (e, template) {
    e.preventDefault();
    template.fileId.set(false);
    try {
      this.remove();
    } catch (error) {}
    return false;
  },
  'change [data-files-collection-upload]': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      var upload = global[template.collectionName()].insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        AutoForm.getValidationContext().resetValidation();
        template.currentUpload.set(this);
        return;
      });

      upload.on('error', function (error) {
        AutoForm.getValidationContext().resetValidation();
        AutoForm.getValidationContext().addInvalidKeys([{name: Template.instance().inputName, type: "uploadError", value: error.reason}]);
        $(e.currentTarget).val('');
        return;
      });

      upload.on('end', function (error, fileObj) {
        if (!error) {
          if (template) {
            template.fileId.set(fileObj._id);
          }
        }
        template.currentUpload.set(false);
        return;
      });

      upload.start();
    }
  },
  'click .btn-cam': function(event, template) {
    MeteorCamera.getPicture(/*[options],*/ function(error, data) {
      console.log(error);
      console.log(data);
    });
  }
});