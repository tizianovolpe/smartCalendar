var nome = "Smart Calendar";
var versione = "0.9";
var scriptLink = '#';
var settingsFile = 'calendario.js'

var prefs = {
    'startDay' : [1,'gen'] , //il giorno da cui deve iniziar il calcolo del calendario. Default 1 gennaio
    'endDay' : [31,'dic'], // il giorno in cui deve finire il calendario. Default 31 dicembre
	'ordineGenerazione' : ['[numero]','[tab]','[giorno]','[tab]','[santo]','[tab]','[luna]','[fine paragrafo]'],
	'santi' : true,
	'zeroNum1cifra' : true, //inserisce uno zero davanti ai numeri a una cifra
	'nomeMese' : 3, // quanto lungo deve essere il nome del mese, se impostato su 0 non viene tagliato
	'nomeGiorno' : 3,
	'scriviNomeMese' : true,
	'interruzioneCorniceMese' : true,
	'tipoLuna' : 'lune3',
	
    //gli stili da generare paragrafo e carattere	
	//se crea nuovi stili è false gli stili già essitenti
	'stylesPrefs' : {
		'createNewStyles' : true, //se true crea dei nuovi stili di paragrafo e carattere anche se nel documento esistno già
		'prefissoStili' : 'prefisso_', //il prefisso da usare per gli stili di paragrafo (indispensabile se crea nuovi stili è true),
		'fontLune' : 'Moon Phases - smartmix.it',
		'lune1' : ['a','b','c','d'],
		'lune2' : ['A','B','C','D'],
		'lune3' : ['e','f','g','h'],
		
		'styles' : {
			'stileParFestivi' : {
				'active' : true,
				'name' : 'festivi',
			},
			'stileParFeriali' : {
				'active' : true,
				'name' : 'feriali',
			},
			'stileParMesi' : {
				'active' : true,
				'name' : 'mesi',
			},
			'stileCarMesi' : {
				'active' : true,
				'name' : 'mesi',
			},
			'stileCarNumero' : {
				'active' : true,
				'name' : 'numero',
			},
			
			'stileCarGiorno' : {
				'active' : true,
				'name' : 'giorno',
			},
			
			'stileCarSanto' : {
				'active' : true,
				'name' : 'santo',
			},
			
			'stileCarLune' : {
				'active' : true,
				'name' : 'lune',
				'type' : 'lune3',
			},
			
			'stileCarCounter' : {
				'active' : true,
				'name' : 'counter',
			},
			
			'stileCarSettimana' : {
				'active' : true,
				'name' : 'settimana',
			}
		}
	},
	'specialChars' : {
		'fineParagrafo' : '\r',
		'chBeforeMonth': '', //il carattere che compare prima del mese
		'chAfterMonth' : '\r', // il carattere che compare dopo il mese
		'intRigaForzata' : '\n',
		//'intPagina' : SpecialCharacters.pageBreak,
		//'intCornice' : ScpecialCharacters.frameBreak,
		'tabulazione' : '\t'
	}
}


//importo il file di impostazione
try {
	
	var scriptPath = getScriptPath();
    var calendarFile = scriptPath+'/SmartCalendar_utility/'+settingsFile;
	$.evalFile(calendarFile);	
    var calendarFile = true;

}catch(e){
    //impossibile trovare il file oppure c'è un errore javascript
	alert('Errore.\nIl file' + settingsFile + ' deve essere presente all\'interno della cartella SmartCalendar_utility.\n\nDownload the lastest version at '+scriptLink);
	exit();
}




if(calendarFile==true){
    writeCalendar(calGen(2018,prefs),prefs);
}




/*
*******************************************
* la funzione principale: genera il calendario e restituise un oggetto js

***********************************
* struttura dell'oggetto calendario
***********************************

calendario = {

    'anno' : 2018, //l'anno scelto
    'mesi' : {
		'gen': {
			'nome':'gennaio',
			'giorni:{
				1: {
					'numero' : 1,
					'giorno' : 'lunedì',
					'santo' : 'il nome del santo',
					'festivo' : true / false
					'luna' : numero
					'counter' : il numero del giorno nell anno
					'settimana' : se lunedì numero oppure false
				}
			}
		},
        'gli altri mesi'{
            ....
        }
    }
}

*******************************************
*/

