var builder = "void";
var nodes;
var grid;
var checkpoints = [];
var mousedown;
var cols;
var rows;
let scale;
let startTime;
let endTime;

function loadGrid(ro, co) {

	nodes = new Array(ro); //node table
	grid = new Array(ro); //cell table
	rows = ro;
	cols = co;
	
	for (let i = 0; i < ro; i++) {

		var row = document.createElement("tr");
		grid[i] = new Array(co);
		nodes[i] = new Array(co);

		for (let j = 0; j < co; j++) {
			var cell = document.createElement("td");
			grid[i][j] = cell;
			let cmod;
			let w;
			if (Math.round(Math.random()*100) > 25) {
				cmod = "void";
				cell.style = "background-color: #ffffff;";
			}
			else {
				cmod = "wall";
				cell.style = "background-color: #000000;";
			}
			nodes[i][j] = new Node(cmod, i, j, true);
			modifyCell(cmod, i, j);
			cell.innerHTML = "";
			cell.addEventListener("click", function() {modifyCell(builder, i, j);});
			row.appendChild(cell);
		}//2

		document.getElementById("grid").appendChild(row);

	}//1
	document.getElementById("mode_label").innerHTML = builder;

}

//function detectMouseDown(mod) {
	//mousedown = mod;
//}

function switchMode(mode) {
	if (mode == "wall") {builder = "wall";} // les if sont inutile en soi
	if (mode == "checkpoint") {builder = "checkpoint";}
	if (mode == "void") {builder = "void";}

	document.getElementById("mode_label").innerHTML = builder;
}

function modifyCell(mode, i, j, override) {

		let temp = nodes[i][j].getType();
		nodes[i][j].setType(mode);

		if (mode == "void") {
			grid[i][j].style = "background-color: #ffffff;";
			nodes[i][j].weight = 0;
		}

		if (mode == "wall") {
			grid[i][j].style = "background-color: #000000;";
			nodes[i][j].weight = 1000000;
		}

		if (mode == "checkpoint") {
			checkpoints.push(nodes[i][j]);
			if (checkpoints.length > 1) {
				grid[i][j].style = "background-color: #aa00ee;";
			} else {grid[i][j].style = "background-color: #00ff00;";}
			nodes[i][j].weight = 0;
			
		}

		console.log(nodes[i][j]);

}

function removeFromArray (arr, elt) {for (i=arr.length; i>=0; i--) {if (arr[i] == elt) {arr.splice(i,1);} }}

class Node {

	constructor(type, i, j) {
		this.type = type;
		this.setLock();
		this.i = i;
		this.j = j;
		this.weight = 0;
		this.estimate = 0;
	}

	setType(type) {this.type = type;}
	getType() {return this.type;}
	setEstimate(goal) {this.estimate = this.getDistance(goal)*scale + this.weight;}
	setLock() {if (this.type != "wall") {this.lock = true;} else{this.lock = false;}}

	getDistance(node) {
		let d = Math.sqrt((this.i - node.i)**2) + Math.sqrt((this.j - node.j)**2) ;
		return d;
	}


}

function showStartPannel() {document.getElementById("start_pannel").style = "visibility: visible;";}

function pathfind() {

	startTime = new Date().getTime();
	scale = document.getElementById('resolution').value;
	document.getElementById("start_pannel").style = "visibility: hidden;";
	var openset = [checkpoints[0]];
	var closeset = [];

	if (openset.length > 0) {
		setTimeout(findPath, 16.66, openset, closeset);
	}

}

