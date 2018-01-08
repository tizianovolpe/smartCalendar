/**
 *
 * @name Smart Calendar
 * @desc Indesign script to create a calendar with italian festivity, saint, moons and Catholic mobile days
 * @version 1.0 beta
 *
 * @author Smart Mix smartmix.it
 * @link https://smartmix.it
 * 
 * 
 * @see https://smartmix.it/grafica-design/smart-calendar-indesign/ 
 
 
 */


var nome = "Smart Calendar";
var versione = "1.0 Beta";
var scriptLink = 'https://smartmix.it/grafica-design/smart-calendar-indesign/';
var utilityFolder = 'SmartCalendar_utility';
var settingsFile = 'calendario.js';
var presetsFile = 'presets.txt';
var presetsFilePath = File(getScriptPath()+'/'+utilityFolder+'/'+presetsFile);


var prefs = {
    'startDay' : [1,'gen'] , //il giorno da cui deve iniziar il calcolo del calendario. Default 1 gennaio
    'endDay' : [31,'dic'], // il giorno in cui deve finire il calendario. Default 31 dicembre
	'ordineGenerazione' : ['[numero]','[tab]','[giorno]','[tab]','[santo]','[tab]','[luna]'],
	'optionalValue' : ["[numero]","[giorno]","[santo]","[luna]","[mese]","[anno]","[tab]","[numero giorno]","[numero settimana]","[inter. riga forzata]"],
	'santi' : true,
	'zeroNum1cifra' : true, //inserisce uno zero davanti ai numeri a una cifra
	'nomeMese' : 3, // quanto lungo deve essere il nome del mese, se impostato su 0 non viene tagliato
	'nomeGiorno' : 3,
	'scriviNomeMese' : true,
	'interruzioneCorniceMese' : true,
	'tipoLuna' : 'lune3',
	'interruzione' : 'paragrafo', //oppure [interruzione pagina] [interruzione cornice]
    'startWithMonday' : false,
	
    //gli stili da generare paragrafo e carattere	
	//se crea nuovi stili è false gli stili già essitenti
	'stylesPrefs' : {
		'createNewStyles' : true, //se true crea dei nuovi stili di paragrafo e carattere anche se nel documento esistno già
		'prefissoStili' : '', //il prefisso da usare per gli stili di paragrafo (indispensabile se crea nuovi stili è true),
		'fontLune' : 'Moon Phases - smartmix.it',
		'lune1' : ['a','b','c','d'],
		'lune2' : ['A','B','C','D'],
		'lune3' : ['e','f','g','h'],
		
		'styles' : {
			'stileParFestivi' : {
				'active' : true,
				'name' : 'Festivi',
			},
			'stileParFeriali' : {
				'active' : true,
				'name' : 'Feriali',
			},
			'stileParMesi' : {
				'active' : true,
				'name' : 'Mesi',
			},
			'stileCarMesi' : {
				'active' : true,
				'name' : 'Mesi',
			},
			'stileCarNumero' : {
				'active' : true,
				'name' : 'Numero',
			},
			
			'stileCarGiorno' : {
				'active' : true,
				'name' : 'Giorno',
			},
			
			'stileCarSanto' : {
				'active' : true,
				'name' : 'Santo',
			},
			
			'stileCarLune' : {
				'active' : true,
				'name' : 'Lune',
				'type' : 'lune3',
			},
			
			'stileCarCounter' : {
				'active' : true,
				'name' : 'Numero giorno',
			},
			
			'stileCarSettimana' : {
				'active' : true,
				'name' : 'Numero settimana',
			}
		}
	},
	
	'specialChars' : {
		'fineParagrafo' : '\r',
		'chBeforeMonth': '', //il carattere che compare prima del mese
		'chAfterMonth' : '\r', // il carattere che compare dopo il nome mese
        'chEndMonth' : '\r', //il carattere che compare quando finisce il mese
		'intRigaForzata' : '\n',
		//'intPagina' : SpecialCharacters.pageBreak,
		//'intCornice' : ScpecialCharacters.frameBreak,
		'tabulazione' : '\t'
	}
}


var sep = '|||';
var sepL = '///';

var defaultPreset = ['Default',true,false,true,'completi','completi',1,'vuoto','paragrafo','[numero]' + sepL + '[tab]' + sepL + '[giorno]' + sepL + '[tab]' + sepL + '[santo]' + sepL + '[tab]' + sepL + '[luna]','paragrafo','cornice']