function calGen(anno,prefs){
	
	
	//la variabile che conterrà tutto il calendario
	var calendario = {};
    calendario['anno'] = anno;
    calendario['mesi'] = {};
    var mesi = calendario['mesi'];
	
	//cancello da calSettings il 29 febbrario nel caso in cui l'anno non sia bisestile
	var bisestile = bisestileCalc(anno);
	
	
	/*
	****************
	* giorno di partenza
	* 
	* calcolo del giorno di partenza dell'anno partendo da una data conosciuta: domenica 1 gennaio 2012
	* è stato scelto il 2012 perché è un anno bisestile
	* 
	****************
	*/
	
	var day2day0 = 0;
	for (i=calSettings.utility.zero.anno; i<anno; i++){
		var annoBisesto = bisestileCalc(i);
		
		if(annoBisesto==true){
			day2day0 += 366;
		}else{
			day2day0 += 365;
		}
		
	}
	
	//il giorno da cui inizia l'anno
	var day = (day2day0%7);
	
	
	
	/*
	***************
	* generazione del calendario, mancano ancora i giorni mobili		
	***************
	*/
	
	var nMese = 0;
    var counterGiorni = 0;
	var settimana = 1;
    
    //variabili che servono per la pasqua
	var pasqua = false;
	var primavera = false; //questa variabile di attiva dopo il 21 marzo, pasqua è la prima domenica di luna piena dopo il 21 marzo
	var iniziaAdAspettarePasqua = false; //si attiva quando passata la primavera arriva la luna piena
	
    var IVavvento = false;
    var natale = 359;
    if(annoBisesto==true){ natale=360; }
	
	for(mese in calSettings.mesi ){
		
		mesi[mese] = {};
		mesi[mese]['nome'] = cut(calSettings.mesi[mese]['nome'],prefs.nomeMese);
		mesi[mese]['giorni'] = {};
		
		var numero = 1;
		var festivo;
		
        //un santo per ogni giorno, passo tutti i santi e genero il calendario di base
		for(santo in calSettings.mesi[mese]['santi']){
			mesi[mese]['giorni'][numero] = {};
			counterGiorni ++;
			
			
			
			//aggiongo lo zero davanti ai numeri ad una cifra se richiesto
			if(prefs.zeroNum1cifra == false){
				mesi[mese]['giorni'][numero]['numero'] = numero;
			}else{
				if(String(numero).length == 1) {var numm = '0'+String(numero); }else{var numm = String(numero);}
				mesi[mese]['giorni'][numero]['numero'] = numm;
			}
			
			
			mesi[mese]['giorni'][numero]['giorno'] = cut(calSettings.giorni[day],prefs.nomeGiorno);
			mesi[mese]['giorni'][numero]['santo'] = calSettings.mesi[mese]['santi'][santo];
			mesi[mese]['giorni'][numero]['counter'] = counterGiorni;
			
			//festivo o feriale
			if(day==0){
				mesi[mese]['giorni'][numero]['festivo'] = true;
			}else{
				mesi[mese]['giorni'][numero]['festivo'] = false;
			}
			
			//aggiunta lune
			var luna = faseLuna (new Date(parseInt(anno),nMese,numero));
			mesi[mese]['giorni'][numero]['luna']=luna;
			
			
			if(day==1){
				mesi[mese]['giorni'][numero]['settimana'] = settimana;
				settimana++;
			}
            
            if(calSettings.festivi[mese][numero] ){
                mesi[mese]['giorni'][numero]['santo'] = calSettings.festivi[mese][numero];
                mesi[mese]['giorni'][numero]['festivo'] = true;
            }
			
			
			
			//calcolo pasqua
			if(primavera==false & mese == 'mar' & numero == 21) {
                //È il 21 marzo, primavera
				primavera = true;
			}
			
			if(iniziaAdAspettarePasqua==false & primavera==true & luna==3){
                //È la prima luna piena di piemavera
				iniziaAdAspettarePasqua = true;
			}
			
			if(pasqua==false & iniziaAdAspettarePasqua == true){
				if(day==0){
					//la pirma domenica di luna piena dopo il 21 marzo. Pasqua
                    pasqua = counterGiorni;
				}
			}
            
            
            
            
            //calcolo IV di avvento, ultima domenica prima di natale
            if(IVavvento == false & mese=='dic' & counterGiorni>(natale-7) & day == 0) {
                IVavvento = counterGiorni;
            }
			
			
			//imposto a 0 i giorno quando arrivano alla fine della settimana oppure aggiungo di uno
			if(day==calSettings.giorni.length-1) {
				day=0;
			}else{
				day ++;
			}
			
			numero ++;
			
		}
		
		numero = 1;
		nMese ++;
		
	}
    
    
    //aggiunta dei giorni mobili
    for (mese in mesi){
        for(giorno in mesi[mese]['giorni']){
            
            var giornoCorrente = mesi[mese]['giorni'][giorno]['counter'];
            
            for(festaMobile in calSettings['giorni mobili'] ){
                
                //starter descrive il giorno di partenza da cui calcolare la festa mobile
                var starter;
                if(calSettings['giorni mobili'][festaMobile]['start']=='pasqua'){
                    starter = pasqua;
                }else if(calSettings['giorni mobili'][festaMobile]['start']=='IVavvento'){
                    starter = IVavvento;
                }else{
                    alert('attenzione stai tentando di calcolare una festa mobile non prevista');
                }
                
                var giornoMobile = starter + calSettings['giorni mobili'][festaMobile]['giorno'];
                
                if(giornoCorrente == giornoMobile){
                    mesi[mese]['giorni'][giorno]['santo'] = calSettings['giorni mobili'][festaMobile]['nome'];
                    
                    if(calSettings['giorni mobili'][festaMobile]['festivo'] == true){
                        mesi[mese]['giorni'][giorno]['festivo'] = true;
                    }
                }           
            }           
        }
    }
    
    //alert(calendario['mesi']['mar']['giorni'][31]['luna']);
        
    return calendario;
    
} //fine di calGen


