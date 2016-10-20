Template.icd10List.events({});

Template.icd10List.helpers({
	reactiveDataFunction: function () {
		return function () {
			return ICD10.find().fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: T9n.get('name'),
			data: 'icd'
		}]
	}
});

Template.icd10List.onCreated(function () {});

Template.icd10List.onRendered(function () {});

Template.icd10List.onDestroyed(function () {});
