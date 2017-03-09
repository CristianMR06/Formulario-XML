var formElement=null;

var respuestaTexto1=null;
var respuestaTexto2=null;

var respuestasRadio1 = [];
var respuestasRadio2 = [];

var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];

var respuestasMultiple1 = [];
var respuestasMultiple2 = [];

var respuestaSelect1=null;
var respuestaSelect2=null;


var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

	document.getElementById("menuinstrucciones").onclick = function(){instrucciones();};
	document.getElementById("menuinicio").onclick = function(){inicio();};
	document.getElementById("menuexamen").onclick = function(){examen();};
	document.getElementById("menuexamen").onclick = function () {
        if (confirm("¿Estás seguro que deseas empezar el examen?")) {
            examen();
            window.scrollTo(0, 0);
        }
    }

	//CORREGIR al apretar el botón
 	formElement=document.getElementById('myform');
 	formElement.onsubmit=function(){

  
   	if (comprobar()){
   		if (confirm("¿Estás seguro desea corregir el examen?")){
   			 	inicializar();
    	corregirText1();
    	corregirText2();
    	corregirRadio1();
    	corregirRadio2();
    	corregirCheckbox1();
    	corregirCheckbox2();
    	corregirMultiple1();
    	corregirMultiple2();
    	corregirSelect1();
    	corregirSelect2();
    		estadoNota();
    presentarNota();}
   	}
   	return false;
	}



 	//LEER XML de xml/preguntas.xml
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
 		if (this.readyState == 4 && this.status == 200) {
   			gestionarXml(this);
  		}
	};
 	
 	xhttp.open("GET", "https://rawgit.com/CristianMR06/Formulario-XML/master/xml/questions.xml", true);
 	xhttp.send();
}

//RECUPERAR DATOS DEL FICHERO XML
//xmlDOC ES EL DOCUMENTO LEIDO XML
 
