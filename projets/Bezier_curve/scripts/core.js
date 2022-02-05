let svg; //the drawing frame to render the graph
let curves = new Array(); //contient les différents points de controles.
let menu_state = 0;
let cx;
let cy;

let curve_count = 0;
let circle_count = 0;
let line_count = 0;
let point_count = 0;

function load() {
	svg = new Svg("#svg_window");

	cx = document.querySelector('#svg_window').clientWidth/2;
	cy = document.querySelector('#svg_window').clientHeight/2;

	//axe principaux
	svg.createCircle("#000", "#000", "2px", cx, cy);
	svg.createLine("#000", 0, cy, cx*2, cy);
	svg.createLine("#000", cx, 0, cx, cy*2);


	//graduation
	for (let i = 1; i < 9; i++) {
		svg.createCircle("#000", "#000", "1px", cx + 100*i, cy);
		svg.createCircle("#000", "#000", "1px", cx - 100*i, cy);
	}

	for (let i = 1; i < 5; i++) {
		svg.createCircle("#000", "#000", "1px", cx, cy + 100*i);
		svg.createCircle("#000", "#000", "1px", cx, cy - 100*i);
	}

}

function menu(m) {

	let menu1 = document.querySelector('#cr_point');
	let menu2 = document.querySelector('#cr_line');
	let menu3 = document.querySelector('#cr_circle');
	let menu4 = document.querySelector('#cr_curve');

	if (m == 0) {
		//hide all
		menu1.style = "display: none;";
		menu2.style = "display: none;";
		menu3.style = "display: none;";
		menu4.style = "display: none;";
	}

	if (m == 1) {
		//menu de creation de point
		menu(0);

		if (menu_state != 1) {
			menu1.style = "display: flex;";
			menu_state = 1;
		}
		else {
			menu_state = 0;
		}
				
	}

	if (m == 2) {
		//menu de creation de ligne
		menu(0);

		if (menu_state != 2) {
			menu2.style = "display: flex;";
			menu_state = 2;
		}
		else {
			menu_state = 0;
		}

	}

	if (m == 3) {
		//menu de creation de cercle
		menu(0);

		if (menu_state != 3) {
			menu3.style = "display: flex;";
			menu_state = 3;
		}
		else {
			menu_state = 0;
		}

	}

	if (m == 4) {
		//menu de creation de courbe de bézier
		menu(0);
		if (menu_state != 4) {
			menu4.style = "display: flex;";
			menu_state = 4;
		}
		else {
			menu_state = 0;
		}

	}

	if (m == 5) {
		//menu de modification
		
	}

}

function point() {
	c = "" + document.querySelector('#point_color').value; //string type
	x = cx + 100*document.querySelector('#point_x').value;
	y =	cy - 100*document.querySelector('#point_y').value;

	svg.createCircle(c, c, "1px", x, y);

	menu_state = 0;
	menu(0);

}

function line() {

	c = "" + document.querySelector('#line_color').value; //string type
	ax = cx + 100*document.querySelector('#line_ax').value;
	ay = cy - 100*document.querySelector('#line_ay').value;
	bx = cx + 100*document.querySelector('#line_bx').value;
	by = cy - 100*document.querySelector('#line_by').value;

	svg.createLine(c, ax, ay, bx, by);

	menu_state = 0;
	menu(0);

}

function circle() {

	c = "" + document.querySelector('#c_color').value; //string type
	b = "" + document.querySelector('#c_border').value; //string type
	cx = cx + 100*document.querySelector('#circle_x').value;
	cy = cy - 100*document.querySelector('#circle_y').value;
	r = 100*document.querySelector('#c_radius').value + "px";//string type

	svg.createCircle(c, b, r, cx, cy);

	menu_state = 0;
	menu(0);

}

