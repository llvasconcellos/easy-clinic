patientSchema = {
  picture: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'profilePicUpload',
        collection: 'Images'
      },
      afFormGroup: {
        'data-id': 'picture-form-group'
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
  // bed: {
  //   type: String,
  //   trim: true,
  //   optional: true,
  //   max: 30,
  //   label: function() {
  //     return TAPi18n.__('schemas.patients.bed.label');
  //   }
  // },
  records: {
    type: String,
    trim: true,
    optional: true,
    max: 30,
    label: function() {
      return TAPi18n.__('schemas.patients.records.label');
    }
  },
  dateOfBirth: {
    type: Date,
    label: function() {
      return TAPi18n.__('schemas.patients.dateOfBirth.label');
    },
    autoform: {
      placeholder: '__/__/____',
      afFieldInput: {
        type: "bootstrap-datepicker",
        // #TODO: make this international
        datePickerOptions: {
          //format: "dd/mm/yyyy",
          language: "pt-BR"
          //language: TAPi18n.getLanguage()
        }
      }
    }
  },
  // healthInsurance: {
  //   type: String,
  //   trim: true,
  //   optional: true,
  //   max: 100,
  //   label: function() {
  //     return TAPi18n.__('schemas.patients.healthInsurance.label');
  //   }
  // },
  // code: {
  //   type: String,
  //   trim: true,
  //   optional: true,
  //   max: 50,
  //   label: function() {
  //     return TAPi18n.__('schemas.patients.code.label');
  //   }
  // },
  gender: {
    type: String,
    allowedValues: ['M', 'F'],
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
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.CPF.label');
    },
    autoform: {
      type: 'masked-input',
      mask: '000.000.000-00',
      maskOptions: {
        reverse: true
      }
    }
  },
  RG: { // #TODO: international documents
    type: String,
    trim: true,
    optional: true,
    max: 20,
    label: function() {
      return TAPi18n.__('schemas.patients.RG.label');
    }
  },
  titularCPF: {
    type: String,
    trim: true,
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.titularCPF.label');
    },
    autoform: {
      type: 'masked-input',
      mask: '000.000.000-00',
      maskOptions: {
        reverse: true
      }
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
  recommendedBy: {
    type: String,
    trim: true,
    optional: true,
    max: 100,
    label: function() {
      return TAPi18n.__('schemas.patients.recommendedBy.label');
    }
  },
  returnDate: {
    type: Date,
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.returnDate.label');
    },
    autoform: {
      placeholder: '__/__/____',
      afFieldInput: {
        type: "bootstrap-datepicker",
        // #TODO: make this international
        datePickerOptions: {
          //format: "dd/mm/yyyy",
          language: "pt-BR"
          //language: TAPi18n.getLanguage()
        }
      }
    }
  },
  email: {
    type: String,
    trim: true,
    optional: true,
    max: 255,
    regEx: SimpleSchema.RegEx.Email,
    label: function() {
      return TAPi18n.__('schemas.patients.email.label');
    },
    autoform: {
      type: 'email',
    }
  },
  phone: {
    type: String,
    optional: true,
    label: function() {
      return TAPi18n.__('schemas.patients.phone.label');
    },
    autoform: {
      type: 'masked-input',
      mask: '(00) 0000-0000',
      placeholder: '(___) ___-____',
      // maskOptions: {
      //   onKeyPress: function(val, e, field, options) {
      //     field.mask(function (val) {
      //       return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
      //     }, options);
      //   }
      // }
    }
  },
  mobile: {
    type: String,
    label: function() {
      return TAPi18n.__('schemas.patients.mobile.label');
    },
    autoform: {
      type: 'masked-input',
      mask: '(00) 0000-0000',
      placeholder: '(___) ___-____',
      // maskOptions: {
      //   onKeyPress: function(val, e, field, options) {
      //     field.mask(function (val) {
      //       return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
      //     }, options);
      //   }
      // }
    }
  },
  // #TODO: address fields per country ISSUEID #43
  zip: {
    type: String,
    trim: true,
    optional: true,
    max: 20,
    label: function() {
      return TAPi18n.__('schemas.patients.zip.label');
    },
    autoform: {
      type: 'masked-input',
      mask: '00000-000'
    }
  },
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
  createdAt: {
    type: Date,
    autoform: {
      afFieldInput: {
        type: "hidden",
      },
      afFormGroup: {
        label: false
      }
    }
  },
  // enabled: {
  //   type: Boolean,
  //   defaultValue: true,
  //   label: function() {
  //     return TAPi18n.__('schemas.patients.enabled.label');
  //   }
  // }
};