/*
var defaultPreset = ['Default Preset',true,true,true,'completi','completi',1,'vuoto','paragrafo','[numero]' + sepL + '[tab]' + sepL + '[giorno]' + sepL + '[tab]' + sepL + '[santo]' + sepL + '[tab]' + sepL + '[luna]','paragrafo','cornice'];

var smartmixPreset = '\
tornado|||true|||true|||false|||completi|||completi|||1|||[numero]///[tab]///[giorno]///[tab]///[santo]///[tab]///[luna]///[fine paragrafo]///[anno]///[luna]///[giorno]///[mese]\
Ski club Fossò tavolo|||false|||true|||true|||abbreviati|||completi|||1|||[numero]///[inter. riga forzata]///[giorno]///[fine paragrafo]\
Auto Carrozzeria Moderna|||false|||true|||true|||iniziale|||completi|||1|||[giorno]///[tab]///[numero]///[fine paragrafo]\
parrocchia Cazzago|||true|||true|||true|||abbreviati|||abbreviati|||1|||[numero]///[tab]///[luna]///[inter. riga forzata]///[tab]///[giorno]///[tab]///[santo]///[fine paragrafo]\
Calendario coin|||false|||true|||false|||abbreviati|||abbreviati|||1|||[tab]///[numero]///[inter. riga forzata]///[tab]///[tab]///[giorno]///[inter. riga forzata]///[tab]///[tab]///[santo]///[tab]///[luna]///[fine paragrafo]';*/



//importo il file di impostazione
try {
	
	var scriptPath = getScriptPath();
    var calendarFile = scriptPath+'/' + utilityFolder + '/'+settingsFile;
	$.evalFile(calendarFile);	
    var calendarFile = true;

}catch(e){
    //impossibile trovare il file oppure c'è un errore javascript
	alert('Errore.\nIl file' + settingsFile + ' deve essere presente all\'interno della cartella SmartCalendar_utility.\n\nDownload the lastest version at '+scriptLink);
	exit();
}



if(calendarFile==true){
    //writeCalendar(calGen(2018,prefs),prefs);
	mainWindow();
}