function curve() {

	c = "" + document.querySelector('#curve_color').value; //string type
	x1 = cx + 100*document.querySelector('#curve_x1').value;
	y1 = cy - 100*document.querySelector('#curve_y1').value;
	x2 = cx + 100*document.querySelector('#curve_x2').value;
	y2 = cy - 100*document.querySelector('#curve_y2').value;
	x3 = cx + 100*document.querySelector('#curve_x3').value;
	y3 = cy - 100*document.querySelector('#curve_y3').value;
	x4 = cx + 100*document.querySelector('#curve_x4').value;
	y4 = cy - 100*document.querySelector('#curve_y4').value;

	arr = [x1,y1,x2,y2,x3,y3,x4,y4];

	svg.createCurve(c, arr, 100);

	svg.createCircle(c, c, "1px", x1, y1);
	svg.createLabel(c, x1 + 25, y1 - 10, "C(" + curve_count + ")A(" + (x1-cx)/100 + "," + -1*(y1-cy)/100 + ")");
	svg.createCircle(c, c, "1px", x2, y2);
	svg.createLabel(c, x2 + 25, y2 - 10, "C(" + curve_count + ")B(" + (x2-cx)/100 + "," + -1*(y2-cy)/100 + ")");
	svg.createCircle(c, c, "1px", x3, y3);
	svg.createLabel(c, x3 + 25, y3 - 10, "C(" + curve_count + ")C(" + (x3-cx)/100 + "," + -1*(y3-cy)/100 + ")");
	svg.createCircle(c, c, "1px", x4, y4);
	svg.createLabel(c, x4 + 25, y4 - 10, "C(" + curve_count + ")D(" + (x4-cx)/100 + "," + -1*(y4-cy)/100 + ")");

	let xstr = (x1-cx)/100 + " * (1-t)^3 + " + (x2-cx)/100 + " * 3 * t(1-t)^2 + " + (x3-cx)/100 + " * 3 * (t^2)*(1-t) + " + (x4-cx)/100 + " * 3 * (t^3)";
	let ystr = -1*(y1-cy)/100 + " * (1-t)^3 + " + -1*(y2-cy)/100 + " * 3 * t(1-t)^2 + " + -1*(y3-cy)/100 + " * 3 * (t^2)*(1-t) + " + -1*(y4-cy)/100 + " * 3 * (t^3)"; 

	console.log("C(" + curve_count + ")X = " + xstr);
	console.log("C(" + curve_count + ")Y = " + ystr);

	let ax = (x1 - cx)/100;
	let ay = -1*(y1 - cy)/100;
	let bx = (x2 - cx)/100;
	let by = -1*(y2 - cy)/100;
	let ex = (x3 - cx)/100;
	let ey = -1*(y3 - cy)/100;
	let fx = (x4 - cx)/100;
	let fy = -1*(y4 - cy)/100;

	let dxstr = 3*ax + " * (t-1)^2 + " + bx + " * (2t * (t-1) + (t-1)^2) + " + ex + " * t * ((t-1) + t) + " + 3*fx + " * t^2";
	let dystr = 3*ay + " * (t-1)^2 + " + by + " * (2t * (t-1) + (t-1)^2) + " + ey + " * t * ((t-1) + t) + " + 3*fy + " * t^2";

	console.log("C(" + curve_count + ")X' = " + dxstr);
	console.log("C(" + curve_count + ")Y' = " + dystr);

	let v1 = bx - ax;
	let v2 = by - ay;
	let tstart = "TStart : y = " + v2/v1 + " * x + " + -1*((v2/v1)*ax - ay) ;

	if (ax == bx) {tstart = "TStart : x = " + ax;}
	console.log(tstart);

	let v3 = fx - ex;
	let v4 = fy - ey;
	let tend = "TEnd : y = " + v4/v3 + " * x + " + -1*((v4/v3)*ex - ey) ;

	if (ex == fx) {tend = "TEnd : x = " + fx;}
	console.log(tend);

	menu_state = 0;
	curve_count++;
	menu(0);

}

/**

⠀⠀⠀⠀⠀⠀⢀⣤⣀⣀⣀⠀⠻⣷⣄
⠀⠀⠀⠀⢀⣴⣿⣿⣿⡿⠋⠀⠀⠀⠹⣿⣦⡀
⠀⠀⢀⣴⣿⣿⣿⣿⣏⠀⠀⠀⠀⠀⠀⢹⣿⣧
⠀⠀⠙⢿⣿⡿⠋⠻⣿⣿⣦⡀⠀⠀⠀⢸⣿⣿⡆
⠀⠀⠀⠀⠉⠀⠀⠀⠈⠻⣿⣿⣦⡀⠀⢸⣿⣿⡇
⠀⠀⠀⠀⢀⣀⣄⡀⠀⠀⠈⠻⣿⣿⣶⣿⣿⣿⠁
⠀⠀⠀⣠⣿⣿⢿⣿⣶⣶⣶⣶⣾⣿⣿⣿⣿⡁
⢠⣶⣿⣿⠋⠀⠀⠉⠛⠿⠿⠿⠿⠿⠛⠻⣿⣿⣦⡀
⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⡿

**/