/*
****************************
* Funzione che scrive in indesign il calendario generato con formattazione custom

</frBreak>



****************************
*/

function writeCalendar(calendario,prefs){
    
    var myDocument= app.documents.item(0);	
    var myPage = myDocument.pages.item(0);
    var calendarText = '';
    
    //verifico se esiste già un box di testo selezionat
    //se esiste scrivo il calendario dentro alla selezione
    //se non esiste genero una casella di testo nella prima pagina del documento: dimensioni A4 CON CORNICE DI 10 mm
    if(app.selection.length==1){
		var myTextFrame = app.selection[0].insertionPoints[0];
	}else{ 
	    var myTextFrame = myPage.textFrames.add();
		myTextFrame.geometricBounds = [10, 10, 287 , 200];
	}
	
	var ordine = prefs.ordineGenerazione;
	var moons = prefs.stylesPrefs[prefs.tipoLuna];
    var c = 0;
		
	for (mese in calendario['mesi']){
		
		if(prefs.interruzioneCorniceMese == true & c!=0){
			calendarText += '</frBreak>';
		}
		
		if(prefs.scriviNomeMese == true){
			
            calendarText += '<ps month>';
            calendarText += prefs.specialChars.chBeforeMonth;
            calendarText += '<cs month>';
			calendarText += calendario['mesi'][mese]['nome'];
            calendarText += '</cs month>';
            calendarText += '</ps month>';
			calendarText += '\r';
			
		}
		
		
		for(giorno in calendario['mesi'][mese]['giorni']) {
			var thisDay = calendario['mesi'][mese]['giorni'][giorno];
			
            calendarText += '<ps festivo'+thisDay.festivo+'>';
			//passo l'ordine di generazione e creo i blocco giorno
			for(ch in ordine){
				
				if(ordine[ch] == '[giorno]'){
                    calendarText += '<cs giorno>'+thisDay['giorno']+'</cs giorno>';
				}else if(ordine[ch] == '[numero]'){
					calendarText += '<cs numero>'+thisDay['numero']+'</cs numero>';
				}else if(ordine[ch] == '[santo]'){
					calendarText += '<cs santo>'+thisDay['santo']+'</cs santo>';
				}else if(ordine[ch] == '[luna]'){
					
					
					if(thisDay['luna']!=0){
						
						//myTextFrame.parentStory.characters.item(-1).applyCharacterStyle(stileCarLune,true);
						
						if(thisDay['luna'] == 1 ){
                            calendarText += '<cs luna>'+moons[0]+'</cs luna>';
						}else if(thisDay['luna'] == 2 ){
                            calendarText += '<cs luna>'+moons[1]+'</cs luna>';
                        }else if(thisDay['luna'] == 3 ){
							calendarText += '<cs luna>'+moons[2]+'</cs luna>';
						}else if(thisDay['una'] == 4 ){
							calendarText += '<cs luna>'+moons[3]+'</cs luna>';
						}
					}
					
		        	
				}else {
					
				}
				
			}
			
			
			calendarText += '</ps festivo'+thisDay.festivo+'>';
			calendarText += '\r';
            c++;
			
		}
	}
        
    myTextFrame.parentStory.insertionPoints.item(-1).contents = calendarText;
    applyStyles();
    
}



