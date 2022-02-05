//on recupère les éléments de l'ui | we get the ui elements
let graph = document.getElementById('graph');
let setbtn = document.getElementById('set');
let resetbtn = document.getElementById('reset');
let startbtn = document.getElementById('start-btn');

//les valeur entrer | input value
let size = document.getElementById("size").value;
let rmin = document.getElementById("min").value;
let rmax = document.getElementById("max").value;

//we create our global variable
let values = new Array();
let plots = new Array();
let fps = 240;

//we create control values
let isSet = false;
let operation;

//when you click on set | quand tu clique sur le bouton
setbtn.addEventListener('click', {
  	handleEvent: function (event) {

  		if (isSet == false) {
	  		//update input value | maj des valeur entrer
	  		size = document.getElementById("size").value;
			rmin = document.getElementById("min").value;
			rmax = document.getElementById("max").value;
	    
	  		//create the array | crée la liste de valeur
	  		for (let i = 0; i < size; i++) {
	  			values.push( Math.round(Math.random()*(rmax-rmin) + rmin) );
	  		}
	  		console.log(values); //log values in console (PRESS F12 in the browser)

	  		//create the visual on graph | on cree le graph
	  		for (let i = 0; i < values.length; i++) {
	  			plot(i, values[i]);
	  		}
	  		//we change the control value to true
	  		isSet = true;
	  	}
	  	else {console.log('les paramètres sont deja entrer.')}

  	}
});

//when you click on reset | quand tu clique sur le bouton
resetbtn.addEventListener('click', {
  	handleEvent: function (event) {

  		//on reset l'affichage
  		for (let i = 0; i < plots.length; i++) {
  			removePlot(plots[i]);
  		}

  		//on reset les valeur
  		values = new Array();
  		plots = new Array();

  		//update input value | maj des valeur entrer
  		size = document.getElementById("size").value;
		rmin = document.getElementById("min").value;
		rmax = document.getElementById("max").value;
    
  		//create the array | crée la liste de valeur
  		for (let i = 0; i < size; i++) {
  			values.push( Math.round(Math.random()*(rmax-rmin) + rmin) );
  		}
  		console.log(values); //log values in console (PRESS F12 in the browser)

  		//create the visual on graph | on cree le graph
  		for (let i = 0; i < values.length; i++) {
  			plot(i, values[i]);
  		}

  	}
});

startbtn.addEventListener('click', {
  	handleEvent: function (event) {

  		//sort algorythme

  		operation = 0;
  		let i = -1;
  		loop(i < values.length, i);


  	}
});

function sort(i) {

	if(values[i] > values[i+1]) {

		swap(i);	
		i=-1;

	}

	return i;

}
function swap(i) {

	//swap in values array
	let temp = values[i];
	values[i] = values[i+1];
	values[i+1] = temp;

	//Graphics

	//resize
	let t = plots[i].style.height;
	plots[i].style.height = plots[i+1].style.height;
	plots[i+1].style.height = t;

	//color effect
	for (c = 0; c < document.querySelectorAll("#graph div").length; c++) {
		document.querySelectorAll("#graph div")[c].style.backgroundColor = "#339966";
		document.querySelectorAll("#graph div")[c].style.boxShadow = "none";
	}
	plots[i].style.backgroundColor = "#993366";
	plots[i].style.boxShadow = "0 0 10px #c6538c"; 

}


function plot(n, val) {//plot the values in the graph | affiche les valeur dans le graph

//n is the base position in the array | val is the value (it will determine the height)

	let elm = document.createElement('div'); //element creation

	let h = (val/rmax)*95;
	let w = (100/size) //we consider the screen to be 1920px large (PRESS F11 FOR FULLSCREEN)
	let x = n*(w)
	w = (w/100)*90;
	if (w < 1) {w = 1;}

	let style = "position:absolute; width:"+w+"%; height:"+h+"%; bottom:0; left:"+x+"%; transform:translateY(0%);"
	style += "border-top-left-radius:"+(w/2)+"px; border-top-right-radius:"+(w/2)+"px;" 

	elm.style = style;

	graph.appendChild(elm); //we had the element to the graph
	plots.push(elm); //we index the element in plots array


}

function removePlot(elm) {
    // Removes a plot from the graph
    elm.parentNode.removeChild(elm);
}

function loop(control, i) {//work as a while() with delay

	operation++;

	if (control) { //what you want to do here

		i++
		i = sort(i);
		console.log()
		setTimeout(loop, 1000/fps, i < values.length, i);

	}
	else{alert(operation + " operation effectué !");}

}

//for console purposes
function getValues() {return values;} 
function getPlots() {return plots;}