function gestionarXml(dadesXml){
 	var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 	//TEXT 1
 	var q1=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 	ponerDatosInputHtml(q1);
 	respuestaTexto1=(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

 	//TEXT 2
  	var q2=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 	ponerDatosInputHtml2(q2);
 	respuestaTexto2=(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
 
 	//RADIO 1
 	var q3 = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 	var opcionesRadio1 = [];
 	var nopt = xmlDoc.getElementById("PR_03").getElementsByTagName('option').length;
 	for (i = 0; i < nopt; i++) { 
    	opcionesRadio1[i]=xmlDoc.getElementById("PR_03").getElementsByTagName('option')[i].innerHTML;
 	}  
 	ponerDatosRadio1(q3,opcionesRadio1);
 	var nres = xmlDoc.getElementById("PR_03").getElementsByTagName('answer').length;
 	for (i = 0; i < nres; i++) { 
  		respuestasRadio1[i]=xmlDoc.getElementById("PR_03").getElementsByTagName("answer")[i].innerHTML;
 	}

 	//RADIO 2
 	var q4 = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 	var opcionesRadio2 = [];
 	var nopt = xmlDoc.getElementById("PR_04").getElementsByTagName('option').length;
 	for (i = 0; i < nopt; i++) { 
    	opcionesRadio2[i]=xmlDoc.getElementById("PR_04").getElementsByTagName('option')[i].innerHTML;
 	}  
 	ponerDatosRadio2(q4,opcionesRadio2);
 	var nres = xmlDoc.getElementById("PR_04").getElementsByTagName('answer').length;
 	for (i = 0; i < nres; i++) { 
  		respuestasRadio2[i]=xmlDoc.getElementById("PR_04").getElementsByTagName("answer")[i].innerHTML;
 	}

 	//CHECKBOX 1
 	var q5 = xmlDoc.getElementsByTagName("title")[4].innerHTML;
 	var opcionesCheckbox1 = [];
 	var nopt = xmlDoc.getElementById("PR_05").getElementsByTagName('option').length;
 	for (i = 0; i < nopt; i++) { 
    	opcionesCheckbox1[i]=xmlDoc.getElementById("PR_05").getElementsByTagName('option')[i].innerHTML;
 	}  
 	ponerDatosCheckboxHtml1(q5,opcionesCheckbox1);
 	var nres = xmlDoc.getElementById("PR_05").getElementsByTagName('answer').length;
 	for (i = 0; i < nres; i++) { 
  		respuestasCheckbox1[i]=xmlDoc.getElementById("PR_05").getElementsByTagName("answer")[i].innerHTML;
 	}

	//CHECKBOX 2
	var q6 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
 	var opcionesCheckbox2 = [];
 	var nopt = xmlDoc.getElementById("PR_06").getElementsByTagName('option').length;
 	for (i = 0; i < nopt; i++) { 
    	opcionesCheckbox2[i]=xmlDoc.getElementById("PR_06").getElementsByTagName('option')[i].innerHTML;
 	}  
 	ponerDatosCheckboxHtml2(q6,opcionesCheckbox2);
 	var nres = xmlDoc.getElementById("PR_06").getElementsByTagName('answer').length;
 	for (i = 0; i < nres; i++) { 
  	respuestasCheckbox2[i]=xmlDoc.getElementById("PR_06").getElementsByTagName("answer")[i].innerHTML;
 	}

	//MULTIPLE 1
	var opcionesMultiple1 = [];
 	var q7 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
 	var nres = xmlDoc.getElementById("PR_07").getElementsByTagName('option').length;
 	for (i = 0; i < nres; i++) { 
  		opcionesMultiple1[i]=xmlDoc.getElementById("PR_07").getElementsByTagName("option")[i].innerHTML;
 	}
 	ponerDatosMultiple1(q7,opcionesMultiple1);
 	var nres = xmlDoc.getElementById("PR_07").getElementsByTagName('answer').length;
 	for (i = 0; i < nres; i++) { 
  		respuestasMultiple1[i]=xmlDoc.getElementById("PR_07").getElementsByTagName("answer")[i].innerHTML;
 	}

	//MULTIPLE 2
	var opcionesMultiple2 = [];
 	var q8 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
 	var nres = xmlDoc.getElementById("PR_08").getElementsByTagName('option').length;
 	for (i = 0; i < nres; i++) { 
  		opcionesMultiple2[i]=xmlDoc.getElementById("PR_08").getElementsByTagName("option")[i].innerHTML;
 	}
 	ponerDatosMultiple2(q8,opcionesMultiple2);
 	var nres = xmlDoc.getElementById("PR_08").getElementsByTagName('answer').length;
 	for (i = 0; i < nres; i++) { 
  		respuestasMultiple2[i]=xmlDoc.getElementById("PR_08").getElementsByTagName("answer")[i].innerHTML;
 	}

	//SELECT 1
 	var q9=xmlDoc.getElementsByTagName("title")[8].innerHTML;
 	var opcionesSelect1 = [];
 	var nopt = xmlDoc.getElementById("PR_09").getElementsByTagName('option').length;
  	for (i = 0; i < nopt; i++) { 
    	opcionesSelect1[i] = xmlDoc.getElementById("PR_09").getElementsByTagName('option')[i].innerHTML;
 	}
 	ponerDatosSelectHtml1(q9,opcionesSelect1);
 	respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[14].innerHTML);

	//SELECT 2
	var q10=xmlDoc.getElementsByTagName("title")[9].innerHTML;
 	var opcionesSelect2 = [];
 	var nopt = xmlDoc.getElementById("PR_10").getElementsByTagName('option').length;
  	for (i = 0; i < nopt; i++) { 
    	opcionesSelect2[i] = xmlDoc.getElementById("PR_10").getElementsByTagName('option')[i].innerHTML;
 	}
 	ponerDatosSelectHtml2(q10,opcionesSelect2);
 	respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[15].innerHTML);
} 


//IMPLEMENTACIÓN DE CORRECCIÓN

function corregirText1(){
  	var s=formElement.elements[0].value;     
  	if (s==respuestaTexto1) {
   		darRespuestaHtml("P1: Exacto!");
   		nota +=1;
  	}else {
  		darRespuestaHtml("P1: No es correcto!");
  	}
}

function corregirText2(){
  	var s=formElement.elements[1].value;     
  	if (s==respuestaTexto2) {
   		darRespuestaHtml("P2: Exacto!");
   		nota +=1;
  	}else {
  		darRespuestaHtml("P2: No es correcto!");
  	}
}

function corregirRadio1(){
   	var f=formElement;
  	var escorrecta = [];
  	var buena=null;
  	for (i = 0; i < f.origenFutbol.length; i++) { 
   		if (f.origenFutbol[i].checked) {
    		buena=i;
    		if (buena==respuestasRadio1) {
     			nota +=1.0
     			darRespuestaHtml("P3: Correcta");    
    		} else {
     			darRespuestaHtml("P3: Incorrecta");
    		}   
   		} 
  	}
}

