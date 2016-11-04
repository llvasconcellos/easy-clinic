import './specialties.js';

// https://github.com/aldeed/meteor-collection2#attach-a-schema-to-meteorusers

var Schema = {};

// #TODO: add all this fields
// Schema.UserCountry = new SimpleSchema({
//     name: {
//         type: String
//     },
//     code: {
//         type: String,
//         regEx: /^[A-Z]{2}$/
//     }
// });

Schema.workHours = new SimpleSchema({
    start: {
        type: String
    },
    end: {
        type: String
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    group: {
        type: String
    },
    language: {
        type: String
    },
    CRM: {
        type: String,
        optional: true
    }
    // birthday: {
    //     type: Date,
    //     optional: true
    // },
    // gender: {
    //     type: String,
    //     allowedValues: ['Male', 'Female'],
    //     optional: true
    // },
    // organization : {
    //     type: String,
    //     optional: true
    // },
    // website: {
    //     type: String,
    //     regEx: SimpleSchema.RegEx.Url,
    //     optional: true
    // },
    // bio: {
    //     type: String,
    //     optional: true
    // },
    // country: {
    //     type: Schema.UserCountry,
    //     optional: true
    // }
});

Schema.User = new SimpleSchema({
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    emails: {
        type: Array
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    // // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    // registered_emails: {
    //     type: Array,
    //     optional: true
    // },
    // 'registered_emails.$': {
    //     type: Object,
    //     blackbox: true
    // },
    createdAt: {
        type: Date
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    // roles: {
    //     type: Object,
    //     optional: true,
    //     blackbox: true
    // },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
    roles: {
        type: Array,
        optional: true
    },
    'roles.$': {
        type: String
    },
    isUserEnabled: {
        type: Boolean,
        optional: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    },
    specialties: {
        type: Array,
        optional: true
    },
    'specialties.$': {
        type: Specialties,
        autoform: {
            type: "typeahead",
            options: function () {
                var specialties = Specialties.find().fetch().map(function(specialty){ 
                    return {
                        value: specialty.name, 
                        label: specialty.name
                    }; 
                });
                return specialties;
            }
        }
    },
    color: {
        type: String,
        optional: true
    },
    workHours: {
        type: [[Schema.workHours]],
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schema.User);