function mainWindow(){
	var oggi = new Date();
	var myReturn = false;
	
	var w = new Window('dialog',nome+' '+versione);
    
    
	
	var presetPanel = w.add('panel',[0,0,600,50],'Preset');
		presetPanel.orientation = 'row';
		var newPreset = presetPanel.add('panel',[300,0,600,50]);
			var savePreset = newPreset.add ('button',[7,5,127,32],'Salva predefinito...');
			var nomePreset = newPreset.add ('edittext',[132,5,287,32],'New Preset');
	
			savePreset.onClick = function(){
				var currentSettings = new Array();
				
				currentSettings[0] = nomePreset.text;
				currentSettings[1] = startMese.value;
				currentSettings[2] = startMonday.value;
				currentSettings[3] = nZero.value;
		
				if(mesiCompleti.value==true){ currentSettings[4] = 'completi'; }
				if(mesiAbbreviati.value==true){ currentSettings[4] = 'abbreviati';}		
		
				if(giorniCompleti.value==true){ currentSettings[5] = 'completi'; }
				if(giorniAbbreviati.value==true){ currentSettings[5] = 'abbreviati';}
				if(giorniIniziale.value==true){ currentSettings[5] = 'iniziale';}
		
				if(luna1.value==true){ currentSettings[6] = 1; }
				if(luna2.value==true){ currentSettings[6] = 2;}
				if(luna3.value==true){ currentSettings[6] = 3;}
				
				if(prefisso.text==''){
					currentSettings[7]='vuoto';
				}else{
					currentSettings[7]=prefisso.text;
				}
		
		
				if(finePar.value==true){ currentSettings[8] = 'paragrafo'; }
				if(fineCorn.value==true){ currentSettings[8] = 'cornice';}
				if(finePag.value==true){ currentSettings[8] = 'pagina';}
                
                
				
				var currentGenerationList = String(list.items).split(',');
				currentSettings[9] = currentGenerationList.join(sepL);
                
                if(chAfterMonth.selection.index==0){currentSettings[10]='paragrafo'}
                if(chAfterMonth.selection.index==1){currentSettings[10]='cornice'}
                if(chAfterMonth.selection.index==2){currentSettings[10]='pagina'}
                if(chAfterMonth.selection.index==3){currentSettings[10]='colonna'}
                
                if(chEndMonth.selection.index==0){currentSettings[11]='paragrafo'}
                if(chEndMonth.selection.index==1){currentSettings[11]='cornice'}
                if(chEndMonth.selection.index==2){currentSettings[11]='pagina'}
                if(chEndMonth.selection.index==3){currentSettings[11]='colonna'}
				
				addPreset(currentSettings);
				alert('Il nuovo predefinito è stato salvato.');
				
				presetsList.add('item',nomePreset.text);
				
				
			}
    
    
            function changePreset (preset2use){
				//var preset2use = elaboratePreset(readPresets()[presetsList.selection.index]);
                //alert(preset2use[1]);
				for (k in preset2use){
					if(preset2use[k] == 'true'){
						preset2use[k] = true;
					}else if (preset2use[k] == 'false'){
						preset2use[k]= false;
			 		}
				}
				
				startMese.value = preset2use[1];
				startMonday.value = preset2use[2];
				nZero.value = preset2use[3];
				
				if (preset2use[4]=='completi'){ mesiCompleti.value = true; }else{mesiAbbreviati.value=true;}
				
				if (preset2use[5]=='completi'){
					giorniCompleti.value = true;
				}else if(preset2use[5]=='abbreviati'){
					giorniAbbreviati.value=true;
				}else if(preset2use[5]=='iniziale'){
					giorniIniziale.value=true;
				}
				
				
				if(preset2use[6]=='1'){
					luna1.value=true;
				}else if(preset2use[6]=='2'){
					luna2.value=true;
				}else if(preset2use[6]=='3'){
					luna3.value=true;
				}
				
				if(preset2use[7]=='vuoto' || preset2use[7]==undefined ){
					prefisso.text = '';
				}else{
					prefisso.text = preset2use[7];
				}
				
				
				
				if(preset2use[8]=='paragrafo'){
					finePar.value = true;
				}else if(preset2use[8]=='cornice'){
					fineCorn.value = true;
				}else if(preset2use[8]=='pagina'){
					finePag.value = true;
				}
				
				//elenco di generazione
				var newOrder = preset2use[9].split(sepL);
				var listLenght = list.items.length;
				for (it = 0; it < listLenght; it++){list.remove(list.items[0]);}	
				for(key in newOrder){list.add('item',newOrder[key],list.index);}
                
                
                
                if(preset2use[10]=='paragrafo'){chAfterMonth.selection = 0; }
                if(preset2use[10]=='cornice'){chAfterMonth.selection = 1; }
                if(preset2use[10]=='pagina'){chAfterMonth.selection = 2; }
                if(preset2use[10]=='colonna'){chAfterMonth.selection = 3; }
                
                if(preset2use[11]=='paragrafo'){chEndMonth.selection = 0; }
                if(preset2use[11]=='cornice'){chEndMonth.selection = 1; }
                if(preset2use[11]=='pagina'){chEndMonth.selection = 2; }
                if(preset2use[11]=='colonna'){chEndMonth.selection = 3; }
                
                
			
			}
    
    
			
		presetPanel.add('statictext',[10,10,150,30],'Scegli il predefinito');
			var presetsList = presetPanel.add('dropdownlist',[125,10,270,30],getPresetsName());
            presetsList.onChange = function(){
                changePreset(elaboratePreset(readPresets()[presetsList.selection.index]));
            }
            
        
		
	var riga1 = w.add('group',[0,50,600,300]);
		var scriptInfo = riga1.add('panel',[0,6,295,70]);
			scriptInfo.add('statictext',[10,0,295,25],'Progettato da smartmix.it - versione Beta');
			//scriptInfo.add('statictext',[10,10,295,60],'Ver. beta - segnala errori a info@smartmix.it');
			scriptInfo.add('statictext',[10,25,295,60],'Attenzione: Esegui un attento controllo del calendario generato prima di distribuirlo',{multiline: true});
	
		var baseSettingsPanel = riga1.add('panel',[0,75,295,240],'Informazioni di base');
			baseSettingsPanel.add('statictext',[10,10,50,30],'Anno');
			var anno = baseSettingsPanel.add('edittext',[42,10,110,30],oggi.getFullYear()+1);
	
			var startMese = baseSettingsPanel.add('checkbox',[10,40,295,60],'Scrivi il nome del mese quando inizia');
			startMese.value = true;
	
			//var pgBreakAfterM = baseSettingsPanel.add('checkbox',[10,60,295,80],'Interr. di cornice quando finisce il mese');
			//pgBreakAfterM.value = true;
    
            
            baseSettingsPanel.add('statictext',[10,65,150,85],'Dopo il nome del mese:');
            var chAfterMonth = baseSettingsPanel.add('dropdownlist',[150,65,270,85],['Fine paragrafo','Interr. Cornice','Interr. Pagina','Interr. Colonna']);
            chAfterMonth.selection = 0;
    
            baseSettingsPanel.add('statictext',[10,90,150,110],'Quando il mese finisce:');
            var chEndMonth = baseSettingsPanel.add('dropdownlist',[150,90,270,110],['Fine paragrafo','Interr. Cornice','Interr. Pagina','Interr. Colonna']);
            chEndMonth.selection = 1;
            
			
			var nZero = baseSettingsPanel.add('checkbox',[10,115,295,135],'Zero davanti ai numeri ad una cifra');
			nZero.value = true;
            
            
            var startMonday = baseSettingsPanel.add('checkbox',[10,135,295,155],'Agg. spazi vuoti se il mese non inizia di lunedì');
			startMonday.value = false;
            
            
	
	
		var customSettingsPanel = riga1.add('panel',[305,6,600,240]);
			var cutSettingsPanel = customSettingsPanel.add('group',[5,5,286,170]);
				var cutDayPanel = cutSettingsPanel.add('group',[0,10,281,82.5]);
					var giorniCompleti = cutDayPanel.add('radiobutton',[0,0,281,20],'Giorno completi (es. Lunedì)');
					var giorniAbbreviati = cutDayPanel.add('radiobutton',[0,25,281,45],'Giorni abbreviati (es. Lun)');
					var giorniIniziale = cutDayPanel.add('radiobutton',[0,50,281,70],'Giorni iniziale (es. L)');
					giorniCompleti.value = true;
					
				var cutMonthPanel = cutSettingsPanel.add('group',[0,100,281,165]);
					var mesiCompleti = cutMonthPanel.add('radiobutton',[0,0,281,20],'Mesi completi (es. Gennaio)');
					var mesiAbbreviati = cutMonthPanel.add('radiobutton',[0,25,281,50],'Mesi abbreviati (es. Gen)');
					mesiCompleti.value = true;
				
			var moonSettingsPanel = customSettingsPanel.add('panel',[5,175,286,225],'Scegli lo stile della luna');
				var luna1 = moonSettingsPanel.add('radiobutton',[5,15,90,30],'Luna 1');
				var luna2 = moonSettingsPanel.add('radiobutton',[80,15,185,30],'Luna 2');
				var luna3 = moonSettingsPanel.add('radiobutton',[160,15,280,30],'Luna 3');
				luna1.value = true;
	
	
	
	var riga2 = w.add('group',[0,230,600,500]);
	riga2.orientation = 'row';
	
		var el = riga2.add('edittext',[0,0,110,25]);
		var adEl = riga2.add('button',[120,0,235,25],'Aggiungi >')
		adEl.onClick = function(){
			list.add('item',el.text,list.index);
			el.text ='';
		}
		
		var optionalValue = riga2.add('listbox',[0, 30, 235, 200],prefs.optionalValue);
	
		
		var add2list = riga2.add('button',[240,100,275,130],'>');
		add2list.onClick = function(){
			list.add('item',optionalValue.selection,list.index);
		}
		
		riga2.add('statictext',[285,0,510,20],'Ordine di generazione');
		var list = riga2.add('listbox',[285, 30, 510, 200],prefs.ordineGenerazione);
	
		var su = riga2.add('button',[520,30,600,60],'su');
		var giu = riga2.add('button',[520,60,600,90],'giù');
		var rimuovi = riga2.add('button',[520,168,600,200],'rimuovi');
	
		su.onClick = function(){
			var n = list.selection.index;
			if (n > 0){
				muovi (list.items [n-1], list.items [n]);
				list.selection = n-1;
			}
		}
		
		giu.onClick = function(){
			var n = list.selection.index;
			if (n < list.items.length-1){
				muovi (list.items [n+1], list.items [n]);
				list.selection = n+1;
			}
		}
		
		rimuovi.onClick = function(){
			list.remove (list.selection);
		}
		
		function muovi (x,y){
			var temp = x.text;
			x.text = y.text;
			y.text = temp;
		}
	
	function creaArray(lista){
		var array = new Array();
		for(i=0; i<lista.items.length;i++){
			//alert(toString(lista.items[i].constructor.name));
			array[i]=lista.items[i].text;
		}
		return array;
	}
	
	
		var prefissoPanel = riga2.add('panel',[0,205,235,260],'Il prefisso davanti al nome degli stili');
		var prefisso = prefissoPanel.add('edittext',[10,10,220,35]);
	
	
		var endPanel = riga2.add('panel',[285,205,600,260],'Scegli il carattere di interruzione');
			var finePar = endPanel.add('radiobutton',[5,15,90,30],'Paragrafo');
			var fineCorn = endPanel.add('radiobutton',[100,15,185,30],'Cornice');
			var finePag = endPanel.add('radiobutton',[180,15,280,30],'Pagina');
			finePar.value = true;
			
			fineCorn.onClick = function(){
				alert('Attenzione\nL\'interruzione di cornice potrebbe causare la chiusura inaspettata di Indesign.\nRicorda di salvare il tuo file.');
			}
			
			finePag.onClick = function(){
				alert('Attenzione\nL\'interruzione di pagina potrebbe causare la chiusura inaspettata di Indesign.\nRicorda di salvare il tuo file.');
			}
	
	
	var rigaBottoni = w.add('group');
		var genera = rigaBottoni.add('button',undefined,'genera',{name:'ok'});
		var chiudi = rigaBottoni.add('button',undefined,'chiudi');
	
		chiudi.onClick = function(){w.close();}
		
		genera.onClick = function(){
			w.close();
			myReturn = true;
		}
	
	
        //verifico se è è già stato applicato una label alla prima pagina e se c'è utilizzo le informazioni presenti per le impostazioni di generazione    
        try{
                var myDocument= app.documents.item(0);	
                var myPage = myDocument.pages.item(0);
                if(myPage.label.toString()==''){
                    //
                }else{
                    changePreset(elaboratePreset(myPage.label));
                    alert('Configurazione impostazioni eseguita con successo.\nIn questo documento sono state trovate delle impostazioni di generazione.')
                }
                
            
            }catch(a){
                //alert(e);
            }
			
			
			
			
	w.show();
	
	if(myReturn == true){
		
		prefs.scriviNomeMese = startMese.value;
		//prefs.interruzioneCorniceMese = pgBreakAfterM.value;
		prefs.zeroNum1cifra = nZero.value;
		
		if(mesiCompleti.value==true){ prefs.nomeMese = 0; }
		if(mesiAbbreviati.value==true){ prefs.nomeMese = 3;}		
		
		if(giorniCompleti.value==true){ prefs.nomeGiorno = 0; }
		if(giorniAbbreviati.value==true){ prefs.nomeGiorno = 3;}
		if(giorniIniziale.value==true){ prefs.nomeGiorno = 1;}
		
		if(luna1.value==true){ prefs.tipoLuna = 'lune1'; }
		if(luna2.value==true){ prefs.tipoLuna = 'lune2';}
		if(luna3.value==true){ prefs.tipoLuna = 'lune3';}
		
		prefs.ordineGenerazione = creaArray(list);
		
		if(finePar.value==true){ prefs.interruzione = 'paragrafo'; }
		if(fineCorn.value==true){ prefs.interruzione = 'cornice';}
		if(finePag.value==true){ prefs.interruzione = 'pagina';}
        
        if(chAfterMonth.selection.index==0){prefs.specialChars.chAfterMonth='\r'}
        if(chAfterMonth.selection.index==1){prefs.specialChars.chAfterMonth='</frBreak>'}
        if(chAfterMonth.selection.index==2){prefs.specialChars.chAfterMonth='</pgBreak>'}
        if(chAfterMonth.selection.index==3){prefs.specialChars.chAfterMonth='</clBreak>'}
        
        if(chEndMonth.selection.index==0){prefs.specialChars.chEndMonth='\r'}
        if(chEndMonth.selection.index==1){prefs.specialChars.chEndMonth='</frBreak>'}
        if(chEndMonth.selection.index==2){prefs.specialChars.chEndMonth='</pgBreak>'}
        if(chEndMonth.selection.index==3){prefs.specialChars.chEndMonth='</clBreak>'}
        
        prefs.startWithMonday = startMonday.value;
        
		prefs.stylesPrefs.prefissoStili = prefisso.text;
        
        
        
        //le impostazioni da salvare nel label del text frame del documento
        var currentSettings = new Array();
        currentSettings[0] = 'smartCalendarSettings';
        currentSettings[1] = startMese.value;
        currentSettings[2] = startMonday.value
        currentSettings[3] = nZero.value;

        if(mesiCompleti.value==true){ currentSettings[4] = 'completi'; }
        if(mesiAbbreviati.value==true){ currentSettings[4] = 'abbreviati';}		

        if(giorniCompleti.value==true){ currentSettings[5] = 'completi'; }
        if(giorniAbbreviati.value==true){ currentSettings[5] = 'abbreviati';}
        if(giorniIniziale.value==true){ currentSettings[5] = 'iniziale';}

        if(luna1.value==true){ currentSettings[6] = 1; }
        if(luna2.value==true){ currentSettings[6] = 2;}
        if(luna3.value==true){ currentSettings[6] = 3;}

        if(prefisso.text==''){
            currentSettings[7]='vuoto';
        }else{
            currentSettings[7]=prefisso.text;
        }

        if(finePar.value==true){ currentSettings[8] = 'paragrafo'; }
        if(fineCorn.value==true){ currentSettings[8] = 'cornice';}
        if(finePag.value==true){ currentSettings[8] = 'pagina';}
        
        

        var currentGenerationList = String(list.items).split(',');
        currentSettings[9] = currentGenerationList.join(sepL);
        
        if(chAfterMonth.selection.index==0){currentSettings[10]='paragrafo'}
        if(chAfterMonth.selection.index==1){currentSettings[10]='cornice'}
        if(chAfterMonth.selection.index==2){currentSettings[10]='pagina'}
        if(chAfterMonth.selection.index==3){currentSettings[10]='colonna'}
        
        if(chEndMonth.selection.index==0){currentSettings[11]='paragrafo'}
        if(chEndMonth.selection.index==1){currentSettings[11]='cornice'}
        if(chEndMonth.selection.index==2){currentSettings[11]='pagina'}
        if(chEndMonth.selection.index==3){currentSettings[11]='colonna'}
        
        prefs.generationSettings = elaboratePreset(currentSettings);
        
		writeCalendar(calGen(anno.text,prefs),prefs);
	}
	
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
    if(!bisestile){
        
        delete calSettings['mesi']['feb']['santi']['29'];
        calSettings['mesi']['feb']['numero giorni'] = '28';
    }
    
    
	
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
			if(primavera==false & mese == 'mar' & numero == 22) {
                //Il primo giorno di primavera è il 21 marzo
                //È stato impostato il 22 per evitare l'errore della pasqua nel 2019
				primavera = true;
			}
			
			if(iniziaAdAspettarePasqua==false & primavera==true & luna==3){
                //È la prima luna piena di piemavera
                /*
                if(mese=='mar' & numero <27 & calendario.anno!=2019){
                    alert('Attenzione\nIl calcolo della pasqua per l\'anno '+ calendario.anno + ' potrebbe non essere corretto.\nEsegui un attento controllo.');
                }*/
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
    
    var startingPoint = selectCh('<startingPoint>');
    
    if(startingPoint){
        var myTextFrame = startingPoint;
    }else if(app.selection.length==1){
		var myTextFrame = app.selection[0].insertionPoints[0];
        //var frameLabel = app.selection[0].label;
	}else{ 
	    var myTextFrame = myPage.textFrames.add();
		myTextFrame.geometricBounds = [10, 10, 287 , 200];
        //var frameLabel = myTextFrame.label;
	}
	
	var ordine = prefs.ordineGenerazione;
	var moons = prefs.stylesPrefs[prefs.tipoLuna];
    var c = 0;
	var scriviCalendario = true;
		
	for (mese in calendario['mesi']){
		
		if(prefs.scriviNomeMese == true){
			
            calendarText += '<ps month>';
            calendarText += prefs.specialChars.chBeforeMonth;
            //calendarText += '<cs month>';
			calendarText += calendario['mesi'][mese]['nome'];
            //calendarText += '</cs month>';
            calendarText += '</ps month>';
			calendarText += prefs.specialChars.chAfterMonth;
			
		}
        
        var d = 1;
        var dd = 1;
        
        for(giorno in calendario['mesi'][mese]['giorni']){
            dd++;
        }
        
        
        
        /*
        *******************************
        Se la startWithMonday è attivo aggiungo spazi vuoti quanti sono i giorni che servono
        ******************************
        */
        var startWhitMonday = prefs.startWithMonday; 
        var startingDay = unCut(calendario.mesi[mese].giorni[1].giorno,calSettings.giorni);  
        var startingDayIndex = indexOf(startingDay,calSettings.giorni);
        if(startingDayIndex==0){startingDayIndex=7;}
        
        if(startWhitMonday==true){
            if(startingDay!= calSettings.giorni[1]){
                
                for(aa = 1; aa <= startingDayIndex-1; aa++ ){
                    calendarText +='<ps festivofalse>';
                    
                    for(ch in ordine){
            
			//passo l'ordine di generazione e creo i blocco giorno
			
				
				if(ordine[ch] == '[giorno]'){
                    calendarText += '<cs giorno> </cs giorno>';
				}else if(ordine[ch] == '[numero]'){
					calendarText += '<cs numero> </cs numero>';
				}else if(ordine[ch] == '[santo]'){
					calendarText += '<cs santo> </cs santo>';
				}else if(ordine[ch] == '[luna]'){
					calendarText += '<cs luna> </cs luna>';
				}else if(ordine[ch] == '[numero settimana]'){
					calendarText += '<cs settimana> </cs settimana>';
				}else if(ordine[ch] == '[numero giorno]'){
					calendarText += '<cs nGiorno> </cs nGiorno>';
				}else if(ordine[ch]== '[anno]'){
                    calendarText += ' ';
                }else if(ordine[ch]=='[mese]'){
                    calendarText += '<cs month> </cs month>';
                }
				else if(ordine[ch] == '[tab]') {
					calendarText += '\t';
				}else if(ordine[ch] == '[inter. riga forzata]') {
					calendarText += '</breakRow>';
				}else{
					calendarText += ' ';
				}
				
			}
                    
                    
                    
                    calendarText +='</ps festivofalse>';

                    if(prefs.interruzione == 'paragrafo'){
                        calendarText += '\r';
                    }else if (prefs.interruzione == 'cornice'){
                        calendarText += '</frBreak>';
                    }else if (prefs.interruzione == 'pagina'){
                        calendarText += '</pgBreak>';
                    }
                }                
            }
        }
		
		
		for(giorno in calendario['mesi'][mese]['giorni']) {
			var thisDay = calendario['mesi'][mese]['giorni'][giorno];
			calendarText += '<ps festivo'+thisDay.festivo+'>';
			
			for(ch in ordine){
            
			//passo l'ordine di generazione e creo i blocco giorno
			
				
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
					
		        	
				}else if(ordine[ch] == '[numero settimana]'){
					if(thisDay['settimana']){
						calendarText += '<cs settimana>'+thisDay['settimana']+'</cs settimana>';
					}
					
				}else if(ordine[ch] == '[numero giorno]'){
					calendarText += '<cs nGiorno>'+thisDay['counter']+'</cs nGiorno>';
				}else if(ordine[ch]== '[anno]'){
                    calendarText += calendario.anno;
                }else if(ordine[ch]=='[mese]'){
                    calendarText += '<cs month>'+calendario.mesi[mese].nome+'</cs month>';
                }
				
				
				else if(ordine[ch] == '[tab]') {
					calendarText += '\t';
				}else if(ordine[ch] == '[inter. riga forzata]') {
					calendarText += '</breakRow>';
				}else{
					calendarText += ordine[ch];
				}
				
			}
			
			
			calendarText += '</ps festivo'+thisDay.festivo+'>';
			
			//if()
            
            d++;
            
            if(d<dd){
                if(prefs.interruzione == 'paragrafo'){
                    calendarText += '\r';
                }else if (prefs.interruzione == 'cornice'){
                    calendarText += '</frBreak>';
                }else if (prefs.interruzione == 'pagina'){
                    calendarText += '</pgBreak>';
                }
            }
            
			
            
            
			
            c++;
			
		}
        
        if(c!=0 & c<365){
			calendarText += prefs.specialChars.chEndMonth;
		}
        
	}
	
        
    myTextFrame.parentStory.insertionPoints.item(-1).contents = calendarText;    
    //saveSettings.label= prefs.generationSettings;
    myPage.label = prefs.generationSettings;

    /*
	******************************
	* Funzioni grep per applicare gli stili e per aggiungere i caratteri speciali di interruzione
	******************************
	*/
	
    
    
    grepSpecialCh('<startingPoint>','');
    
    var grep0 = grepSpecialCh('</clBreak>','~M');
    
    if(grep0==true){
        var grep1 = grepSpecialCh('</frBreak>', '~R');
    }
    
    if(grep1==true){
        var grep2 = grepSpecialCh('</pgBreak>', '~P');
    }
    
    if(grep2==true){
        var appStyles = applyStyles();
    }
    
    
    
    if(appStyles == true){
        grepSpecialCh('</breakRow>','\n');
    }
	
    //cancello l'ultimo carattere di interruzione   
    //myTextFrame.parentStory.insertionPoints.item(-1).contents = ' ';
    
}