function applyStyles(){
     //importo i font attivi
    var fonts = myDocument.fonts;
	
	/*
	***************************************
	* creazione degli stili di paragrafo e di carattere
	***************************************
	*/
	
	var style2gen;
	
	//stile paragrafo festivi
	style2gen = 'stileParFestivi';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileParFestivi = myDocument.paragraphStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{festiviStyle.appliedFont = app.fonts.item('Arial Black');}catch(errore){}
			}catch(errore){
				var stileParFestivi = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParFestivi = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	
	//stile paragrafo feriali
	style2gen = 'stileParFeriali';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileParFeriali = myDocument.paragraphStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{festiviStyle.appliedFont = app.fonts.item('Arial Black');}catch(errore){}
			}catch(errore){
				var stileParFeriali = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParFeriali = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	
	//stile paragrafo mesi
	style2gen = 'stileParMesi';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileParMesi = myDocument.paragraphStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{festiviStyle.appliedFont = app.fonts.item('Arial Black');}catch(errore){}
			}catch(errore){
				var stileParMesi = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParMesi = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	
	//stile carattere mesi
	style2gen = 'stileCarMesi';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarMesi = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarMesi = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarMesi = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	//stile carattere numero
	style2gen = 'stileCarNumero';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarNumero = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarNumero = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarNumero = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	
	//stile carattere giorno
	style2gen = 'stileCarGiorno';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarGiorno = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarGiorno = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarGiorno = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	
	//stile carattere santo
	style2gen = 'stileCarSanto';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarSanto = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarSanto = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarSanto = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	
	//stile carattere lune
	style2gen = 'stileCarLune';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		var fontLune = prefs.stylesPrefs.fontLune;
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarLune = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{stileCarLune.appliedFont = app.fonts.item(fontLune);}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
			}catch(errore){
				var stileCarLune = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
				try{stileCarLune.appliedFont = fontLune;}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
			}
		}else{
			var stileCarLune = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
			try{stileCarLune.appliedFont = fontLune;}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
		}
    }
	
	
	
	//stile carattere counter
	style2gen = 'stileCarCounter';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarCounter = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarCounter = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarCounter = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
	
	
	
	//stile carattere settimana
	style2gen = 'stileCarSettimana';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarSettimana = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
			}catch(errore){
				var stileCarSettimana = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileCarSettimana = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
    }
}





/*
**************
* utility *****
***************
*/




//calcolo dell'anno bisestile
function bisestileCalc (year) {
	
	var startBisestile = calSettings.utility.zero.anno;
	var bisestile;
	
	if(((year - startBisestile)%4)==0){
		bisestile = true;
	}else{
		bisestile = false;
		delete calSettings['mesi']['feb']['santi']['29'];
		calSettings['mesi']['feb']['numero giorni'] = '28';
	}
	return bisestile;
}



/* 
* FUNZIONE PER IL CALCOLO DELLA FASE LUNARE
* Attenzione! da perfezionare, potrebbe sbagliare di un giorno
* @see http://forum.html.it/forum/showthread/t-905453.html
*/

function faseLuna(DG) { // RITORNA 3 SE C'E' LA LUNA PIENA
	DR = new Date(2000,0,1);	// data di riferimento
	TL = (((DG - DR) / 1000) + 2114500) % 2551443;
	RV = 1
	if (TL < 2508243){RV=0;} //0 // CALANTE DA ULTIMO
	if (TL < 1956782.25){RV=4;} // 4 ULTIMO QUARTO
	if (TL < 1870382.25){RV=0;} //0 // CALANTE DA PIENA
	if (TL < 1318921.5){RV=3;} // 3  PIENA
	if (TL < 1232521.5){RV=0;} //0 // CRESCENTE DA PRIMO
	if (TL < 681060.75){RV=2;} // 2 PRIMO QUARTO
	if (TL < 594660.75){RV=0;} //0 // CRESCENTE DA NUOVA
	if (TL < 43200){RV=1;} // 1 NUOVA
	return RV
}




//funzione che taglia il nome dei giorni e dei mesi
function cut(string,num){
	
	if(num==0){
		return string;
	}else{
		return string.slice(0,(num));
	}
}



//get the current script folder path
function getScriptPath() {
	try { 
    return app.activeScript.parent.fsName; 
  } catch(e) { 
    return File(e.fileName); 
  }
}