function corregirRadio2(){
   	var f=formElement;
  	var escorrecta = [];
  	var buena=null;
  	for (i = 0; i < f.sumaMundiales.length; i++) { 
   		if (f.sumaMundiales[i].checked) {
    		buena=i;
    		if (buena==respuestasRadio2) {
     			nota +=1.0
     			darRespuestaHtml("P4: Correcta");    
    		} else {
     			darRespuestaHtml("P4: Incorrecta");
    		}   
   		} 
  	}
}

function corregirCheckbox1(){
  	var f=formElement;
  	var escorrecta = [];
  	for (i = 0; i < f.balonOro.length; i++) {
   		if (f.balonOro[i].checked) {
    		escorrecta[i]=false;     
    		for (j = 0; j < respuestasCheckbox1.length; j++) {
     			if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    		}
    
    		if (escorrecta[i]) {
     			nota +=1.0/respuestasCheckbox1.length;   
     			darRespuestaHtml("P5: "+i+" Correcta");    
    		} else {
     			nota -=1.0/respuestasCheckbox1.length;  
     			darRespuestaHtml("P5: "+i+" Incorrecta");
    		}   
   		} 
  	}
}

function corregirCheckbox2(){
  	var f=formElement;
  	var escorrecta = [];
  	for (i = 0; i < f.equiposSpain.length; i++) {  
   		if (f.equiposSpain[i].checked) {
    		escorrecta[i]=false;     
    		for (j = 0; j < respuestasCheckbox2.length; j++) {
     			if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
    		}
    		if (escorrecta[i]) {
     			nota +=1.0/respuestasCheckbox2.length;
     			darRespuestaHtml("P6: "+i+" Correcta");    
    		} else {
     			nota -=1.0/respuestasCheckbox2.length;    
     			darRespuestaHtml("P6: "+i+" Incorrecta");
    		}   
   		} 
  	}
}

function corregirMultiple1(){
  	var f=formElement;
  	var escorrecta = [];
  	var opt = document.getElementById("multiple1").getElementsByTagName("option");
  	for (i = 0; i < opt.length; i++) {
   		if (opt[i].selected) {
    		escorrecta[i]=false;
    		for (j = 0; j < respuestasMultiple1.length; j++) {
     			if (i==respuestasMultiple1[j]) escorrecta[i]=true;
    		}
    		if (escorrecta[i]) {
     			nota +=1.0/respuestasMultiple1.length;  
     			darRespuestaHtml("P7: "+i+" Correcta");    
    		} else {
     			nota -=1.0/respuestasMultiple1.length;  
     			darRespuestaHtml("P7: "+i+" Incorrecta");
    		}   
   		} 
  	}
}

function corregirMultiple2(){
  	var f=formElement;
  	var escorrecta = [];
  	var opt = document.getElementById("multiple2").getElementsByTagName("option");
  	for (i = 0; i < opt.length; i++) {
   		if (opt[i].selected) {
    		escorrecta[i]=false;
    		for (j = 0; j < respuestasMultiple2.length; j++) {
     			if (i==respuestasMultiple2[j]) escorrecta[i]=true;
    		}
    		if (escorrecta[i]) {
     			nota +=1.0/respuestasMultiple2.length;
     			darRespuestaHtml("P8: "+i+" Correcta");    
    		} else {
     			nota -=1.0/respuestasMultiple2.length; 
     			darRespuestaHtml("P8: "+i+" Incorrecta");
    		}   
   		} 
  	}
}

