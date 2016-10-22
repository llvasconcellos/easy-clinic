select 
--	'"' || replace("Paci_me_Foto", 'mime64://9j/', 'data:image/jpeg;base64,/9j/') || '"' as picture,
	"Paci_me_Foto" as picture,
	"Paci_tx_NomePaciente" as name,
	"Paci_tx_Leito" as bed,
	"Paci_tx_Prontuario" as records,
	"Paci_dt_DataCadastramentoPaciente" as createdAt,
	"Paci_dt_DataNascimentoPaciente" as dateOfBirth,
	"Paci_ln_ConvenioPaciente" as healthInsurance,
	"Paci_tx_MatriculaPaciente" as code,
	"Paci_tx_SexoPaciente" as gender,
	"Paci_tx_EstadoCivilPaciente" as maritalStatus,
	"Paci_tx_CorPaciente" as skinColor,
	"Paci_tx_NaturalidadePaciente" as placeOfBirth,
	"Paci_tx_GraudeInstrucaoPaciente" as literacy,
	"Paci_tx_CPFPaciente" as CPF,
	"Paci_tx_DocumentoIdentidadePaciente" as RG,
	"Paci_by_PropCPF" as titularCPF,
	"Paci_tx_ProfissaoPaciente" as occupation,
	"Paci_tx_IndicadoPorPaciente" as recommendedBy,
	"Paci_dt_Retorno" as prevRetorno,
	"Paci_tx_EMail" as email,
	"Paci_tx_TelefonesPaciente" as phone,
	"Paci_tx_CEPPaciente" as zip,
	"Paci_tx_LogradouroPaciente" as streetAddress_1,
	"Paci_tx_ComplementoPaciente" as streetAddress_2,
	"Paci_tx_BairroPaciente" as bairro,
	"Paci_tx_CidadePaciente" as city,
	"Paci_tx_UFPaciente" as state,
	"Paci_me_ObservacoesPaciente" as obs
from pacientes