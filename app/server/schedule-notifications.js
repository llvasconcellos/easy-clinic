// #TODO: Fix moment package to do not need this
import moment from '/imports/moment-with-locales.min.js'; 

function escapeUnicode(str) {
    return str.replace(/[^\0-~]/g, function(ch) {
        return "\\u" + ("000" + ch.charCodeAt().toString(16)).slice(-4);
    });
}

var sendEmail = function (patient, event) {
	T9n.setLanguage('pt-BR');
	moment.locale('pt-BR');
	var success = true;
	try {
		Email.send({
			from: Accounts.emailTemplates.from,
			to: patient.email,
			subject: T9n.get('appointmentEmailNotificationSubject'),
			text: `Email automático. Não responda - Por favor, caso seja necessário entrar em contato com seu médico, use o telefone.

CONFIRMAÇÃO DE CONSULTA
________________________________________________________

Prezado(a) Paciente,
 
está confirmado seu horário para ${moment(event.start).format('LLLL')}.
 
Qualquer dúvida, estou à sua disposição.
 
Atenciosamente,

${Accounts.emailTemplates.siteName}
		`
		});
	} catch(e) {
		console.error(e.message);
		success = false;
	} finally {
		return success;
	}
};

var sendSMS = function(patient, event){
	var userName = '***REMOVED***';
	var AuthenticationToken = '***REMOVED***';
	var url = 'https://api-messaging.movile.com/v1/send-sms';
	
	// #TODO: make this replace all that isn't numbers
	var mobile = patient.mobile.replace('(','').replace(')', '').replace('-', '').replace('+', '').replace(' ', '');
	if(mobile.length <= 9){
		mobile = '48' + mobile;
	}
	mobile = '55' + mobile;

	HTTP.call('POST', url, {
		headers: {
			'Content-Type': 'application/json',
			userName: userName,
			AuthenticationToken: AuthenticationToken
		},
		data: {
			//#TODO: make this international
			destination: mobile,
			messageText: `Mensagem automatica: Consulta na Clinica Facil Dr. Rocha no dia: ${moment(event.start).format('LLLL')}\nPara confirmar ligue para: (48) 3307-7707.`.replace('à', 'a')
		}
	}, function(error, result){
		if(error){
			console.error(error.message);
		}
		if(result){
			//console.log('sucessoooooooooooooooooo');
		}
	});
};

SyncedCron.add({
	name: 'schedule-notifications',
	schedule: function(parser) {
		return parser.text('every 30 minutes');
	},
	job: function(date) {
		/* #TODO: accept more then one time to notify
		var notifyInMinutes = [120,1440,2880];

		var settings = Settings.findOne({});
		if(settings && settings.notifications){
			notifyInMinutes = settings.notifications.split(',');
		}

		date = moment(date).add(6, 'hours').toDate();

		console.log(date);
		console.log('===================================');

		var dateFilter = [];
		notifyInMinutes.forEach(function(item, index, array){
			var startPlusMinutes = moment(date).add(item, 'minutes').toDate();
			dateFilter.push({
				$and: [{
					start: {
						$lte: startPlusMinutes
					}
				},{
					$or: [{
						notifiedAt: {
							$lte: startPlusMinutes
						}
					},{
						notifiedAt: null
					}]
				}]
			});
		});

		console.log(dateFilter);
		console.log('===================================');

		var filter = {
			$and: [{
				status: 'scheduled'
			},{
				start: {
					$gt: date
				}
			},{
				$or: dateFilter
			}],
		};*/

		var nowPlusMinutes = moment(date).add(1440, 'minutes').toDate();

		var filter = {
			$and: [{
				status: 'scheduled'
			},{
				notified: null
			},{
				start: {
					$lte: nowPlusMinutes
				}
			},{
				start: {
					$gt: date
				}
			}]
		};

		var events = Schedule.find(filter).fetch();

		events.forEach(function(event, index, array){
			var patient = Patients.findOne({_id: event.patient});
			if(patient.email){
				sendEmail(patient, event);
			}
			if(patient.mobile){
				sendSMS(patient, event);
			}
			Schedule.update(event._id, {
				$set: {
					notified: true
				}
			});
		});
	}
});
