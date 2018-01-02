var santiBase = ['Maria S.ma Madre di Dio', 'S. Basilio', 'S.mo Nome di Gesù', 'B. Angela', 'S. Emiliana', 'Epifania del Signore', 'S. Raimondo di P.', 'S. Massimo', 'S. Giuliano Martire', 'S. Milziade', 'S. Igino', 'S. Arcadio', 'S. Ilario', 'S. Felice di Nola', 'S. Mauro', 'S. Marcello I ', 'S. Antonio Abate', 'S. Margherita d’U.', 'S. Mario', 'S. Sebastiano', 'S. Agnese', 'S. Vincenzo', 'S. Messalina', 'S. Francesco di S.', 'Conversione di S.Paolo', 'S. Timoteo', 'S. Angela M.', 'S. Tommaso d’A. ', 'S. Costanzo ', 'S. Giacinta M.', 'S. Giovanni Bosco', 'S. Verdiana', 'Presentazione del Signore', 'S. Biagio', 'S. Nicola S.', 'S. Agata', 'S. Paolo', 'S. Giuliana', 'S. Girolamo E.', 'S. Apollonia', 'S. Scolastica', 'Madonna di Lourdes ', 'S. Eulalia', 'S. Benigno', 'S. Valentino', 'S. Faustino', 'S. Elia', 'S. Bonoso', 'S. Simone Vescovo', 'S. Corrado C.', 'S. Amata', 'S. Pier Damiani', 'S. Margherita ', 'S. Policarpo', 'S. Evezio', 'S. Cesario', 'S. Alessandro', 'S. Gabriele', 'S. Romano', 'S. Albino', 'S. Agnese', 'S. Tiziano', 'S. Casimiro', 'S. Adriano', 'S. Rosa', 'S. Perpetua', 'S. Giovanni Di Dio', 'S. Francesca R.', 'S. Macario', 'S. Costantino', 'S. Massimiliano', 'S. Cristina', 'S. Matilde', 'S. Longino', 'S. Eriberto Vescovo', 'S. Patrizio', 'S. Cirillo', 'S. Giuseppe', 'S. Archippo', 'S. Serapione', 'S. Lea', 'S. Turibio Di M.', 'S. Caterina di S.', 'Annunciazione', 'S. Emanuele', 'S. Ruperto', 'S. Castore', 'S. Secondo Martire', 'S. Amedeo', 'S. Beniamino', 'S. Ugo', 'S. Francesco', 'S. Riccardo', 'S. Isidoro', 'S. Vincenzo Ferrer', 'S. Guglielmo', 'S. Giovanni De La Salle', 'S. Dionigi', 'S. Demetrio', 'S. Terenzio', 'S. Stanislao', 'S. Zeno', 'S. Martino Papa', 'S. Lamberto', 'S. Teodoro', 'S. M. Bernarda S.', 'S. Aniceto Papa', 'S. Galdino', 'S. Leone IX', 'S. Adalgisa Vergine', 'S. Anselmo', 'S. Caio', 'S. Giorgio', 'S. Gastone', 'S. Marco Evangelista', 'S. Cleto', 'S. Zita', 'S. Pietro Chanel', 'S. Caterina da S.', 'S. Pio V', 'S. Giuseppe', 'S. Atanasio', 'S. Filippo', 'S. Ciriaco', 'S. Gottardo', 'S. Lucio di C.', 'S. Domitilla', 'S. Vittore', 'S. Pacomio', 'S. Antonio', 'S. Gualtiero', 'S. Leopoldo Mandic', 'B. Maria V. di F.', 'S. Mattia', 'S. Isidoro l’A.', 'S. Ubaldo', 'S. PASQUALE CONF.', 'S. Giovanni I', 'S. Urbano I', 'S. Bernardino', 'S. Cristoforo M.', 'S. Rita da C.', 'S. Desiderio', 'B.V. MARIA AUSILIATRICE', 'M. Maddalena', 'S. Filippo Neri', 'S. Agostino', 'S. Germano', 'S. Massimino', 'S. Giovanna D.A.', 'Visitazione Maria Vergine', 'S. Giustino', 'Festa della Repubblica', 'S. Carlo Lwanga', 'S. Quirino', 'S. Bonifacio', 'S. Norberto', 'S. Roberto', 'S. Medaro Vescovo', 'S. Efrem', 'B. Enrico da B.', 'S. Barnaba', 'S. Guido', 'S. Antonio', 'S. Eliseo', 'S. Amos', 'S. Aureliano', 'S. Raniero', 'S. Gregorio', 'S. Gervasio', 'S. Giovanni', 'S. Luigi Gonzaga', 'S. Paolino', 'S. Lanfranco', 'Natività di S. Giovanni', 'S. Massimo', 'S. Virgilio', 'S. Cirillo d’A.', 'S. Ireneo', 'SS. Pietro e Paolo', 'SS. Primi Martiri', 'Sacro Cuore', 'Cuore Imm. di Maria', 'S. Tommaso', 'S. Elisabetta', 'S. Antonio M. Z.', 'S. Maria Goretti', 'S. Panteno', 'S. Adriano III', 'S. Veronica G.', 'S. Rufina', 'S. Benedetto', 'S. Giovanni Gualberto', 'S. Enrico', 'S. Camillo De L. ', 'S. Bonaventura', 'B. Maria V. Monte C.', 'S. Marcellina', 'S. Federico', 'B. Pietro Crisci', 'S. Margherita', 'S. Lorenzo da B.', 'S. M. Maddalena', 'S. Brigida di S.', 'S. Cristina', 'S. Giacomo il Mag.', 'S. Gioacchino e S. Anna', 'S. Aurelio', 'S. Nazario', 'S. Marta', 'S. Pietro C.', 'S. Ignazio di L.', 'S. Alfonso Dè L.', 'S. Pietro G. E.', 'S. Asprenato', 'S. Giovanni M. Vianney', 'S. Emidio', 'Trasfigurazione Signore', 'S. Sisto II', 'S. Domenico', 'S. Teresa B. della C.', 'S. Lorenzo', 'S. Chiara d’A.', 'S. Giovanna F.', 'S. Ponziano', 'S. Massimiliano K.', 'Assunzione B.V.M.', 'S. Rocco', 'S. Chiara', 'S. Elena', 'S. Giovanni Eudes', 'S. Bernardo di C.', 'S. Pio X', 'B. Maria V. Regina', 'S. Rosa da Lima', 'S. Bartolomeo', 'S. Giuseppe C.', 'S. Alessandro', 'S. Monica', 'S. Agostino', 'S. Adelfo', 'S. Pietro', 'S. Raimondo N.', 'S. Egidio', 'S. Elpidio', 'S. Gregorio M.', 'S. Rosalia di P.', 'S. Quinto', 'S. Zaccaria', 'S. Regina', 'Natività B.V.M.', 'S. Pietro Claver', 'S. Nicola da T.', 'S. Proto', 'S.mo Nome di M.', 'S. Giovanni C.', 'Esalt. Croce', 'M Addolorata', 'S. Cornelio', 'S. Roberto B.', 'S. Arianna', 'S. Gennaro', 'S. Andrea Kim', 'S. Matteo', 'S. Maurizio', 'S. Pio da P.', 'S. Pacifico', 'S. Cleofa', 'S. Cosma', 'S. Vincenzo Dè P.', 'S. Venceslao', 'SS. Arcangeli', 'S. Girolamo', 'S. Teresa di G.B.', 'SS. Angeli C.', 'S. Gerardo', 'S. Francesco d’A.', 'S. Placido', 'S. Bruno', 'B.V.M. del Rosario', 'S. Reparata', 'S. Dionigi', 'S. Cetteo', 'S. Alessandro S.', 'S. Serafino', 'S. Teofilo', 'S. Callisto I', 'S. Teresa di A.', 'S. Margherita M.A.', 'S. Ignazio di A.', 'S. Luca', 'S. Paolo della C.', 'S. Vitale', 'S. Orsola', 'S. Giovanni Paolo II', 'S. Giovanni da C.', 'S. Antonio Claret', 'S. Gaudenzio', 'S. Evaristo', 'S. Fiorenzo', 'SS. Simone e Giuda', 'S. Narciso', 'S. Germano', 'S. Lucilla', 'Tutti i Santi', 'Commemorazione dei Defunti', 'S. Silvia', 'S. Carlo B.', 'S. Donnino', 'S. Severo', 'S. Prosdocimo', 'S. Goffredo', 'S. Agrippino', 'S. Leone I Magno', 'S. Martino di Tours', 'S. Giosafat', 'S. Imerio', 'S. Rufo', 'S. Alberto Magno', 'S. Agnese d’A.', 'S. Elisabetta d’U.', 'B. Carolina', 'S. Abdia', 'Cristo Re', 'Present. B.V. Maria', 'S. Cecilia', 'S. Clemente I', 'S. Andrea D. Lac', 'S. Caterina', 'S. Corrado Vescovo', 'S. Virgilio', 'S. Giacomo M.', 'S. Saturnino Martire', 'S. Andrea Ap  ', 'S. Eligio', 'S. Bibiana', 'S. Francesco Saverio', 'S. Barbara', 'S. Giulio', 'S. Nicola Vescovo', 'S. Ambrogio Vescovo', 'Immacolata Concezione', 'S. Siro', 'B. V. di Loreto', 'S. Damaso Papa', 'B. Maria V. di G.', 'S. Lucia V.', 'S. Giovanni D. Cr.', 'S. Valeriano', 'S. Adelaide', 'S. Lazzaro', 'S. Graziano', 'S. Anastasio I', 'S. Liberato Martire', 'S. Pietro Canisio', 'S. Francesca S. C. ', 'S. Giovanni da Kety', 'S. Irminia di Treviri', 'Natività del Signore', 'S. Stefano', 'S. Giovanni', 'SS. Innocenti di B.', 'S. Tommaso B.', 'Santa Famiglia', 'S. Silvestro'];

var mesiEstesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
var mesiTreLettere = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];

var lMesi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var json = "{\n";
var dCounter = 0;
var mCounter = 0;


for (a=0; a<santiBase.length; a++){
	
	if(dCounter==0){
		json += "'"+ mesiTreLettere[mCounter] + "' : {\n";
			json += "'numero giorni' : " + "'" + lMesi[mCounter]+ "'," + '\n';
			json += "'nome' : " + "'" + mesiEstesi[mCounter]+ "'," + '\n';
			json += "'santi' : {\n";
	}
	
	json += "'"+ (dCounter+1)  +"' : '"+ santiBase[a] +"',\n";
	
	dCounter++;
	
	if(dCounter==lMesi[mCounter]){
		dCounter=0;
		mCounter++;
		
		json += "},";
		
	}
	
	
}

json += "}};"



alert(json);

/*
var filepath = getScriptPath().parent.fsName+'/santi.txt';
var fileW = new File(filepath);
fileW.open('w');
fileW.write(json);
fileW.close();*/



var myDocument= app.documents.item(0);	
var myPage = myDocument.pages.item(0);
var myTextFrame = app.selection[0].insertionPoints[0];
myTextFrame.parentStory.insertionPoints.item(-1).contents=json;



function getScriptPath() {
	try { 
    return app.activeScript; 
  } catch(e) { 
    return File(e.fileName); 
  }
}