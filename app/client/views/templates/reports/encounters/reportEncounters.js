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
				if(cellData){
					return moment(cellData).format('DD/MM/YYYY HH:mm');
				}
			}
		},{
			title: T9n.get('time'),
			data: 'end',
			render: function(cellData, renderType, currentRow) {
				if(cellData){
					return moment.duration(moment(cellData).diff(currentRow.start)).humanize();
					//return .humanize();
				}
			}
		}]
	}
});

Template.reportEncounters.onCreated(function () {});

Template.reportEncounters.onRendered(function () {
	//$(document).ready(function(){});
});

Template.reportEncounters.onDestroyed(function () {});