function applyStyles(){
     //importo i font attivi
	var myDocument= app.documents.item(0);
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
				try{
					stileParFestivi.appliedFont = app.fonts.item('Arial');
					stileParFestivi.fontStyle = 'Bold';
				}catch(errore){}
			}catch(errore){
				var stileParFestivi = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParFestivi = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('ps',stileParFestivi,'festivotrue');
		
    }
	
	
	//stile paragrafo feriali
	style2gen = 'stileParFeriali';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileParFeriali = myDocument.paragraphStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name});
				try{
					stileParFeriali.appliedFont = app.fonts.item('Arial');
					stileParFeriali.fontStyle = 'Regular';
				}catch(errore){}
			}catch(errore){
				var stileParFeriali = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParFeriali = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('ps',stileParFeriali,'festivofalse');
		
    }
	
	
	//stile paragrafo mesi
	style2gen = 'stileParMesi';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileParMesi = myDocument.paragraphStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				
				try{
					stileParMesi.appliedFont = app.fonts.item('Arial');
					stileParMesi.fontStyle = 'Bold';
				}catch(errore){}
				
			}catch(errore){
				var stileParMesi = myDocument.paragraphStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
			}
		}else{
			var stileParMesi = myDocument.paragraphStyles.item(prefs.stylesPrefs.styles[style2gen].name);
		}
		
		grepStyle('ps',stileParMesi,'month');
		
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
		
		grepStyle('cs',stileCarMesi,'month');
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
		
		grepStyle('cs',stileCarNumero,'numero');
		
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
		
		grepStyle('cs',stileCarGiorno,'giorno');
		
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
		
		grepStyle('cs',stileCarSanto,'santo');
    }
	
	
	//stile carattere lune
	style2gen = 'stileCarLune';
    if( prefs.stylesPrefs.styles[style2gen].active == true){
		
		var fontLune = prefs.stylesPrefs.fontLune;
		
		if(prefs.stylesPrefs.createNewStyles == true){
			try{
				var stileCarLune = myDocument.characterStyles.add({name: prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name });
				try{
					stileCarLune.appliedFont = app.fonts.item(fontLune);
					stileParFeriali.fontStyle = 'Regular';
				}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
			}catch(errore){
				var stileCarLune = myDocument.characterStyles.item(prefs.stylesPrefs.prefissoStili + prefs.stylesPrefs.styles[style2gen].name);
				try{
					stileCarLune.appliedFont = fontLune;
					stileParFeriali.fontStyle = 'Regular';
				}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
			}
		}else{
			var stileCarLune = myDocument.characterStyles.item(prefs.stylesPrefs.styles[style2gen].name);
			try{
				stileCarLune.appliedFont = fontLune;
				stileParFeriali.fontStyle = 'Regular';
			}catch(errore){alert('devi installare la font '+fontLune+' per vedere correttamente le lune');}
		}
		
		grepStyle('cs',stileCarLune,'luna');
		
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
		
		grepStyle('cs',stileCarCounter,'nGiorno');
		
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
		
		grepStyle('cs',stileCarSettimana,'settimana');
		
    }
	
	return true;
	
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