function corregirSelect1(){
  var sel = document.getElementById("select1");
  if (sel.selectedIndex-1==respuestaSelect1) { 
   darRespuestaHtml("P9: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P9: Incorrecto");
}

function corregirSelect2(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = document.getElementById("select2");
  if (sel.selectedIndex-1==respuestaSelect2) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("P10: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P10: Incorrecto");
}


// PONER LOS DATOS RECIBIDOS EN HTML
function ponerDatosInputHtml(t){
 	document.getElementById("q1").innerHTML = t;
}

function ponerDatosInputHtml2(t){
 	document.getElementById("q2").innerHTML = t;
}

function ponerDatosRadio1(t,opt){
 	var radioContainer=document.getElementById('radio1');
 	document.getElementById('q3').innerHTML = t;
 	for (i = 0; i < opt.length; i++) { 
    	var input = document.createElement("input");
    	var label = document.createElement("label");
    	label.innerHTML=opt[i];
    	label.setAttribute("for", "origenFutbol_"+i);
    	input.type="radio";
    	input.name="origenFutbol";
    	input.id="origenFutbol_"+i;;    
    	radioContainer.appendChild(input);
    	radioContainer.appendChild(label);
    	radioContainer.appendChild(document.createElement("br"));
 	}  
}

function ponerDatosRadio2(t,opt){
 	var radioContainer=document.getElementById('radio2');
 	document.getElementById('q4').innerHTML = t;
 	for (i = 0; i < opt.length; i++) { 
    	var input = document.createElement("input");
    	var label = document.createElement("label");
    	label.innerHTML=opt[i];
    	label.setAttribute("for", "sumaMundiales_"+i);
    	input.type="radio";
    	input.name="sumaMundiales";
    	input.id="sumaMundiales_"+i;;    
    	radioContainer.appendChild(input);
    	radioContainer.appendChild(label);
    	radioContainer.appendChild(document.createElement("br"));
 	}  
}

function ponerDatosCheckboxHtml1(t,opt){
 	var checkboxContainer=document.getElementById('checkbox1');
 	document.getElementById('q5').innerHTML = t;
 	for (i = 0; i < opt.length; i++) { 
    	var input = document.createElement("input");
    	var label = document.createElement("label");
    	label.innerHTML=opt[i];
 	   	label.setAttribute("for", "balonOro_"+i);
 	   	input.type="checkbox";
    	input.name="balonOro";
    	input.id="balonOro_"+i;;    
    	checkboxContainer.appendChild(input);
    	checkboxContainer.appendChild(label);
    	checkboxContainer.appendChild(document.createElement("br"));
 	}  
}

function ponerDatosCheckboxHtml2(t,opt){
 	var checkboxContainer=document.getElementById('checkbox2');
 	document.getElementById('q6').innerHTML = t;
 	for (i = 0; i < opt.length; i++) { 
    	var input = document.createElement("input");
    	var label = document.createElement("label");
    	label.innerHTML=opt[i];
    	label.setAttribute("for", "equiposSpain_"+i);
    	input.type="checkbox";
    	input.name="equiposSpain";
    	input.id="equiposSpain_"+i;;    
   		checkboxContainer.appendChild(input);
    	checkboxContainer.appendChild(label);
    	checkboxContainer.appendChild(document.createElement("br"));
 	}  
}

function ponerDatosMultiple1(t,opt){
 	document.getElementById("q7").innerHTML=t;
  	var select = document.getElementsByTagName("select")[0];
  	select.multiple = true;
  	for (i = 0; i < opt.length; i++) { 
    	var option = document.createElement("option");
    	option.text = opt[i];
    	option.value=i+1;
    	select.options.add(option);
 	}  
}

function ponerDatosMultiple2(t,opt){
 document.getElementById("q8").innerHTML=t;
  	var select = document.getElementsByTagName("select")[1];
  	select.multiple = true;
  	for (i = 0; i < opt.length; i++) { 
    	var option = document.createElement("option");
    	option.text = opt[i];
    	option.value=i+1;
    	select.options.add(option);
 	}  
}

function ponerDatosSelectHtml1(t,opt){
  	document.getElementById("q9").innerHTML=t;
  	var select = document.getElementsByTagName("select")[2];
  	for (i = 0; i < opt.length; i++) { 
    	var option = document.createElement("option");
    	option.text = opt[i];
    	option.value=i+1;
    	select.options.add(option);
 	}  
}

function ponerDatosSelectHtml2(t,opt){
  	document.getElementById("q10").innerHTML=t;
  	var select = document.getElementsByTagName("select")[3];
  	for (i = 0; i < opt.length; i++) { 
    	var option = document.createElement("option");
    	option.text = opt[i];
    	option.value=i+1;
    	select.options.add(option);
 	}  
}




//GESTIONA LA PRESENTACION DE LAS RESPUESTAS
function darRespuestaHtml(r){
 	var p = document.createElement("p");
 	var node = document.createTextNode(r);
 	p.appendChild(node);
 	document.getElementById('resultadosDiv').appendChild(p);


}

function presentarNota(){
   	darRespuestaHtml("Nota: "+nota.toFixed(2)+" puntos sobre 10");
}

function inicializar(){
   	document.getElementById('resultadosDiv').innerHTML = "";
   	nota=0.0;
   		
}



//COMPUREBA QUE NO HAYA ELEMENTOS VACIOS DEL FORMULARIO
function comprobar(){
	
  	var f=formElement;
  	var c_radio1=false;
  	var c_radio2=false;
  	var c_checked1=false;
  	var c_checked2=false;


  	for (i = 0; i < f.origenFutbol.length; i++) {
      	if (f.origenFutbol[i].checked) c_radio1=true;
   	}

   	for (i = 0; i < f.sumaMundiales.length; i++) {
      	if (f.sumaMundiales[i].checked) c_radio2=true;
   	}

  	for (i = 0; i < f.balonOro.length; i++) {
      	if (f.balonOro[i].checked) c_checked1=true;
   	}

   	for (i = 0; i < f.equiposSpain.length; i++) {
      	if (f.equiposSpain[i].checked) c_checked2=true;
   	}

  	if (f.elements[0].value=="") {
    	f.elements[0].focus();
    	alert("No has contestado la pregunta 1, ¿Cuál jugador inventó la expresión “jogo bonito”?");
    	return false;
   	}if (f.elements[1].value=="") {
    	f.elements[1].focus();
    	alert("No has contestado la pregunta 2, ¿En qué año ganó España el Mundial?");
    	return false;
   	}if (!c_radio1) {    
    	document.getElementsByTagName("h3")[2].focus();
    	alert("No has contestado la pregunta 3, ¿Cuál es el país de origen del fútbol?");
    	return false;
   	}if (!c_radio2) {    
    	document.getElementsByTagName("h3")[3].focus();
    	alert("No has contestado la pregunta 4, ¿Cuántos mundiales suman Brasil y España?");
    	return false;
   	}if (!c_checked1) {    
    	document.getElementsByTagName("h3")[4].focus();
    	alert("No has contestado la pregunta 5, Marca los jugadores que hayan ganado el Balón de Oro");
    	return false;
   	}if (!c_checked2) {    
    	document.getElementsByTagName("h3")[5].focus();
    	alert("No has contestado la pregunta 6, ¿Qué equipos juegan en España?");
    	return false;
   	}
    else  return true; 



}   

function estadoNota(){
  	document.getElementById("logo").style.display="inline";
  	document.getElementById("infoExamen").style.display="inline";
  	document.getElementById("res_examen").style.display="inline";
  	document.getElementById("estadis").style.display="inline";
  	document.getElementById("logo2").style.display="none";
  	document.getElementById("infoExamen1").style.display="none";
  	document.getElementById("menu").style.display="inline";
  	document.getElementById("Corregir").style.display="none";
  	document.getElementById("volver").style.display="inline";


  	document.getElementById("t_preguntasCorrectas").innerHTML=nota.toFixed(0);
  	document.getElementById("t_preguntasIncorrectas").innerHTML=(10-nota).toFixed(0);
  	document.getElementById("apro_susp").style.color="#ffffff";
  	
  	if (nota<4) {
    	document.getElementById("apro_susp").innerHTML=" SUSPENDIDO ";
    	document.getElementById("apro_susp").style.background="#B70000";
  	}else{
    	document.getElementById("apro_susp").innerHTML=" APROBADO ";
    	document.getElementById("apro_susp").style.background="#016801";
  	}
}

function instrucciones(){
	document.getElementById("instrucciones").style.display="inline";
	document.getElementById("inicio").style.display="none";
	document.getElementById("examen").style.display="none";
	document.getElementById("res_examen").style.display="none";
  	document.getElementById("estadis").style.display="none";
  	document.getElementById("logo2").style.display="none";
  	document.getElementById("infoExamen1").style.display="none";
  	document.getElementById("menu").style.display="inline";

}

function inicio(){
	document.getElementById("inicio").style.display="inline";
	document.getElementById("instrucciones").style.display="none";
	document.getElementById("examen").style.display="none";
	document.getElementById("res_examen").style.display="none";
  	document.getElementById("estadis").style.display="none";
  	document.getElementById("logo2").style.display="none";
  	document.getElementById("infoExamen1").style.display="none";
  	document.getElementById("menu").style.display="inline";

}

function examen(){
	formElement.reset();
	document.getElementById("menu").style.display="none";
	document.getElementById("instrucciones").style.display="none";
	document.getElementById("inicio").style.display="none";
	document.getElementById("examen").style.display="inline";
	document.getElementById("logo2").style.display="inline";
	document.getElementById("infoExamen1").style.display="inline";
	document.getElementById("logo").style.display="none";
	document.getElementById("infoExamen").style.display="none";


}