function findPath(openset, closeset) {

	let current = openset[0];
	let goal = checkpoints[1];

	for(i = 0; i < openset.length; i++) {
		openset[i].setEstimate(goal);
		if (openset[i].estimate < current.estimate || checkpoints.includes(openset[i])) {current = openset[i];}
	}

	for(i = 0; i < openset.length; i++) {
		grid[openset[i].i][openset[i].j].style = "background-color: #ffff00;";
	}
	for(i = 0; i < closeset.length; i++) {
		grid[closeset[i].i][closeset[i].j].style = "background-color: #aaaaaa;";
	}

	if (current.i < rows-1) {//1

		if (!closeset.includes(nodes[current.i+1][current.j]) && nodes[current.i+1][current.j].type != "wall") {//2

			if (!openset.includes(nodes[current.i+1][current.j])) {//3
				let nod = nodes[current.i+1][current.j];
				nod.weight = current.weight + 1;
				openset.push(nod);
			}
			else {
				if(current.weight + 1 < nodes[current.i+1][current.j].weight) {
					let nod = nodes[current.i+1][current.j];
					nod.weight = current.weight + 1;
				}
			}//3

		}//2

	}//1

	if (current.i > 0) {

		if (!closeset.includes(nodes[current.i-1][current.j]) && nodes[current.i-1][current.j].type != "wall") {

			if (!openset.includes(nodes[current.i-1][current.j])) {
				let nod = nodes[current.i-1][current.j];
				nod.weight = current.weight + 1;
				openset.push(nod);
			}
			else {
				if(current.weight + 1 < nodes[current.i-1][current.j].weight) {
					let nod = nodes[current.i-1][current.j];
					nod.weight = current.weight + 1;
				}
			}

		}

	}

	if (current.j < cols-1) {

		if (!closeset.includes(nodes[current.i][current.j+1]) && nodes[current.i][current.j+1].type != "wall") {

			if (!openset.includes(nodes[current.i][current.j+1])) {
				let nod = nodes[current.i][current.j+1];
				nod.weight = current.weight + 1;
				openset.push(nod);
			}
			else {
				if(current.weight + 1 < nodes[current.i][current.j+1].weight) {
					let nod = nodes[current.i][current.j+1];
					nod.weight = current.weight + 1;
				}
			}

		}

	}

	if (current.j > 0) {

		if (!closeset.includes(nodes[current.i][current.j-1]) && nodes[current.i][current.j-1].type != "wall") {

			if (!openset.includes(nodes[current.i][current.j-1])) {
				let nod = nodes[current.i][current.j-1];
				nod.weight = current.weight + 1;
				openset.push(nod);
			}
			else {
				if(current.weight + 1 < nodes[current.i][current.j-1].weight) {
					let nod = nodes[current.i][current.j-1];
					nod.weight = current.weight + 1;
				}
			}

		}

	}

	let lock = false;

	if (current == checkpoints[1]) {
		lock = true;
		endTime = new Date().getTime() - startTime;
		setTimeout(drawPath, 100, current);
	}

	closeset.push(current);
	removeFromArray(openset, current);

	grid[closeset[0].i][closeset[0].j].style = "background-color: #aa00ee;";
	if (current === checkpoints[1] && current != checkpoints[0]) {
		grid[current.i][current.j].style = "background-color: #aa00ee;";
		openset = [current];
	}

	if (openset.length > 0 && current.type != checkpoints[1] && lock == false) {
		setTimeout(findPath, 5, openset, closeset);
	}


}


function drawPath(end) {

		let imax = end.i >= rows-1;
		let imin = end.i == 0;
		let jmax = end.j >= cols-1;
		let jmin = end.j == 0;

		if (!imax && nodes[end.i+1][end.j].weight < end.weight && nodes[end.i+1][end.j].weight > 0) { //1
			grid[end.i+1][end.j].style = "background-color: #ff0000;";
			end = nodes[end.i+1][end.j];
		}
		else {
			
			if (!imin && nodes[end.i-1][end.j].weight < end.weight && nodes[end.i-1][end.j].weight > 0) { //2
				grid[end.i-1][end.j].style = "background-color: #ff0000;";
				end = nodes[end.i-1][end.j];
			}

			else {
				if (!jmax && nodes[end.i][end.j+1].weight < end.weight && nodes[end.i][end.j+1].weight > 0) { //3
					grid[end.i][end.j+1].style = "background-color: #ff0000;";
					end = nodes[end.i][end.j+1];
				}
				else {
					
					if (!jmin && nodes[end.i][end.j-1].weight < end.weight && nodes[end.i][end.j-1].weight > 0) { //4
						grid[end.i][end.j-1].style = "background-color: #ff0000;";
						end = nodes[end.i][end.j-1];
					} //4

				} //3

			} //2

		} //1


		if (end.weight > 1) {setTimeout(drawPath, 100, end);}
		else {alert("longueur du chemin : " + checkpoints[1].weight + "\ntemps d'execution : " + endTime/1000 + " (s)");}
}