function unCut(string,array){
    var cutValue = string.length;
    for(a=0; a<array.length; a++){
        var arrayCutted = cut(array[a],cutValue);
        if(arrayCutted==string){
            return array[a];
        }
    }
}


function grepStyle(type,stileName,string2find){
	
	//type ps o cs
	
	myDocument= app.documents.item(0);
	
	app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
	app.findChangeGrepOptions.includeFootnotes = true;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = true;
    app.findChangeGrepOptions.includeMasterPages = true;
	
	if(type=='ps'){
		app.findGrepPreferences.findWhat = '(<ps '+string2find+'>)(.+?)(</ps '+string2find+'>)';
		app.changeGrepPreferences.appliedParagraphStyle = stileName;
	}else if(type=='cs'){
		app.findGrepPreferences.findWhat = '(<cs '+string2find+'>)(.+?)(</cs '+string2find+'>)';
		app.changeGrepPreferences.appliedCharacterStyle = stileName;
	}
	
	app.changeGrepPreferences.changeTo = '$2';
	myDocument.changeGrep();
	
	app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
	
	return true;
	
}

function grepSpecialCh(ch2find,ch2replace){
	myDocument= app.documents.item(0);
	
	app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
	app.findChangeGrepOptions.includeFootnotes = true;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = true;
    app.findChangeGrepOptions.includeMasterPages = true;
	var trovati = app.findGrepPreferences.findWhat = ch2find;
	var change = app.changeGrepPreferences.changeTo = ch2replace;
	
	myDocument.changeGrep();
	
	app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
	
	return true;
}

