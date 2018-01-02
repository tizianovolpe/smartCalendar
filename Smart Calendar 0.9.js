var nome = "Smart Calendar";
var versione = "0.9";
var scriptLink = '#';
var settingsFile = 'calendario.js'

var prefs = {
	'ordineGenerazione' : ['[numero]','[tab]','[giorno]','[tab]','[santo]','[tab]','[luna]','[fine paragrafo]'],
	'santi' : true,
	'zeroNum1cifra' : true, //inserisce uno zero davanti ai numeri a una cifra
	'nomeMese' : 3, // quanto lungo deve essere il nome del mese, se impostato su 0 non viene tagliato
	'nomeGiorno' : 3
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
	calGen(2018,prefs);
}




function calGen(anno,prefs){
	
	
	//la variabile che conterrà tutto il calendario
	var calendario = {}
	
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
	* generazione del calendario, mancano ancora le festivita e i giorni mobili
	
	
	calendario = {
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
					'settimana : se lunedì numero oppure false
				}
			}
		}
	}
	
	
	***************
	*/
	
	var nMese = 0;
	var pasqua = false;
	var primavera = false; //questa variabile di attiva dopo il 21 marzo, pasqua è la prima domenica di luna piena dopo il 21 marzo
	var iniziaAdAspettarePasqua = false; //si attiva quando passata la primavera arriva la luna piena
	var counterGiorni = 0;
	var settimana = 1;
	
	for(mese in calSettings.mesi ){
		
		calendario[mese] = {};
		calendario[mese]['nome'] = cut(calSettings.mesi[mese]['nome'],prefs.nomeMese);
		calendario[mese]['giorni'] = {};
		
		var numero = 1;
		var festivo;
		

		for(santo in calSettings.mesi[mese]['santi']){
			calendario[mese]['giorni'][numero] = {};
			counterGiorni ++;
			
			
			
			//aggiongo lo zero davanti ai numeri ad una cifra se richiesto
			if(prefs.zeroNum1cifra == false){
				calendario[mese]['giorni'][numero]['numero'] = numero;
			}else{
				if(String(numero).length == 1) {var numm = '0'+String(numero); }else{var numm = String(numero);}
				calendario[mese]['giorni'][numero]['numero'] = numm;
			}
			
			
			calendario[mese]['giorni'][numero]['giorno'] = cut(calSettings.giorni[day],prefs.nomeGiorno);
			calendario[mese]['giorni'][numero]['santo'] = calSettings.mesi[mese]['santi'][santo];
			calendario[mese]['giorni'][numero]['counter'] = counterGiorni;
			
			//festivo o feriale
			if(day==0){
				calendario[mese]['giorni'][numero]['festivo'] = true;
			}else{
				calendario[mese]['giorni'][numero]['festivo'] = false;
			}
			
			//aggiunta lune
			var luna = faseLuna (new Date(parseInt(anno),nMese,numero));
			calendario[mese]['giorni'][numero]['luna']=luna;
			
			
			if(day==1){
				calendario[mese]['giorni'][numero]['settimana'] = settimana;
				settimana++;
			}
			
			
			
			//calcolo pasqua
			if(primavera==false & mese == 'mar' & numero == 21) {
				primavera = true;
			}
			
			if(iniziaAdAspettarePasqua==false & primavera==true & luna==3){
				iniziaAdAspettarePasqua = true;
			}
			
			if(pasqua==false & iniziaAdAspettarePasqua == true){
				if(day==0){
					pasqua = [mese,numero,calendario[mese]['giorni'][numero]['giorno'],counterGiorni];
				}
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
	
	alert(calendario['dic']['giorni'][31]['settimana']);
	
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



/*FUNZIONE PER IL CALCOLO DELLA FASE LUNARE PER IL GIORNO
//attenzione! da perfezionare, potrebbe sbagliare di un giorno
*/

function faseLuna(DG) { // RITORNA 5 SE C'E' LA LUNA PIENA
	DR = new Date(2000,0,1);	// data di riferimento
	TL = (((DG - DR) / 1000) + 2114500) % 2551443;
	RV = 1
	if (TL < 2508243){RV=0;} //8 // CALANTE DA ULTIMO
	if (TL < 1956782.25){RV=4;} // ULTIMO QUARTO
	if (TL < 1870382.25){RV=0;} //6 // CALANTE DA PIENA
	if (TL < 1318921.5){RV=3;} // PIENA
	if (TL < 1232521.5){RV=0;} //4 // CRESCENTE DA PRIMO
	if (TL < 681060.75){RV=2;} // PRIMO QUARTO
	if (TL < 594660.75){RV=0;} //2 // CRESCENTE DA NUOVA
	if (TL < 43200){RV=1;} // NUOVA
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