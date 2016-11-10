Template.reportEncounters.events({});

Template.reportEncounters.helpers({
	reactiveDataFunction: function () {
		return function () {
			return Encounters.find().fetch();
		};
	},
	optionsObject: {
		columns: [{
			title: T9n.get('groupMD'),
			data: 'user.name'
		},{
			title: T9n.get('patient'),
			data: 'patient.name'
		},{
			title: T9n.get('start'),
			data: 'start',
			render: function(cellData, renderType, currentRow) {
				return moment(cellData).format('DD/MM/YYYY HH:mm');
			}
		},{
			title: T9n.get('end'),
			data: 'end',
			render: function(cellData, renderType, currentRow) {
				return moment(cellData).format('DD/MM/YYYY HH:mm');
			}
		}]
	}
});

Template.reportEncounters.onCreated(function () {});

Template.reportEncounters.onRendered(function () {
	//$(document).ready(function(){});
});

Template.reportEncounters.onDestroyed(function () {});