function selectCh(ch2find){
    myDocument= app.documents.item(0);
    app.findGrepPreferences = NothingEnum.nothing; // now empty the find what field!!! that's important!!!
    app.changeGrepPreferences = NothingEnum.nothing; // empties the change to field!!! that's important!!!
	app.findChangeGrepOptions.includeFootnotes = true;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = true;
    app.findChangeGrepOptions.includeMasterPages = true;
	app.findGrepPreferences.findWhat = ch2find;
    
    var res = myDocument.findGrep();
    
    if(res==''){
        return false;
    }else{
        return app.select(res[0].insertionPoints[0]);
    }
    
    //app.layoutWindows[0].activePage=res[0].words[0].parentTextFrames[0].parent;
    
    
    //myDocument.changeGrep();
    
}


//get the current script folder path
function getScriptPath() {
	try { 
    return app.activeScript.parent.fsName; 
  } catch(e) { 
    return File(e.fileName); 
  }
}



/* 
******************************
* funzioni per l'elaborazione dei preset
******************************
*/


function getPresetsName(){
	var presetArray = readPresets();
	//createPresetsFile();
	var nomi = new Array();
	var elenco = new Array();
	for(key in presetArray){
		var elencoKey = String(presetArray[key]);
		elenco = elencoKey.split(sep);
		nomi[key]= elenco[0];
	}
	
	return nomi;
}


function createPresetsFile(){
	if(!presetsFilePath.exists){		
		presetsFilePath.open('w');
		presetsFilePath.encoding = "UTF-8";
		presetsFilePath.write(elaboratePreset(defaultPreset));
		presetsFilePath.close();
	}
}

function addPreset(arrayPreset){
	createPresetsFile();
	presetsFilePath.open('a');
	presetsFilePath.encoding = "UTF-8";
	presetsFilePath.write('\n' + elaboratePreset(arrayPreset));
	presetsFilePath.close();
}

function readPresets(){
	createPresetsFile();
	presetsFilePath.open('r');
	var arrayRighe = new Array;
	arrayRighe = presetsFilePath.read().split('\n');
	return arrayRighe;
}


function elaboratePreset(inputString){	
	if (typeof inputString == 'string'){
		return inputString.split(sep);
	}else{
		return inputString.join(sep);
	}
}

function indexOf(string,array){
    for(b=0;b<array.length;b++){
        if(array[b]==string){
            return b;
        }
    }
    
}

