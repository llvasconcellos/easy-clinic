Patients = new Mongo.Collection('patients');

var schema = {
  picture: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'profilePicUpload',
        collection: 'Images'
      }
    }
  },
  name: {
    type: String,
    trim: true,
    max: 100,
    label: function() {
      return TAPi18n.__('schemas.patients.name.label');
    }
  },
  bed: {
    type: String,
    trim: true,
    optional: true,
    max: 30,
    label: function() {
      return TAPi18n.__('schemas.patients.bed.label');
    }
  },
  records: {
    type: String,
    trim: true,
    optional: true,
    max: 30,
    label: function() {
      return TAPi18n.__('schemas.patients.records.label');
    }
  },
  createdAt: {
    type: Date,
    //min: new Date(),
    label: function() {
      return TAPi18n.__('schemas.patients.createdAt.label');
    },
    autoform: {
      type: 'masked-input',
      mask: '00/00/0000',
      placeholder: '__/__/____'
    }
  },
  dateOfBirth: {
    type: Date,
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.dateOfBirth.label');
    },
    autoform: {
      type: 'masked-input',
      mask: '00/00/0000',
      placeholder: '__/__/____'
    }
  },
  healthInsurance: {
    type: String,
    trim: true,
    optional: true,
    max: 100,
    label: function() {
      return TAPi18n.__('schemas.patients.healthInsurance.label');
    }
  },
  code: {
    type: String,
    trim: true,
    optional: true,
    max: 50,
    label: function() {
      return TAPi18n.__('schemas.patients.code.label');
    }
  },
  gender: {
    type: String,
    allowedValues: ['M', 'F'],
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.gender.label');
    },
    autoform: {
      firstOption: function() {
        return TAPi18n.__('common_firstOption');
      },
      options: [{
        value: 'M',
        label: function() {
          return TAPi18n.__('schemas.patients.gender.M');
        }
      },{
        value: 'F',
        label: function() {
          return TAPi18n.__('schemas.patients.gender.F');
        }
      }]
    }
  },
  maritalStatus: {
    type: String,
    optional: true,
    allowedValues: ['single', 'married','life_partner', 'separated', 'divorced', 'widowed'],
    label: function() {
      return TAPi18n.__('schemas.patients.maritalStatus.label');
    },
    autoform: {
      firstOption: function() {
        return TAPi18n.__('common_firstOption');
      },
      options: [{
        value: 'single',
        label: function() {
          return TAPi18n.__('schemas.patients.maritalStatus.single');
        }
      },{
        value: 'married',
        label: function() {
          return TAPi18n.__('schemas.patients.maritalStatus.married');
        }
      },{
        value: 'life_partner',
        label: function() {
          return TAPi18n.__('schemas.patients.maritalStatus.life_partner');
        }
      },{
        value: 'separated',
        label: function() {
          return TAPi18n.__('schemas.patients.maritalStatus.separated');
        }
      },{
        value: 'divorced',
        label: function() {
          return TAPi18n.__('schemas.patients.maritalStatus.divorced');
        }
      },{
        value: 'widowed',
        label: function() {
          return TAPi18n.__('schemas.patients.maritalStatus.widowed');
        }
      }]
    }
  },
  skinColor: {
    type: String,
    optional: true,
    allowedValues: ['white', 'brown', 'black', 'mixed', 'other'],
    label: function() {
      return TAPi18n.__('schemas.patients.skinColor.label');
    },
    autoform: {
      firstOption: function() {
        return TAPi18n.__('common_firstOption');
      },
      options: [{
        value: 'white',
        label: function() {
          return TAPi18n.__('schemas.patients.skinColor.white');
        }
      },{
        value: 'brown',
        label: function() {
          return TAPi18n.__('schemas.patients.skinColor.brown');
        }
      },{
        value: 'black',
        label: function() {
          return TAPi18n.__('schemas.patients.skinColor.black');
        }
      },{
        value: 'mixed',
        label: function() {
          return TAPi18n.__('schemas.patients.skinColor.mixed');
        }
      },{
        value: 'other',
        label: function() {
          return TAPi18n.__('schemas.patients.skinColor.other');
        }
      }]
    }
  },
  placeOfBirth: {
    type: String,
    trim: true,
    optional: true,
    max: 100,
    label: function() {
      return TAPi18n.__('schemas.patients.placeOfBirth.label');
    }
  },
  literacy: {
    type: String,
    optional: true,
    allowedValues: ['illiterate', 'primary_school', 'high_school','graduated', 'master', 'doctor', 'phd'],
    label: function() {
      return TAPi18n.__('schemas.patients.literacy.label');
    },
    autoform: {
      firstOption: function() {
        return TAPi18n.__('common_firstOption');
      },
      options: [{
        value: 'illiterate',
        label: function() {
          return TAPi18n.__('schemas.patients.literacy.illiterate');
        }
      },{
        value: 'primary_school',
        label: function() {
          return TAPi18n.__('schemas.patients.literacy.primary_school');
        }
      },{
        value: 'high_school',
        label: function() {
          return TAPi18n.__('schemas.patients.literacy.high_school');
        }
      },{
        value: 'graduated',
        label: function() {
          return TAPi18n.__('schemas.patients.literacy.graduated');
        }
      },{
        value: 'master',
        label: function() {
          return TAPi18n.__('schemas.patients.literacy.master');
        }
      },{
        value: 'doctor',
        label: function() {
          return TAPi18n.__('schemas.patients.literacy.doctor');
        }
      },{
        value: 'phd',
        label: function() {
          return TAPi18n.__('schemas.patients.literacy.phd');
        }
      }]
    }
  },
  CPF: { // #TODO: international documents
    type: String,
    trim: true,
    optional: true,
    max: 11,
    label: function() {
      return TAPi18n.__('schemas.patients.CPF.label');
    }
  },
  RG: { // #TODO: international documents
    type: String,
    trim: true,
    optional: true,
    max: 12,
    label: function() {
      return TAPi18n.__('schemas.patients.RG.label');
    }
  },
  titularCPF: {
    type: String,
    trim: true,
    optional: true,
    max: 11,
    label: function() {
      return TAPi18n.__('schemas.patients.titularCPF.label');
    }
  },
  fathersName: {
    type: String,
    trim: true,
    max: 100,
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.fathersName.label');
    }
  },
  mothersName: {
    type: String,
    trim: true,
    max: 100,
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.mothersName.label');
    }
  },
  occupation: {
    type: String,
    trim: true,
    optional: true,
    max: 100,
    label: function() {
      return TAPi18n.__('schemas.patients.occupation.label');
    }
  },
  prevRetorno: {
    type: String,
    trim: true,
    optional: true,
    max: 50,
    label: function() {
      return TAPi18n.__('schemas.patients.prevRetorno.label');
    }
  },
  email: {
    type: String,
    trim: true,
    optional: true,
    max: 255,
    label: function() {
      return TAPi18n.__('schemas.patients.email.label');
    }
  },
  phone: {
    type: String,
    trim: true,
    optional: true,
    max: 30,
    label: function() {
      return TAPi18n.__('schemas.patients.phone.label');
    }
  },
  mobile: {
    type: String,
    trim: true,
    optional: true,
    max: 30,
    label: function() {
      return TAPi18n.__('schemas.patients.mobile.label');
    }
  },
  // #TODO: address fields per country ISSUEID #43
  streetAddress_1: {
    type: String,
    trim: true,
    optional: true,
    max: 255,
    label: function() {
      return TAPi18n.__('schemas.patients.streetAddress_1.label');
    }
  },
  streetAddress_2: {
    type: String,
    trim: true,
    optional: true,
    max: 255,
    label: function() {
      return TAPi18n.__('schemas.patients.streetAddress_2.label');
    }
  },
  bairro: {
    type: String,
    trim: true,
    optional: true,
    max: 255,
    label: function() {
      return TAPi18n.__('schemas.patients.bairro.label');
    }
  },
  city: {
    type: String,
    trim: true,
    optional: true,
    max: 255,
    label: function() {
      return TAPi18n.__('schemas.patients.city.label');
    }
  },
  state: {
    type: String,
    trim: true,
    optional: true,
    max: 2,
    label: function() {
      return TAPi18n.__('schemas.patients.state.label');
    }
  },
  zip: {
    type: String,
    trim: true,
    optional: true,
    max: 20,
    label: function() {
      return TAPi18n.__('schemas.patients.zip.label');
    }
  },
  obs: {
    type: String,
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.obs.label');
    },
    autoform: {
      type: 'textarea',
      rows: 10
    }
  },
  enabled: {
    type: Boolean,
    defaultValue: true,
    label: function() {
      return TAPi18n.__('schemas.patients.enabled.label');
    }
  }
};

Patients.attachSchema(new SimpleSchema(schema));

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
