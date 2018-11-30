var pasqua;
var IVavvento;


var calSettings = {
	'mesi' : {
		'gen' : {
			'numero giorni' : '31',
			'nome' : 'gennaio',
			'santi' : {
				'1' : 'Maria S.ma Madre di Dio',
				'2' : 'S. Basilio',
				'3' : 'S.mo Nome di Gesù',
				'4' : 'S Ermete e Caio, m.',
				'5' : 'S. Sincletica',
				'6' : 'Epifania del Signore',
				'7' : 'S. Raimondo di P.',
				'8' : 'S. Massimo',
				'9' : 'S. Giuliano Martire',
				'10' : 'S. Aldo Eremita',
				'11' : 'S. Igino',
				'12' : 'S. Modesto',
				'13' : 'S. Ilario',
				'14' : 'S. Felice di Nola',
				'15' : 'S. Mauro',
				'16' : 'S. Marcello I ',
				'17' : 'S. Antonio Abate',
				'18' : 'S. Margherita d\'U.',
				'19' : 'S. Mario',
				'20' : 'S. Fabiano',
				'21' : 'S. Agnese',
				'22' : 'S. Vincenzo',
				'23' : 'S. Messalina',
				'24' : 'S. Francesco di S.',
				'25' : 'Conversione di S.Paolo',
				'26' : 'S. Timoteo e Tito',
				'27' : 'S. Angela M.',
				'28' : 'S. Tommaso d\'A. ',
				'29' : 'S. Costanzo',
				'30' : 'S. Martina',
				'31' : 'S. Giovanni Bosco'
			}
		},
		'feb' : {
			'numero giorni' : '29',
			'nome' : 'febbraio',
			'santi' : {
				'1' : 'S. Veridiana',
				'2' : 'Presentazione del Signore',
				'3' : 'S. Biagio',
				'4' : 'S. Nicola S.',
				'5' : 'S. Agata',
				'6' : 'S. Paolo',
				'7' : 'S. Teodoro',
				'8' : 'S. Girolamo E.',
				'9' : 'S. Apollonia',
				'10' : 'S. Scolastica',
				'11' : 'B.V di Lourdes ',
				'12' : 'S. Eulalia',
				'13' : 'S. Fosca',
				'14' : 'S. Valentino',
				'15' : 'S. Faustino',
				'16' : 'S. Elia',
				'17' : 'S. Marianna',
				'18' : 'S. Simone Vescovo',
				'19' : 'S. Mansueto',
				'20' : 'S. Eleuterio',
				'21' : 'S. Pier Damiani',
				'22' : 'S. Margherita ',
				'23' : 'S. Policarpo',
				'24' : 'S. Edilberto',
				'25' : 'S. Adelmo',
				'26' : 'S. Romeo',
				'27' : 'S. Leandro',
				'28' : 'S. Romano',
				'29' : 'S. Giusto' //ogni 4 anni
			}
		},
		'mar' : {
			'numero giorni' : '31',
			'nome' : 'marzo',
			'santi' : {
				'1' : 'S. Albino',
				'2' : 'S. Basileo',
				'3' : 'S. Tiziano',
				'4' : 'S. Casimiro',
				'5' : 'S. Adriano',
				'6' : 'S. Rosa',
				'7' : 'S. Felicita',
				'8' : 'S. Giovanni Di Dio',
				'9' : 'S. Francesca R.',
				'10' : 'S. Simplicio',
				'11' : 'S. Costantino',
				'12' : 'S. Massimiliano',
				'13' : 'S. Cristina',
				'14' : 'S. Matilde',
				'15' : 'S. Luisa',
				'16' : 'S. Eriberto Vescovo',
				'17' : 'S. Patrizio',
				'18' : 'S. Salvatore',
				'19' : 'S. Giuseppe',
				'20' : 'S. Alessandro',
				'21' : 'S. Serapione',
				'22' : 'S. Lea',
				'23' : 'S. Turibio Di M.',
				'24' : 'S. Romolo',
				'25' : 'Annunciazione',
				'26' : 'S. Teodoro',
				'27' : 'S. Augusto',
				'28' : 'S. Sisto',
				'29' : 'S. Secondo Martire',
				'30' : 'S. Amedeo',
				'31' : 'S. Beniamino'
			}
		},
		'apr' : {
			'numero giorni' : '30',
			'nome' : 'aprile',
			'santi' : {
				'1' : 'S. Ugo',
				'2' : 'S. Francesco',
				'3' : 'S. Riccardo',
				'4' : 'S. Isidoro',
				'5' : 'S. Vincenzo Ferrer',
				'6' : 'S. Guglielmo',
				'7' : 'S. Giovanni De La Salle',
				'8' : 'S. Dionigi',
				'9' : 'S. Maria Cleope',
				'10' : 'S. Terenzio',
				'11' : 'S. Stanislao',
				'12' : 'S. Zeno',
				'13' : 'S. Martino Papa',
				'14' : 'S. Abbondio',
				'15' : 'S. Annibale',
				'16' : 'S. M. Bernarda S.',
				'17' : 'S. Aniceto Papa',
				'18' : 'S. Galdino',
				'19' : 'S. Leone IX',
				'20' : 'S. Adalgisa Vergine',
				'21' : 'S. Anselmo',
				'22' : 'S. Caio',
				'23' : 'S. Giorgio',
				'24' : 'S. Fedele',
				'25' : 'S. Marco Evangelista',
				'26' : 'S. Macellino',
				'27' : 'S. Zita',
				'28' : 'S. Pietro Chanel',
				'29' : 'S. Caterina da S.',
				'30' : 'S. Pio V'
			}
		},
		'mag' : {
			'numero giorni' : '31',
			'nome' : 'maggio',
			'santi' : {
				'1' : 'S. Giuseppe',
				'2' : 'S. Atanasio',
				'3' : 'S. Filippo',
				'4' : 'S. Floriano',
				'5' : 'S. Pellegrino',
				'6' : 'S. Giuditta',
				'7' : 'S. Flavia',
				'8' : 'S. Vittore',
				'9' : 'S. Gregorio',
				'10' : 'S. Antonio',
				'11' : 'S. Fabio',
				'12' : 'S. Rossana',
				'13' : 'B. Maria V. di F.',
				'14' : 'S. Mattia',
				'15' : 'S. Torquato',
				'16' : 'S. Ubaldo',
				'17' : 'S. PASQUALE CONF.',
				'18' : 'S. Giovanni I',
				'19' : 'S. Pietro',
				'20' : 'S. Bernardino',
				'21' : 'S. Vittorio',
				'22' : 'S. Rita da C.',
				'23' : 'S. Desiderio',
				'24' : 'B.V. Maria Ausiliatrice',
				'25' : 'M. Maddalena',
				'26' : 'S. Filippo Neri',
				'27' : 'S. Agostino',
				'28' : 'S. Germano',
				'29' : 'S. Massimino',
				'30' : 'S. Ferdinando',
				'31' : 'Visitazione Maria Vergine'
			}
		},
		'giu' : {
			'numero giorni' : '30',
			'nome' : 'giugno',
			'santi' : {
				'1' : 'S. Giustino',
				'2' : 'Festa della Repubblica',
				'3' : 'S. Carlo Lwanga',
				'4' : 'S. Quirino',
				'5' : 'S. Bonifacio',
				'6' : 'S. Norberto',
				'7' : 'S. Roberto',
				'8' : 'S. Medaro Vescovo',
				'9' : 'S. Efrem',
				'10' : 'B. Enrico da B.',
				'11' : 'S. Barnaba',
				'12' : 'S. Guido',
				'13' : 'S. Antonio',
				'14' : 'S. Eliseo',
				'15' : 'S. Amos',
				'16' : 'S. Aureliano',
				'17' : 'S. Raniero',
				'18' : 'S. Maria',
				'19' : 'S. Gervasio',
				'20' : 'S. Silverio',
				'21' : 'S. Luigi Gonzaga',
				'22' : 'S. Paolino',
				'23' : 'S. Lanfranco',
				'24' : 'Natività di S. Giovanni',
				'25' : 'S. Guglielmo',
				'26' : 'S. Virgilio',
				'27' : 'S. Cirillo d\'A.',
				'28' : 'S. Ireneo',
				'29' : 'SS. Pietro e Paolo',
				'30' : 'SS. Primi Martiri'
			}
		},
		'lug' : {
			'numero giorni' : '31',
			'nome' : 'luglio',
			'santi' : {
				'1' : 'Sacro Cuore',
				'2' : 'Cuore Imm. di Maria, S. Ottone',
				'3' : 'S. Tommaso',
				'4' : 'S. Elisabetta',
				'5' : 'S. Antonio M. Z.',
				'6' : 'S. Maria Goretti',
				'7' : 'S. Panteno',
				'8' : 'S. Adriano III',
				'9' : 'S. Letizia',
				'10' : 'S. Felicita',
				'11' : 'S. Benedetto',
				'12' : 'S. FOrtunato',
				'13' : 'S. Enrico',
				'14' : 'S. Camillo De L. ',
				'15' : 'S. Bonaventura',
				'16' : 'B. Maria V. Monte C.',
				'17' : 'S. Alessio',
				'18' : 'S. Calogero',
				'19' : 'S. Pietro Summaco',
				'20' : 'S. Elia',
				'21' : 'S. Lorenzo da B.',
				'22' : 'S. M. Maddalena',
				'23' : 'S. Brigida di S.',
				'24' : 'S. Cristina',
				'25' : 'S. Giacomo il Mag.',
				'26' : 'S. Gioacchino e S. Anna',
				'27' : 'S. Aurelio',
				'28' : 'S. Nazario',
				'29' : 'S. Marta',
				'30' : 'S. Pietro C.',
				'31' : 'S. Ignazio di L.'
			}
		},
		'ago' : {
			'numero giorni' : '31',
			'nome' : 'agosto',
			'santi' : {
				'1' : 'S. Alfonso Dè L.',
				'2' : 'S. Pietro G. E.',
				'3' : 'S. Lidia',
				'4' : 'S. Giovanni M. Vianney',
				'5' : 'S. Emidio',
				'6' : 'Trasfigurazione Signore',
				'7' : 'S. Gaetano',
				'8' : 'S. Domenico',
				'9' : 'S. Fermo',
				'10' : 'S. Lorenzo',
				'11' : 'S. Chiara d\'A.',
				'12' : 'S. Giovanna F.',
				'13' : 'S. Ponziano',
				'14' : 'S. Alberto',
				'15' : 'Assunzione B.V.M.',
				'16' : 'S. Rocco',
				'17' : 'S. Giacinto',
				'18' : 'S. Elena',
				'19' : 'S. Mariano',
				'20' : 'S. Bernardo di C.',
				'21' : 'S. Pio X',
				'22' : 'B. Maria V. Regina',
				'23' : 'S. Rosa da Lima',
				'24' : 'S. Bartolomeo',
				'25' : 'S. Ludovico',
				'26' : 'S. Alessandro',
				'27' : 'S. Monica',
				'28' : 'S. Agostino',
				'29' : 'S. Adelfo',
				'30' : 'S. Faustina',
				'31' : 'S. Aristide'
			}
		},
		'set' : {
			'numero giorni' : '30',
			'nome' : 'settembre',
			'santi' : {
				'1' : 'S. Egidio',
				'2' : 'S. Elpidio',
				'3' : 'S. Gregorio M.',
				'4' : 'S. Rosalia di P.',
				'5' : 'S. Quinto',
				'6' : 'S. Umberto',
				'7' : 'S. Regina',
				'8' : 'Natività B.V.M.',
				'9' : 'S. Pietro Claver',
				'10' : 'S. Nicola da T.',
				'11' : 'S. Proto',
				'12' : 'S.mo Nome di M.',
				'13' : 'S. Giovanni C.',
				'14' : 'Esalt. Croce',
				'15' : 'M Addolorata',
				'16' : 'S. Cornelio',
				'17' : 'S. Roberto B.',
				'18' : 'S. Sofia',
				'19' : 'S. Gennaro',
				'20' : 'S. Andrea Kim',
				'21' : 'S. Matteo',
				'22' : 'S. Maurizio',
				'23' : 'S. Pio da P.',
				'24' : 'S. Pacifico',
				'25' : 'S. Cleofa',
				'26' : 'S. Cosma',
				'27' : 'S. Vincenzo Dè P.',
				'28' : 'S. Venceslao',
				'29' : 'SS. Arcangeli',
				'30' : 'S. Girolamo'
			}
		},
		'ott' : {
			'numero giorni' : '31',
			'nome' : 'ottobre',
			'santi' : {
				'1' : 'S. Teresa di G.B.',
				'2' : 'SS. Angeli C.',
				'3' : 'S. Gerardo',
				'4' : 'S. Francesco d\'A.',
				'5' : 'S. Placido',
				'6' : 'S. Bruno',
				'7' : 'B.V.M. del Rosario',
				'8' : 'S. Reparata',
				'9' : 'S. Dionigi',
				'10' : 'S. Daniele',
				'11' : 'S. Firmina',
				'12' : 'S. Serafino',
				'13' : 'S. Edoardo',
				'14' : 'S. Callisto I',
				'15' : 'S. Teresa di A.',
				'16' : 'S. Edvige',
				'17' : 'S. Ignazio di A.',
				'18' : 'S. Luca',
				'19' : 'S. Paolo della C.',
				'20' : 'S. Irene',
				'21' : 'S. Orsola',
				'22' : 'S. Giovanni Paolo II',
				'23' : 'S. Giovanni da C.',
				'24' : 'S. Antonio Claret',
				'25' : 'S. Gaudenzio',
				'26' : 'S. Evaristo',
				'27' : 'S. Fiorenzo',
				'28' : 'SS. Simone e Giuda',
				'29' : 'S. Narciso',
				'30' : 'S. Germano',
				'31' : 'S. Lucilla'
			}
		},
		'nov' : {
			'numero giorni' : '30',
			'nome' : 'novembre',
			'santi' : {
				'1' : 'Tutti i Santi',
				'2' : 'Commem. dei Defunti',
				'3' : 'S. Silvia',
				'4' : 'S. Carlo B.',
				'5' : 'S. Donnino',
				'6' : 'S. Leonardo',
				'7' : 'S. Ernesto',
				'8' : 'S. Goffredo',
				'9' : 'S. Oreste',
				'10' : 'S. Leone I Magno',
				'11' : 'S. Martino di Tours',
				'12' : 'S. Renato',
				'13' : 'S. Diego',
				'14' : 'S. Giocondo',
				'15' : 'S. Alberto Magno',
				'16' : 'S. Agnese d\'A.',
				'17' : 'S. Elisabetta d\'U.',
				'18' : 'B. Oddone',
				'19' : 'S. Fausto',
				'20' : 'Cristo Re',
				'21' : 'Present. B.V. Maria',
				'22' : 'S. Cecilia',
				'23' : 'S. Clemente I',
				'24' : 'S. Andrea D. Lac',
				'25' : 'S. Caterina',
				'26' : 'S. Corrado Vescovo',
				'27' : 'S. Virgilio',
				'28' : 'S. Giacomo M.',
				'29' : 'S. Saturnino Martire',
				'30' : 'S. Andrea Ap'
			}
		},
		'dic' : {
			'numero giorni' : '31',
			'nome' : 'dicembre',
			'santi' : {
				'1' : 'S. Eligio',
				'2' : 'S. Bibiana',
				'3' : 'S. Francesco Saverio',
				'4' : 'S. Barbara',
				'5' : 'S. Giulio',
				'6' : 'S. Nicola Vescovo',
				'7' : 'S. Ambrogio Vescovo',
				'8' : 'Immacolata Concezione',
				'9' : 'S. Siro',
				'10' : 'B. V. di Loreto',
				'11' : 'S. Damaso Papa',
				'12' : 'B. Maria V. di G.',
				'13' : 'S. Lucia V.',
				'14' : 'S. Giovanni D. Cr.',
				'15' : 'S. Valeriano',
				'16' : 'S. Adelaide',
				'17' : 'S. Lazzaro',
				'18' : 'S. Graziano',
				'19' : 'S. Anastasio I',
				'20' : 'S. Liberato Martire',
				'21' : 'S. Pietro Canisio',
				'22' : 'S. Francesca S. C. ',
				'23' : 'S. Vittoria',
				'24' : 'S. Adele',
				'25' : 'Natività del Signore',
				'26' : 'S. Stefano',
				'27' : 'S. Giovanni',
				'28' : 'SS. Innocenti di B.',
				'29' : 'S. Tommaso',
				'30' : 'Santa Famiglia', // la santa famiglia è il 30 dicembre oppure la domenica tra natale e capodanno
				'31' : 'S. Silvestro'
			}
		}
	}, // fine giorni base
	
	//le festività del calendario italiano
	'festivi' : {
		'gen' : {
			'1' : 'Maria S.ma Madre di Dio',
			'6' : 'Epifania del Signore'
		},
        feb:{
            
        },
        mar:{
            
        },
		'apr' : {
			'25' : 'Anniversario Liberazione'
		},
		'mag' : {
			'1' : 'Festa del Lavoro'
		},
		'giu' : {
			'2' : 'Festa della Repubblica'
		},
        'lug':{
            
        },
		'ago' : {
			'15' : 'Assunzione B.V.M.'
		},
        'set' : {
            
        },
        ott : {
            
        },
		'nov' : {
			'1' : 'Tutti i Santi'
		},
		'dic' : {
			'8' : 'Immacolata Concezione',
			'25' : 'Natività del Signore',
			'26' : 'S. Stefano'
		}
	},
	
	
	//i giorni mobili sono giorni che cambiano ogni anno
	'giorni mobili' : {
		
		//calcolati partendo dalla pasqua
		'marGrasso' : {
			'nome' : 'Martedì Grasso',
			'giorno' : -47,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'ceneri' : {
			'nome' : 'Le Ceneri',
			'giorno' : -46,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'Iquaresima' : {
			'nome' : 'I di Quaresima',
			'giorno' : -42,
			'festivo' : true,
            'start' : 'pasqua'
		},
		
		'IIquaresima' : {
			'nome' : 'II di Quaresima',
			'giorno' : -35,
			'festivo' : true,
            'start' : 'pasqua'
		},
		
		'IIIquaresima' : {
			'nome' : 'III di Quaresima',
			'giorno' : -28,
			'festivo' : true,
            'start' : 'pasqua'
		},
		
		'IVquaresima' : {
			'nome' : 'IV di Quaresima',
			'giorno' : -21,
			'festivo' : true,
            'start' : 'pasqua'
		},
		
		'Vquaresima' : {
			'nome' : 'V di Quaresima',
			'giorno' : -14,
			'festivo' : true,
            'start' : 'pasqua'
		},
		
		'palme' : {
			'nome' : 'Le Palme',
			'giorno' : -7,
			'festivo' : true,
            'start' : 'pasqua'
		},
		
		'giovediSanto' : {
			'nome' : 'Giovedì Santo',
			'giorno' : -3,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'venerdiSanto' : {
			'nome' : 'Venerdì Santo',
			'giorno' : -2,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'sabatoSanto' : {
			'nome' : 'Sabato Santo',
			'giorno' : -1,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'pasqua' : {
			'nome' : 'Pasqua di Resurrezione',
			'giorno' : 0,
			'festivo' : true,
            'start' : 'pasqua'
		},
		
		'pasquetta' : {
			'nome' : 'Lunedì dell\'Angelo',
			'giorno' :  +1,
			'festivo' : true,
            'start' : 'pasqua'
		},
		
		'albis' : {
			'nome' : 'D. in Albis',
			'giorno' : +7,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'ascensione' : {
			'nome' : 'Ascensione del Signore',
			'giorno' : +42,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'pentecoste' : {
			'nome' : 'Pentecoste',
			'giorno' : +49,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'trinita' : {
			'nome' : 'SS. Trinità',
			'giorno' : +56,
			'festivo' : false,
            'start' : 'pasqua'
		},
		
		'corDomini' : {
			'nome' : 'Corpus Domini',
			'giorno' : +63,
			'festivo' : false,
            'start' : 'pasqua'
		},
        
        'sacroCuore' : {
            'nome' : 'Sacro cuore di Gesù',
            'giorno' : +68,
            'festivo' : false,
            'start' : 'pasqua'
        },
		
		
		//calcolati partendo dal natale - la IV di avvento è la domenica subito prima di nalate
		'cristoRe' : {
			'nome' : 'Cristo Re',
			'giorno' : -28,
			'festivo' : false,
            'start' : 'IVavvento'
		},
		
		'Iavvento' : {
			'nome' : 'I di Avvento',
			'giorno' : -21,
			'festivo' : true,
            'start' : 'IVavvento'
		},
		
		'IIavvento' : {
			'nome' : 'II di Avvento',
			'giorno' : -14,
			'festivo' : true,
            'start' : 'IVavvento'
		},
		
		'IIIavvento' : {
			'nome' : 'III di Avvento',
			'giorno' : -7,
			'festivo' : true,
            'start' : 'IVavvento'
		},
		
		'IVavvento' : {
			'nome' : 'IV di Avvento',
			'giorno' : 0,
			'festivo' : true,
            'start' : 'IVavvento'
		}
	}, //fine dei giorni mobili
	
	//l'array giorni inizia da domenica perché è stato scelto come anno zero il 2012 che inizia di domenica
	'giorni' : ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'],
	
	'utility' : {
		//l'anno bisestile di parteza da cui viene calcolato tutto
		'zero' : {
			'anno' : 2012,
			'mese' : 0, //gennaio - si parte da 0 a contare
			'giorno' : 6, //la domenica - si parte da 0 a contare
			'numero' : 1
		} 
	}
};

